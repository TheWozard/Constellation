import { Card, H3, Intent, Tag } from "@blueprintjs/core";
import { UI_TEXT } from "@blueprintjs/core/lib/esm/common/classes";
import { BoardContent } from "board/interface";
import React from "react";

interface Props {
    content: BoardContent<any>
    onClick?: () => void
}

export const ContentDisplay: React.FunctionComponent<Props> = ({ content, onClick }) => {
    let counts = content.tiles.reduce<{ [s: string]: number }>((prev, current) => {
        prev[current.data.type] = (prev[current.data.type] || 0) + 1
        return prev
    }, {})

    return (
        <Card elevation={2} className={"margin-vertical-spacing"} onClick={onClick} interactive={onClick != null}>
            <H3>{content.details.name}</H3>
            <div className={UI_TEXT}>{content.details.description}</div>
            <div className={UI_TEXT}>{"Overview"}</div>
            <div className="grid-list">
                <Tag key={"total"} intent={Intent.PRIMARY}>{content.tiles.length}</Tag>
                {Object.keys(counts).map((type) => (<Tag key={type}>{`${counts[type] > 1 ? `${counts[type]} - ` : ""}${type.toUpperCase()}`}</Tag>))}
            </div>
        </Card>
    )
}