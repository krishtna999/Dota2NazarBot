const { Player } = require("../model/player")

const NUMBER_TO_TAMIL_WORD = {
    1: "oru",
    2: "rendu",
    3: "moonu",
    4: "naalu",
    5: "anju",
    6: "aaru",
    7: "ezhu",
    8: "ettu",
    9: "onbodhu",
    10: "pathu"
}
/**
 * 
 * @param {Player} player 
 */
function generateMessageForPlayer(player) {
    var message;
    if (player.matchCount == 0) {
        message = "Match eh adala inniki, romba vela pakuran ya";
    } else if (player.soloWinCount == 0) {
        message = "Solo va poi " + NUMBER_TO_TAMIL_WORD[1] + " match kuda jeikala, adhuku dha mathavanga oda adanum nu solluvanga. Party pona 20 MMR dha loss aavum :sweat_drops:";
    } else if(player.soloWinCount < (player.matchCount - player.partyWinCount)/2) {
        message = "Solo va poi " + NUMBER_TO_TAMIL_WORD[player.matchCount - player.partyWinCount - player.soloWinCount] + " match thothuruke. :eyes: Nazar working :eyes:";
    }
    else if(player.soloWinCount > player.matchCount/2)  {
        message = "Solo va poi " + NUMBER_TO_TAMIL_WORD[player.soloWinCount] + " matchu jeichuruke. :nazar_amulet: Double Nazar Unnaku :eyes:";
    }

    return player.discordTag + ", " + message;
}

module.exports = { generateMessageForPlayer }