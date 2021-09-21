import React from "react";
import ReactGridLayout from "react-grid-layout";
import { LongTermStorage } from "util/LongTermStorage";

interface GridState {
    draggable: boolean
    resizable: boolean
    layout: ReactGridLayout.Layout[]
}

interface GridAction extends Partial<GridState> {
    type: GridActionType
}

export enum GridActionType {
    SetDraggable,
    SetResizable,
    SetLayout,
}

const DefaultGridContextStorage: GridState = {
    draggable: false,
    resizable: false,
    layout: [],
}

// React.Reducer for the grid context
const GridContextReducer: React.Reducer<GridState,GridAction> = (prev, action) => {
    switch (action.type) {
        case GridActionType.SetDraggable:
            if (action.draggable != null) {
                return {...prev, draggable: action.draggable}
            }
            break;
        case GridActionType.SetResizable:
            if (action.resizable != null) {
                return {...prev, resizable: action.resizable}
            }
            break;
        case GridActionType.SetLayout:
            if (action.layout != null) {
                return {...prev, layout: action.layout}
            }
    }
    return {...prev}
}

export const GridContext = React.createContext<{
    state: GridState, dispatch: React.Dispatch<GridAction>
}>({} as any);

// Storage for the state of this context to persist between sessions
const GridContextStorage = new LongTermStorage<GridState>("grid-context", DefaultGridContextStorage, "1")

// Hooks in the GridContextStorage to automatically store changes to the context
const GridContextReducerStorageWrapper: React.Reducer<GridState,GridAction> = (prev, action) => {
    const state = GridContextReducer(prev, action)
    GridContextStorage.set(state)
    return state
}

// GridContextProvider provides the reducer based context
export const GridContextProvider: React.FunctionComponent<React.PropsWithChildren<{}>> = ({children}) => {
    const [state, dispatch] = React.useReducer(GridContextReducerStorageWrapper, GridContextStorage.get())
    return (
        <GridContext.Provider value={{state, dispatch}}>
            {children}
        </GridContext.Provider>
    )
}