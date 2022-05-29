const fs = require("fs")
const { REST } = require("@discordjs/rest")
const { ROUTES, Routes } = require("discord-api-types/v9")
const { clientId, guildId, token } = require("./config.json")
const { SlashCommandBuilder } = require("@discordjs/builders")

const commands = []

const commandFiles = fs.readdirSync("./commands").filter((file) => file.endsWith(".js"))
for(const file of commandFiles) {
    const command = require("./commands/" + file)
    if(command.isSlashCommand) {
        commands.push(command.data.toJSON())
    }
}

const rest = new REST({version: "9"}).setToken(token)

async function deploy() {
    try {
        await rest.put(Routes.applicationGuildCommands(clientId, guildId),
        {body: commands})
        console.log("Comandos actualizados con éxito")
    } catch(err) {
        console.error(err)
    }
}

deploy()
