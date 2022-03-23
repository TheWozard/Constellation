import { BoardContent } from "board/interface";
import { PureLayout } from "board/layout/interface";

export interface BoardContentProvider {
    Get(): Promise<BoardContent<PureLayout>[]>
}