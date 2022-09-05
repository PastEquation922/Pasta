import { Command } from "../../Structures/Command";
import { welcomeChannelSchema as schema } from "../../Models/welcome-channels";
import { TextBasedChannel } from "discord.js";

export default new Command ({
    name: "setwelcomechannel",
    description: "Set the welcome channel for this server.",
    defaultMemberPermissions: "Administrator",
    options: [
        {
            name: "channel",
            description: "channel to display welcome messages to",
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
            `The welcome channel for this server has been set to <#${channel.id}>.`
        )
    },
})