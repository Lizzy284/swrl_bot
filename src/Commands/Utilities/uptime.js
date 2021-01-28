const Command = require('../../Structures/Command');
const ms = require('ms');
const { MessageEmbed } = require('discord.js');
const os = require("os")

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['ut'],
			description: 'This provides the current uptime of the bot.',
			category: 'Utilities'
		});
	}

	async run(message) {
		const e = this.uptime()

		message.channel.send(e);
	}


	uptime() {
		return new MessageEmbed()
			.setColor("RANDOM")

			.addField(`My uptime is`, [
				`\`${ms(this.client.uptime, { long: true })}\``
			])

			.addField(`My host uptime is`, [
				`\`${ms(os.uptime() * 1000, { long: true })}\``,

			])
	}
};
