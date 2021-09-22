import { Text } from "@blueprintjs/core";
import { GridContext } from "context/GridContext";
import { GridTile } from "grid/tile/GridTile";
import React from "react";

interface Props {

}

export const TextTile: React.FunctionComponent<Props> = ({children}) => {
    const {state} = React.useContext(GridContext)

    return (
        <GridTile>
            <Text />
        </GridTile>
    )
}