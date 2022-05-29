const { SlashCommandBuilder } = require("@discordjs/builders")
const { suggestionChannelID } = require("../config.json")

module.exports = {
    isSlashCommand: true,
    data: new SlashCommandBuilder()
        .setName("sugerencia")
        .setDescription("Realiza una sugerencia.")
        .addStringOption(option =>
            option.setName("sugerencia")
                .setDescription("La sugerencia que quieres hacer")
                .setRequired(true)),
    async execute(client, interaction) {
        const suggestion = interaction.options.get("sugerencia").value
        suggestionChannel = client.channels.cache.get(suggestionChannelID)

        await suggestionChannel.send("Sugerencia de <@" + interaction.user.id + ">: " + suggestion).then((msg) => {
            msg.react("✅")
            msg.react("❌")
        })
        interaction.reply("Gracias! Tu sugerencia ha sido enviada al canal <#" + suggestionChannelID + "> y está en revisión.")
    }
}
