import { Module } from '@nestjs/common'
import { MessagesService } from './messages.service'
import { MessagesGateway } from './messages.gateway'
import { Message, messageSchema } from './entities/message.entity'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: messageSchema }]),
  ],
  providers: [MessagesGateway, MessagesService],
  exports: [MessagesService],
})
export class MessagesModule {}
