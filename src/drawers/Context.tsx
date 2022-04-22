import { Classes, Drawer, Position } from "@blueprintjs/core"
import { DrawerActionType, DrawerContext } from "context/DrawerContext"
import React from "react"

export const ContextDrawer = () => {
    const { state, dispatch } = React.useContext(DrawerContext)


    return (
        <Drawer
            className={Classes.DARK}
            isOpen={state.context}
            position={Position.LEFT}
            title={"Context"}
            icon={"code"}
            onClose={() => {
                dispatch({
                    type: DrawerActionType.SetContext,
                    value: false,
                })
            }}
            size={"500px"}
        >

        </Drawer>
    )
}