import { Card, Classes, Drawer, Position } from "@blueprintjs/core"
import { DrawerActionType, DrawerContext } from "context/DrawerContext"
import { GridActionType, GridContext, GridContextProvider } from "context/GridContext";
import { TileRenderers } from "grid/tile";
import { TileRenderer } from "grid/tile/interface";
import React from "react"
import ReactGridLayout from "react-grid-layout";
import { WidthProvider } from "react-grid-layout";
import { StyleFromTileCustomization } from "grid/tile/interface";

const ResponsiveGridLayout = WidthProvider(ReactGridLayout);
const Cols = 5

const RendersToLayout = (tiles: TileRenderer<any>[]): ReactGridLayout.Layout[] => {
    const layouts: ReactGridLayout.Layout[] = []
    let fullLayers = 0
    let grid: Array<Array<boolean>> = []
    tiles.forEach((tile, index) => {
        let layout: ReactGridLayout.Layout = {
            i: `${index}`, x: 0, y: fullLayers, h: 1, w: 1, ...tile.layoutStore != null ? tile.layoutStore() : {}
        }
        if (layout.w > Cols) {
            layout.w = Cols
        }
        // We will at most try x times to place a square
        let found = false
        for (let index = 0; index < 5 && !found; index++) {
            for (let row = 0; row < layout.h; row++) {
                let evalRow = layout.y + row
                if (evalRow >= grid.length) {
                    found = true
                    break
                } else {
                    let layer = grid[evalRow]
                    // row is full
                    if (layer.length === Cols && !layer.includes(false)) {
                        if (evalRow === fullLayers) {
                            fullLayers = evalRow + 1
                        }
                        layout.y += 1
                        layout.x = 0
                        break
                    }
                    let gap = 0
                    let offset = 0
                    let gapFound = false
                    for (let col = layout.x; col < layer.length; col++) {
                        if (layer[col]) {
                            offset += gap + 1
                            gap = 0
                        } else {
                            gap += 1
                        }
                        if (gap === layout.w) {
                            gapFound = true
                            break
                        }
                    }
                    if (!gapFound) {
                        layout.y += 1
                        layout.x = 0
                        break
                    }
                    layout.x += offset
                    if (row + 1 === layout.h) {
                        found = true
                    }
                }
            }
        }
        while (layout.y + layout.h > grid.length) {
            grid.push(Array.apply(null, Array(Cols)).map(() => (false)))
        }
        for (let h = 0; h < layout.h; h++) {
            for (let w = 0; w < layout.w; w++) {
                grid[(layout.y + h)][(layout.x + w)] = true
            }
        }
        layouts.push(layout)
    })
    console.log(layouts)
    return layouts
}

const Layout = RendersToLayout(TileRenderers)

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
            <GridContextProvider>
                <div className={"drawer-padding drawer-full overflow-scroll-hidden"}>
                    <ResponsiveGridLayout
                        layout={Layout}
                        cols={Cols}
                        isResizable={false}
                        isDraggable={false}
                    >
                        {TileRenderers.map((tile, index): React.ReactNode => (
                            <div key={`${index}`} id={`${index}`}><Card style={{ height: "100%", ...tile.customization != null ? StyleFromTileCustomization(tile.customization()) : {} }} interactive onClick={() => {
                                grid.dispatch({
                                    type: GridActionType.AppendToLayout,
                                    layout: [
                                        { i: "a", x: 0, y: 0, tile: { type: tile.type, data: tile.createNew(), customization: tile.customization != null ? tile.customization() : undefined }, ...tile.layout() }
                                    ]
                                })
                            }}><tile.RenderStore /></Card></div>
                        ))}
                    </ResponsiveGridLayout>
                </div>
            </GridContextProvider>
        </Drawer>
    )
}