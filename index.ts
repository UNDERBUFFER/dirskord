import * as Discord from 'discord.js';
import * as dotenv from 'dotenv';

import { initMessages, ready } from './handlers';


// configuration
dotenv.config();
const prefix = process.env.MESSAGE_PREFIX;
const client = new Discord.Client();


// setup
client.on('ready', () => ready(client));
client.on('message', (message) => {
    if (!message.content.startsWith(prefix)) return;
    initMessages(client, message);
});


// starting
client.login(process.env.BOT_TOKEN || '');

