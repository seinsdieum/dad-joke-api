const https = require('https')
const logger = require('../logger')

const config = {
    hostname: 'icanhazdadjoke.com',
    port: 443,
    headers: { accept: 'application/json' }
}

const fetchRandomJoke = onData => {
    https
        .get({ ...config, path: '/' }, res => {
            let body = ''
            res.on('data', d => {
                body += d
            })
            res.on('end', () => {
                onData?.(JSON.parse(body.toString()))
            })
            res.on('error', err => {
                logger.error(err?.message || 'fetch error')
            })
        })
        .on('error', err => {
            logger.error(err.name)
        })
}

const fetchJokesBySearch = (term, page, onData) => {
    https
        .get(
            { ...config, path: `/search?term=${term ?? ''}&page=${page ?? 1}` },
            res => {
                let body = ''
                res.on('data', d => {
                    body += d
                })
                res.on('end', () => {
                    onData?.(
                        JSON.parse(body).results.map(x => ({
                            id: x.id,
                            joke: x.joke
                        }))
                    )
                })
                res.on('error', err => {
                    logger.error(err?.message || 'fetch error')
                })
            }
        )
        .on('error', err => {
            logger.error(err.message)
        })
}
const getRandomJokeFromSearch = (term, onResult, page = 1, jokes = []) => {
    fetchJokesBySearch(term, page, d => {
        jokes.push(...d)
        if (jokes.next_page > jokes.current_page)
            getRandomJokeFromSearch(term, onResult, jokes.next_page, jokes)
        else {
            let randJoke = jokes[Math.floor(Math.random() * (jokes.length - 1))]
            onResult(randJoke)
        }
    })
}

module.exports = { getRandomJokeFromSearch, fetchRandomJoke }
