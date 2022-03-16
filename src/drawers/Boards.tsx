import { Classes, Drawer, Intent, Position, Slider } from "@blueprintjs/core"
import { DrawerActionType, DrawerContext } from "context/DrawerContext"
import { GridActionType, GridContext } from "context/GridContext"
import React from "react"
import { ConfirmButton } from "unit/ConfirmButton"
import { ContentDisplay } from "unit/ContentDisplay"
import { ContentImportExport } from "unit/ContentImportExport"

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
            <div className={"drawer-padding drawer-full overflow-scroll-hidden margin-vertical-spacing"}>
                <ContentDisplay content={grid.state.content} />
                <Slider
                    min={4}
                    max={20}
                    onChange={(value) => {
                        grid.dispatch({ type: GridActionType.SetGridColumns, columns: value })
                    }}
                    value={grid.state.content.columns}
                    stepSize={1}
                />
                <ConfirmButton dialog={
                    <span>Confirm resetting the current board. This will reset all board data. This action can <b>NOT</b> be undone.</span>
                } icon={"reset"} text={"Reset"} intent={Intent.DANGER} onClick={() => {
                    grid.dispatch({ type: GridActionType.ResetGrid })
                }} />
                <ContentImportExport content={grid.state.content} />
            </div>
        </Drawer>
    )
}