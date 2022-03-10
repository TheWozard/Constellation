import { Button, Card, Intent } from "@blueprintjs/core";
import { GridActionType, GridContext } from "context/GridContext";
import { TileIndex } from "grid/tile";
import { StyleFromTileCustomization, TileData } from "grid/tile/interface";
import { UnknownTile } from "grid/tile/UnknownTile";
import { useContext } from "react";

interface Props {
    pinned: boolean,
    tile: TileData
    grid_id: string
    setTile: (tile: TileData) => void
}


export const Tile: React.FunctionComponent<Props> = ({ pinned, tile, grid_id, setTile }) => {
    const { state, dispatch } = useContext(GridContext)

    return (
        <Card className={"grid-card tile-hover"} style={{ ...tile.customization != null ? StyleFromTileCustomization(tile.customization) : {} }}>
            {state.editable && <div className={"tile-hover-menu margin-vertical-spacing"}>
                <Button intent={Intent.DANGER} icon="cross" onClick={() => {
                    dispatch({
                        type: GridActionType.DeleteID, id: grid_id,
                    })
                }} />
                <Button intent={Intent.NONE} icon="draw" onClick={() => {
                    dispatch({
                        type: GridActionType.DeleteID, id: grid_id,
                    })
                }} />
                <Button intent={pinned ? Intent.PRIMARY : Intent.NONE} icon="pin" onClick={() => {
                    dispatch({
                        type: GridActionType.PinID, id: grid_id,
                    })
                }} />
            </div>}
            <TileCore pinned={pinned} tile={tile} setTile={setTile} grid_id={grid_id} />
        </Card>
    )
}

const TileCore: React.FunctionComponent<Props> = ({ tile, setTile }) => {
    if (tile == null) {
        return (<UnknownTile />)
    }
    const TILE = TileIndex[tile.type]
    if (TILE != null) {
        return (<TILE.RenderTile data={tile.data} setData={(data: any) => { setTile({ ...tile, data }) }} />)
    }
    return (<UnknownTile />)
}