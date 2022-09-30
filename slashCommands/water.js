const { SlashCommandBuilder, EmbedBuilder} = require('discord.js');

module.exports = {
	category: 'fun',
	data: new SlashCommandBuilder()
		.setName('water')
		.setDescription('Water.'),
	async execute(client, interaction) {
            
        var botEmbed = new EmbedBuilder()
            .setColor('#ff80f7')
            .setTitle('Enslaved moisture')
            .setImage('https://i.postimg.cc/kXBzLGMG/test.png')

        await interaction.reply({ embeds: [botEmbed] });
	},
};