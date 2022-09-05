import { Event } from "../../Structures/Event";
import { logChannelSchema as schema } from "../../Models/log-channels";
import { client } from "../..";
import { EmbedBuilder, TextBasedChannel, TextChannel } from "discord.js";

export default new Event('messageDelete', msg => {
    schema.findOne({ Guild: msg.guildId }, (err, data) => {
        if(data) {
            const embedo = new EmbedBuilder()
            .setAuthor({
                name: `${msg.author.tag}`
            })
            .setTitle("Message Deleted in " + (msg.channel as TextChannel).name)
            .setDescription(
                `${msg.content}`
            )
            
            .setTimestamp()
            .setColor('Red')
            .setFooter({
                text: "Pasta logs"
            })
            const channel = msg.guild.channels.cache.get(data.Channel) as TextBasedChannel;
            channel.send({ embeds: [embedo] }).catch(err => console.log(err));
        }
    })
})