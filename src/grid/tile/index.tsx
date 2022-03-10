import { TileRenderer } from "grid/tile/interface"
import { SimpleTileRenderer } from "grid/tile/SimpleTile"
import { TextTileRenderer } from "grid/tile/TextTile"

export const TileRenderers: TileRenderer<any>[] = [
    TextTileRenderer, SimpleTileRenderer, SimpleTileRenderer, SimpleTileRenderer, SimpleTileRenderer, SimpleTileRenderer, SimpleTileRenderer, SimpleTileRenderer, SimpleTileRenderer, SimpleTileRenderer, SimpleTileRenderer, SimpleTileRenderer, SimpleTileRenderer, SimpleTileRenderer, SimpleTileRenderer, SimpleTileRenderer, SimpleTileRenderer, SimpleTileRenderer, SimpleTileRenderer, SimpleTileRenderer, SimpleTileRenderer, SimpleTileRenderer, SimpleTileRenderer, SimpleTileRenderer, SimpleTileRenderer, SimpleTileRenderer, SimpleTileRenderer, SimpleTileRenderer, SimpleTileRenderer, SimpleTileRenderer, SimpleTileRenderer, SimpleTileRenderer
]

export const TileIndex: { [t: string]: TileRenderer<any> } = TileRenderers.reduce((prev, tile) => ({ ...prev, [tile.type]: tile }), {})