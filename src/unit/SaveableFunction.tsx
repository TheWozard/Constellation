// SaveableFunction is any function that can have the call be saved to be called at some later time.
export type SaveableFunction = (...args: any) => any

// SavedFunction is a function call that can be safely written to json and retrieved later.
export type SavedFunction<Func extends SaveableFunction> = {
    func: string
    params: Parameters<Func>
}

// SavedFunctionLookup is a map of function names to their actual functions.
// This should not be populated manually and instead populated through SaveCalls function.
export type SavedFunctionLookup = {
    [s: string]: SaveableFunction
}

// RestoreFunction restores a SavedFunction to a function that can be called without params
export function RestoreFunction<Func extends SaveableFunction>(reference: SavedFunction<Func>, lookup: SavedFunctionLookup): () => ReturnType<Func> {
    const func = lookup[reference.func]
    if (func == null) {
        throw new Error(`failed to convert reference to call for function ${reference.func}`)
    }
    return () => (func as Func)(reference.params)
}

// Wraps a function so it returns a saved version of the call that can be restored later with RestoreFunction and the passed lookup 
export function SaveCalls<Func extends SaveableFunction>(name: string, func: Func, lookup: SavedFunctionLookup): (...params: Parameters<Func>) => SavedFunction<Func> {
    lookup[name] = func
    return (...params: Parameters<Func>) => ({
        func: name, params
    })
}
