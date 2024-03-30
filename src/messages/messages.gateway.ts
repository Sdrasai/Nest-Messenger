import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from "@nestjs/websockets";
import { MessagesService } from "./messages.service";

import { Server, Socket } from "socket.io";
import { Logger, Req } from "@nestjs/common";
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";
import { SECRET_KEY } from "src/common/constants/auth.constants";

@WebSocketGateway({
  cors: {
    orogin: "*",
  },
})
export class MessagesGateway {
  @WebSocketServer()
  server: Server;
  // private userMap = new Map<string, any>();
  private readonly logger = new Logger(MessagesGateway.name);
  constructor(
    private readonly messagesService: MessagesService,
    private jwtService: JwtService
  ) {}

  afterInit() {
    this.logger.log("Initialized");
  }

  async handleConnection(client: any, ...args: any[]) {
    const { sockets } = this.server.sockets;

    this.logger.log(`Client id: ${client.id} connected`);
    this.logger.debug(`Number of connected clients: ${sockets.size}`);

    //TODO: use the middleware
    const extractedCookie = client.handshake.headers.cookie;
    const accessToken = extractedCookie.split("=")[1];
    const payload = await this.jwtService.verifyAsync(accessToken, {
      secret: SECRET_KEY,
    });

    // this.userMap.set(client.id, payload);
    // console.log("+++++++++++++++++++++++++", this.userMap.get(client.id));
    // this.server.emit("connected-user", this.userMap.get(client.id).username);

    sockets.get(client.id)["user"] = payload;
    console.log("+++++++++++++++++++++++++", sockets.get(client.id)["user"]);
    this.server.emit("connected-user", sockets.get(client.id)["user"].username);
  }

  handleDisconnect(client: any) {
    this.logger.log(`Cliend id:${client.id} disconnected`);
  }

  @SubscribeMessage("chat message")
  async test(@MessageBody() msg: any, @ConnectedSocket() client: Socket) {
    console.log("msg +++++++++++++++++++++++++++", msg);
    this.server.emit("chat message", msg);
  }
}

// @SubscribeMessage('test')
// test1(socket, next) {
//   console.log(socket.id)
// }

// @SubscribeMessage('createMessage')
// async createMessage(@MessageBody() createMessageDto: CreateMessageDto) {
//   const message =
//     await this.messagesService.createMessageService(createMessageDto)
//   this.server.emit('message', message)
//   return message
// }

// @SubscribeMessage('findAllMessages')
// findAll() {
//   return this.messagesService.findAllService()
// }

// // @SubscribeMessage('join')
// // joinRoom(
// //   @MessageBody('username') username: String,
// //   @ConnectedSocket() client: Socket,
// // ) {
// //   return this.messagesService.identify(username, client.id)
// // }

// @SubscribeMessage('typing')
// async typing() {}
