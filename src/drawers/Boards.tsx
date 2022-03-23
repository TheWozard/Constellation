import { Classes, Drawer, Intent, Position, Slider } from "@blueprintjs/core"
import { DrawerActionType, DrawerContext } from "context/DrawerContext"
import { BoardActionType, BoardContext } from "context/BoardContext"
import React from "react"
import { ConfirmButton } from "unit/ConfirmButton"
import { ContentDisplay } from "unit/ContentDisplay"
import { ContentImportExport } from "unit/ContentImportExport"
import { BoardContentProviders } from "board/providers"

export const BoardsDrawer = () => {
    const drawer = React.useContext(DrawerContext)
    const board = React.useContext(BoardContext)

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
                <ContentDisplay content={board.state.content} />
                <Slider
                    min={4}
                    max={20}
                    onChange={(value) => {
                        board.dispatch({ type: BoardActionType.SetBoardColumns, columns: value })
                    }}
                    value={board.state.content.details.columns}
                    stepSize={1}
                />
                <ConfirmButton dialog={
                    <span>Confirm resetting the current board. This will reset all board data. This action can <b>NOT</b> be undone.</span>
                } icon={"reset"} text={"Reset"} intent={Intent.DANGER} onClick={() => {
                    board.dispatch({ type: BoardActionType.ResetBoard })
                }} />
                <ContentImportExport content={board.state.content} />
                <pre>{JSON.stringify(BoardContentProviders, null, "\t")}</pre>
            </div>
        </Drawer>
    )
}