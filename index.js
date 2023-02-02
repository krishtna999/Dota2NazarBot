const Discord = require('discord.js');
const readyHandler = require('./src/handlers/ready');
const messageHandler = require('./src/handlers/message');

var CLIENT_KEY = "MTA2OTk4MzkwODk3Mzc5MzQzMg.Glq_od.D_pD8H4ta62apsegrnwdv1IFIEBlGMyl8WQt4U";


const client = new Discord.Client({intents:37641});

// client.once('ready', readyHandler.handle);

client.on('messageCreate', messageHandler.handle);

client.login(CLIENT_KEY);

