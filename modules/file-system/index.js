const fsPromises = require('fs/promises')
const { existsSync } = require('fs')
const { join } = require('path')
const { cwd } = process
const filePath = join(cwd(), 'jokes.json')

const writeJokes = async results => {
    try {
        if (!results?.length) return
        if (!existsSync(filePath)) {
            await fsPromises.appendFile(filePath, JSON.stringify(results))
            return
        }
        let data = JSON.parse(await fsPromises.readFile(filePath))
        data.push(
            ...results.map(x => ({
                id: x.id,
                joke: x.joke
            }))
        )
        await fsPromises.writeFile(filePath, JSON.stringify(data))
    } catch (err) {}
}

const readJokes = async () => {
    try {
        const data = JSON.parse(await fsPromises.readFile(filePath))
        return data
    } catch {
        return []
    }
}

module.exports = { writeJokes, readJokes }
