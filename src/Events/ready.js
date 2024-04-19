const color = require('colors');
const { Events, ActivityType } = require("discord.js");

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {

		const options = [{
			type: ActivityType.Watching,
			text: `Over ${client.guilds.cache.size} servers! 🙂`,
			status: "online",
		}, {
			type: ActivityType.Watching,
			text: `Over ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} Users!`,
			status: "online"
		}, {
			type: ActivityType.Listening,
			text: `new updates soon™`,
			status: "idle"
		}];

		let i = -1;
		setInterval(() => {
			i++;
			if (!options[i]) i = 0;
			client.user.setPresence({
				activities: [{
					name: options[i].text,
					type: options[i].type,
				}],
				status: options[i].status,
			})
		}, 5 * 60 * 1000);

		client.guilds.cache.forEach(guild => {
			console.log(`${guild.name} | ${guild.id} | ${guild.memberCount} Members`.brightRed);
		})

		console.log(`${client.user.username} is online!\nIn ${client.guilds.cache.size} Servers!`.brightMagenta.bold);
	}
}