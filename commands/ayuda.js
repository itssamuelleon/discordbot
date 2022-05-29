const { SlashCommandBuilder } = require("@discordjs/builders")
const { prefix } = require("../config.json")

module.exports = {
    isSlashCommand: false,
    data: new SlashCommandBuilder()
        .setName("ayuda")
        .setDescription("Sintaxis de cada comando."),
    async execute(client, message) {
        await message.reply("Comandos de diagonal (/):\n" +
        "/decir <mensaje>\n" +
        "/saludar <nombre>\n" +
        "/ping <@usuario>\n" +
        "/reaccionar <msg-id>\n" +
        "/unirse <#canal>\n" +
        "/reproducir\n" +
        "/desconectarse\n" +
        "/sugerencia <sugerencia>\n" +
        "\nComandos de chat (" + prefix + ")\n" +
        prefix + "hola\n" +
        prefix + "ayuda\n" +
        prefix + "creditos"
        )
    }
}
