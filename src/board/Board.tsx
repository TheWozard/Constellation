import { BoardActionType, BoardContext } from 'context/BoardContext';
import { Tile } from 'board/tile/Tile';
import { Welcome } from 'board/Welcome';
import React from 'react';
import ReactGridLayout, { WidthProvider } from 'react-grid-layout';

const ResponsiveGridLayout = WidthProvider(ReactGridLayout);

// Board renders the actual grid and the tiles in it
export const Board: React.FunctionComponent = () => {
    const board = React.useContext(BoardContext)

    const layout = React.useMemo(() => {
        return board.state.content.tiles.map<ReactGridLayout.Layout>((lay) => lay.layout)
    }, [board.state.content.tiles])

    const tiles = React.useMemo(() => {
        return board.state.content.tiles.map((tile) => (
            <div key={tile.layout.i}>
                <Tile {...tile} />
            </div>
        ))
    }, [board.state.content.tiles])

    // Welcome message helps direct people when they first open the app
    if (board.state.content.tiles.length === 0) {
        return (<Welcome />)
    }

    return (
        <ResponsiveGridLayout
            layout={layout}
            cols={board.state.content.details.columns}
            isResizable={board.state.resizable}
            isDraggable={board.state.draggable}
            onLayoutChange={(layouts) => {
                board.dispatch({ type: BoardActionType.UpdateLayouts, layouts: (layouts as any) })
            }}
            compactType={null}
            useCSSTransforms={false} // Slower paint, but no sliding in.
        >
            {tiles}
        </ResponsiveGridLayout>
    )
}