import { Intent } from "@blueprintjs/core";
import { TileData } from "grid/tile/Tile";
import React from "react";
import ReactGridLayout from "react-grid-layout";
import { LongTermStorage } from "util/LongTermStorage";
import { PersistentToast } from "util/Toaster";

interface GridState extends GridStatePersistent {
    draggable: boolean
    resizable: boolean
    editable: boolean
}

interface GridStatePersistent {
    layout: GridLayout[]
}

interface GridLayout extends ReactGridLayout.Layout {
    tile: TileData
}

type PureOmission = "i" | "x" | "y"

export type PureLayout = Omit<ReactGridLayout.Layout, PureOmission>

export type PureGridLayout  = Omit<GridLayout, PureOmission>

interface GridAction extends Partial<GridState> {
    type: GridActionType
    id?: string
    value?: GridLayout
    gridLayout?: ReactGridLayout.Layout[]
}

export enum GridActionType {
    SetDraggable,
    SetResizable,
    SetEditable,
    SetLayout,

    DeleteID,

    AppendToLayout,
    SetGridLayout,
    SetGridLayoutItem,
}

const DefaultGridContextStorage: GridState = {
    draggable: false,
    resizable: false,
    editable: false,
    layout: [],
}

let ToastClose: (() => void) | null = null

const CheckEditable = (editable: boolean) => {
    if (editable && ToastClose == null) {
        ToastClose = PersistentToast({
            intent: Intent.PRIMARY, icon: "edit", message: "Edit Mode is enabled"
        })
    } else if (!editable && ToastClose != null) {
        ToastClose()
        ToastClose = null
    }
}

// React.Reducer for the grid context
const GridContextReducer: React.Reducer<GridState, GridAction> = (prev, action) => {
    switch (action.type) {
        case GridActionType.SetDraggable:
            if (action.draggable != null) {
                const editable = action.draggable && prev.resizable
                CheckEditable(editable)
                return { ...prev, draggable: action.draggable, editable }
            }
            break;
        case GridActionType.SetResizable:
            if (action.resizable != null) {
                const editable = action.resizable && prev.draggable
                CheckEditable(editable)
                return { ...prev, resizable: action.resizable, editable }
            }
            break;
        case GridActionType.SetEditable:
            if (action.editable != null) {
                CheckEditable(action.editable)
                return { ...prev, resizable: action.editable, draggable: action.editable, editable: action.editable }
            }
            break;
        case GridActionType.SetLayout:
            if (action.layout != null) {
                return { ...prev, layout: action.layout }
            }
            break;
        case GridActionType.DeleteID:
            if (action.id != null) {
                return { ...prev, layout: prev.layout.filter(({ i }) => i !== action.id) }
            }
            break;
        case GridActionType.AppendToLayout:
            if (action.layout != null) {
                return { ...prev, layout: [...prev.layout, ...action.layout.map(ReIndexLayout)] }
            }
            break;
        case GridActionType.SetGridLayout:
            if (action.gridLayout != null) {
                const index = action.gridLayout.reduce<{ [s: string]: ReactGridLayout.Layout }>((prev, current) => {
                    prev[current.i] = current
                    return prev
                }, {})
                return { ...prev, layout: prev.layout.map((layout) => ({ ...layout, ...index[layout.i] })) }
            }
            break;
        case GridActionType.SetGridLayoutItem:
            if (action.value != null) {
                return {
                    ...prev, layout: prev.layout.map((layout) => {
                        if (layout.i === action.value?.i) {
                            return action.value
                        }
                        return layout
                    })
                }
            }
            break;
    }
    return { ...prev }
}

export const GridContext = React.createContext<{
    state: GridState, dispatch: React.Dispatch<GridAction>
}>({} as any);

// Storage for the state of this context to persist between sessions
const GridContextStorage = new LongTermStorage<GridStatePersistent>("grid-context", { layout: DefaultGridContextStorage.layout }, "1")

// Hooks in the GridContextStorage to automatically store changes to the context
const GridContextReducerStorageWrapper: React.Reducer<GridState, GridAction> = (prev, action) => {
    const state = GridContextReducer(prev, action)
    GridContextStorage.set({ layout: state.layout })
    return state
}

// GridContextProvider provides the reducer based context
export const GridContextProvider: React.FunctionComponent<React.PropsWithChildren<{}>> = ({ children }) => {
    const [state, dispatch] = React.useReducer(GridContextReducerStorageWrapper, { ...DefaultGridContextStorage, ...GetGridContextStorageReIndexed() })
    return (
        <GridContext.Provider value={{ state, dispatch }}>
            {children}
        </GridContext.Provider>
    )
}

const GetGridContextStorageReIndexed = (): GridStatePersistent => {
    const state = GridContextStorage.get()
    state.layout = state.layout.map(ReIndexLayout)
    return state
}

const ReIndexLayout = (layout: GridLayout | PureGridLayout): GridLayout => ({
    x: 0, y: 0, ...layout, i: GetUniqueID()
})

let ID = 0

const GetUniqueID = (): string => {
    const id = `${ID}`
    ID++
    return id
}