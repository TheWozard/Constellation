import { Classes, Drawer, Position } from "@blueprintjs/core"
import { DrawerActionType, DrawerContext } from "context/DrawerContext"
import { GridContext } from "context/GridContext"
import React from "react"
import { LayoutDisplay } from "unit/LayoutDisplay"

export const BoardsDrawer = () => {
    const drawer = React.useContext(DrawerContext)
    const grid = React.useContext(GridContext)

    return (
        <Drawer
            className={Classes.DARK}
            isOpen={drawer.state.boards}
            position={Position.LEFT}
            title={"Boards"}
            icon={"git-repo"}
            onClose={() => {
                drawer.dispatch({
                    type: DrawerActionType.SetBoards,
                    value: false,
                })
            }}
        >
            <div className={"drawer-padding drawer-full overflow-scroll-hidden"}>
                <LayoutDisplay name={"Current"} description={"The current grid"} layout={grid.state.layout} />
            </div>
        </Drawer>
    )
}