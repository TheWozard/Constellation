import { TileRenderer } from "grid/tile/interface"
import { SimpleTileRenderer } from "grid/tile/common/SimpleTile"
import { TextTileRenderer } from "grid/tile/common/TextTile"
import { ClockTileRenderer } from "grid/tile/common/ClockTile"

export const TileRenderers: TileRenderer<any>[] = [
    TextTileRenderer, SimpleTileRenderer, ClockTileRenderer
]

export const TileIndex: { [t: string]: TileRenderer<any> } = TileRenderers.reduce((prev, tile) => ({ ...prev, [tile.type]: tile }), {})