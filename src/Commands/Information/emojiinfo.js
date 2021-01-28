const moment = require('moment');
const swrlBotEmbed = require("../../Structures/swrlBotEmbed")
const Command = require('../../Structures/Command');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'emojiinfo',
            aliases: ['ei'],
            category: 'Information',
            guildOnly: true,
        });
    }

    async run(message, [emote]) {
        if (!message.guild.me.hasPermission('MANAGE_EMOJIS')) return message.channel.send(new swrlBotEmbed().setTitle(`Command error`).setDescription(`It seems i dont have the manage_emoji permission`).setColor("RANDOM"))

        const regex = emote.replace(/^<a?:\w+:(\d+)>$/, '$1')

        const emoji = message.guild.emojis.cache.find((emj) => emj.name === emote || emj.id === regex)
        if (!emoji) return message.channel.send("please include a valid emoji")

        const authorFetch = await emoji.fetchAuthor();
        const checkOrCross = (bool) => bool ? '✅' : '❎';

        const e = new swrlBotEmbed()
            .setDescription(`**Emoji information for __${emoji.name.toLowerCase()}__**`)
            .setColor(message.guild.me.displayHexColor || 'RANDOM')
            .setThumbnail(emoji.url)
            .addField(`General`, [
                `ID: ${emoji.id}`,
                `URL: [link to emoji](${emoji.url})`,
                `Author Tag: ${authorFetch.tag}`,
                `Author ID: ${authorFetch.id}`,
                `Time created: ${moment(emoji.createdTimestamp).format('LT')} ${moment(emoji.createdTimestamp).format('LL')} ${moment(emoji.createdTimestamp).fromNow()}`
            ])
            .addField(`Other`, [
                `Requires Colons: ${checkOrCross(emoji.requiresColons)}`,
                `Deleteable: ${checkOrCross(emoji.deleteable)}`,
                `Animaited: ${checkOrCross(emoji.animaited)}`,
                `Managed: ${checkOrCross(emoji.managed)}`
            ])
        return message.channel.send(e)
    }
};