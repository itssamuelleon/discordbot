const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    isSlashCommand: false,
    data: new SlashCommandBuilder()
        .setName("hola")
        .setDescription("Te saluda el bot."),
    async execute(client, message) {
        await message.reply("Hola, <@" + message.author.id + ">")
    }
}
