import { BoardContent } from "board/interface";
import { PureLayout } from "board/layout/interface";
import { BoardContentProvider } from "board/providers/interface";


export class MemoryBoardContentProvider implements BoardContentProvider {

    private content: BoardContent<PureLayout>[];
    // delays the promise by ms, used in testing loading display
    private delay: number;

    constructor(content: BoardContent<PureLayout>[], delay = 0) {
        this.content = content
        this.delay = delay
    }

    public async Get(): Promise<BoardContent<PureLayout>[]> {
        await new Promise(r => setTimeout(r, this.delay));
        return this.content
    }

}