import { PureLayout } from "context/GridContext";
import { FilterTypes } from "filters/core";

export interface TileRenderer<T> {
    type: string
    filters: FilterTypes[]
    layout: () => PureLayout
    layoutStore?: () => PureLayout
    createNew: () => T
    customization?: () => TileCustomization
    RenderTile: React.FunctionComponent<TileRendererProps<T>>
    RenderStore: React.FunctionComponent<{}>
}

export interface TileRendererProps<T> {
    data: T
    setData: (data: T) => void
}

export interface TileData {
    type: string
    customization?: TileCustomization
    data: any
}

export interface TileCustomization {
    backgroundColor?: string
    textColor?: string
}

export const StyleFromTileCustomization = (customization: TileCustomization): React.CSSProperties => {
    const style: React.CSSProperties = {}
    if (customization.backgroundColor != null) {
        style.backgroundColor = customization.backgroundColor
    }
    if (customization.textColor != null) {
        style.color = customization.textColor
    }
    return style
}