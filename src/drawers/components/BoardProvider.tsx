import { Button, MenuItem, Spinner } from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";
import { BoardContent } from "board/interface";
import { PureLayout } from "board/layout/interface";
import { BoardContentProviders, BoardContentProvidersDescription } from "board/providers";
import { BoardActionType, BoardContext } from "context/BoardContext";
import React from "react";
import { BoardCard } from "unit/ContentDisplay";
import { SanitizeContent } from "util/ImportExport";
import { ToastError } from "util/Toaster";

const ContentSelector = Select.ofType<BoardContentProvidersDescription>();

interface Props {
    disabled?: boolean
}

export const BoardProvider = ({ }: Props) => {
    const board = React.useContext(BoardContext)
    const [provider, setProvider] = React.useState<BoardContentProvidersDescription | undefined>()
    const [searching, setSearching] = React.useState<boolean>(false)
    const [boards, setBoards] = React.useState<BoardContent<PureLayout>[] | undefined>()

    return (
        <React.Fragment>
            <ContentSelector
                items={BoardContentProviders}
                itemRenderer={(item, props) => (
                    <MenuItem selected={props.modifiers.active} key={item.name} text={item.name} label={item.details} onClick={props.handleClick} />
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
                popoverProps={{ className: "fixed-width" }}
                matchTargetWidth={true}
                disabled={searching}
                fill
            >
                <Button className={"inline-spaced"} text={provider?.name || "Select Provider"} rightIcon="double-caret-vertical" fill />
            </ContentSelector>
            {searching && <Spinner />}
            {
                boards && boards.map((content) => (
                    <BoardCard content={content} key={content.details.name} onClick={() => {
                        board.dispatch({ type: BoardActionType.SetContent, content: SanitizeContent(content) })
                    }} />
                ))
            }
        </React.Fragment >
    )
}