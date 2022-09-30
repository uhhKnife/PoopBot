const { SlashCommandBuilder, EmbedBuilder} = require('discord.js');

module.exports = {
	category: 'other',
	data: new SlashCommandBuilder()
		.setName('kim')
		.setDescription('Kim Jong Un'),
	async execute(client, interaction) {
            
        var botEmbed = new EmbedBuilder()
            .setColor('#ff80f7')
            .setTitle('Praise Kim Jong Un!')
            .setImage('https://i.postimg.cc/VNnVjrkS/kim.png')

        await interaction.reply({ embeds: [botEmbed] });
	},
};