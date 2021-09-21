import React from 'react';
import ReactGridLayout, { WidthProvider } from 'react-grid-layout';
import { GridActionType, GridContext } from '../context/GridContext';
import { GridCard } from './card/GridCard';

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
                grid.dispatch({ type: GridActionType.SetLayout, layout })
            }}>
            <div key="a"><GridCard>a</GridCard></div>
            <div key="b"><GridCard>b</GridCard></div>
            <div key="c"><GridCard>c</GridCard></div>
        </ResponsiveGridLayout>
    )
}