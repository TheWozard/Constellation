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
            { "details": { "name": "Starter", "description": "A board to help you getting started using Constellation", "columns": 9 }, "tiles": [{ "layout": { "x": 5, "y": 1, "w": 2, "h": 2, "static": false }, "style": {}, "data": { "type": "text", "data": { "text": "There are many things a board can do" } } }], "context": { "selected": [] } },
            { "details": { "name": "Default", "description": "Default starting board", "columns": 12 }, "tiles": [{ "layout": { "x": 8, "y": 0, "w": 2, "h": 1, "static": false }, "style": {}, "data": { "type": "text", "data": { "text": "some text" } } }, { "layout": { "x": 10, "y": 0, "w": 2, "h": 1, "static": false, "isResizable": false }, "style": { "textColor": "#9999FF55" }, "data": { "type": "clock", "data": { "timezone": "local", "hours": "12", "padHour": true } } }], "context": { "selected": [] } }
        ]),
    }
]