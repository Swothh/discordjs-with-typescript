import { MessageEmbed } from 'discord.js';
import { Commands } from '../Interfaces';

export const Command: Commands = {
    name: 'ping',
    description: 'Pong.',
    options: [],
    run: async (client, interaction) => {
        await interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setColor('#FFFFFF')
                    .setDescription(`${client.user.username} ~~-->~~ ${client.ws.ping}ms`)
            ]
        });
    }
};