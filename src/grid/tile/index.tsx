import { TileRenderer } from "grid/tile/interface"
import { TextTileRenderer } from "grid/tile/TextTile"

export const TileRenderers: TileRenderer<any>[] = [
    TextTileRenderer,
]

export const TileIndex: {[t: string]: TileRenderer<any>} = TileRenderers.reduce((prev, tile) => ({...prev, [tile.type]: tile}), {})