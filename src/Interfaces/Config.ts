export interface Config {
    bot: {
        token: string;
        owners: string[];
    };
    database: {
        url: string;
    };
};