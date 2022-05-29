const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    isSlashCommand: false,
    data: new SlashCommandBuilder()
        .setName("creditos")
        .setDescription("Información del creador del bot."),
    async execute(client, message) {
        await message.reply("Creador: @itssamuelleon(#5117)")
    }
}
