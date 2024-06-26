import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: Array })
  userRooms: [string];

  @Prop()
  email: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  nickName: string;
}

export const userSchema = SchemaFactory.createForClass(User);
