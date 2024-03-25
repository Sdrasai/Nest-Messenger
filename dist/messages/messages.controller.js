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
exports.messageController = void 0;
const messages_service_1 = require("./messages.service");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const create_user_dto_1 = require("../users/dto/create-user.dto");
const public_decorators_1 = require("../common/decorators/public.decorators");
let messageController = class messageController {
    constructor(messagesService, usersService, jwtService) {
        this.messagesService = messagesService;
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    getRegisterForm(res, req) {
        res.sendFile((0, path_1.join)('/app/src/client', 'register.html'));
    }
    registerInSocket(res, req, createUserDto) {
        try {
            this.usersService.create(createUserDto);
            return res.json({
                msg: 'user has been created by socket inputs',
                user: createUserDto.username,
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    getLoginForm(res, req) {
        res.sendFile((0, path_1.join)('/app/src/client', 'login.html'));
    }
    async logInSocket(res, req, createUserDto) {
        try {
            const user = await this.usersService.findByUsername(createUserDto.username);
            if (user?.password !== createUserDto.password) {
                throw new common_1.UnauthorizedException();
            }
            const payload = { username: user.username, sub: user.id };
            console.log({ access_token: await this.jwtService.signAsync(payload) });
        }
        catch (error) {
            console.log(error);
        }
    }
};
exports.messageController = messageController;
__decorate([
    (0, common_1.Get)('register'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], messageController.prototype, "getRegisterForm", null);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], messageController.prototype, "registerInSocket", null);
__decorate([
    (0, common_1.Get)('login'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], messageController.prototype, "getLoginForm", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], messageController.prototype, "logInSocket", null);
exports.messageController = messageController = __decorate([
    (0, public_decorators_1.Public)(),
    (0, common_1.Controller)('api/v1'),
    __metadata("design:paramtypes", [messages_service_1.MessagesService,
        users_service_1.UsersService,
        jwt_1.JwtService])
], messageController);
//# sourceMappingURL=messages.controller.js.map