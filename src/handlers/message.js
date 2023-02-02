const { Message } = require("discord.js");
const fetchStats = require("../opendota/fetchStats");
const { Player } = require("../model/player");
const playerMessages = require("../messages/playerMessage");
const { ACCOUNT_IDS } = require("../constants/account");


const PREFIX = "/nazar";
const ALL = "all";
/**
 * 
 * @param {Message} message 
 */
async function handle(message) {
    let players = [];
    let playersWithNoGames = [];
    if(!message.content.startsWith(PREFIX)) return;
    
    let args = message.content.slice(PREFIX.length).split(" ");
    let command = args[1];

    if(command === ALL) {
        players = ACCOUNT_IDS;
    }

    players.forEach(async accountId => {
        // await setPlayerData(accountId);
        fetchStats.fetchRecentMatches(accountId)
            .then((recentMatches) => {
                let player = new Player(accountId);
                player.populateMatchStatsFromRecentMatches(recentMatches);
                if(player.matchCount == 0) {
                    playersWithNoGames.push(player);
                } else{
                    console.log(player);
                    let generatedMessage = playerMessages.generateMessageForPlayer(player);
                    console.log(generatedMessage);
                    message.channel.send(generatedMessage);
                }
            });
    });

    // message.channel.send(playerMessages.generateMessageForPlayersWithNoGames(playersWithNoGames));
}

module.exports = { handle }
