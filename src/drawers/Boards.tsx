import { Button, Card, Classes, Drawer, H2, H3, Intent, MenuItem, Position, Slider, Spinner } from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";
import { BoardContent } from "board/interface";
import { PureLayout } from "board/layout/interface";
import { BoardContentProviders, BoardContentProvidersDescription } from "board/providers";
import { BoardActionType, BoardContext } from "context/BoardContext";
import { DrawerActionType, DrawerContext } from "context/DrawerContext";
import React from "react";
import { ConfirmButton } from "unit/ConfirmButton";
import { ContentDisplay } from "unit/ContentDisplay";
import { ContentImportExport } from "unit/ContentImportExport";
import { SanitizeContent } from "util/ImportExport";
import { ToastError } from "util/Toaster";

const ContentSelector = Select.ofType<BoardContentProvidersDescription>();

export const BoardsDrawer = () => {
    const drawer = React.useContext(DrawerContext)
    const board = React.useContext(BoardContext)
    const [provider, setProvider] = React.useState<BoardContentProvidersDescription | undefined>()
    const [searching, setSearching] = React.useState<boolean>(false)
    const [boards, setBoards] = React.useState<BoardContent<PureLayout>[] | undefined>()

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
                <H2>Current Board</H2>
                <ContentDisplay content={board.state.content} />
                <H3>Settings</H3>
                <Card elevation={2}>
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
                </Card>
                <H2>Import Boards</H2>
                <ContentImportExport content={board.state.content} />
                <H3>Provider</H3>
                <ContentSelector
                    items={BoardContentProviders}
                    itemRenderer={(item, props) => (
                        <MenuItem key={item.name} text={item.name} onClick={props.handleClick} />
                    )}
                    noResults={<MenuItem disabled={true} text="No results." />}
                    onItemSelect={async (item) => {
                        setProvider(item)
                        setSearching(true)
                        setBoards(undefined)
                        try {
                            const data = await item.provider.Get()
                            setBoards(data)
                        } catch (err) {
                            ToastError(`Failed to load provider ${String(err)}`)
                        }
                        setSearching(false)
                    }}
                    filterable={false}
                    matchTargetWidth
                    popoverProps={{ minimal: true }}
                    fill
                    disabled={searching}
                >
                    <Button text={provider?.name || "Select Provider"} rightIcon="double-caret-vertical" fill />
                </ContentSelector>
                {searching && <Spinner />}
                {boards && boards.map((content) => (
                    <ContentDisplay content={content} key={content.details.name} onClick={() => {
                        board.dispatch({ type: BoardActionType.SetContent, content: SanitizeContent(content) })
                    }} />
                ))}
            </div>
        </Drawer>
    )
}