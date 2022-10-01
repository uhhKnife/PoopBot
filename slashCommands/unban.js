const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, MembershipScreeningFieldType, InteractionResponse } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unban')
		.setDescription('Unbans a user!')
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addStringOption(option => 
            option.setName('id')
            .setDescription("What user would you like to unban?")
            .setRequired(true)),

	async execute(client, interaction) {

        let id = await interaction.options.getString("id");

        let member;

        let bans = await interaction.guild.bans.fetch();

        if(bans.has(id)) member =  bans.get(id);
        else return interaction.reply("This user isn't banned");

        await interaction.guild.members.unban(id);

        var unbanEmbed = new EmbedBuilder()
            .setColor("#ff80f7")    
            .setAuthor({name: "Ban", iconURL: 'https://i.postimg.cc/2ynSrGrj/icontitle.png' })
            .setTimestamp()
            .setDescription(`**Member:** ${member.user.tag} (${member.user.id})\n**Action:** Unban`);
        interaction.reply(`${member.user.tag} is unbanned!`);

        await interaction.guild.channels.cache.find(c => c.name.toLowerCase() == "log").send({ embeds: [unbanEmbed] });
    

	},
};