
interface LongTermStorageWrapper<T> {
    version: string
    data: T
}

interface Upgrades<T> {
    [s: string]: (previous: unknown) => T
}

export class LongTermStorage<T> {

    private key: string
    private init: T
    private version: string
    private upgrades: Upgrades<T>
    private storage: Storage

    constructor(key: string, init: T, version: string, upgrades: Upgrades<T> = {}, storage = localStorage) {
        this.key = key
        this.init = init
        this.version = version
        this.upgrades = upgrades
        this.storage = storage
    }

    public get(): T {
        const raw = this.storage.getItem(this.key)
        if (raw == null) {
            return this.init
        }
        const parsed: LongTermStorageWrapper<T> = JSON.parse(raw)
        if (parsed.version === this.version) {
            return parsed.data
        }
        const upgrade = this.upgrades[parsed.version]
        if (upgrade == null) {
            return this.init
        }
        return upgrade(parsed.data)
    }

    public set(data: T) {
        const final: LongTermStorageWrapper<T> = { version: this.version, data }
        this.storage.setItem(this.key, JSON.stringify(final))
    }

}