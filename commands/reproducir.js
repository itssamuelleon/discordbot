const { SlashCommandBuilder } = require("@discordjs/builders")
const voice = require("@discordjs/voice")

module.exports = {
    isSlashCommand: true,
    data: new SlashCommandBuilder()
        .setName("reproducir")
        .setDescription("Reproduce un archivo de audio en un canal de voz."),
    async execute(client, interaction) {
        const player = voice.createAudioPlayer()
        const connection = voice.getVoiceConnection(interaction.guild.id)
        const resource = voice.createAudioResource("C:\\Users\\itssa\\OneDrive\\Documents\\VSCode\\DiscordBot\\audio\\quetal.wav")

        player.on("error", (error) => {
            console.log("Ha ocurrido un error: " + error)
        })

        connection.subscribe(player)
        player.play(resource)
        
        interaction.reply({content: "Reproduciendo audio...", ephemeral: true})
    }
}
