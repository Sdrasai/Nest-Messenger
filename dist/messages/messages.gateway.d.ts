import { MessagesService } from "./messages.service";
import { Server, Socket } from "socket.io";
import { JwtService } from "@nestjs/jwt";
<<<<<<< HEAD
<<<<<<< HEAD
export declare class MessagesGateway {
    private readonly messagesService;
    private jwtService;
    server: Server;
    private readonly logger;
    constructor(messagesService: MessagesService, jwtService: JwtService);
=======
=======
>>>>>>> 563b972bb51baf7c058b82b4c70b02d22f39a585
import { UsersService } from "src/users/users.service";
export declare class MessagesGateway {
    private readonly messagesService;
    private readonly userService;
    private jwtService;
    server: Server;
    private readonly logger;
    constructor(messagesService: MessagesService, userService: UsersService, jwtService: JwtService);
<<<<<<< HEAD
>>>>>>> 563b972bb51baf7c058b82b4c70b02d22f39a585
=======
>>>>>>> 563b972bb51baf7c058b82b4c70b02d22f39a585
    afterInit(): void;
    handleConnection(client: any, ...args: any[]): Promise<void>;
    handleDisconnect(client: any): void;
    message(msg: any, client: Socket): Promise<void>;
    istyping(msg: any, client: Socket): void;
    isNotTyping(msg: any, client: Socket): void;
<<<<<<< HEAD
<<<<<<< HEAD
=======
    handleCreateChatRoom(usernames: string[], client: Socket): Promise<void>;
    handleJoinRoom(roomId: string, client: Socket): void;
    sendMessageToRoom(roomId: string, message: string): void;
>>>>>>> 563b972bb51baf7c058b82b4c70b02d22f39a585
=======
    handleCreateChatRoom(usernames: string[], client: Socket): Promise<void>;
    handleJoinRoom(roomId: string, client: Socket): void;
    sendMessageToRoom(roomId: string, message: string): void;
>>>>>>> 563b972bb51baf7c058b82b4c70b02d22f39a585
}
