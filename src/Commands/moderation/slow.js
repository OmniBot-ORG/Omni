const { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	name: 'slow',
	data: new SlashCommandBuilder()
		.setName('slowmode')
		.setDescription('Change the Slowmode.')
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels, PermissionFlagsBits.ManageGuild)
		.addNumberOption((option) => option
			.setName('time')
			.setDescription('The time for the slowmode.')
			.setRequired(true)
		)
		.setDMPermission(false)
		.setNSFW(false),
	/**
	 * @param {ChatInputCommandInteraction} interaction
	 */
	async execute(interaction, client) {
		const { options } = interaction

		const Time = options.getNumber('time');

		interaction.channel.setRateLimitPerUser(Time);

		interaction.reply({ content: `The Slowmode of this channel has been set to ${Time}s`, ephemeral: true });
	}
}
