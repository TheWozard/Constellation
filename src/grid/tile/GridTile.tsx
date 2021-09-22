import { Button, Card, Intent } from "@blueprintjs/core";
import { GridContext } from "context/GridContext";
import React from "react";

interface Props {

}

export const GridTile: React.FunctionComponent<React.PropsWithChildren<Props>> = ({children}) => {
    const {state} = React.useContext(GridContext)

    return (
        <Card className={"grid-card"} >
            {state.editable && <Button className="delete-button" intent={Intent.DANGER} icon="cross"/>}
            {children}
        </Card>
    )
}