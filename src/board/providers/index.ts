import { BoardContent } from "board/interface"
import { BasicLayout } from "board/layout/interface"
import { MemoryBoardContentProvider } from "board/providers/memory"

export interface BoardContentProvidersDescription {
    name: string
    details: string
    provider: BoardContentProvider
}

export interface BoardContentProvider {
    Get(): Promise<BoardContent<BasicLayout>[]>
}

export const BoardContentProviders: BoardContentProvidersDescription[] = [
    {
        name: "Basic",
        details: "Some basic boards to get you started",
        provider: new MemoryBoardContentProvider([
            { "details": { "name": "Starter", "description": "A board to help you getting started using Constellation", "last_updated": new Date("2022-03-23T01:00:00.506Z"), "columns": 9 }, "tiles": [{ "layout": { "x": 5, "y": 1, "w": 2, "h": 2, "static": false }, "style": {}, "data": { "type": "text", "data": { "text": "There are many things a board can do" } } }], "context": {} },
        ]),
    }
]