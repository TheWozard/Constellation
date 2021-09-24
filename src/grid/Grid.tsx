import { GridActionType, GridContext } from 'context/GridContext';
import { Tile } from 'grid/tile/Tile';
import React from 'react';
import ReactGridLayout, { WidthProvider } from 'react-grid-layout';

const ResponsiveGridLayout = WidthProvider(ReactGridLayout);

export const Grid: React.FunctionComponent = () => {
    const grid = React.useContext(GridContext)

    return (
        <ResponsiveGridLayout
            layout={grid.state.layout}
            cols={12}
            isResizable={grid.state.resizable}
            isDraggable={grid.state.draggable}
            onLayoutChange={(layout) => {
                grid.dispatch({ type: GridActionType.SetLayout, layout: layout as any }) //FIXME: Temporary hack to enable build
            }}
            compactType={null}
        >
            {grid.state.layout.map((out) => (
                <div key={out.i}><Tile grid_id={out.i} tile={out.tile}/></div>
            ))}
        </ResponsiveGridLayout>
    )
}