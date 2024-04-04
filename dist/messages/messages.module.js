"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesModule = void 0;
const common_1 = require("@nestjs/common");
const messages_service_1 = require("./messages.service");
const messages_gateway_1 = require("./messages.gateway");
const message_schema_1 = require("./schema/message.schema");
const mongoose_1 = require("@nestjs/mongoose");
const jwt_1 = require("@nestjs/jwt");
const auth_constants_1 = require("../common/constants/auth.constants");
const users_module_1 = require("../users/users.module");
const messages_controller_1 = require("./messages.controller");
let MessagesModule = class MessagesModule {
};
exports.MessagesModule = MessagesModule;
exports.MessagesModule = MessagesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: message_schema_1.Message.name, schema: message_schema_1.messageSchema }]),
            jwt_1.JwtModule.register({
                global: true,
                secret: auth_constants_1.SECRET_KEY,
                signOptions: { expiresIn: 60 * 60 * 60 },
            }),
            users_module_1.UsersModule,
        ],
        controllers: [messages_controller_1.messageController],
        providers: [messages_gateway_1.MessagesGateway, messages_service_1.MessagesService],
        exports: [messages_service_1.MessagesService],
    })
], MessagesModule);
//# sourceMappingURL=messages.module.js.map