import { Client, CommandInteraction } from "discord.js";
import { commands } from "../commands";

export default (client: Client): void => {
    client.on('interactionCreate', i => {
        if(i.isChatInputCommand()) {
            handleSlashCommand(client, i)
        }
    })
    
}

const handleSlashCommand = async (client: Client, interaction: CommandInteraction): Promise<void> => {
    const slashCommand = commands.find(c => c.name === interaction.commandName);
    if (!slashCommand) {
        interaction.followUp({ content: "An error has occurred" });
        return;
    }

    slashCommand.run(client, interaction);
};