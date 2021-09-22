import { H4 } from "@blueprintjs/core";
import { GridContext } from "context/GridContext";
import React from "react";

interface Props {

}

export const UnknownTile: React.FunctionComponent<React.PropsWithChildren<Props>> = ({ children }) => {
    const { state } = React.useContext(GridContext)

    return (
        <H4>{"This tile no longer exists"}</H4>
    )
}