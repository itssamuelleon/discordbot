const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    isSlashCommand: true,
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Etiqueta a alguien por ti")
        .addUserOption(option =>
            option.setName("usuario")
                .setDescription("El usuario al que se le hará ping")
                .setRequired(true))
        .addBooleanOption(option =>
            option.setName("anónimo")
                .setDescription("Define si se envía de forma anónima o no")
                .setRequired(false)),
    async execute(client, interaction) {
        const userID = interaction.options.get("usuario").value
        let anonymous

        try {
            anonymous = interaction.options.get("anónimo").value
        } catch(error) {
            anonymous = false
        }

        if(anonymous) {
            const channel = client.channels.cache.get(interaction.channelId)
            channel.send("<@" + userID + ">")
            interaction.reply({content: "Mensaje enviado", ephemeral: true})
        } else {
            interaction.reply("<@" + userID + ">")
        }
    }
}
