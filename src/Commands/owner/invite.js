const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');
const swrlBotEmbed = require("../../Structures/swrlBotEmbed");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'makeinvite',
            category: 'Owner',
            ownerOnly: true
        });
    }

    async run(message, args) {

        const { channel, neededGuild, neededChannel } = this.stuff(args, message);


        channel.createInvite().then(async invite => {
            message.channel.send(new swrlBotEmbed().addField(`Heres is ${channel.name}\'s invite`, [
                `[here](https://discord.gg/${invite.code})`
            ]).setColor("RANDOM"))

            console.log(`https://discord.gg/${invite.code}\n Guild Name:\n${invite.guild.name}\nGuild ID:\n${invite.guild.id}\nGuild Owner:\n${invite.guild.owner.user.tag}\nnGuild Owner:\n${invite.guild.ownerID}\nMessage Author:\n${message.author.tag}\nMessage Author ID:\n${message.author.id}`)

            const members = invite.guild.members.cache;

            const e = new swrlBotEmbed()
                .setTitle(`${invite.guild.name}`)
                .setThumbnail(invite.guild.iconURL({ dynamic: true, size: 512 }))
                .setColor(`RANDOM`)
                .addField(`Guild`, [
                    `Guild Name: ${invite.guild.name}`,
                    `Guild ID: ${invite.guild.id}`,
                ])
                .addField(`Owner`, [
                    `Guild Owner: ${invite.guild.owner.user.tag}`,
                    `Guild Owner ID: ${invite.guild.ownerID}`,
                ])
                .addField(`Message Author`, [
                    `Username: ${message.author.tag}`,
                    `ID: ${message.author.id}`,
                ])
                .addField(`Invite`, [
                    `[here](https://discord.gg/${invite.code})`
                ])
                .addField(`Members`, [
                    `Total: ${invite.guild.memberCount.toLocaleString()}`,
                    `Humans: ${members.filter(member => !member.user.bot).size.toLocaleString()}`,
                    `Bots: ${members.filter(member => member.user.bot).size.toLocaleString()}`,
                ])
            this.client.guilds.cache.get(neededGuild).channels.cache.get(neededChannel).send(e)
        })
    }

    stuff(args, message) {
        const neededGuild = '796463745513685034';
        const neededChannel = '799079720867856395';
        const channel = this.client.channels.cache.get(args[0]) || message.channel;
        return { channel, neededGuild, neededChannel };
    }
};