import { Classes, Drawer, Position } from "@blueprintjs/core"
import { DrawerActionType, DrawerContext } from "context/DrawerContext"
import React from "react"

export const SettingsDrawer = () => {
    const {state, dispatch} = React.useContext(DrawerContext)

    return (
        <Drawer
            className={Classes.DARK}
            isOpen={state.settings}
            position={Position.RIGHT}
            title={"Settings"}
            icon={"cog"}
            onClose={() => {
                dispatch({
                    type: DrawerActionType.SetSettings,
                    value: false,
                })
            }}
        >

        </Drawer>
    )
}