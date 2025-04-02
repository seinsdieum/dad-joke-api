# dad-joke-api

A node.js CLI tool that lets you fetch random jokes from [icanhazdadjoke](https://icanhazdadjoke.com)

## Usage

```bash

npx jokes

```

## Arguments

1. no arguments - fetch a random joke and write it to jokes.json
1. `--searchTerm <term>` - fetch a random joke from search results and write it to jokes.json
1. `--leaderboard` - print a jokes leaderboard based on how many times they appear in jokes.json
