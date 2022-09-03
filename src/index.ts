import Client from 'discord.js';
import { TOKEN } from './secrets';
import ready from './Listeners/ready';
import interactionCreate from './Listeners/interactionCreate';
import Logs from './Listeners/Logs';
import connect from './Database/connect';


const client = new Client.Client({
    intents: 'DirectMessages'
});

connect()
ready(client);
interactionCreate(client);
Logs(client);

client.login(TOKEN)