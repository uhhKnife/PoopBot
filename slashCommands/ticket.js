const { SlashCommandBuilder, EmbedBuilder, ChannelType } = require('discord.js');

module.exports = {
    category: "general",
	data: new SlashCommandBuilder()
		.setName('ticket')
		.setDescription('Create a Ticket')
        .addStringOption(option =>
            option.setName("reason")
            .setDescription('Give a reason you are creating a ticket.')
            .setRequired(true)
            ),
	async execute(client, interaction) {

        const categoryId = "1025136434769842198";
        
        var userName = interaction.user.username;
        var userDiscriminator = interaction.user.discriminator;

        const reason = await interaction.options.getString("reason");

        var ticketExits = false;

        interaction.guild.channels.cache.forEach((channel) => {
            
            if (channel.name === userName.toLowerCase() + "#" + userDiscriminator) {
                interaction.reply("❌ You already have a ticket!");
                ticketExits = true;
                return;
            }
        })
        if (ticketExits) return;

        interaction.guild.channels.create({ name: userName.toLowerCase() + "#" + userDiscriminator, type: ChannelType.GuildText, parent: categoryId}).then(
            (createdchan) => {
                createdchan.permissionOverwrites.edit(interaction.guild.roles.cache.find(x => x.name === "@everyone"), {
 
                    SendMessages: false,
                    ViewChannel: false
                 
                });
                 
                createdchan.permissionOverwrites.edit(interaction.user.id, {
                    CreateInstantInvite: false,
                    ReadMessageHistory: true,
                    SendMessages: true,
                    AttachFiles: true,
                    Connect: true,
                    AddReactions: true,
                    ViewChannel: true
                });
                 
                createdchan.permissionOverwrites.edit(interaction.guild.roles.cache.find(x => x.name === "Owner 👑" && "Admin" && "Moderator"), {
                    CreateInstantInvite: false,
                    ReadMessageHistory: true,
                    SendMessages: true,
                    AttachFiles: true,
                    Connect: true,
                    AddReactions: true,
                    ViewChannel: true
                });

                var ticketEmbed = new EmbedBuilder()
                .setColor("#ff80f7")    
                .setAuthor({name: userName, iconURL: 'https://i.postimg.cc/2ynSrGrj/icontitle.png' })
                .setTimestamp()
                .setThumbnail('https://i.postimg.cc/pTcvqdjD/ticket.png')

                    .setTitle("Ticket")
                    .addFields(
                        {name: "Reason", value: reason}
                    );

                createdchan.send({ embeds: [ticketEmbed] });
                interaction.reply("✅ Ticket created");
                
            }
        ).catch(err => {
            interaction.reply({ content: "❌ Something went wrong!" + err })
        })
	},
};