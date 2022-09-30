const {Client, GatewayIntentBits, Routes, Collection, EmbedBuilder} = require("discord.js");
const botConfig = require("./botConfig.json");
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});
const fs = require('node:fs');
const path = require('node:path');

const { REST } = require('@discordjs/rest');
client.commands = new Collection();
const slashCommands = [];

client.once("ready" , () => {
    console.log(`${client.user.username} is Online!`);

	let guildId = botConfig.guildID;
    let clientId = botConfig.clientID;
    let token = botConfig.token;

	const rest = new REST({ version: '10' }).setToken(token);

	rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: slashCommands })
	.then(data => console.log(`Successfully registered ${data.length} application commands.`))
	.catch(console.error);



});


const commandsPath = path.join(__dirname, 'slashCommands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);

	client.commands.set(command.data.name, command);
	slashCommands.push(command.data.toJSON());

	console.log(`${command.data.name} is loaded!`);

}

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(client, interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});



client.login(botConfig.token);