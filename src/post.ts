import { Schema, model, ObjectId, Types } from 'mongoose';
import {UserModel, IUser} from './user.js';

export interface IPost {
    title: string;
    content: string;
    date: Date;
    autor: string;
    _id?: string;
}

const postSchema = new Schema<IPost>({
    title: {type: String, requiered: true},
    content:{type: String, requiered: true},
    date: {type: Date, requiered: true},
    autor: {type: String, requiered: true}
});

export const PostModel = model ('Post', postSchema);