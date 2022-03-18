import { Card, Classes, Drawer, Position } from "@blueprintjs/core"
import { DrawerActionType, DrawerContext } from "context/DrawerContext"
import { BoardActionType, BoardContext, BoardContextProvider } from "context/BoardContext";
import { TileRenderers } from "board/tile";
import { TileRenderer } from "board/tile/interface";
import React from "react"
import ReactGridLayout from "react-grid-layout";
import { WidthProvider } from "react-grid-layout";
import { TileCard } from "board/tile/Tile";

const ResponsiveGridLayout = WidthProvider(ReactGridLayout);
const Cols = 5

export const TilesDrawer = () => {
    const drawer = React.useContext(DrawerContext)
    const board = React.useContext(BoardContext)

    const layout = React.useMemo(() => {
        return RendersToLayout(TileRenderers)
    }, [TileRenderers])

    const tiles = React.useMemo(() => {
        return TileRenderers.map((tile, index): React.ReactNode => (
            <div key={`${index}`} id={`${index}`}>
                <TileCard style={tile.style != null ? tile.style() : {}} interactive onClick={() => {
                    board.dispatch({
                        type: BoardActionType.AddTiles,
                        tiles: [
                            {
                                layout: { i: "a", x: 0, y: 0, ...tile.layout() },
                                data: { type: tile.type, data: tile.createNew() },
                                style: tile.style != null ? tile.style() : {}
                            }
                        ]
                    })
                }}>
                    <tile.RenderStore />
                </TileCard>
            </div>
        ))
    }, [TileRenderers])

    return (
        <Drawer
            className={Classes.DARK}
            isOpen={drawer.state.tiles}
            position={Position.RIGHT}
            title={"Tiles"}
            icon={"applications"}
            onClose={() => {
                drawer.dispatch({
                    type: DrawerActionType.SetTiles,
                    value: false,
                })
            }}
        >
            <div className={"drawer-padding drawer-full overflow-scroll-hidden"}>
                <ResponsiveGridLayout
                    layout={layout}
                    cols={Cols}
                    isResizable={false}
                    isDraggable={false}
                    useCSSTransforms={false}
                >
                    {tiles}
                </ResponsiveGridLayout>
            </div>
        </Drawer>
    )
}

// RendersToLayout creates a compact layout for the provided list of TileRenderers
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
    return layouts
}