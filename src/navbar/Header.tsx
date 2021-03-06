import { Alignment, Icon, Intent, Navbar, NavbarHeading } from "@blueprintjs/core"
import { DrawerActionType, DrawerContext } from "context/DrawerContext"
import { BoardActionType, BoardContext } from "context/BoardContext"
import { SettingsContext, SettingsString } from "context/SettingsContext"
import React from "react"
import { SettingsButton } from "unit/SettingsButton"

export const Header = () => {
    const { state, dispatch } = React.useContext(BoardContext)
    const drawers = React.useContext(DrawerContext)
    const settings = React.useContext(SettingsContext)

    return (
        <Navbar>
            <Navbar.Group className={"margin-horizontal-spacing"} align={Alignment.LEFT}>
                <Icon icon="clean" />
                <NavbarHeading>{SettingsString(settings.TextRendering, "Constellation")}</NavbarHeading>
            </Navbar.Group>
            <Navbar.Group className={"margin-horizontal-spacing"} align={Alignment.RIGHT}>
                <SettingsButton icon="git-repo" text={"Boards"} minimal active={drawers.state.boards} intent={drawers.state.boards ? Intent.PRIMARY : Intent.NONE} onClick={() => {
                    drawers.dispatch({
                        type: DrawerActionType.SetBoards,
                        value: !drawers.state.boards,
                    })
                }} />
                <SettingsButton icon="code" text={"Context"} minimal active={drawers.state.context} intent={drawers.state.context ? Intent.PRIMARY : Intent.NONE} onClick={() => {
                    drawers.dispatch({
                        type: DrawerActionType.SetContext,
                        value: !drawers.state.context,
                    })
                }} />
                <SettingsButton icon="applications" text={"Tiles"} minimal active={drawers.state.tiles} intent={drawers.state.tiles ? Intent.PRIMARY : Intent.NONE} onClick={() => {
                    drawers.dispatch({
                        type: DrawerActionType.SetTiles,
                        value: !drawers.state.tiles,
                    })
                }} />
                {/* <SettingsButton icon="settings" text={"Filter"} minimal active={drawers.state.filter} intent={drawers.state.filter ? Intent.PRIMARY : Intent.NONE} onClick={() => {
                    drawers.dispatch({
                        type: DrawerActionType.SetFilter,
                        value: !drawers.state.filter,
                    })
                }} /> */}
                <SettingsButton icon="edit" text={"Edit"} minimal active={state.editable} intent={state.editable ? Intent.PRIMARY : Intent.NONE} onClick={() => {
                    dispatch({
                        type: BoardActionType.SetEditable,
                        editable: !state.editable,
                    })
                }} />
                <SettingsButton icon="cog" text={"Settings"} minimal active={drawers.state.settings} intent={drawers.state.settings ? Intent.PRIMARY : Intent.NONE} onClick={() => {
                    drawers.dispatch({
                        type: DrawerActionType.SetSettings,
                        value: !drawers.state.settings,
                    })
                }} />
            </Navbar.Group>
        </Navbar>
    )
}