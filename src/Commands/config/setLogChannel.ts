import { Command } from "../../Structures/Command";
import { logChannelSchema as schema } from "../../Models/log-channels";
import { TextBasedChannel } from "discord.js";

export default new Command ({
    name: "setlogchannel",
    description: "Set the log channel for this server.",
    defaultMemberPermissions: "Administrator",
    options: [
        {
            name: "channel",
            description: "channel to display logs to",
            type: 7,
            required: true
        }
    ],

    run: async({ interaction, args, client }) => {
        const channel = args.getChannel("channel", true) as TextBasedChannel
        schema.findOne({ Guild: interaction.guild.id }, async(err, data) => {
            if(data) {
                data.Channel = channel.id
                data.save()
            } else {
                new schema({
                    Guild: interaction.guild.id,
                    Channel: channel.id
                }).save()
            }
            
        })
        interaction.reply(
            `The logging channel for this server has been set to <#${channel.id}>.`
        )
    },
})