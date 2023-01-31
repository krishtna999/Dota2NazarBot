const { OpenDota } = require("opendota.js");

const opendota = new OpenDota();

/**
 * 
 * @param {String} accountId Steam32 AccountId
 * @returns {Promise} PlayerData
 */
function fetchPlayerData(accountId) {
    return opendota.getPlayer(accountId);
}

module.exports = { fetchPlayerData }