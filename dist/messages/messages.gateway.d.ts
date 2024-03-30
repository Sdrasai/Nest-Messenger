/// <reference types="cookie-parser" />
import { MessagesService } from "./messages.service";
import { Server } from "socket.io";
import { Request } from "express";
export declare class MessagesGateway {
    private readonly messagesService;
    server: Server;
    private readonly logger;
    constructor(messagesService: MessagesService);
    afterInit(): void;
    handleConnection(client: any, ...args: any[]): void;
    handleDisconnect(client: any): void;
    test(msg: any, req: Request): void;
}
