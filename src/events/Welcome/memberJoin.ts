import { Event } from "../../Structures/Event";
import { welcomeChannelSchema as schema } from "../../Models/welcome-channels";
import { EmbedBuilder, TextChannel, TextBasedChannel } from "discord.js";
import { client } from "../..";

export default new Event('guildMemberAdd', gm => {
    schema.findOne({ Guild: gm.guild.id }, (err, data) => {
        if(data) {
            const embedo = new EmbedBuilder()
            .setAuthor({
                name: `${gm.user.tag}`,
                iconURL: `${gm.user.avatarURL()}`
            })
            .setTitle(`Welcome ${gm.user.username} to the server!`)
            .setDescription(
                `Welcome ${gm.user.username} to ${gm.guild.name}! We hope you enjoy!`
            )
            .setTimestamp()
            .setColor('Red')
            .setFooter({
                text: "Pasta welcome messages"
            })
            const channel = gm.guild.channels.cache.get(data.Channel) as TextBasedChannel;
            channel.send({ embeds: [embedo] }).catch(err => console.log(err));
        }
    })
})