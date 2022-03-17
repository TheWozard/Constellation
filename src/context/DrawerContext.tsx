import React from "react";

interface DrawerState {
    boards: boolean
    context: boolean
    tiles: boolean
    settings: boolean
    filter: boolean
}

interface DrawerAction {
    type: DrawerActionType
    value: boolean
}

export enum DrawerActionType {
    SetBoards,
    SetContext,
    SetTiles,
    SetSettings,
    SetFilter,
}


const DrawerContextReducer: React.Reducer<DrawerState, DrawerAction> = (prev, action) => {
    switch (action.type) {
        case DrawerActionType.SetBoards:
            return { boards: action.value, context: false, tiles: false, settings: false, filter: false }
        case DrawerActionType.SetContext:
            return { context: action.value, boards: false, tiles: false, settings: false, filter: false }
        case DrawerActionType.SetTiles:
            return { tiles: action.value, boards: false, context: false, settings: false, filter: false }
        case DrawerActionType.SetSettings:
            return { settings: action.value, boards: false, context: false, tiles: false, filter: false }
        case DrawerActionType.SetFilter:
            return { filter: action.value, boards: false, context: false, tiles: false, settings: false }
    }
}

export const DrawerContext = React.createContext<{
    state: DrawerState, dispatch: React.Dispatch<DrawerAction>
}>({} as any);


// DrawerContextProvider provides the reducer based context
export const DrawerContextProvider: React.FunctionComponent<React.PropsWithChildren<{}>> = ({ children }) => {
    const [state, dispatch] = React.useReducer(DrawerContextReducer, {
        boards: false,
        context: false,
        tiles: false,
        settings: false,
        filter: false,
    })
    return (
        <DrawerContext.Provider value={{ state, dispatch }}>
            {children}
        </DrawerContext.Provider>
    )
}