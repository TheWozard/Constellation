import { Intent } from "@blueprintjs/core";
import { BoardContent, BoardDetails } from "board/interface";
import { PureLayout, ReIndexContent } from "board/layout/interface";
import { ContentID, TileContent, TileData, TileStyle } from "board/tile/interface";
import React from "react";
import ReactGridLayout from "react-grid-layout";
import { LongTermStorage } from "util/LongTermStorage";
import { PersistentToast } from "util/Toaster";

// BoardState the current state of the board
interface BoardState extends BoardStatePersistent {
    draggable: boolean
    resizable: boolean
    editable: boolean
}

// BoardStatePersistent is the parts of the board stored to local storage
interface BoardStatePersistent {
    content: BoardContent
}

// BoardAction description of an action to be done to the board
interface BoardAction {
    type: BoardActionType
    draggable?: boolean
    resizable?: boolean
    editable?: boolean
    content?: BoardContent<PureLayout>

    // Board Actions
    details?: BoardDetails
    name?: string
    description?: string
    columns?: number

    // Group Actions
    layouts?: ReactGridLayout.Layout[]
    tiles?: TileContent[]

    // Tile Actions
    tile_id?: string
    tile_layout?: ReactGridLayout.Layout
    tile_style?: TileStyle
    tile_data?: TileData
    tile_content?: TileContent
}

export enum BoardActionType {
    // Board Actions
    SetDraggable,
    SetResizable,
    SetEditable,
    SetContent,
    SetBoardColumns,
    SetBoardName,
    SetBoardDescription,
    ResetBoard,

    // Group Actions
    UpdateLayouts,
    AddTiles,

    // Tile Actions
    SetTileLayout,
    SetTileStyle,
    SetTileData,
    SetTileContent,
    DeleteTile,
    PinTile,
}

