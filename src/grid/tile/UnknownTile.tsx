import { H4 } from "@blueprintjs/core";
import React from "react";

interface Props {

}

export const UnknownTile: React.FunctionComponent<React.PropsWithChildren<Props>> = ({ children }) => {
    return (
        <H4>{"This tile no longer exists"}</H4>
    )
}