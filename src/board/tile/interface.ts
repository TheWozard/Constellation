import { PureLayout } from "board/layout/interface";
import { FilterTypes } from "filters/core";
import { ParameterObject, Parameters } from "paramaters";

// TileContext describes both a tiles location and display in the grid as well as the TileData
export interface TileContent<T = ReactGridLayout.Layout> {
    layout: T
    style: TileStyle
    data: TileData
}

export interface TileRenderer<T, Style = TileStyle> {
    type: string
    filters: FilterTypes[]
    layout: () => PureLayout
    layoutStore?: () => PureLayout
    createNew: () => T
    style?: () => TileStyle
    styleParameters?: Parameters<Style>
    RenderTile: React.ComponentType<TileRendererProps<T, Style>>
    RenderStore: React.FunctionComponent<{}>
}

export interface TileRendererProps<T, Style = ParameterObject> {
    style: Style
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
