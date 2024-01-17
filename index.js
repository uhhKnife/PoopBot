const { Client, GatewayIntentBits, Routes, Collection, MessageEmbed } = require("discord.js");
const botConfig = require("./botConfig.json");
const { REST } = require('@discordjs/rest');
const fs = require('fs');
const path = require('path');
const { EmbedBuilder } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});

const commandsPath = path.join(__dirname, 'slashCommands');
const slashCommands = [];
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

client.commands = new Collection();

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    client.commands.set(command.data.name, command);
    slashCommands.push(command.data.toJSON());

    console.log(`${command.data.name} is loaded!`);
}

client.once("ready", () => {
    console.log(`${client.user.username} is Online!`);

    let guildId = botConfig.guildID;
    let clientId = botConfig.clientID;
    let token = botConfig.token;

    const rest = new REST({ version: '10' }).setToken(token);

    rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: slashCommands })
        .then(data => console.log(`Successfully registered ${data.length} application commands.`))
        .catch(console.error);

    // Read paths from monthly.txt in the root folder and call the function to check and rename old JSON files
    const pathsFile = path.join(__dirname, '..', 'monthly.txt');
    const jsonPaths = readPathsFromFile(pathsFile);
    checkAndRenameOldJsonFiles(jsonPaths);
});

// Function to read paths from a file
function readPathsFromFile(filePath) {
    try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        return fileContent.split('\n').map(path => path.trim());
    } catch (error) {
        console.error('Error reading paths from file:', error);
        return [];
    }
}

// Function to check and rename old JSON files in multiple paths
function checkAndRenameOldJsonFiles(paths) {
    paths.forEach(jsonFilesPath => {
        // Check if the directory exists
        if (!fs.existsSync(jsonFilesPath)) {
            console.warn(`Directory not found: ${jsonFilesPath}`);
            return;
        }

        fs.readdir(jsonFilesPath, (err, files) => {
            if (err) {
                console.error('Error reading directory:', err);
                return;
            }

            files.forEach(file => {
                const filePath = path.join(jsonFilesPath, file);
                
                // Check if the file has a date added to it
                if (/_[0-9]{8}\.json$/.test(file)) {
                    console.log(`File already has a date added: ${filePath}`);
                    return;
                }

                const stats = fs.statSync(filePath);
                const creationTime = new Date(stats.ctime);

                // Calculate one month ago
                const oneMonthAgo = new Date();
                oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

                if (creationTime < oneMonthAgo) {
                    // Add the creation date to the filename
                    const creationDate = creationTime.toISOString().slice(0, 10).replace(/-/g, '');
                    const newFilePath = path.join(jsonFilesPath, `${file}_${creationDate}.json`);

                    fs.renameSync(filePath, newFilePath);
                    console.log(`Renamed old JSON file: ${filePath} to ${newFilePath}`);
                }
            });
        });
    });
}

client.on('guildMemberAdd', async (member) => {
    var welcomeEmbed = new EmbedBuilder()
        .setColor('#fa0505')
        .setTitle('<:1_:1017414263918301204> Member!')
        .setDescription(`Hey ${member}, welcome to **Lil Poops T6 Plutonium Servers**!`)
        .setThumbnail('https://i.postimg.cc/SsJVM4C1/uzi.png')
        .setAuthor({ name: 'Suki', iconURL: 'https://i.postimg.cc/nrz9DJXC/botavi2x.png' });
    member.guild.channels.cache.find(c => c.name.toLowerCase() == "💜・welcome").send({ embeds: [welcomeEmbed] })
    var messageEmbed = new EmbedBuilder()
        .setColor('#fa0505')
        .setTitle('Welcome! <:redverifystatic:1099635477855862894>')
        .setDescription(`Have a great time here at **Lil Poops T6 Plutonium Servers**`)
        .setThumbnail('https://i.postimg.cc/2Sj2dnfK/python.png')
        .setAuthor({ name: 'Suki', iconURL: 'https://i.postimg.cc/XJ63ySv4/wc.png' });

    member.send({ embeds: [messageEmbed] })
    let role = member.guild.roles.cache.find(r => r.name.toLowerCase() == "member") //Role name for new users
    if (!role) return;
    member.roles.add(role);
});

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
