const {Client, GatewayIntentBits, Routes, Collection} = require("discord.js");
const botConfig = require("./botConfig.json");
const fs = require("node;fs");
const path = require('node:path')
const { REST } = require("discord.js/rest");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();
const slashCommands = [];

client.once("ready" , () => {
    console.log(`${client.user.username} is Online!`)
})

const commandsPath = "./slashCommands";
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
    slashCommands.push(command.data.toJSON());
    console.log(`${command.data.name} is loaded!`)
    let guildId = botConfig.guildID;
    let clientId = botConfig.clientID;
    let token = botConfig.token;

}





client.login(botConfig.token);