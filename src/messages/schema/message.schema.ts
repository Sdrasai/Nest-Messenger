import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsOptional } from "class-validator";
import { Types } from "mongoose";
import { User } from "src/users/schema/user.schema";
@Schema({ timestamps: true })
export class Message {
  @Prop({ type: Types.ObjectId, ref: "User" })
  user: User;

  @Prop()
  message: string;


  // @Prop()
  // client_offset: number;

  // @Prop()
  // id: number;
}

export const messageSchema = SchemaFactory.createForClass(Message);
