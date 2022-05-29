const config = require("../config.json")

module.exports = {
    name: "interactionCreate",
    on: true,
    async execute(client, interaction) {
        if(!interaction.isCommand()) return

        const command = client.commands.get(interaction.commandName)

        if(!command) return

        if(command.isSlashCommand) {
            try {
                await command.execute(client, interaction)
            } catch(err) {
                console.error(err)
                await interaction.reply({content: "Hubo un error", ephemeral: true})
            }
        }
    }
}
