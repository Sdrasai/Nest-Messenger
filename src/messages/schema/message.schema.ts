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

  @Prop({ type: Types.ObjectId, ref: "ChatRooms" })
  chatRoom: ChatRooms;

  @Prop()
  time: string;
}

export const messageSchema = SchemaFactory.createForClass(Message);
