import { PureLayout } from "board/layout/interface";
import { FilterTypes } from "filters/core";

// TileContext describes both a tiles location and display in the grid as well as the TileData
export interface TileContent<T = ReactGridLayout.Layout> {
    layout: T
    style: TileStyle
    data: TileData
}

export interface TileRenderer<T> {
    type: string
    filters: FilterTypes[]
    layout: () => PureLayout
    layoutStore?: () => PureLayout
    createNew: () => T
    style?: () => TileStyle
    RenderTile: React.ComponentType<TileRendererProps<T>>
    RenderStore: React.FunctionComponent<{}>
}

export interface TileRendererProps<T> {
    data: T
    setData: (data: T) => void
}

export interface TileData {
    type: string
    data: any
}

export interface TileStyle {
    backgroundColor?: string
    textColor?: string
}

export const ContentID = (content: TileContent): string => {
    return content.layout.i
}
