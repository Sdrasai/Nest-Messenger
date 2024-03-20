import { Prop, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'
import { User } from 'src/users/schema/user.schema'

export class Message {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: User

  @Prop()
  text: string
}

export const messageSchema = SchemaFactory.createForClass(Message)
