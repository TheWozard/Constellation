import { Button, Card, Intent } from "@blueprintjs/core";
import { GridActionType, GridContext } from "context/GridContext";
import { TextTile } from "grid/tile/TextTile";
import { UnknownTile } from "grid/tile/UnknownTile";
import { useContext } from "react";

enum TileType {
    Text = "text"
}

interface Props {
    tile: TileData
    id: string
}

export interface TileData{
    type: TileType
    data: any
}


export const Tile: React.FunctionComponent<Props> = ({tile, id}) => {
    const { state, dispatch } = useContext(GridContext)

    return (
        <Card className={"grid-card"} >
            {state.editable && <Button className="delete-button" intent={Intent.DANGER} icon="cross" onClick={() => {
                dispatch({
                    type: GridActionType.DeleteID, id,
                })
            }}/>}
            <TileCore tile={tile} />
        </Card>
    )
}

interface TileCoreProps {
    tile: TileData
}

const TileCore: React.FunctionComponent<TileCoreProps> = ({ tile }) => {
    switch (tile.type) {
        case TileType.Text:
            return (<TextTile />)
        default:
            return (<UnknownTile />)
    }
}