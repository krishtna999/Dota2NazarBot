const { Client } = require("discord.js");
const { Player } = require("../model/player");
const fetchStats = require("../opendota/fetchStats");
const { fetchPlayerData } = require("../opendota/fetchPlayerData");
const { generateMessageForPlayer } = require("../messages/playerMessage");

const ACCOUNT_IDS = [
    "490430759",
    "484419811",
    "86241635",
    "364642945",
    "872835829",
    "443835658",
    "478268200",
    "904104780",
]

const ACCOUNT_IDS_TO_PROFILE_DATA = {}

module.exports = {
    /**
     * 
     * @param {Client} client 
     */
    handle: async function (client) {
        const generalChannels = [];
        Array.from(client.guilds.cache.values()).forEach(
            guild => {
                generalChannels.push(guild.channels.cache.filter((c) => c.name.includes("general")).first());
            }
        );

        ACCOUNT_IDS.forEach(async accountId => {
            // await setPlayerData(accountId);
            fetchStats.fetchRecentMatches(accountId)
                .then((recentMatches) => {
                    let player = new Player(accountId);
                    player.populateMatchStatsFromRecentMatches(recentMatches);
                    message = generateMessageForPlayer(player);
                    console.log(message);
                    generalChannels.forEach(generalChannel => { generalChannel.send(message); });
                });
        });
    }
}

async function setPlayerData(accountId) {
    fetchPlayerData(accountId).then(
        function (playerData) {
            ACCOUNT_IDS_TO_PROFILE_DATA[accountId] = playerData;
        }
    );
}
