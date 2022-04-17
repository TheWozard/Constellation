import { Callout, FormGroup, H3, InputGroup, Slider } from "@blueprintjs/core";
import { BoardActionType, BoardContext } from "context/BoardContext";
import React from "react";

export const BoardSettings = () => {
    const board = React.useContext(BoardContext)

    return (
        <Callout>
            <H3>Settings</H3>
            <div className={"inline-spaced margin-horizontal-spacing"}>
                <FormGroup label="Board Name">
                    <InputGroup placeholder="Name"
                        value={board.state.content.details.name}
                        onChange={(event) => {
                            board.dispatch({ type: BoardActionType.SetBoardName, name: event.target.value })
                        }}
                    />
                </FormGroup>
                <FormGroup label="Board Description" style={{ flex: 1 }}>
                    <InputGroup placeholder="Description"
                        value={board.state.content.details.description}
                        onChange={(event) => {
                            board.dispatch({ type: BoardActionType.SetBoardDescription, description: event.target.value })
                        }}
                    />
                </FormGroup>
            </div>
            <div>
                <Slider
                    min={4}
                    max={20}
                    onChange={(value) => {
                        board.dispatch({ type: BoardActionType.SetBoardColumns, columns: value })
                    }}
                    value={board.state.content.details.columns}
                    stepSize={1}
                />
            </div>
        </Callout >
    )
}