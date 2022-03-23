import { BoardContentProvider } from "board/providers/interface"
import { MemoryBoardContentProvider } from "board/providers/memory"

interface BoardContentProvidersDescription {
    name: string
    details: string
    provider: BoardContentProvider
}

export const BoardContentProviders: BoardContentProvidersDescription[] = [
    {
        name: "basic",
        details: "some basic boards to get you started",
        provider: new MemoryBoardContentProvider([]),
    }
]