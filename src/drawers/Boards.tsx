import { Classes, Drawer, H3, Position } from "@blueprintjs/core";
import { BoardContext } from "context/BoardContext";
import { DrawerActionType, DrawerContext } from "context/DrawerContext";
import { BoardClear } from "drawers/components/BoardClear";
import { BoardProvider } from "drawers/components/BoardProvider";
import { BoardSettings } from "drawers/components/BoardSettings";
import React from "react";
import { BoardCard } from "unit/ContentDisplay";
import { ContentImportExport } from "unit/ContentImportExport";


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
            size={"800px"}
        >
            <div className={"drawer-padding drawer-full overflow-scroll-hidden margin-vertical-spacing flex-spacer"}>
                <BoardCard content={board.state.content} />
                <BoardSettings />
                <ContentImportExport content={board.state.content} />
                <H3>Provider</H3>
                <BoardProvider />
                <div className="spacer" />
                <BoardClear />
            </div>
        </Drawer>
    )
}