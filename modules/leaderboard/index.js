function getLeaderboard(jokes) {
    const map = new Map()

    for (let i of jokes) {
        map.set(i.id, (map.get(i.id) ?? 0) + 1)
    }

    return [
        ...new Map(
            jokes.map(item => [item.id, { ...item, count: map.get(item.id) }])
        ).values()
    ].sort((a, b) => map.get(b.id) - map.get(a.id))
}

module.exports = { getLeaderboard }
