import Client from 'discord.js';
import { TOKEN } from './secrets';
import ready from './Listeners/ready';
import interactionCreate from './Listeners/interactionCreate';


const client = new Client.Client({
    intents: 'DirectMessages'
});

ready(client);
interactionCreate(client);

client.login(TOKEN)