import { CommandInteraction } from 'discord.js';
import Client from '../Client';

interface Options {
    type: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
    name: string;
    description: string;
    required?: boolean;
    options?: Options[];
};

export interface Commands {
    name: string;
    description: string;
    options?: Options[],
    run: (client: Client, interaction: CommandInteraction) => Promise<any> | any;
};