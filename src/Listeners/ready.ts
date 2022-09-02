import 'discord.js';
import { Client } from 'discord.js';
import { commands } from '../commands';

export default async (client: Client): Promise<void> => {
    client.on('ready', async () => {
        if (!client.user || !client.application) {
            return;
        }

        await client.application.commands.set(commands, '980678063455080498');
    })
}