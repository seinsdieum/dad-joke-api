const colors = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m'
}

function printJoke(joke, printMetadata = true) {
    if (!joke) {
        console.log(colors.red, 'no jokes were found for you...', colors.reset)
        return
    }

    if (printMetadata) console.log(colors.blue, 'id\t\t\tjoke', colors.reset)
    console.log(
        colors.yellow,
        `${joke.id}${joke.count ? `${colors.blue}[${joke.count}]` : ''}`,
        '\t',
        colors.green,
        joke.joke,
        colors.reset
    )
}

function printLeaderboard(jokes) {
    if (!jokes?.length) {
        console.log(colors.red, 'no jokes for leaderboard...', colors.reset)
        return
    }

    console.log(colors.blue, 'id[<count>]\t\t\tjoke', colors.reset)
    for (let i of jokes) {
        printJoke(i, false)
    }
}

module.exports = { printJoke, printLeaderboard }
