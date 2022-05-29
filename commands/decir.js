const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    isSlashCommand: true,
    data: new SlashCommandBuilder()
        .setName("decir")
        .setDescription("Dice algo por ti.")
        .addStringOption(option =>
            option.setName("texto")
                .setDescription("Lo que el bot va a decir")
                .setRequired(true))
        .addBooleanOption(option =>
            option.setName("anónimo")
                .setDescription("Define si se envía de forma anónima o no")
                .setRequired(false)),
    async execute(client, interaction) {
        const texto = interaction.options.get("texto").value
        let anonymous
        try {
            anonymous = interaction.options.get("anónimo").value
        } catch(error) {
            anonymous = false
        }
        
        if(anonymous) {
            const channel = client.channels.cache.get(interaction.channelId)
            await channel.send(texto)
            await interaction.reply({content: "Mensaje enviado", ephemeral: true})
        } else {
            await interaction.reply(texto)
        }
    }
}
