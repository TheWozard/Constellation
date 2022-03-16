import { Intent } from "@blueprintjs/core";
import { GridContent, GridLayout } from "grid/Interface";
import { TileCustomization } from "grid/tile/interface";
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
    content: GridContent
}

type PureOmission = "i" | "x" | "y"

export type PureLayout = Omit<ReactGridLayout.Layout, PureOmission>

export type PureGridLayout = Omit<GridLayout, PureOmission>

interface GridAction extends Partial<GridState> {
    type: GridActionType
    id?: string
    customization?: TileCustomization
    value?: GridLayout
    layout?: GridLayout[]
}

export enum GridActionType {
    SetDraggable,
    SetResizable,
    SetEditable,
    SetLayout,

    DeleteID,
    PinTileByID,
    SetCustomizationByID,

    AppendToLayout,
    MergeLayout,
    SetLayoutItem,
}

const DefaultGridContextStorage: GridState = {
    draggable: false,
    resizable: false,
    editable: false,
    content: {
        name: "Default",
        description: "Default starting board",
        last_updated: new Date(),
        context: {},
        layout: [],
    }
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
                return { ...prev, content: { ...prev.content, layout: action.layout } }
            }
            break;
        case GridActionType.DeleteID:
            if (action.id != null) {
                return { ...prev, content: { ...prev.content, layout: prev.content.layout.filter(({ i }) => i !== action.id) } }
            }
            break;
        case GridActionType.PinTileByID:
            if (action.id != null) {
                let index = prev.content.layout.findIndex((layout) => layout.i === action.id)
                if (index >= 0) {
                    let layout = [...prev.content.layout]
                    layout[index] = { ...layout[index], static: !layout[index].static }
                    return { ...prev, content: { ...prev.content, layout } }
                }
            }
            break;
        case GridActionType.SetCustomizationByID:
            if (action.id != null && action.customization != null) {
                let index = prev.content.layout.findIndex((layout) => layout.i === action.id)
                if (index >= 0) {
                    let layout = [...prev.content.layout]
                    layout[index] = { ...layout[index], tile: { ...layout[index].tile, customization: action.customization } }
                    return { ...prev, content: { ...prev.content, layout } }
                }
            }
            break;
        case GridActionType.AppendToLayout:
            if (action.layout != null) {
                return { ...prev, content: { ...prev.content, layout: [...prev.content.layout, ...action.layout.map(ReIndexLayout)] } }
            }
            break;
        case GridActionType.MergeLayout:
            if (action.layout != null) {
                // Convert incoming list to a lookup index by id
                const index = action.layout.reduce<{ [s: string]: ReactGridLayout.Layout }>((prev, current) => {
                    prev[current.i] = current
                    return prev
                }, {})
                return { ...prev, content: { ...prev.content, layout: prev.content.layout.map((layout) => ({ ...layout, ...index[layout.i] })) } }
            }
            break;
        case GridActionType.SetLayoutItem:
            if (action.value != null) {
                return {
                    ...prev, content: {
                        ...prev.content, layout: prev.content.layout.map((layout) => {
                            if (layout.i === action.value?.i) {
                                return action.value
                            }
                            return layout
                        })
                    }
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
const GridContextStorage = new LongTermStorage<GridStatePersistent>("grid-context", { content: DefaultGridContextStorage.content }, "2", {
    "1": (prev) => ({ content: { ...DefaultGridContextStorage.content, layout: (prev as any).layout } })
})

// Hooks in the GridContextStorage to automatically store changes to the context
const GridContextReducerStorageWrapper: React.Reducer<GridState, GridAction> = (prev, action) => {
    const state = GridContextReducer(prev, action)
    GridContextStorage.set({ content: state.content })
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
    state.content = {
        ...state.content,
        layout: state.content.layout.map(ReIndexLayout)
    }
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