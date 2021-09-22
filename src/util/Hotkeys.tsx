import { HotkeysTarget2 } from "@blueprintjs/core"
import { GridActionType, GridContext } from "context/GridContext"
import React from "react"

export const Hotkeys: React.FunctionComponent<React.PropsWithChildren<{}>> = ({ children }) => {
    const grid = React.useContext(GridContext)

    return (
        <HotkeysTarget2 hotkeys={[
            {
                combo: "e",
                global: true,
                label: "Toggle Edit mode - Allows for resizing and moving of tiles",
                onKeyDown: () => {
                    grid.dispatch({
                        type: GridActionType.SetEditable,
                        editable: !grid.state.editable,
                    })
                },
            }
        ]} children={({ handleKeyDown, handleKeyUp }) => (
            <div tabIndex={0} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}>
                {children}
            </div>
        )} />
    )
}