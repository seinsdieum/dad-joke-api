const colors = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m'
}

function error(message) {
    console.log(
        colors.red,
        'error:',
        message || 'message not defined',
        colors.reset
    )
}

function joke(joke) {
    if (!joke) {
        console.log(colors.red, 'no jokes were found for you...', colors.reset)
        return
    }
    console.log(colors.blue, joke.joke, colors.reset)
}

function leaderboard(jokes) {
    if (!jokes?.length) {
        console.log(colors.red, 'no jokes for leaderboard...', colors.reset)
        return
    }
    console.table(jokes)
}

module.exports = { joke, leaderboard, error }
