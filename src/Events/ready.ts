import { Presence } from '../Utils';
import { Events } from '../Interfaces'

export const Event: Events = {
    name: 'ready',
    type: 'once',
    run: async client => {
        Presence(client);
    }
};