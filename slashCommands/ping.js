const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong and shows how  fast the bot responds!'),
	async execute(client, interaction) {
		await interaction.reply(`Pinging...`);
		interaction.editReply(`Pong! \nPing is ${Math.round(client.ws.ping)}ms`);
	},
};
