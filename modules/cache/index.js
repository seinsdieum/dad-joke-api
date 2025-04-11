const fs = require('fs/promises')
const { existsSync } = require('fs')
const { join } = require('path')
const { cwd } = process

const cacheFile = join(cwd(), '.cli-cache.json')

let cache = {}

async function ensureCreated() {
    if (!existsSync(cacheFile)) return fs.writeFile(cacheFile, '{}')
}
async function rewrite() {
    return fs.writeFile(cacheFile, JSON.stringify(cache))
}

async function clearCache() {
    const data = JSON.parse(await fs.readFile(cacheFile))
    cache = Object.keys(data).reduce((startValue, key) => {
        return !data[key].ttl || data[key].ttl > Date.now()
            ? { ...startValue, [key]: data[key] }
            : startValue
    }, {})
    return true
}

async function get(key) {
    if (await ensureCreated()) return undefined
    await clearCache()
    if (cache[key]) await rewrite()
    return cache[key]
}

async function add(key, value, ttl) {
    if (!key || !value) return
    cache[key] = { ...value, ttl: Date.now() + (ttl ?? 300) * 1000 }
    await rewrite()
    return true
}

module.exports = { get, add }
