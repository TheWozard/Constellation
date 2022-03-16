import { Button, Card, Intent } from "@blueprintjs/core";
import { GridActionType, GridContext } from "context/GridContext";
import { TileIndex } from "grid/tile";
import { StyleFromTileCustomization, TileCustomization, TileData } from "grid/tile/interface";
import { UnknownTile } from "grid/tile/UnknownTile";
import { CreateInputRequest } from "portals/InputRequest";
import { useContext } from "react";
import { ColorInput } from "unit/inputs.tsx/ColorInput";

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
                <Button intent={Intent.NONE} icon="draw" onClick={async () => {
                    try {
                        const custom = await CreateInputRequest<TileCustomization>({ ...tile.customization }, {
                            backgroundColor: ColorInput("Background Color", "#000000")
                        }, { icon: "draw" })
                        dispatch({ type: GridActionType.SetCustomizationByID, id: grid_id, customization: { ...tile.customization, ...custom } })
                    } catch (err) {
                        console.log(err)
                    }
                }} />
                <Button intent={pinned ? Intent.PRIMARY : Intent.NONE} icon="pin" onClick={() => {
                    dispatch({
                        type: GridActionType.PinTileByID, id: grid_id,
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