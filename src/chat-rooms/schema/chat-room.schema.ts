import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsOptional } from "class-validator";
import { Types } from "mongoose";
import { User } from "src/users/schema/user.schema";

@Schema({ timestamps: true })
export class ChatRooms {
  @Prop({ type: [Types.ObjectId], ref: "User" })
  user: Array<User>;

  @Prop({ unique: true })
  chatRoomId: string;

  //   @Prop({ type: [Types.ObjectId], ref: "Message" })
  //   message: Array<Message>;
}

export const chatRoomsSchema = SchemaFactory.createForClass(ChatRooms);
