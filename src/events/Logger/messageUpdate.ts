import { Event } from "../../Structures/Event";

import { logChannelSchema as schema } from "../../Models/log-channels";
import { EmbedBuilder, TextChannel, TextBasedChannel } from "discord.js";

export default new Event('messageUpdate', (o, n) => {
    schema.findOne({ Guild: n.guildId }, (err, data) => {
        if(data) {
            const embedo = new EmbedBuilder()
            .setAuthor({
                name: `${n.author.tag}`
            })
            .setTitle("Message Edited in " + (n.channel as TextChannel).name)
            .setDescription(
                `
                    Old: ${o.content}
                    New: ${n.content}
                `
            )
            .setTimestamp()
            .setColor('Red')
            .setFooter({
                text: "Pasta logs"
            })
            const channel = n.guild.channels.cache.get(data.Channel) as TextBasedChannel;
            channel.send({ embeds: [embedo] });
        }
    })
})