export const DefaultBoardContextStorage: BoardState = {
    draggable: false,
    resizable: false,
    editable: false,
    content: {
        context: {},
        tiles: [],
        details: {
            name: "Default",
            description: "Default starting board",
            last_updated: new Date(),
            columns: 12,
        }
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
const BoardContextReducer: React.Reducer<BoardState, BoardAction> = (prev, action) => {
    switch (action.type) {
        // Board Actions
        case BoardActionType.SetDraggable:
            if (action.draggable != null) {
                const editable = action.draggable && prev.resizable
                CheckEditable(editable)
                return { ...prev, draggable: action.draggable, editable }
            }
            break;
        case BoardActionType.SetResizable:
            if (action.resizable != null) {
                const editable = action.resizable && prev.draggable
                CheckEditable(editable)
                return { ...prev, resizable: action.resizable, editable }
            }
            break;
        case BoardActionType.SetEditable:
            if (action.editable != null) {
                CheckEditable(action.editable)
                return { ...prev, resizable: action.editable, draggable: action.editable, editable: action.editable }
            }
            break;
        case BoardActionType.SetContent:
            if (action.content != null) {
                return { ...prev, content: { ...action.content, tiles: action.content.tiles.map(ReIndexContent) } }
            }
            break;
        case BoardActionType.SetBoardName:
            if (action.name != null) {
                return { ...prev, content: { ...prev.content, details: { ...prev.content.details, name: action.name } } }
            }
            break;
        case BoardActionType.SetBoardDescription:
            if (action.description != null) {
                return { ...prev, content: { ...prev.content, details: { ...prev.content.details, description: action.description } } }
            }
            break;
        case BoardActionType.SetBoardColumns:
            if (action.columns != null && action.columns > 0) {
                return { ...prev, content: { ...prev.content, details: { ...prev.content.details, columns: action.columns } } }
            }
            break;
        case BoardActionType.ResetBoard:
            return { ...prev, content: { ...DefaultBoardContextStorage.content } }

        // Group Actions
        case BoardActionType.UpdateLayouts:
            if (action.layouts != null) {
                const index = action.layouts.reduce<{ [s: string]: ReactGridLayout.Layout }>((prev, current) => {
                    prev[current.i] = current
                    return prev
                }, {})
                return { ...prev, content: { ...prev.content, tiles: prev.content.tiles.map((content) => ({ ...content, layout: { ...content.layout, ...index[content.layout.i] } })) } }
            }
            break;
        case BoardActionType.AddTiles:
            if (action.tiles != null) {
                return { ...prev, content: { ...prev.content, tiles: [...prev.content.tiles, ...action.tiles.map(ReIndexContent)] } }
            }
            break;

        // Tile Actions
        case BoardActionType.SetTileLayout:
            if (action.tile_id != null && action.tile_layout != null) {
                return { ...prev, content: { ...prev.content, tiles: ActionToTileByID(prev.content.tiles, action.tile_id, (tile: TileContent): TileContent => ({ ...tile, layout: (action.tile_layout as ReactGridLayout.Layout) })) } }
            }
            break;
        case BoardActionType.SetTileStyle:
            if (action.tile_id != null && action.tile_style != null) {
                return { ...prev, content: { ...prev.content, tiles: ActionToTileByID(prev.content.tiles, action.tile_id, (tile: TileContent): TileContent => ({ ...tile, style: (action.tile_style as TileStyle) })) } }
            }
            break;
        case BoardActionType.SetTileData:
            if (action.tile_id != null && action.tile_data != null) {
                return { ...prev, content: { ...prev.content, tiles: ActionToTileByID(prev.content.tiles, action.tile_id, (tile: TileContent): TileContent => ({ ...tile, data: (action.tile_data as TileData) })) } }
            }
            break;
        case BoardActionType.SetTileContent:
            if (action.tile_id != null && action.tile_content != null) {
                return { ...prev, content: { ...prev.content, tiles: ActionToTileByID(prev.content.tiles, action.tile_id, (tile: TileContent): TileContent => ({ ...(action.tile_content as TileContent) })) } }
            }
            break;
        case BoardActionType.DeleteTile:
            if (action.tile_id != null) {
                return { ...prev, content: { ...prev.content, tiles: prev.content.tiles.filter((content) => ContentID(content) !== action.tile_id) } }
            }
            break;
        case BoardActionType.PinTile:
            if (action.tile_id != null) {
                return { ...prev, content: { ...prev.content, tiles: ActionToTileByID(prev.content.tiles, action.tile_id, (tile: TileContent): TileContent => ({ ...tile, layout: { ...tile.layout, static: !tile.layout.static } })) } }
            }
            break;
    }
    return { ...prev }
}

// BoardContext for all actions related to the board
export const BoardContext = React.createContext<{
    state: BoardState, dispatch: React.Dispatch<BoardAction>
}>({} as any);

// Storage for the state of this context to persist between sessions
export const BoardContextStorage = new LongTermStorage<BoardStatePersistent>("grid-context", { content: DefaultBoardContextStorage.content }, "2", {
    "1": (prev) => ({ content: { ...DefaultBoardContextStorage.content, tiles: (prev as any).layout } })
})

// Hooks in the BoardContextStorage to automatically store changes to the context
const BoardContextReducerStorageWrapper: React.Reducer<BoardState, BoardAction> = (prev, action) => {
    const state = BoardContextReducer(prev, action)
    BoardContextStorage.set({ content: state.content })
    return state
}

// BoardContextProvider provides the reducer based context
export const BoardContextProvider: React.FunctionComponent<React.PropsWithChildren<{}>> = ({ children }) => {
    const [state, dispatch] = React.useReducer(BoardContextReducerStorageWrapper, { ...DefaultBoardContextStorage, ...GetBoardContextStorageReIndexed() })
    return (
        <BoardContext.Provider value={{ state, dispatch }}>
            {children}
        </BoardContext.Provider>
    )
}

// GetBoardContextStorageReIndexed gets stored data from storage but reindexes all the ids so they cant accidentally intersect
const GetBoardContextStorageReIndexed = (): BoardStatePersistent => {
    const state = BoardContextStorage.get()
    state.content = {
        ...state.content,
        tiles: (state.content.tiles || []).map(ReIndexContent)
    }
    return state
}

const ActionToTileByID = (tiles: TileContent[], id: string, action: (tile: TileContent) => TileContent): TileContent[] => {
    let index = tiles.findIndex((content) => ContentID(content) === id)
    if (index >= 0) {
        const next = [...tiles]
        next[index] = action(next[index])
        return next
    }
    return tiles
}
