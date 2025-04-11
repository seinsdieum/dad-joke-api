#!/usr/bin/env node
const leaderboard = require('./modules/leaderboard')
const logger = require('./modules/logger')
const api = require('./modules/api')
const fs = require('./modules/file-system')
const cache = require('./modules/cache')

const getArgs = () => {
    let args = process.argv.slice(2)
    let parsed = {}
    for (let i of args) {
        if (i.includes('--')) {
            let sliced = i.slice(2)
            if (!sliced) {
                logger.error('argument not defined')
                continue
            }
            const [key, ...rest] = sliced.split('=')
            parsed[key] = rest.length > 0 ? rest.join('=') : true
        }
    }
    return parsed
}
let args = getArgs(process.argv)

if (args.searchTerm) {
    cache.get(args.searchTerm).then(res => {
        if (!res) {
            api.getRandomJokeFromSearch(args.searchTerm, res => {
                logger.joke(res)
                fs.writeJokes([res])
                cache.add(args.searchTerm, res)
            })
        } else {
            logger.joke(res)
            fs.writeJokes([res])
        }
    })
} else if (args.leaderboard) {
    fs.readJokes().then(res => {
        res = leaderboard.getLeaderboard(res)
        logger.leaderboard(res)
    })
} else {
    api.fetchRandomJoke(d => {
        logger.joke(d)
        fs.writeJokes([d])
    })
}
