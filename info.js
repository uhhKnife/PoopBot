const { SlashCommandBuilder} = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	category: 'information',
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Gives info about the server!'),
	async execute(client, interaction) {
            
        const botEmbed = new EmbedBuilder()
            .setColor('#ff80f7')
            .setTitle('Title')
            .setDiscription('Description')
            
            .addFields(
                {name: 'Field 1', value: client.user.username }
             )
            .setThumbnail('https://i.postimg.cc/pVjTfWzN/tumbnail.gif')
            .setimage('https://i.postimg.cc/kXBzLGMG/test.png')
            .setFooter( {text: 'Footer', iconURL: 'https://i.postimg.cc/4dDxDqCF/iconfooter.png'}) 
            .setAuthor ( {name: 'Author', iconUR: 'https://i.postimg.cc/2ynSrGrj/icontitle.png' } )

        await interaction.reply({ embeds: [botEmbed] });
	},
};