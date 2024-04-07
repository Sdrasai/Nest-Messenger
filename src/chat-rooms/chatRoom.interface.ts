import { Document } from "mongoose";

export interface IChatRooms extends Document {
  user: [string];
  chatRoomId: string;
}
