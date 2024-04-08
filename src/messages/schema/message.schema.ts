import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsOptional } from "class-validator";
import { Types } from "mongoose";
import { ChatRooms } from "src/chat-rooms/schema/chat-room.schema";
import { User } from "src/users/schema/user.schema";

@Schema({ timestamps: true })
export class Message {
  @Prop({ type: Types.ObjectId, ref: "User" })
  user: User;

  @Prop()
  message: string;

<<<<<<< HEAD
=======
  @Prop({ type: Types.ObjectId, ref: "ChatRooms" })
  chatRoom: ChatRooms;
>>>>>>> 5e553e57e490483e319f607598792c2ab841dca2

  // @Prop()
  // client_offset: number;

  // @Prop()
  // id: number;
}

export const messageSchema = SchemaFactory.createForClass(Message);
