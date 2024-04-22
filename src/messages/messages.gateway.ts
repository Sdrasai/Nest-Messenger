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
  private formatTimestamp(date: Date): string {
    let adjustedDate = new Date(date.getTime() + (3 * 60 + 30) * 60000); // 3 hours and 30 minutes in milliseconds

    const hours = adjustedDate.getHours().toString().padStart(2, "0");
    const minutes = adjustedDate.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  connectedUsers = [];

  afterInit() {
    this.logger.log("Initialized");
  }

  async handleConnection(client: any, ...args: any[]) {
    const { sockets } = this.server.sockets;

    this.logger.log(`client id: ${client.id} connected`);
    this.logger.debug(`Number of connected clients: ${sockets.size}`);

    const extractedCookie = client.handshake.headers.cookie;
    const nickName = extractedCookie?.split(";")[1]?.split("=")[1];
    let roomId = client.handshake.headers.referer.split("/")[6];

    this.connectedUsers.push(nickName);
    this.connectedUsers.push(client.id);

    client.emit("connected-user", nickName);
    client.on("disconnecting", () => {
      client.rooms.forEach((room) => {
        client.leave(room);
      });
      // console.log(client.rooms);
    });
    client.join(roomId);
    // console.log(`++++++++++++++++++++++${nickName}`, client.rooms);

    setInterval(async () => {
      const userId = await this.userService.findByUsername(nickName);
      const users = await this.userService.findAll();
      const chatRooms = await this.chatRoomService.getChatRooms(userId._id);
      let userChatRooms = [];
      let usersNickname = [];
      users.forEach((user) => {
        usersNickname.push({
          name: user.username,
        });
      });

      chatRooms.forEach((room) => {
        if (room.user.length === 2) {
          userChatRooms.push({
            name: "Pv",
            chatRooms: room.chatRoomId,
          });
        } else {
          userChatRooms.push({
            name: "Group",
            chatRooms: room.chatRoomId,
          });
        }
      });

      client.emit("userChatRooms", userChatRooms);
      client.emit("usersNickname", usersNickname);
    }, 5000);
  }

  handleDisconnect(client: any) {
    const extractedCookie = client.handshake.headers.cookie;
    const nickName = extractedCookie?.split(";")[1]?.split("=")[1];

    this.logger.log(`Cliend id:${client.id} disconnected`);

    let findDisconnectedSocketNickName = this.connectedUsers.indexOf(nickName);
    this.connectedUsers.splice(findDisconnectedSocketNickName, 1);

    let findDisconnectedSocketId = this.connectedUsers.indexOf(client.id);
    this.connectedUsers.splice(findDisconnectedSocketId, 1);
  }

  @SubscribeMessage("chat message")
  async message(
    @MessageBody() msg: any,
    @ConnectedSocket() client: Socket
    // @Param("roomId") roomId: string
  ) {
    const messageTimestamp = this.formatTimestamp(new Date());
    let message = msg.split(":")[1];
    let username = msg.split(": ")[0];
    let roomId = client.handshake.headers.referer.split("/")[6];

    const user = await this.userService.findByUsername(username);
    const chatRoom = await this.chatRoomService.findByRoomId(roomId);

    if (!client.handshake.auth.serverOffset && !client.recovered) {
      const prevMessages = await this.messagesService.recoveryMessages(
        chatRoom._id
      );

      //TODO: SEND IT TO JUST THE CLIENT WHO IS CONNECTED! && AUTO RESTORE
      prevMessages.forEach((data) => {
        this.server
          .to(roomId)
          .emit(
            "chat message",
            `${data.user.username}: ${data.message}`,
            data.time
          );
      });
      client.handshake.auth.serverOffset = 1;
    }

    if (roomId == "public") {
      await this.messagesService.createMessageService(
        user,
        message,
        "Public",
        messageTimestamp
      );
      3;
      this.server.to("public").emit("chat message", msg);
    } else {
      await this.messagesService.createMessageService(
        user,
        message,
        chatRoom,
        messageTimestamp
      );
      this.server.to(roomId).emit("chat message", msg);
    }
  }

  // @SubscribeMessage("recoveryMsg")
  // async prevMsg(@ConnectedSocket() client: Socket, @MessageBody() roomId: any) {
  //   // console.log("firstttttttttttt", roomId);

  //   // let roomId = client.handshake.headers.referer.split("/")[6];
  //   // console.log(client.handshake.headers.referer.split("/"));

  //   const chatRoom = await this.chatRoomService.findByRoomId(roomId);

  //   // console.log("+++++++++++++", chatRoom);

  //   if (!client.handshake.auth.serverOffset && !client.recovered) {
  //     // console.log("Seconddddddddddddd");

  //     const prevMessages = await this.messagesService.recoveryMessages(
  //       chatRoom._id
  //     );
  //     prevMessages.forEach((data) => {
  //       console.log("+++++++++++++", data.message);

  //       // this.server.on("chat message", () => {
  //       //   this.server.to(roomId).emit("chat message", data.message);
  //       // });
  //       this.server.to(roomId).emit("chat message", data.message);
  //     });
  //     client.handshake.auth.serverOffset = 1;
  //   }
  // }

  @SubscribeMessage("typing")
  istyping(@MessageBody() msg: any, @ConnectedSocket() client: Socket) {
    let roomId = client.handshake.headers.referer.split("/")[6];

    if (roomId == "public") {
      client.broadcast.to("public").emit("typing", msg);
    } else {
      client.broadcast.to(roomId).emit("typing", msg);
    }
  }

  @SubscribeMessage("stop typing")
  isNotTyping(@MessageBody() msg: any, @ConnectedSocket() client: Socket) {
    let roomId = client.handshake.headers.referer.split("/")[6];

    if (roomId == "public") {
      client.broadcast.to("public").emit("stop typing", "");
    } else {
      client.broadcast.to(roomId).emit("stop typing", "");
    }
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

    // console.log("--------------------usernames : ", usernames);
    // console.log("--------------------nickName : ", nickName);

    usernames.forEach(async (user) => {
      let users = await this.userService.findByUsername(user);
      usersId.push(users._id);
    });
    let mainUser = await this.userService.findByUsername(nickName);
    usersId.push(mainUser._id);

    const roomTarget = await this.chatRoomService.createChatRoom(
      roomId,
      usersId
    );

    // console.log("--------------------", usersId);

    usersId = []; // ?
    client.emit("chatRoomCreated", roomTarget);
  }
}
