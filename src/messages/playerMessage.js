const { Player } = require("../model/player")

const NUMBER_TO_TAMIL_WORD = {
    1: "ORU",
    2: "RENDU",
    3: "MOONU",
    4: "NAALU",
    5: "ANJU",
    6: "AARU",
    7: "EZHU",
    8: "ETTU",
    9: "ONBODHU",
    10: "PATTHU"
}
/**
 * 
 * @param {Player} player 
 */
function generateMessageForPlayer(player) {
    var message;
    if (player.soloWinCount + player.partyWinCount == 0 ) {
        message = NUMBER_TO_TAMIL_WORD[1] + " match kuda jeikala, nazar nalla vela seiyudhu :sweat_drops:.";
    }
    else if (player.partyWinCount != 0) {
        message = " Solo la mutta matchu win pannalum, party la " + NUMBER_TO_TAMIL_WORD[player.partyWinCount] + " matchu win pannirkan. Nee Party la adu nadha unnaku safety."
    }
    else if ((player.soloWinCount + player.partyWinCount) > player.matchCount / 2) {
        message = "Mothama adunadhu " + NUMBER_TO_TAMIL_WORD[player.matchCount] + " matchu. Adhula **Solo va** " + NUMBER_TO_TAMIL_WORD[player.soloWinCount] + " matchu win pantan." + " Party layum " + NUMBER_TO_TAMIL_WORD[player.partyWinCount] + " matchu win-u. Nazar Incoming :rage: "
    }
    else if ((player.partyWinCount + player.soloWinCount) < player.matchCount / 2) {
        message = NUMBER_TO_TAMIL_WORD[player.matchCount] + " matchula " + NUMBER_TO_TAMIL_WORD[player.matchCount - player.partyWinCount - player.soloWinCount] + " match thothutan. :eggplant: Nazar working :sweat_drops:";
    }
    else if (player.soloWinCount > player.matchCount / 2) {
        message = NUMBER_TO_TAMIL_WORD[player.matchCount] + " matchula " + NUMBER_TO_TAMIL_WORD[player.soloWinCount] + " matchu **solo-va** jeichuruke. :nazar_amulet: Double Nazar Unnaku :eyes:";
    }

    return player.discordTag + ", " + message;
}


/**
 * 
 * @param {Array<Player>} players 
 * @returns 
 */
function generateMessageForPlayersWithNoGames(players) {
    console.log(players);
    message = "Oru Match kuda adala inniki, romba vela pakuranga ya :eyes:";
    players.forEach(player => { console.log(player.discordTag); message = message + " " + player.discordTag; });
    return message;
}


module.exports = { generateMessageForPlayer, generateMessageForPlayersWithNoGames }