"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRoomsModule = void 0;
const common_1 = require("@nestjs/common");
const chat_rooms_service_1 = require("./chat-rooms.service");
const chat_rooms_gateway_1 = require("./chat-rooms.gateway");
const users_module_1 = require("../users/users.module");
const mongoose_1 = require("@nestjs/mongoose");
const chat_room_schema_1 = require("./schema/chat-room.schema");
let ChatRoomsModule = class ChatRoomsModule {
};
exports.ChatRoomsModule = ChatRoomsModule;
exports.ChatRoomsModule = ChatRoomsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: chat_room_schema_1.ChatRooms.name, schema: chat_room_schema_1.chatRoomsSchema },
            ]),
            users_module_1.UsersModule,
        ],
        providers: [chat_rooms_gateway_1.ChatRoomsGateway, chat_rooms_service_1.ChatRoomsService],
        exports: [chat_rooms_service_1.ChatRoomsService],
    })
], ChatRoomsModule);
//# sourceMappingURL=chat-rooms.module.js.map