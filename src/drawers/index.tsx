import { AppsDrawer } from "drawers/Apps"
import { BoardsDrawer } from "drawers/Boards"
import { ContextDrawer } from "drawers/Context"
import { FilterDrawer } from "drawers/Filter"
import { SettingsDrawer } from "drawers/Settings"
import React from "react"

export const DrawerHolder = () => {

    return (
        <React.Fragment>
            <BoardsDrawer />
            <ContextDrawer />
            <AppsDrawer />
            <FilterDrawer />
            <SettingsDrawer />
        </React.Fragment>
    )
}