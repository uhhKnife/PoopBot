const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, MembershipScreeningFieldType, InteractionResponse } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Bans a user!')
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addUserOption(option =>
            option.setName('user')
                .setDescription("What user would you like to ban?")
                .setRequired(true))
        .addStringOption(option => 
            option.setName('reason')
            .setDescription("Give a reason for the ban.")
            .setRequired(true)),

	async execute(client, interaction) {

        let role = await interaction.guild.roles.cache.find(r => r.name.toLowerCase() == "owner 👑" || "admin" || "moderator");
        
        let member = interaction.options.getMember("user");

        if (member.roles.cache.has(role.id)) return interaction.reply("This person can't be banned!");

        let reason = await interaction.options.getString('reason');

        await member.send(`**Lil Poops T6 Plutonium Servers**\n You have been banned from our server \n\n **Reason:** ${reason}`).catch(() => {
            interaction.channel.send("This person has direct messages turnedf off")
        });

        await member.ban({ days: 0, reason: reason });

        var banEmbed = new EmbedBuilder()
            .setColor("#ff80f7")    
            .setAuthor({name: "Ban", iconURL: 'https://i.postimg.cc/2ynSrGrj/icontitle.png' })
            .setTimestamp()
            .setDescription(`**Member:** ${member.user.tag} (${member.user.id})\n**Action:** Ban\n**Reason:** ${reason}`);
        interaction.reply(`${member.user.tag} is banned!`);

        await interaction.guild.channels.cache.find(c => c.name.toLowerCase() == "log").send({ embeds: [banEmbed] });
    

	},
};