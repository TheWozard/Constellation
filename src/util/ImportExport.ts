import { BoardContent } from "board/interface"
import { BasicLayout, PureLayout } from "board/layout/interface"
import { DefaultBoardContextStorage } from "context/BoardContext"
import ReactGridLayout from "react-grid-layout"

export const SanitizeContent = (content: Partial<BoardContent<Partial<ReactGridLayout.Layout>>>): BoardContent<BasicLayout> => {
    if (typeof content !== "object") {
        throw new Error("expected board content to be object")
    }
    return {
        details: {
            name: content.details?.name || DefaultBoardContextStorage.content.details.name,
            description: content.details?.description || DefaultBoardContextStorage.content.details.description,
            last_updated: typeof content.details?.last_updated === "string" ? new Date(content.details.last_updated) : (content.details?.last_updated || new Date()),
            columns: content.details?.columns || DefaultBoardContextStorage.content.details.columns
        },
        tiles: (content.tiles || []).map((tile) => {
            const copy: any = { ...tile, layout: { ...tile.layout } }
            delete copy.layout.i
            delete copy.layout.isBounded
            delete copy.layout.moved
            return {
                layout: {
                    x: tile.layout.x || 0,
                    y: tile.layout.y || 0,
                    w: tile.layout.w || 1,
                    h: tile.layout.h || 1,

                    minW: tile.layout.minW,
                    minH: tile.layout.minH,
                    maxW: tile.layout.maxW,
                    maxH: tile.layout.maxH,

                    static: tile.layout.static,
                    isDraggable: tile.layout.isDraggable,
                    isResizable: tile.layout.isResizable,
                },
                style: {
                    backgroundColor: tile.style.backgroundColor,
                    textColor: tile.style.textColor
                },
                data: {
                    type: tile.data.type,
                    data: tile.data.data
                }
            }
        }),
        context: {}
    }
}