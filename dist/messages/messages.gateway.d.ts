import { MessagesService } from "./messages.service";
import { Server, Socket } from "socket.io";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import { ChatRoomsService } from "src/chat-rooms/chat-rooms.service";
export declare class MessagesGateway {
    private readonly messagesService;
    private readonly userService;
    private readonly chatRoomService;
    private jwtService;
    server: Server;
    private readonly logger;
    constructor(messagesService: MessagesService, userService: UsersService, chatRoomService: ChatRoomsService, jwtService: JwtService);
    afterInit(): void;
    handleConnection(client: any, ...args: any[]): Promise<void>;
    handleDisconnect(client: any): void;
    message(msg: any, client: Socket): Promise<void>;
    istyping(msg: any, client: Socket): void;
    isNotTyping(msg: any, client: Socket): void;
    handleCreateChatRoom(usernames: string[], client: Socket): Promise<void>;
    handleJoinRoom(roomId: string, client: Socket): void;
    sendMessageToRoom(roomId: string, message: string): void;
}
