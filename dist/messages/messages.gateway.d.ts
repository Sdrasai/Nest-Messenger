/// <reference types="cookie-parser" />
import { MessagesService } from "./messages.service";
import { Server, Socket } from "socket.io";
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";
export declare class MessagesGateway {
    private readonly messagesService;
    private jwtService;
    server: Server;
    private readonly logger;
    constructor(messagesService: MessagesService, jwtService: JwtService);
    afterInit(): void;
    handleConnection(client: any, ...args: any[]): void;
    handleDisconnect(client: any): void;
    test(msg: any, req: Request, client: Socket): Promise<void>;
}
