import { CommandInteraction, CommandInteractionOptionResolver, ComponentType, InteractionCollector } from "discord.js";
import { client } from "..";
import { Event } from "../Structures/Event";
import { XInteraction } from "../typings/Command";

export default new Event('interactionCreate', async i => {
    if(i.isCommand()) {
        const command = client.commands.get(i.commandName);
        if(!command) {
            await i.followUp({ content: "You have run a command that doesn't exist in pasta files.", ephemeral: true })
        }
        command.run({
            args: i.options as CommandInteractionOptionResolver,
            client: client,
            interaction: i as XInteraction,
            guild: i.guild,
            channel: i.channel
        })
        const collector = i.channel.createMessageComponentCollector({
            componentType: ComponentType.SelectMenu
        })
        
        collector.on('collect', c => {
            if(c.componentType == ComponentType.SelectMenu) {
                if(c.customId == 'help') {
                    const value = c.values[0]
                    if(value == 'config') {
                        c.deferUpdate()
                        i.followUp({ content: "This is Not Implemented yet.", ephemeral: true })
                    }
                    if(value == 'fun') {
                        c.deferUpdate()
                        i.followUp({ content: "This is Not Implemented yet.", ephemeral: true })
                        
                    }
                }
            }
        })
    }
})