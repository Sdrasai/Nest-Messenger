import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets'
import { MessagesService } from './messages.service'
import { CreateMessageDto } from './dto/create-message.dto'

import { Server, Socket } from 'socket.io'

@WebSocketGateway({
  cors: {
    orogin: '*',
  },
})
export class MessagesGateway {
  @WebSocketServer()
  server: Server

  constructor(private readonly messagesService: MessagesService) {}

  @SubscribeMessage('createMessage')
  async create(@MessageBody() createMessageDto: CreateMessageDto) {
    const message = await this.messagesService.create(createMessageDto)
    this.server.emit('message', message)
    return message
  }

  @SubscribeMessage('findAllMessages')
  findAll() {
    return this.messagesService.findAll()
  }

  // @SubscribeMessage('join')
  // joinRoom(
  //   @MessageBody('username') username: String,
  //   @ConnectedSocket() client: Socket,
  // ) {
  //   return this.messagesService.identify(username, client.id)
  // }

  @SubscribeMessage('typing')
  async typing() {}
}
