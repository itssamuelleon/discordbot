const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    isSlashCommand: true,
    data: new SlashCommandBuilder()
        .setName("reaccionar")
        .setDescription("Reacciona con emojis a un mensaje.")
        .addStringOption(option =>
            option.setName("msg-id")
                .setDescription("ID del mensaje a reaccionar")
                .setRequired(true)),
    async execute(client, interaction) {
        const channel = client.channels.cache.get(interaction.channelId)
        const messageID = interaction.options.get("msg-id").value
        let msg

        try {
            msg = await channel.messages.fetch(messageID)
        } catch {
            await interaction.reply("La ID especificada no es vΓ‘lida")
            return
        }

        try {
            msg.react("π")
            msg.react("π€£")
            msg.react("π")
            msg.react("π")
            msg.react("π")
            msg.react("π")
            msg.react("π")
            interaction.reply({content: "Reacciones enviadas", ephemeral: true})
        } catch(error) {
            console.error("Un emoji no estΓ‘ funcionando. Error: " + error)
        }
    }
}
