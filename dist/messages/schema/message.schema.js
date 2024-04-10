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
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageSchema = exports.Message = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const chat_room_schema_1 = require("../../chat-rooms/schema/chat-room.schema");
const user_schema_1 = require("../../users/schema/user.schema");
let Message = class Message {
};
exports.Message = Message;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: "User" }),
    __metadata("design:type", user_schema_1.User)
], Message.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Message.prototype, "message", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: "ChatRooms" }),
    __metadata("design:type", chat_room_schema_1.ChatRooms)
], Message.prototype, "chatRoom", void 0);
exports.Message = Message = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Message);
exports.messageSchema = mongoose_1.SchemaFactory.createForClass(Message);
//# sourceMappingURL=message.schema.js.map