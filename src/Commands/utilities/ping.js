const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Will respond with pong!")
		.setDMPermission(true)
		.setNSFW(false),
	/**
	 * @param {ChatInputCommandInteraction} interaction
	 */
	execute(interaction) {
		const before = Date.now();
		await interaction.reply({ embeds: [
		    new Discord.EmbedBuilder()
		        .setTitle("Pinging...")
		        .addFields({ name: "API Latency", value: client.ws.ping === -1 ? "Not calculated yet" : `${Math.round(client.ws.ping)} ms` })
		        .setColor("#2b2d31")
		], fetchReply: true });

		interaction.editReply({ embeds: [
		    new Discord.EmbedBuilder()
		        .setTitle("Ping Results")
		        .addFields(
				{ name: "API Latency", value: client.ws.ping === -1 ? "Not calculated yet" : `${Math.round(client.ws.ping)} ms` },
				{ name: "Bot Latency", value: `${Date.now() - before} ms` }
			)
		        .setColor("#2b2d31")
		] });
	}
}
