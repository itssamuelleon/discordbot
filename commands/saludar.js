const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    isSlashCommand: true,
    data: new SlashCommandBuilder()
        .setName("saludar")
        .setDescription("Manda un saludo a alguien.")
        .addStringOption(option =>
            option.setName("nombre")
                .setDescription("El nombre de la persona que será saludada")
                .setRequired(true))
        .addBooleanOption(option =>
            option.setName("anónimo")
                .setDescription("Define si se envía el saludo de forma anónima o no")
                .setRequired(false)),
    async execute(client, interaction) {
        const name = interaction.options.get("nombre").value
        let anonymous
        try {
            anonymous = interaction.options.get("anónimo").value
        } catch(error) {
            anonymous = false
        }

        if(anonymous) {
            const channel = client.channels.cache.get(interaction.channelId)
            await channel.send("Un saludo a " + name + "!")
            await interaction.reply({content: "Mensaje enviado", ephemeral: true})
        } else {
            await interaction.reply("Un saludo a " + name + "!")
        }
    }
}
