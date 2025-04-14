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

async function run() {
  if (args.searchTerm) {
    let res
    if (!(res = await cache.get(args.searchTerm))) {
      api.getRandomJokeFromSearch(args.searchTerm, res => {
        logger.joke(res)
        fs.writeJokes([res])
        cache.add(args.searchTerm, res)
      })
    } else {
      logger.joke(res)
      fs.writeJokes([res])
    }
  } else if (args.leaderboard) {
    const res = await fs.readJokes()
    logger.leaderboard(leaderboard.getLeaderboard(res))
  } else {
    api.fetchRandomJoke(d => {
      logger.joke(d)
      fs.writeJokes([d])
    })
  }
}
run()
