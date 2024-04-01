import { MessagesService } from "./messages.service";
import { Server, Socket } from "socket.io";
import { JwtService } from "@nestjs/jwt";
export declare class MessagesGateway {
    private readonly messagesService;
    private jwtService;
    server: Server;
    private readonly logger;
    constructor(messagesService: MessagesService, jwtService: JwtService);
    afterInit(): void;
    handleConnection(client: any, ...args: any[]): Promise<void>;
    handleDisconnect(client: any): void;
    message(msg: any, client: Socket): Promise<void>;
    istyping(msg: any, client: Socket): void;
    isNotTyping(msg: any, client: Socket): void;
}
