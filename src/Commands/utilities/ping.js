const { ChatInputCommandInteraction, SlashCommandBuilder } = require('discord.js');

module.exports = {
	name: 'ping',
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Will respond with pong!')
		.setDMPermission(true)
		.setNSFW(false),
	/**
	 * @param {ChatInputCommandInteraction} interaction
	 */
	execute(interaction) {
		interaction.reply({ content: 'Pong!', ephemeral: true });
	}
}
