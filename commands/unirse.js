const { SlashCommandBuilder } = require("@discordjs/builders")
const { joinVoiceChannel } = require("@discordjs/voice")

module.exports = {
    isSlashCommand: true,
    data: new SlashCommandBuilder()
        .setName("unirse")
        .setDescription("Une al bot a un canal de voz.")
        .addChannelOption(option =>
            option.setName("canal")
                .setDescription("El canal al que se unirá el bot")
                .setRequired(true)),
    async execute(client, interaction) {
        const channelID = interaction.options.get("canal").value
        const channel = client.channels.cache.get(channelID)
        if(channel.type !== "GUILD_VOICE") {
            await interaction.reply("Debes especificar un canal de voz")
            return
        }
        joinVoiceChannel({
            channelId: channelID,
            guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator
        })
        await interaction.reply("Conectado con éxito")
    }
}
