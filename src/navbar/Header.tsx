import { Alignment, Button, Icon, Intent, Navbar, NavbarHeading } from "@blueprintjs/core"
import { GridActionType, GridContext } from "context/GridContext"
import React from "react"

export const Header = () => {
    const { state, dispatch } = React.useContext(GridContext)

    const toggleEdit = () => {
        dispatch({
            type: GridActionType.SetEditable,
            editable: !state.editable,
        })
    }

    return (
        <Navbar>
            <Navbar.Group className={"margin-horizontal-spacing"} align={Alignment.LEFT}>
                <Icon icon="clean" />
                <NavbarHeading>Constellation</NavbarHeading>
            </Navbar.Group>
            <Navbar.Group className={"margin-horizontal-spacing"} align={Alignment.RIGHT}>
                <Button icon="git-repo" text={"Boards"} minimal />
                <Button icon="code" text={"Context"} minimal />
                <Button icon="applications" text={"Apps"} minimal />
                <Button icon="edit" text={"Edit"} minimal active={state.editable} intent={state.editable ? Intent.PRIMARY : Intent.NONE} onClick={toggleEdit} />
                <Button icon="cog" text={"Settings"} minimal />
            </Navbar.Group>
        </Navbar>
    )
}