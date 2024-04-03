import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from "@nestjs/websockets";
import { MessagesService } from "./messages.service";

import { Server, Socket } from "socket.io";
import { Logger } from "@nestjs/common";

import { JwtService } from "@nestjs/jwt";

import { UsersService } from "src/users/users.service";

@WebSocketGateway({
  cors: {
    orogin: "*",
  },
})
export class MessagesGateway {
  @WebSocketServer()
  server: Server;
  private readonly logger = new Logger(MessagesGateway.name);
  constructor(
    private readonly messagesService: MessagesService,
    private readonly userService: UsersService,
    private jwtService: JwtService
  ) {}

  afterInit() {
    this.logger.log("Initialized");
  }

  async handleConnection(client: any, ...args: any[]) {
    const { sockets } = this.server.sockets;

    this.logger.log(`client id: ${client.id} connected`);
    this.logger.debug(`Number of connected clients: ${sockets.size}`);

    const extractedCookie = client.handshake.headers.cookie;
    const nickName = extractedCookie.split(";")[1].split("=")[1];
    client.emit("connected-user", nickName);
  }

  handleDisconnect(client: any) {
    this.logger.log(`Cliend id:${client.id} disconnected`);
  }

  @SubscribeMessage("chat message")
  async message(@MessageBody() msg: any, @ConnectedSocket() client: Socket) {
    let message = msg.split(":")[1];
    let username = msg.split(": ")[0];
    const user = await this.userService.findByUsername(username);
    await this.messagesService.createMessageService(user, message);

    this.server.emit("chat message", msg);
  }

  @SubscribeMessage("typing")
  istyping(@MessageBody() msg: any, @ConnectedSocket() client: Socket) {
    client.broadcast.emit("typing", msg);
  }

  @SubscribeMessage("stop typing")
  isNotTyping(@MessageBody() msg: any, @ConnectedSocket() client: Socket) {
    client.broadcast.emit("stop typing", "");
  }
}
