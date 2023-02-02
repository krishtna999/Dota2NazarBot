const { ACCOUNT_IDS, ACCOUNT_ID_TO_DISCORD_TAG } = require("../constants/account");

class Player {
    // Player AccountId
    accountId;
    // Discord Tag
    discordTag;
    // recent Win Rate
    partyWinCount = 0;
    //  recent Win Rate in SoloQ
    soloWinCount = 0;
    // recent Match Count
    matchCount = 0;
    constructor(accountId) { 
        this.accountId = accountId;
        this.discordTag = ACCOUNT_ID_TO_DISCORD_TAG[accountId];
    }

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
                if (
                    (isPlayerRadiant && match['radiant_win'])
                    ||
                    (!isPlayerRadiant && !match['radiant_win'])
                ) {
                    (match['party_size'] == 1 || match['party_size'] == null) ? ++this.soloWinCount : ++this.partyWinCount;
                }
            }
        });
    }
}

function isToday(matchDate) {
    const today = new Date();   
    return matchDate.getDate() == today.getDate() &&
        matchDate.getMonth() == today.getMonth() &&
        matchDate.getFullYear() == today.getFullYear();
}

module.exports = { Player }