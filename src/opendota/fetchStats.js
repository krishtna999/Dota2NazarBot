const { OpenDota } = require("opendota.js");

const opendota = new OpenDota();

/**
 * 
 * @param {String} accountId Steam32 AccountId
 * @returns {Promise} PlayerStats
 */
function fetchRecentMatches(accountId) {
    return opendota.getRecentMatches(accountId);
}

module.exports = { fetchRecentMatches }