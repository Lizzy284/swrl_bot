const Event = require('../Structures/Event');

const { MessageEmbed } = require("discord.js")

module.exports = class extends Event {

	constructor(...args) {
		super(...args, {
			once: true
		});
	}

	run(message) {
		const neededChannel = '799079720867856395'

		this.client.on("guildMemberAdd", async member => {
			console.log(member.user.tag, member.user.id, 'joined', member.guild.name)
			const e = new MessageEmbed()
				.setColor('RANDOM')
				.setTitle(`${member.user.tag}\n ${member.id}`)
				.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
				.setDescription(`${member.user.username} has joined ${member.guild.name}`)
				.setTimestamp()
			this.client.channels.cache.get(neededChannel).send(e)
		})
		this.client.on("guildMemberRemove", async member => {
			console.log(member.user.tag, member.user.id, 'left', member.guild.name)

			const e1 = new MessageEmbed()
				.setColor('RANDOM')
				.setTitle(`${member.user.tag}\n ${member.id}`)
				.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
				.setDescription(`${member.user.username} has left ${member.guild.name}`)
				.setTimestamp()
			this.client.channels.cache.get(neededChannel).send(e1)
		})

		this.client.on("guildCreate", (guild) => {

			console.log(`New guild joined: \n${guild.name} \n(id: ${guild.id}). \nThis guild has \n${guild.memberCount} members!\nOwner:\n ${guild.owner.user.tag}\n${guild.owner.user.id}`)
			
			const f = new MessageEmbed()
				.setDescription(`New guild joined: \n${guild.name} \n(id: ${guild.id}). \nThis guild has \n${guild.memberCount} members!\nOwner:\n ${guild.owner.user.tag}\n${guild.owner.user.id}`)
			this.client.channels.cache.get(neededChannel).send(f)
		})


		this.client.on("guildDelete", (guild) => {
			console.log(`I have been removed from: \n${guild.name} \n(id: ${guild.id}) \nThis guild had \n${guild.memberCount} members!`)
			const a = new MessageEmbed()
				.setDescription(`I have been removed from: \n${guild.name} \n(id: ${guild.id}) \nThis guild had \n${guild.memberCount} members!`)
			this.client.channels.cache.get(neededChannel).send(a)
		});

		this.log();

		const activities = [
			`${this.client.guilds.cache.size} servers!`,
			`${this.client.channels.cache.size} channels!`,
			`${this.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} users!`,
		];
		this.activity(activities);
	}



	activity(activities) {
		let i = 0;
		setInterval(() => this.client.user.setActivity(`${this.client.prefix}help | ${activities[i++ % activities.length]}`, { type: 'WATCHING' }), 15000);
	}



	log() {
		console.log([
			`Logged in as ${this.client.user.tag}`,
			`Loaded ${this.client.commands.size} commands!`,
			`Loaded ${this.client.events.size} events!`,
			`Client ID: ${this.client.user.id}`,
			`invite: https://discord.com/oauth2/authorize?client_id=${this.client.user.id}&scope=bot&permissions=8`,
		].join('\n'));

		this.console();

	}

	console() {
		console.log(`\n\n servers: \n${this.client.guilds.cache.map(guild => guild.name + "|" + guild.id).join("\n")}`);
	}
};
