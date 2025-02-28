import { ObjectId, Schema, model, Types } from 'mongoose';
import { IPost } from './post.js';
import { PostModel } from './post.js';

// 1. Create an interface representing a TS object.
export interface IUser {
  name: string;
  email: string;
  avatar?: string;
  post?: IPost[];
  _id?: string;
}

// 2. Create a Schema corresponding to the document in MongoDB.
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: String,
  post: [PostModel.schema],
});

// 3. Create a Model.
export const UserModel = model('User', userSchema);