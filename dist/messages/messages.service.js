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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
<<<<<<< HEAD
const message_entity_1 = require("./entities/message.entity");
=======
const message_schema_1 = require("./schema/message.schema");
>>>>>>> 563b972bb51baf7c058b82b4c70b02d22f39a585
const mongoose_2 = require("mongoose");
let MessagesService = class MessagesService {
    constructor(messageModel) {
        this.messageModel = messageModel;
    }
<<<<<<< HEAD
    createMessageService(createMessageDto) {
        return this.messageModel.create(createMessageDto);
=======
    async createMessageService(user, message) {
        return await this.messageModel.create({
            user,
            message,
        });
>>>>>>> 563b972bb51baf7c058b82b4c70b02d22f39a585
    }
    findAllService() {
        return this.messageModel.find();
    }
};
exports.MessagesService = MessagesService;
exports.MessagesService = MessagesService = __decorate([
    (0, common_1.Injectable)(),
<<<<<<< HEAD
    __param(0, (0, mongoose_1.InjectModel)(message_entity_1.Message.name)),
=======
    __param(0, (0, mongoose_1.InjectModel)(message_schema_1.Message.name)),
>>>>>>> 563b972bb51baf7c058b82b4c70b02d22f39a585
    __metadata("design:paramtypes", [mongoose_2.Model])
], MessagesService);
//# sourceMappingURL=messages.service.js.map