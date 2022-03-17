import { GridActionType, GridContext } from 'context/GridContext';
import { Tile } from 'grid/tile/Tile';
import { Welcome } from 'grid/Welcome';
import React from 'react';
import ReactGridLayout, { WidthProvider } from 'react-grid-layout';

const ResponsiveGridLayout = WidthProvider(ReactGridLayout);

export const Grid: React.FunctionComponent = () => {
    const grid = React.useContext(GridContext)
    if (grid.state.content.layout.length === 0) {
        return (<Welcome />)
    }
    return (
        <ResponsiveGridLayout
            layout={grid.state.content.layout}
            cols={grid.state.content.columns}
            isResizable={grid.state.resizable}
            isDraggable={grid.state.draggable}
            onLayoutChange={(layout) => {
                grid.dispatch({ type: GridActionType.MergeLayout, layout: (layout as any) })
            }}
            compactType={null}
            useCSSTransforms={false} // Slower paint, but no sliding in.
        >
            {grid.state.content.layout.map((out) => (
                <div key={out.i}><Tile pinned={out.static || false} grid_id={out.i} tile={out.tile} setTile={(tile) => {
                    grid.dispatch({ type: GridActionType.SetLayoutItem, value: { ...out, tile } })
                }} /></div>
            ))}
        </ResponsiveGridLayout>
    )
}