import { Card, Classes, Drawer, Position } from "@blueprintjs/core"
import { DrawerActionType, DrawerContext } from "context/DrawerContext"
import { GridActionType, GridContext } from "context/GridContext";
import { TileType } from "grid/tile/Tile";
import React from "react"
import ReactGridLayout from "react-grid-layout";
import { WidthProvider } from "react-grid-layout";

const ResponsiveGridLayout = WidthProvider(ReactGridLayout);

export const AppsDrawer = () => {
    const { state, dispatch } = React.useContext(DrawerContext)
    const grid = React.useContext(GridContext)

    return (
        <Drawer
            className={Classes.DARK}
            isOpen={state.apps}
            position={Position.RIGHT}
            title={"Apps"}
            icon={"applications"}
            onClose={() => {
                dispatch({
                    type: DrawerActionType.SetApps,
                    value: false,
                })
            }}
        >
            <div className={"drawer-padding drawer-full"}>
                <ResponsiveGridLayout
                    layout={[
                        { i: "a", h: 1, w: 1, x: 0, y: 0 }
                    ]}
                    cols={5}
                    compactType={"vertical"}
                    isResizable={false}
                    isDraggable={false}
                >
                    <div key="a"><Card style={{height: "100%"}} interactive onClick={() => {
                        grid.dispatch({
                            type: GridActionType.AppendToLayout,
                            layout: [
                                { i: "a", h: 1, w: 1, x: 0, y: 0, tile: {type: TileType.Text, data: {} } }
                            ]
                        })
                    }}>{"Test"}</Card></div>
                </ResponsiveGridLayout>
            </div>
        </Drawer>
    )
}