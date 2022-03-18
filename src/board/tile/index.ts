import { TileRenderer } from "board/tile/interface"
import { SimpleTileRenderer } from "board/tile/common/SimpleTile"
import { TextTileRenderer } from "board/tile/common/TextTile"
import { ClockTileRenderer } from "board/tile/common/ClockTile"

export const TileRenderers: TileRenderer<any>[] = [
    TextTileRenderer, SimpleTileRenderer, ClockTileRenderer
]

export const TileIndex: { [t: string]: TileRenderer<any> } = TileRenderers.reduce((prev, tile) => ({ ...prev, [tile.type]: tile }), {})