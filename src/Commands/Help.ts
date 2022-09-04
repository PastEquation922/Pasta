import { Command } from "../Structures/Command";

export default new Command ({
    name: "help",
    description: "Stop it. Get some help.",
    run: async({client, interaction, args}) => {
        interaction.reply("hey!")
        
    }
})