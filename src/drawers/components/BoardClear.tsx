import { Callout, H4, Intent } from "@blueprintjs/core";
import { BoardActionType, BoardContext } from "context/BoardContext";
import React from "react";
import { ConfirmButton } from "unit/ConfirmButton";

export const BoardClear = () => {
    const board = React.useContext(BoardContext)

    return (
        <React.Fragment>
            <Callout intent={"danger"} icon={null} className="inline-spaced">
                <H4>Clear the current board</H4>
                <ConfirmButton dialog={
                    <span>Confirm clearing the current board. This will reset all board data. This action can <b>NOT</b> be undone.</span>
                } icon={"cross"} text={"Clear"} intent={Intent.DANGER} onClick={() => {
                    board.dispatch({ type: BoardActionType.ResetBoard })
                }} />
            </Callout>
        </React.Fragment>
    )
}