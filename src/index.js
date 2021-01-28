const swrlBotClient = require('./Structures/swrlBotClient');
const Discord = require("discord.js")
const config = require('../config.json');

const client = new swrlBotClient(config);

client.start()

