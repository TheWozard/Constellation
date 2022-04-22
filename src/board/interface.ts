import { BoardContext } from "board/context/interface"
import { TileContent } from "board/tile/interface"
import ReactGridLayout from "react-grid-layout"

// BoardContent describes a board as a whole
export interface BoardContent<T = ReactGridLayout.Layout> {
    details: BoardDetails
    tiles: TileContent<T>[]
    context: BoardContext
}

// BoardDetails describes overarching details about a grid
export interface BoardDetails {
    name: string
    description: string
    last_updated: Date
    columns: number
}
