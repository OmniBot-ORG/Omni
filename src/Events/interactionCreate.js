const colors = require('colors');
const { Events, ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	/**
	 *  @param {ChatInputCommandInteraction} interaction
	 */
	async execute(interaction, client) {

		if (interaction.isAutocomplete()) {
			// Handle autocomplete interactions
			const command = client.commands.get(interaction.commandName);
			if (!command) return;
			
			if (command && command.autocomplete) {
				try {
					await command.autocomplete(interaction, client);
				} catch (error) {
					console.error('Error handling autocomplete:', error);
					// Optionally, you can send an error message to the user
				}
			}
		// handle dm commands
		} else if (interaction.isChatInputCommand() && !interaction.guildId) {
			const command = client.commands.get(interaction.commandName);
			if (!command)
				return interaction.reply({
					content: 'This command is outdated.',
					ephemeral: true,
				});

			try {
				await command.execute(interaction, client);
				console.log(
					`\nUser: ${interaction.user.globalName}\n\nCommand: '${command.name}'\nUser: ${interaction.user.tag}\nTimestamp: ${Date().slice(0, -42)}`.brightGreen
				);
			} catch (error) {
				console.error(error);
				console.log(
					`\nUser: ${interaction.user.globalName}\nCommand: '${command.name}'\nUser: ${interaction.user.tag}`
						.brightRed
				);
				const errorEmbed = new EmbedBuilder()
					.setTitle('An error occured')
					.setDescription(`${error}`)
					.setColor('Red');

				if (interaction.replied || interaction.deferred) {
					await interaction.followUp({ embeds: [errorEmbed], ephemeral: true });
				} else {
					await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
				}
			}
		} else if (interaction.isChatInputCommand()) {

			const command = client.commands.get(interaction.commandName);
			if (!command)
				return interaction.reply({
					content: 'This command is outdated.',
					ephemeral: true,
				});
			try {
				console.log(colors.brightGreen(
					`\nGuild: ${interaction.guild.name}\nChannel: '${interaction.channel.name}'\nCommand: '${command.name}'\nUser: ${interaction.user.tag}\nTimestamp: ${Date().slice(0, -42)}`
				));
				await command.execute(interaction, client);
			} catch (error) {
				console.error(error);
				console.log(
					`\nGuild: ${interaction.guild.name}\nChannel: '${interaction.channel.name}'\nCommand: '${command.name}'\nUser: ${interaction.user.tag}`
						.brightRed
				);
				const errorEmbed = new EmbedBuilder()
					.setTitle('An error occured')
					.setDescription(`${error}`)
					.setColor('Red');

				if (interaction.replied || interaction.deferred) {
					await interaction.followUp({ embeds: [errorEmbed], ephemeral: true });
				} else {
					await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
				}
			}
		}
	},
};