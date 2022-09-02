import { Embed, EmbedBuilder } from "discord.js";
import { Command } from "../Command";

export const Hug: Command = {
    name: "hug",
    description: "Get a HUGE hug! <3",
    options: [
        {
            type: 6,
            name: "user",
            description: "The user to hug:D",
            required: true,
        }
    ],
    run(client, interaction) {
        const user = interaction.options.getUser("user", true)
        var msg = `<@${interaction.user.id}> gave <@${user.id}> a HUUUUGGGGEEE hug!`
        interaction.reply(msg)
    },
}