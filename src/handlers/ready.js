const { Client } = require("discord.js");
const { Player } = require("../model/player");
const fetchStats = require("../opendota/fetchStats");
const { fetchPlayerData } = require("../opendota/fetchPlayerData");
const { generateMessageForPlayer } = require("../messages/playerMessage");
const { ACCOUNT_IDS } = require("../constants/account");

const ACCOUNT_IDS_TO_PROFILE_DATA = {}

/**
 * 
 * @param {Client} client 
 */
async function handle(client) {
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
                var generatedMessage = generateMessageForPlayer(player);
                console.log(generatedMessage);
                generalChannels.forEach(generalChannel => { generalChannel.send(generatedMessage); });
            });
    });
}

async function setPlayerData(accountId) {
    fetchPlayerData(accountId).then(
        function (playerData) {
            ACCOUNT_IDS_TO_PROFILE_DATA[accountId] = playerData;
        }
    );
}

module.exports = { handle }
