const Command = require('../../Structures/Command');

const { MessageEmbed } = require('discord.js');

const moment = require("moment")

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'owner',
            category: 'Information'
        });
    }

    async run(message, args) {
        const guild = this.client.guilds.cache.get(args[0]) || message.guild;
        const channels = guild.channels.cache;
        const members = guild.members.cache;
        const e = new MessageEmbed()
            .setColor("RANDOM")
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .setTitle(guild.name)

            .addField(`Guild:`, [
                `Name: ${guild.name}`,
                `ID: ${guild.id}`,
                `Time Created: ${moment(guild.createdTimestamp).format('LT')} ${moment(guild.createdTimestamp).format('LL')} (${moment(guild.createdTimestamp).fromNow()})`,
            ])

            .addField(`Owner`, [
                `Owner Tag: ${guild.owner.user.tag}`,
                `Owner ID: ${guild.ownerID}`,
            ])


            .addField(`Member Count:`, [
                `Total: ${guild.memberCount.toLocaleString()}`,
                `Humans: ${members.filter(member => !member.user.bot).size.toLocaleString()}`,
                `Bots: ${members.filter(member => member.user.bot).size.toLocaleString()}`,
            ])

            .addField(`Channel Count:`, [
                `Total: ${guild.channels.cache.size.toLocaleString()}`,
                `Text Channels: ${channels.filter(channel => channel.type === 'text').size.toLocaleString()}`,
                `Voice Channels: ${channels.filter(channel => channel.type === 'voice').size.toLocaleString()}`,
            ])

            .addField('Presence\'s:', [
                `Online: ${members.filter(member => member.presence.status === 'online').size.toLocaleString()}`,
                `Idle: ${members.filter(member => member.presence.status === 'idle').size.toLocaleString()}`,
                `Do Not Disturb: ${members.filter(member => member.presence.status === 'dnd').size.toLocaleString()}`,
                `Offline: ${members.filter(member => member.presence.status === 'offline').size.toLocaleString()}`,
            ])

        message.channel.send(e);
    }
};