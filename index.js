#!/usr/bin/env node
const leaderboard = require('./modules/leaderboard')
const logger = require('./modules/logger')
const api = require('./modules/api')
const fs = require('./modules/file-system')
const getArgs = () => {
    let parsedArgs = process.argv.slice(2)
    let obj = {}
    let last
    for (let i of parsedArgs) {
        if (i.includes('--')) last = i.replace('--', '')
        obj[last] = i
    }

    return obj
}
let args = getArgs(process.argv)

if (args.searchTerm) {
    api.getRandomJokeFromSearch(args.searchTerm, res => {
        logger.printJoke(res)
        fs.writeJokes([res])
    })
} else if (args.leaderboard) {
    fs.readJokes().then(res => {
        res = leaderboard.getLeaderboard(res)
        logger.printLeaderboard(res)
    })
} else {
    api.fetchRandomJoke(d => {
        logger.printJoke(d)
        fs.writeJokes([d])
    })
}
