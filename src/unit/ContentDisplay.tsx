import { Card, H3, Intent, Tag } from "@blueprintjs/core";
import { UI_TEXT } from "@blueprintjs/core/lib/esm/common/classes";
import { BoardContent } from "board/interface";
import React from "react";

interface CardProps extends DetailProps {
    onClick?: () => void
}

// BoardCard is a BoardDetails wrapped in a pre-styled Card
export const BoardCard: React.FunctionComponent<CardProps> = (props: CardProps) => {
    return (
        <Card elevation={props.onClick != null ? 2 : 1} onClick={props.onClick} interactive={props.onClick != null}>
            <BoardDetails {...props} />
        </Card>
    )
}

interface DetailProps {
    content: BoardContent<any>
}

export const BoardDetails: React.FunctionComponent<DetailProps> = ({ content }) => {
    let counts = content.tiles.reduce<{ [s: string]: number }>((prev, current) => {
        prev[current.data.type] = (prev[current.data.type] || 0) + 1
        return prev
    }, {})

    return (
        <div className={"margin-vertical-spacing"}>
            <div className="inline-spaced">
                <H3>{content.details.name}</H3>
                <div className="grid-list">
                    <Tag key={"total"} intent={Intent.PRIMARY}>{content.tiles.length}</Tag>
                    {Object.keys(counts).map((type) => (<Tag key={type}>{`${counts[type] > 1 ? `${counts[type]} - ` : ""}${type.toUpperCase()}`}</Tag>))}
                </div>
            </div>
            <div className={UI_TEXT}>{content.details.description}</div>
        </div>
    )
}