const config = require("../config.json")

module.exports = {
    name: "messageCreate",
    on: true,
    async execute(client, message) {
        if(!message.content.startsWith(config.prefix) || message.author.bot) return

        const args = message.content.slice(config.prefix.length).split(" ")
        const commandName = args.shift().toLowerCase()

        if(!client.commands.has(commandName)) return

        const command = client.commands.get(commandName)

        if(!command.isSlashCommand) {
            try {
                await command.execute(client, message, args)
            } catch(err) {
                console.error(err)
                await message.reply({content: "Hubo un error :(", ephemeral: true})
            }
        }
    }
}
