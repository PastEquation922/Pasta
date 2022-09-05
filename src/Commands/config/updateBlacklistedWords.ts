import { Command } from "../../Structures/Command";
import { wordChannelSchema as schema } from "../../Models/blacklisted-words";
import { TextBasedChannel } from "discord.js";

var s = ["moooo"]

function removeItem<T>(arr: Array<T>, value: T): Array<T> { 
    const index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

export default new Command ({
    name: "configureblacklist",
    description: "Set the welcome channel for this server.",
    defaultMemberPermissions: "Administrator",
    options: [
        {
            name: "word",
            description: "Word to blacklist and delete",
            type: 3,
            required: true
        },
        {
            name: "mode",
            description: "the mode to configure (delete or add)",
            required: true,
            type: 3,
            choices: [
                {
                    name: "add",
                    value: "add"
                },
                {
                    name: "delete",
                    value: "delete"
                }
            ]
        }

    ],

    run: async({ interaction, args, client, guild }) => {
        const word = args.getString("word", true)
        const mode = args.getString("mode", true)

        if(mode == "add") {
            schema.findOne({ Guild: guild.id }, (err, data) => {
                if(data) {
                    data.Blacklist.push(word)
                    data.save()
                } else {
                    new schema({
                        Guild: guild.id,
                        Blacklist: [word]
                    }).save()
                }
            })
            interaction.reply(`Successfuly blacklisted the word ||${word}||`)
        } else if(mode == 'delete') {
            schema.findOne({ Guild: guild.id }, (err, data) => {
                if(data) {
                    const newBlacklist = removeItem<string>(data.Blacklist, word)
                    data.Blacklist = newBlacklist;
                    data.save()
                } else {
                    new schema({
                        Guild: guild.id,
                        Blacklist: []
                    }).save()
                }
            })
            interaction.reply(`Successfuly unblacklisted the word ||${word}||`)
        }
        
        
    },
})