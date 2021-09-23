import { Classes, Drawer, Position } from "@blueprintjs/core"
import { DrawerActionType, DrawerContext } from "context/DrawerContext"
import React from "react"

export const AppsDrawer = () => {
    const {state, dispatch} = React.useContext(DrawerContext)

    return (
        <Drawer
            className={Classes.DARK}
            isOpen={state.apps}
            position={Position.RIGHT}
            title={"Apps"}
            icon={"applications"}
            onClose={() => {
                dispatch({
                    type: DrawerActionType.SetApps,
                    value: false,
                })
            }}
        >

        </Drawer>
    )
}