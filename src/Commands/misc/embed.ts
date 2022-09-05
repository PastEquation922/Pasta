import { ColorResolvable, Colors, EmbedBuilder } from "discord.js";
import { Command } from "../../Structures/Command";

export default new Command({
    name: "embed",
    description: "Make an embed.",
    options: [
        {
            name: "title",
            required: true,
            description: "title of the embed.",
            type: 3
        },
        {
            name: "description",
            required: true,
            description: "description of the embed.",
            type: 3
        },
        {
            name: "footer",
            description: "footer of the embed.",
            type: 3
        },
        {
            name: "timestamp",
            description: "whether to put a timestamp in the embed.",
            type: 5
        },
        {
            name: "color",
            description: "color of the embed.",
            type: 3,
            choices: [
                {
                    name: "blue",
                    value: "Blue"
                },
                {
                    name: "red",
                    value: "Red"
                },  {
                    name: "green",
                    value: "Green"
                },  {
                    name: "yellow",
                    value: "Yellow"
                },
            ]
        },
        {
            name: "author_name",
            description: "The name of the author of the embed. (AKA the top text)",
            type: 3
        },
        {
            name: "author_pfp",
            description: "Profile picture of the author.",
            type: 11
        },
    ],
    run: async({ args, client, interaction }) => {
        const title = args.getString("title", true)
        const description = args.getString("description", true)
        const footer = args.getString("footer")
        const color = args.getString("color")
        const author_name = args.getString("author_name")
        const author_pfp = args.getAttachment("author_pfp")
        const timestamp = args.getBoolean("timestamp")

        const embedoSuper = new EmbedBuilder()
        .setTitle(title)
        .setDescription(description)

        if(timestamp) {
            embedoSuper.setTimestamp()
        }
        if(footer) {
            embedoSuper.setFooter({
                text: footer
            })
        }
        if(author_pfp && author_name) {
            embedoSuper.setAuthor({
                name: author_name,
                iconURL: author_pfp.url
            })
        }
        if(color) {
            embedoSuper.setColor((color as ColorResolvable))
        }

        interaction.reply({ content: "Successfuly sent embed", ephemeral: true })
        interaction.channel.send({ embeds: [embedoSuper] })
    },
})