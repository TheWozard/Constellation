import { Text } from "@blueprintjs/core";
import { GridTile } from "grid/tile/GridTile";
import React from "react";

interface Props {

}

export const TextTile: React.FunctionComponent<Props> = ({ children }) => {
    return (
        <GridTile>
            <Text />
        </GridTile>
    )
}