import { Intents } from 'discord.js';
import Client from './Client';

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS
    ]
});

client.init();