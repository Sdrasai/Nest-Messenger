import { MessagesService } from './messages.service';
import { Server } from 'socket.io';
export declare class MessagesGateway {
    private readonly messagesService;
    server: Server;
    private readonly logger;
    constructor(messagesService: MessagesService);
    afterInit(): void;
    handleConnection(client: any, ...args: any[]): void;
    handleDisconnect(client: any): void;
    handleEvent(socket: any): void;
    test(msg: any): void;
}
