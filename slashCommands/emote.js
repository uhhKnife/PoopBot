const { SlashCommandBuilder} = require('discord.js');

module.exports = {
    category: "fun",
	data: new SlashCommandBuilder()
		.setName('emote')
		.setDescription('Use normal/animated emotes!')
        .addStringOption(option =>
            option.setName("emoji")
            .setDescription('Give a normal/animated emoji name from this server! Example: fight')
            .setRequired(true)
            )
            .addStringOption(option =>
                option.setName("text")
                .setDescription('Give text you want behind your emoji, u cn leave this empty...')
                .setRequired(false)
                ),

	async execute(client, interaction) {

        let text = await interaction.options.getString("text");
        if(!text){
                const emote = await interaction.options.getString("emoji");
                const emotename = client.emojis.cache.find(emoji => emoji.name ===  emote);
            await interaction.reply(emotename.toString());
        }
        else{

        const emote = await interaction.options.getString("emoji");
        const emotename = client.emojis.cache.find(emoji => emoji.name ===  emote);
    await interaction.reply(emotename.toString() + " " + text);
}
},
};