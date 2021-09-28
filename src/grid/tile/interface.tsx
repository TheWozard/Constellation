import { PureLayout } from "context/GridContext";
import { FilterTypes } from "filters/core";

export interface TileRenderer<T> {
    type: string
    filters: FilterTypes[]
    layout: PureLayout | (() => PureLayout)
    createNew: T | (() => T)
    renderTile: React.FunctionComponent<TileRendererProps<T>>
    renderStore: React.FunctionComponent<void>
}

export interface TileRendererProps<T> {
    data: T
    setData: (data: T) => void
}