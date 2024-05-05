const { Client, SlashCommandBuilder, PermissionFlagsBits, ChatInputCommandInteraction, EmbedBuilder, ChannelType } = require('discord.js');

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
			.addChannelTypes(ChannelType.GuildText)
			.setRequired(false)
		)
		.setDMPermission(false)
		.setNSFW(false),
	/**
	 * @param {ChatInputCommandInteraction} interaction
	 * @param {Client} client
	 */
	async execute(interaction, client) {
		const { options } = interaction;

		let older = false;
		const twoWeeksAgo = new Date(Date.now() - (2 * 7 * 24 * 60 * 60 * 1000));
		let cName = null;
		let cTopic = null;
		let cParent = null;
		let cPerms = [];

		const channel = options.getChannel('channel') ?? interaction.channel;
		const messages = await channel.messages.fetch();
		messages.map((msg) => {
			if (msg.createdTimestamp >= twoWeeksAgo.getTime()) {
				older = true;
				return ;
			}
		})

		const successEmbed = new EmbedBuilder()
			.setColor('Gold')

		if (older) {
			cName = channel.name;
			cTopic = channel.topic;
			cParent = channel.parent;
			channel.permissionOverwrites.cache.forEach(perm => {
				cPerms.push({
					id: perm.id,
					type: perm.type,
					allow: perm.allow.toArray(),
					deny: perm.deny.toArray()
				});
			});
			await channel.delete();
			const newChannel = await interaction.guild.channels.create({
				name: cName,
				type: ChannelType.GuildText,
				topic: cTopic,
				parent: cParent,
				permissionOverwrites: cPerms
			});
			successEmbed.setDescription(`Deleted ${messages.size} messages successfully in ${newChannel}`)
			return newChannel.send({ embeds: [successEmbed] }).then((msg) => {
				setTimeout(() => {
					msg.delete();
				}, 5 * 1000);
			})
		} else {
			channel.bulkDelete(messages);
			successEmbed.setDescription(`Deleted ${messages.size} messages successfully in ${channel}`);
		}

		// in the future make a log system to all moderation commands and events

		return interaction.reply({ embeds: [successEmbed], ephemeral: true });

	}
}