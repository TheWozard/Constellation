import { TextArea } from "@blueprintjs/core";
import { GridContext } from "context/GridContext";
import { TileRenderer } from "grid/tile/interface";
import React from "react";
import ReactMarkdown from 'react-markdown';

interface Props {
    data: TextTileData
    setData: (data: TextTileData) => void
}

interface TextTileData {
    text: string
}

export const TextTile: React.FunctionComponent<Props> = ({ data, setData }) => {
    const { state } = React.useContext(GridContext)

    return (
        <React.Fragment>
            {!state.editable ?
                <ReactMarkdown className={"overflow-scroll"}>{data.text}</ReactMarkdown>
                :
                <div className={"flex-list"}>
                    <TextArea className={"full-text-area"} fill growVertically value={data.text} onChange={(event) => {
                        setData({ ...data, text: event.target.value })
                    }} onMouseDown={(event) => {
                        event.stopPropagation()
                    }} />
                    <div className={"flex-split"}>
                        <div />
                        <a href={"https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet"} target={"_blank"} rel="noreferrer">Cheatsheet</a>
                    </div>
                </div>
            }
        </React.Fragment>
    )
}

export const TextTileRenderer: TileRenderer<TextTileData> = {
    type: "text",
    filters: [],
    layout: { h: 1, w: 1 },
    createNew: { text: "" },
    renderTile: TextTile,
    renderStore: () => (<TextTile data={{ text: "Generic text tile for entering any data you want. Uses Markdown for formatting!" }} setData={() => { }} />),
}