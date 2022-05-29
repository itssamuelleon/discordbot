const { SlashCommandBuilder } = require("@discordjs/builders")
const voice = require("@discordjs/voice")

module.exports = {
    isSlashCommand: true,
    data: new SlashCommandBuilder()
        .setName("desconectarse")
        .setDescription("Desconecta al bot del canal de voz."),
    async execute(client, interaction) {
        const connection = voice.getVoiceConnection(interaction.guild.id)

        if(!connection) {
            await interaction.reply("El bot no está en ningún canal de voz")
            return
        }
        
        connection.destroy()
        await interaction.reply("Desconectado con éxito")
    }
}
