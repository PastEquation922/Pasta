import { EmbedBuilder, TextBasedChannel } from "discord.js";
import { Event } from "../Structures/Event";
import { wordChannelSchema as schema } from "../Models/blacklisted-words";


export default new Event('messageCreate', m => {
    schema.findOne({ Guild: m.guild.id }, (err, data) => {
        if(data) {
            if(data.Blacklist.some(substring=>m.content.includes(substring))) {
                const warnedo = new EmbedBuilder({
                    title: "Blacklisted word",
                    description: `${m.author} has said a blacklisted word in this server.`,
                    footer: {
                        text: "Pasta blacklist"
                    }
                }).setTimestamp().setColor("NotQuiteBlack")

                m.channel.send({ embeds: [warnedo] })
                m.delete()
            }
        }
    })
})