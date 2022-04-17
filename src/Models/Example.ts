import { model, Schema } from 'mongoose';

export const Example = model('example', new Schema({
    lorem: { type: String, required: true },
    ipsum: { type: Number, required: true }
}));

export interface IExample {
    lorem: string;
    ipsum: number;
};