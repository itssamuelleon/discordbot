// Importing discord modules
const Discord = require("discord.js")
const voice = require("@discordjs/voice")
const config = require("./config.json")
const fs = require("fs")

// Creating a client/bot
const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Discord.Intents.FLAGS.GUILD_VOICE_STATES
    ]
})

client.commands = new Discord.Collection() // Creates a new colletion to store all of the command files that will be imported
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js")) //Creating a String array with all of the command file names under ./commands/ and filtering by the .js extension

for(const file of commandFiles) { // For every command filename in the array commandFiles
    const command = require("./commands/" + file) // Imports the command file
    client.commands.set(command.data.name, command) // Stores its name and the imported file in the collection client.commands
}

const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js")) // Creating a String array with all of the event file names under ./events/ and filtering by the .js extension

for(const file of eventFiles) { // For every event filename in the array eventFiles
    const event = require("./events/" + file) // Import the event file
    if(event.once) { // Check if the variable once is true of if it exists
        client.once(event.name, (...args) => event.execute(client, ...args)) // If it does, set up a one-time listener for that event
    } else if(event.on) { // If it doesn't, check if the variable on is true or if it exists
        client.on(event.name, (...args) => event.execute(client, ...args)) // If it does, set up a listener for that event
    }
}

// Logging in (This must always be the last line of code)
client.login(config.token)
