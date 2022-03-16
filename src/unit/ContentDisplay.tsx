import { Card, H3, Intent, Tag } from "@blueprintjs/core";
import { UI_TEXT } from "@blueprintjs/core/lib/esm/common/classes";
import { GridContent } from "grid/Interface";
import React from "react";

interface Props {
    content: GridContent
}

export const ContentDisplay: React.FunctionComponent<Props> = ({ content }) => {
    let counts = content.layout.reduce<{ [s: string]: number }>((prev, current) => {
        prev[current.tile.type] = (prev[current.tile.type] || 0) + 1
        return prev
    }, {})

    return (
        <Card elevation={2} className={"margin-vertical-spacing"}>
            <H3>{content.name}</H3>
            <div className={UI_TEXT}>{content.description}</div>
            <div className={UI_TEXT}>{"Overview"}</div>
            <div className="grid-list">
                <Tag key={"total"} intent={Intent.PRIMARY}>{content.layout.length}</Tag>
                {Object.keys(counts).map((type) => (<Tag key={type}>{`${counts[type] > 1 ? `${counts[type]} - ` : ""}${type.toUpperCase()}`}</Tag>))}
            </div>
        </Card>
    )
}