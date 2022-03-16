import { TileData } from "grid/tile/interface"

export interface GridContent {
    name: string
    description: string
    last_updated: Date
    layout: GridLayout[]
    context: GridContext
    columns: number
}

export interface GridContext {

}

export interface GridLayout extends ReactGridLayout.Layout {
    tile: TileData
}
