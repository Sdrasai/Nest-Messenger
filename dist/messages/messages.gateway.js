"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var MessagesGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const messages_service_1 = require("./messages.service");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
<<<<<<< HEAD
let MessagesGateway = MessagesGateway_1 = class MessagesGateway {
    constructor(messagesService, jwtService) {
        this.messagesService = messagesService;
=======
const users_service_1 = require("../users/users.service");
const uuid_1 = require("uuid");
let MessagesGateway = MessagesGateway_1 = class MessagesGateway {
    constructor(messagesService, userService, jwtService) {
        this.messagesService = messagesService;
        this.userService = userService;
>>>>>>> 563b972bb51baf7c058b82b4c70b02d22f39a585
        this.jwtService = jwtService;
        this.logger = new common_1.Logger(MessagesGateway_1.name);
    }
    afterInit() {
        this.logger.log("Initialized");
    }
    async handleConnection(client, ...args) {
        const { sockets } = this.server.sockets;
<<<<<<< HEAD
        this.logger.log(`Client id: ${client.id} connected`);
        this.logger.debug(`Number of connected clients: ${sockets.size}`);
        const extractedCookie = client.handshake.headers.cookie;
        const nickName = extractedCookie.split(";")[1].split("=")[1];
=======
        this.logger.log(`client id: ${client.id} connected`);
        this.logger.debug(`Number of connected clients: ${sockets.size}`);
        const extractedCookie = client.handshake.headers.cookie;
        const nickName = extractedCookie?.split(";")[1]?.split("=")[1];
>>>>>>> 563b972bb51baf7c058b82b4c70b02d22f39a585
        client.emit("connected-user", nickName);
    }
    handleDisconnect(client) {
        this.logger.log(`Cliend id:${client.id} disconnected`);
    }
    async message(msg, client) {
<<<<<<< HEAD
=======
        let message = msg.split(":")[1];
        let username = msg.split(": ")[0];
        const user = await this.userService.findByUsername(username);
        await this.messagesService.createMessageService(user, message);
>>>>>>> 563b972bb51baf7c058b82b4c70b02d22f39a585
        this.server.emit("chat message", msg);
    }
    istyping(msg, client) {
        client.broadcast.emit("typing", msg);
    }
    isNotTyping(msg, client) {
        client.broadcast.emit("stop typing", "");
    }
<<<<<<< HEAD
=======
    async handleCreateChatRoom(usernames, client) {
        const extractedCookie = client.handshake.headers.cookie;
        const nickName = extractedCookie?.split(";")[1]?.split("=")[1];
        const roomId = (0, uuid_1.v4)();
        await this.userService.createChatRoom(roomId, nickName);
        const roomTarget = await this.userService.createChatRoom(roomId, usernames);
        client.emit("chatRoomCreated", roomTarget);
    }
    handleJoinRoom(roomId, client) {
        client.join(roomId);
    }
    sendMessageToRoom(roomId, message) {
        this.server.to(roomId).emit("message", message);
    }
>>>>>>> 563b972bb51baf7c058b82b4c70b02d22f39a585
};
exports.MessagesGateway = MessagesGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], MessagesGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)("chat message"),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], MessagesGateway.prototype, "message", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("typing"),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], MessagesGateway.prototype, "istyping", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("stop typing"),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], MessagesGateway.prototype, "isNotTyping", null);
<<<<<<< HEAD
=======
__decorate([
    (0, websockets_1.SubscribeMessage)("createChatRoom"),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], MessagesGateway.prototype, "handleCreateChatRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("joinRoom"),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], MessagesGateway.prototype, "handleJoinRoom", null);
>>>>>>> 563b972bb51baf7c058b82b4c70b02d22f39a585
exports.MessagesGateway = MessagesGateway = MessagesGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            orogin: "*",
        },
    }),
    __metadata("design:paramtypes", [messages_service_1.MessagesService,
<<<<<<< HEAD
=======
        users_service_1.UsersService,
>>>>>>> 563b972bb51baf7c058b82b4c70b02d22f39a585
        jwt_1.JwtService])
], MessagesGateway);
//# sourceMappingURL=messages.gateway.js.map