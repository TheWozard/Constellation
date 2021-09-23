import { Classes, Drawer, Position } from "@blueprintjs/core"
import { DrawerActionType, DrawerContext } from "context/DrawerContext"
import React from "react"

export const FilterDrawer = () => {
    const {state, dispatch} = React.useContext(DrawerContext)

    return (
        <Drawer
            className={Classes.DARK}
            isOpen={state.filter}
            position={Position.BOTTOM}
            title={"Filter"}
            icon={"settings"}
            onClose={() => {
                dispatch({
                    type: DrawerActionType.SetFilter,
                    value: false,
                })
            }}
        >

        </Drawer>
    )
}