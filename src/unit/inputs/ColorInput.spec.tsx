import { IsValidColor } from "unit/inputs/ColorInput";

describe('IsValidColor', () => {
    const tests = [
        {
            input: "", output: false,
        },
        {
            input: "blue", output: false,
        },
        {
            input: "#", output: false,
        },
        {
            input: "#fff", output: false,
        },
        {
            input: "#ffffff", output: true,
        },
        {
            input: "#FFFFFF", output: true,
        },
        {
            input: "#GGGGGG", output: false,
        }
    ]
    for (const test of tests) {
        it(test.input, () => {
            expect(IsValidColor(test.input)).toEqual(test.output)
        })
    }
})
