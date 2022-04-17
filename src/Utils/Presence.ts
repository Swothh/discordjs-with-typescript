import Client from '../Client';

export function Presence(client: Client) {
    client.user.setActivity({
        type: 'WATCHING',
        name: `hello!`
    });
};