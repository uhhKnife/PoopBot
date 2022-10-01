const { SlashCommandBuilder} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('emote')
		.setDescription('Use normal/animated emotes!')
        .addStringOption(option =>
            option.setName("emoji")
            .setDescription('Give a normal/animated emoji name from this server! Example: fight')
            .setRequired(true)
            ),

	async execute(client, interaction) {
        const emote = await interaction.options.getString("emoji");
        const emotename = client.emojis.cache.find(emoji => emoji.name ===  emote);
    await interaction.reply(emotename.toString());
},
};