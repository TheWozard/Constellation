import { Button, Card, Intent } from "@blueprintjs/core";
import { GridActionType, GridContext } from "context/GridContext";
import { TileIndex } from "grid/tile";
import { UnknownTile } from "grid/tile/UnknownTile";
import { useContext } from "react";

export enum TileType {
    Text = "text"
}

interface Props {
    tile: TileData
    grid_id: string
    setTile: (tile: TileData) => void
}

export interface TileData{
    type: TileType
    data: any
}


export const Tile: React.FunctionComponent<Props> = ({tile, grid_id, setTile}) => {
    const { state, dispatch } = useContext(GridContext)

    return (
        <Card className={"grid-card"} >
            {state.editable && <Button className="delete-button" intent={Intent.DANGER} icon="cross" onClick={() => {
                dispatch({
                    type: GridActionType.DeleteID, id: grid_id,
                })
            }}/>}
            <TileCore tile={tile} setTile={setTile} grid_id={grid_id} />
        </Card>
    )
}

const TileCore: React.FunctionComponent<Props> = ({ tile, setTile }) => {
    if (tile == null) {
        return (<UnknownTile />)
    }
    const TILE = TileIndex[tile.type]
    if (TILE != null) {
        return (<TILE.renderTile data={tile.data} setData={(data: any) => {setTile({...tile, data})}} />)
    }
    return (<UnknownTile />)
}