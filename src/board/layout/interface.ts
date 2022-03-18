import { TileContent } from "board/tile/interface"
import ReactGridLayout from "react-grid-layout"

type PureOmission = "i" | "x" | "y"

// A version of ReactGridLayout.Layout that doesn't include information on where it shows up in the grid
export type PureLayout = Omit<ReactGridLayout.Layout, PureOmission>

let ID = 0

// ReIndexContent over writes IDs into unite IDs
export const ReIndexContent = (content: TileContent<PureLayout>): TileContent => ({
    ...content, layout: ReIndexLayout(content.layout)
})

export const ReIndexLayout = (layout: PureLayout): ReactGridLayout.Layout => ({
    x: 0, y: 0, ...layout, i: GetUniqueID()
})

const GetUniqueID = (): string => {
    const id = `${ID}`
    ID++
    return id
}