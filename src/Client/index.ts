import { Config, Commands, Events } from '../Interfaces';
import { Client, Collection } from 'discord.js';
import { Routes } from 'discord-api-types/v9';
import configFile from '../config.json';
import { REST } from '@discordjs/rest';
import { connect } from 'mongoose';
import path from 'path';
import fs from 'fs';

export default class Bot extends Client {
    public commands: Collection<string, Commands> = new Collection();
    public events: Collection<string, Events> = new Collection();
    public config: Config = configFile;

    public async init() {
        const rest = new REST({ version: "9" })
            .setToken(this.config.bot.token);

        this.login(this.config.bot.token).then(() => {
            console.log(`(*) Connected to Discord as ${this.user.username}!`);
        }).catch((err: Error) => {
            console.error(err);
            process.exit(1);
        });

        connect(this.config.database.url).then(async () => {
            console.log('(*) Connected to database!');
        }).catch((err: Error) => {
            console.error(err);
            process.exit(1);
        });

        fs.readdir(path.join(__dirname, '../Commands'), (err, commands: string[]) => {
            if (err) throw new Error(err.message);
            commands
                .filter((command: string) => command.endsWith('.ts'))
                .forEach(async (command: string) => {
                    try {
                        const { Command }: { Command: Commands } = await import(`../Commands/${command}`);
                        this.commands.set(Command.name, Command);
                    } catch(err) {
                        console.error(err);
                    };
                });
        });

        fs.readdir(path.join(__dirname, '../Events'), (err, events: string[]) => {
            if (err) throw new Error(err.message);
            events
                .filter((event: string) => event.endsWith('.ts'))
                .forEach(async (event: string) => {
                    try {
                        const { Event }: { Event: Events } = await import(`../Events/${event}`);
                        this.events.set(Event.name, Event);
                        this[Event.type](Event.name, Event.run.bind(null, this));
                    } catch(err) {
                        console.error(err);
                    };
                });
        });

        this.once('ready', async () => {
            try {
                console.log('(*) Started loading application [/] commands...');
                await rest.put(Routes.applicationCommands(this.user.id), { body: this.commands.toJSON() });
                console.log(`(*) Successfully loaded application [${this.commands.size}] commands!`);
            } catch(err) {
                console.error(err);
            };
        });

        this.on('interactionCreate', async interaction => {
            try {
                if (!interaction.isCommand()) return;
                const command = this.commands.find(cmd => cmd.name == interaction.commandName);
                if (!command) return;
                command.run(this, interaction);
            } catch(err) {
                console.error(err);
            };
        });
    };
};