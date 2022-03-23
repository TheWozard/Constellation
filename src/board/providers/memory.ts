import { BoardContent } from "board/interface";
import { BasicLayout } from "board/layout/interface";
import { BoardContentProvider } from "board/providers";

export class MemoryBoardContentProvider implements BoardContentProvider {

    private content: BoardContent<BasicLayout>[];

    constructor(content: BoardContent<BasicLayout>[]) {
        this.content = content
    }

    public async Get(): Promise<BoardContent<BasicLayout>[]> {
        return this.content
    }

}