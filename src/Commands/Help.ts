import { Embed, EmbedBuilder } from "discord.js";
import { Command } from "../Command";

export const Help: Command = {
    name: "help",
    description: "Get some pasta-style help.",
    run(client, interaction) {
        const embedo = new EmbedBuilder()
        .setTitle("Pasta Help Command 🍝")
        .setDescription("Commands:\nHug Past\nHug Past\nHug Past")
        .setColor("DarkBlue")
        interaction.reply({ embeds: [embedo] })
    },
}