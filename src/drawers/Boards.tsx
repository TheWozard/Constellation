import { Classes, Drawer, Position } from "@blueprintjs/core"
import { DrawerActionType, DrawerContext } from "context/DrawerContext"
import React from "react"

export const BoardsDrawer = () => {
    const {state, dispatch} = React.useContext(DrawerContext)

    return (
        <Drawer
            className={Classes.DARK}
            isOpen={state.boards}
            position={Position.LEFT}
            title={"Boards"}
            icon={"git-repo"}
            onClose={() => {
                dispatch({
                    type: DrawerActionType.SetBoards,
                    value: false,
                })
            }}
        >

        </Drawer>
    )
}