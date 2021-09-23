import { Alignment, Button, Icon, Intent, Navbar, NavbarHeading } from "@blueprintjs/core"
import { DrawerContext } from "context/DrawerContext"
import { GridActionType, GridContext } from "context/GridContext"
import React from "react"

export const Header = () => {
    const { state, dispatch } = React.useContext(GridContext)
    const drawers = React.useContext(DrawerContext)

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
                <Button icon="git-repo" text={"Boards"} minimal active={drawers.state.boards} intent={drawers.state.boards ? Intent.PRIMARY : Intent.NONE}/>
                <Button icon="code" text={"Context"} minimal active={drawers.state.context} intent={drawers.state.context ? Intent.PRIMARY : Intent.NONE} />
                <Button icon="applications" text={"Apps"} minimal active={drawers.state.apps} intent={drawers.state.apps ? Intent.PRIMARY : Intent.NONE}/>
                <Button icon="settings" text={"Filter"} minimal active={drawers.state.filter} intent={drawers.state.filter ? Intent.PRIMARY : Intent.NONE}/>
                <Button icon="edit" text={"Edit"} minimal active={state.editable} intent={state.editable ? Intent.PRIMARY : Intent.NONE} onClick={toggleEdit} />
                <Button icon="cog" text={"Settings"} minimal  active={drawers.state.settings} intent={drawers.state.settings ? Intent.PRIMARY : Intent.NONE}/>
            </Navbar.Group>
        </Navbar>
    )
}