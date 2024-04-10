import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from "@nestjs/websockets";
import { MessagesService } from "./messages.service";
import { Server, Socket } from "socket.io";
import { Logger, Param } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import { v4 as uuidv4 } from "uuid";
import { ChatRoomsService } from "src/chat-rooms/chat-rooms.service";

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
    private readonly chatRoomService: ChatRoomsService,
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
    const nickName = extractedCookie?.split(";")[1]?.split("=")[1];
    client.emit("connected-user", nickName);
  }

  handleDisconnect(client: any) {
    this.logger.log(`Cliend id:${client.id} disconnected`);
  }

  @SubscribeMessage("chat message")
  async message(
    @MessageBody() msg: any,
    @ConnectedSocket() client: Socket
    // @Param("roomId") roomId: string
  ) {
    let message = msg.split(":")[1];
    let username = msg.split(": ")[0];
    let roomId = client.handshake.headers.referer.split("/")[6];

    const user = await this.userService.findByUsername(username);
    const chatRoom = await this.chatRoomService.findByRoomId(roomId);
    await this.messagesService.createMessageService(user, message, chatRoom);

    //TODO: create Room in Socket + emit the msg in Room
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

  @SubscribeMessage("createChatRoom")
  async handleCreateChatRoom(
    @MessageBody() usernames: string[],
    @ConnectedSocket() client: Socket
  ): Promise<void> {
    const extractedCookie = client.handshake.headers.cookie;
    const nickName = extractedCookie?.split(";")[1]?.split("=")[1];
    const roomId = uuidv4();
    let usersId = [];

    if (Array.isArray(usernames)) {
      usernames.forEach(async (user) => {
        let users = await this.userService.findByUsername(user);
        console.log("++++++++++++++++++", users);

        usersId.push(users._id);
      });
      let mainUser = await this.userService.findByUsername(nickName);
      usersId.push(mainUser._id);

      // await this.chatRoomService.createChatRoom(roomId, nickName);
      console.log("++++++++++++++++++", usersId);

      const roomTarget = await this.chatRoomService.createChatRoom(
        roomId,
        usersId
      );
      usersId = []; // ?
      client.emit("chatRoomCreated", roomTarget); // Emit the room ID back to the client
    } else {
      let users = await this.userService.findByUsername(usernames);
      usersId.push(users._id);
      let mainUser = await this.userService.findByUsername(nickName);
      usersId.push(mainUser._id);
      // await this.chatRoomService.createChatRoom(roomId, nickName);

      const roomTarget = await this.chatRoomService.createChatRoom(
        roomId,
        usersId
      );
      usersId = []; // ?
      client.emit("chatRoomCreated", roomTarget); // Emit the room ID back to the client
    }
  }

  @SubscribeMessage("joinRoom")
  handleJoinRoom(
    @MessageBody() roomId: string,
    @ConnectedSocket() client: Socket
  ): void {
    client.join(roomId); // Join the client to the specified room
  }

  sendMessageToRoom(roomId: string, message: string): void {
    this.server.to(roomId).emit("message", message); // Broadcast the message to all users in the room
  }
}
