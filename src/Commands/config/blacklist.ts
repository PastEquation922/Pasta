import { Command } from "../../Structures/Command";
import { wordChannelSchema as schema } from "../../Models/blacklisted-words";
import { EmbedBuilder, TextBasedChannel } from "discord.js";

export default new Command ({
    name: "blacklist",
    description: "View the blacklisted words for this server.",

    run: async({ interaction, args, client, guild }) => {
        schema.findOne({ Guild: guild.id }, async(err, data) => {
            if(data) {
                const embedo = new EmbedBuilder({
                    title: `Blacklisted words for ${guild.name}:`,
                    description: `${data.Blacklist}`,
                    footer: {
                        text: "Pasta Blacklist"
                    }
                }).setTimestamp().setColor('DarkButNotBlack')

                interaction.reply({ embeds: [embedo] })
                data.save()
            }
            
        })
    },
})