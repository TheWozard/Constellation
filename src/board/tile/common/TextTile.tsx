import { TextArea } from "@blueprintjs/core";
import { BoardContext } from "context/BoardContext";
import { TileRenderer } from "board/tile/interface";
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
    const { state } = React.useContext(BoardContext)
    return (
        <React.Fragment>
            {!state.editable ?
                <ReactMarkdown className={"overflow-scroll-hidden tile-text-area"}>{data.text}</ReactMarkdown>
                :
                <div className={"flex-list tile-text-area"}>
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
    layout: () => ({ h: 2, w: 2 }),
    layoutStore: () => ({ h: 2, w: 2 }),
    createNew: () => ({ text: "" }),
    RenderTile: TextTile,
    RenderStore: () => (<TextTile data={{ text: "Generic text tile for entering any data you want. Uses Markdown for formatting!" }} setData={() => { }} />),
}