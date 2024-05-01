const color = require('colors');
const { SlashCommandBuilder, PermissionFlagsBits, ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');

module.exports = {
	name: 'nuke',
	data: new SlashCommandBuilder()
		.setName('nuke')
		.setDescription('Delete all messages from a specific channel.')
		.setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
		.setDMPermission(false)
		.addChannelOption(options => options
			.setName('channel')
			.setDescription('Select the channel you want to delete all messages.')
			.setRequired(false)
		)
		.setDMPermission(false)
		.setNSFW(false),
	/**
	 * @param {ChatInputCommandInteraction} interaction
	 */
	async execute(interaction, client) {
		const { options } = interaction;

		let channel = null;
		let msg = null;

		channel = options.getChannel('channel');
		if (channel) {
			msg = await channel.messages.fetch();
			channel.bulkDelete(msg);
		} else {
			channel = interaction.channel;
			msg = await channel.messages.fetch();
			channel.bulkDelete(msg);
		}

		const successEmbed = new EmbedBuilder()
			.setColor('Gold')
			.setDescription(`Deleted ${msg.size} successfully in ${channel}`);

		// in the future make a log system to all moderation commands and events

		return interaction.reply({ embeds: [successEmbed], ephemeral: true });

	}
}