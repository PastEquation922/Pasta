import { ActionRow, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, SelectMenuBuilder } from "discord.js";
import { Command } from "../Structures/Command";

export default new Command ({
    name: "help",
    description: "Stop it. Get some help.",
    run: async({client, interaction, args}) => {
        const embedo = new EmbedBuilder({
            title: "Pasta helps you!",
            description: "many many headaches:(",
            fields: [
                { "name": "⚙️ Configuration", "value": "Configure the bot to your server, for your liking!", "inline": true },
                { "name": "🎉 Fun", "value": "Some super fun commands!", "inline": true},
            ],
            color: 0x0000FF,
            footer: { text: "Pasta Help" },
        })
        const actionRow = new ActionRowBuilder<SelectMenuBuilder>()
        .addComponents(
            new SelectMenuBuilder()
            .setCustomId("help")
            .setPlaceholder("Choose something to get help with... ")
            .addOptions(
                { label: "Configuration", emoji: "⚙️", value: "config" },
                { label: "Fun", emoji: "🎉", value: "fun" }
            )
        )
        interaction.reply({ embeds: [embedo], components: [actionRow] })
        
    }
})