const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'count',
            category: 'Information'
        });
    }

    async run(message, args) {

        const e = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(this.client.user.username)
            .addField(`User and Guild Count`, [
                `\`\`\`${this.client.guilds.cache.size.toLocaleString()} Guilds\`\`\``,
                `\`\`\`${this.client.users.cache.size.toLocaleString()} Users\`\`\``
            ])
        message.channel.send(e);
    }
};
