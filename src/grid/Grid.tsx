import React from 'react';
import ReactGridLayout, { WidthProvider } from 'react-grid-layout';
import { GridActionType, GridContext } from 'context/GridContext';
import { GridTile } from 'grid/tile/GridTile';

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
            <div key="a"><GridTile>a</GridTile></div>
            <div key="b"><GridTile>b</GridTile></div>
            <div key="c"><GridTile>c</GridTile></div>
        </ResponsiveGridLayout>
    )
}