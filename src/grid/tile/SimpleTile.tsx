import { TileRenderer } from "grid/tile/interface";
import React from "react";

interface Props {
    data: {}
    setData: (data: {}) => void
}

export const SimpleTile: React.FunctionComponent<Props> = ({ data, setData }) => {
    return (
        <React.Fragment>
        </React.Fragment>
    )
}

export const SimpleTileRenderer: TileRenderer<{}> = {
    type: "simple",
    filters: [],
    layout: () => ({ h: 1, w: 1 }),
    layoutStore: () => ({ h: 1, w: 1 }),
    createNew: () => ({}),
    customization: () => {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        return { backgroundColor: `#${randomColor}` }
    },
    RenderTile: SimpleTile,
    RenderStore: () => (<div className={"flex-list tile-text-area"}>{"Blank tile to take up space in the grid"}</div>),
}