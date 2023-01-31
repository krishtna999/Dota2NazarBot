class Player {
    // Player Name
    name;
    // recent Win Rate
    partyWinCount = 0;
    //  recent Win Rate in SoloQ
    soloWinCount = 0;
    // recent Match Count
    matchCount = 0;
    constructor(name) { this.name = name }

    /**
     * @param {Array} recentMatches 
     */
    populateMatchStatsFromRecentMatches(recentMatches) {
        recentMatches.forEach(match => {
            // x1000 because start_time is an UNIX timestamp
            var matchDate = new Date(match['start_time'] * 1000);
            if (isToday(matchDate)) {
                ++this.matchCount;
                var isPlayerRadiant = (match['player_slot'] >= 0 && match['player_slot'] <= 127);
                console.log(isPlayerRadiant);
                console.log(match['radiant_win']);
                if (
                    (isPlayerRadiant && match['radiant_win'])
                    ||
                    (!isPlayerRadiant && !match['radiant_win'])
                ) {
                    match['party_size'] == 1 ? ++this.soloWinCount : ++this.partyWinCount;

                }
            }
        });

        console.log("MC" + this.matchCount);
        console.log("PWC" + this.partyWinCount);
        console.log("SWC" + this.soloWinCount);
    }
}

function isToday(someDate) {
    const today = new Date();
    return someDate.getDate() == today.getDate() &&
        someDate.getMonth() == today.getMonth() &&
        someDate.getFullYear() == today.getFullYear();
}

module.exports = { Player }