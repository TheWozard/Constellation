import { Card } from "@blueprintjs/core";
import React from "react";

interface Props {

}

export const GridCard: React.FunctionComponent<React.PropsWithChildren<Props>> = ({children}) => (
    <Card className={"grid-card"} >
        {children}
    </Card>
)