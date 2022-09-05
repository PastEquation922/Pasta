import { EmbedBuilder, TextBasedChannel } from "discord.js";
import { Event } from "../../Structures/Event";
import { welcomeChannelSchema as schema } from "../../Models/welcome-channels";

export default new Event('guildMemberRemove', gm => {
    schema.findOne({ Guild: gm.guild.id }, (err, data) => {
        if(data) {
            const embedo = new EmbedBuilder()
            .setAuthor({
                name: `${gm.user.tag}`,
                iconURL: `${gm.user.avatarURL()}`
            })
            .setTitle(`${gm.user.username} left the server.`)
            .setDescription(
                `Sorry to see you go!`
            )
            .setTimestamp()
            .setColor('Red')
            .setFooter({
                text: "Pasta leave messages"
            })
            const channel = gm.guild.channels.cache.get(data.Channel) as TextBasedChannel;
            channel.send({ embeds: [embedo] }).catch(err => console.log(err));
        }
    })
})