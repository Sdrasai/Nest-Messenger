import { Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  password: string;
  userRooms: [string];
  email?: string;
  phoneNumber?: string;
  nickName?: string;
}
