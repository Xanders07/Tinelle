const fs = require("fs");
const { Client, Collection } = require('discord.js')
const { TOKEN, PREFIX } = require('./config')

const client = new Client();
client.command = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.ts'));

// get all files from command files
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.command.set(command.name, command);
}

client.on("ready", () => {
    console.log('tet');
})


client.on('message', (message) => {


    // if command has good pref and not declare from bot
    if (!message.content.startsWith(PREFIX) || message.author.bot) return;

    const args = message.content.slice(PREFIX.length).split(/ +/);
    const command = args.shift().toLowerCase();


    if(!client.command.has(command)) return;

    if (command === 'votes') {
        client.command.get(command).execute(client, message, args);
    }
    
    
})

client.login(TOKEN)