const { Client } = require("discord.js");
const { Player } = require("../model/player");
const fetchStats = require("../opendota/fetchStats");
const { fetchPlayerData } = require("../opendota/fetchPlayerData");
const { generateMessageForPlayer } = require("../messages/playerMessage");

const ACCOUNT_ID_LIST_TO_NAME = {
    "490430759": "",
    // "484419811":"",
    // "86241635":"",
    // "364642945":"",
    // "872835829":"",
    // "443835658:"",
}

module.exports = {
    /**
     * 
     * @param {Client} client 
     */
    handle: async function (client) {
        const generalChannel = client.guilds.cache.first().channels.cache.filter((c) => c.name.includes("general")).first();
        for (var accountId in ACCOUNT_ID_LIST_TO_NAME) {

            await setPlayerName(accountId);
            fetchStats.fetchRecentMatches(accountId)
                .then((recentMatches) => {
                    console.log(ACCOUNT_ID_LIST_TO_NAME);
                    const player = new Player(ACCOUNT_ID_LIST_TO_NAME[accountId]);
                    player.populateMatchStatsFromRecentMatches(recentMatches);
                    message = generateMessageForPlayer(player);
                    console.log(message);
                    generalChannel.send(message);
                });
        }
    }
}

async function setPlayerName(){    
    for (var accountId in ACCOUNT_ID_LIST_TO_NAME) {
        if (ACCOUNT_ID_LIST_TO_NAME[accountId] == "") {
            fetchPlayerData(accountId).then(
                function (playerData) {
                    ACCOUNT_ID_LIST_TO_NAME[accountId] = playerData['profile']['personaname'];
                }
            )
        }
    }
}
