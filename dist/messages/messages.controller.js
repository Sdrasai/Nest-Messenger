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
const create_user_dto_1 = require("../users/dto/create-user.dto");
const public_decorators_1 = require("../common/decorators/public.decorators");
const path = require("path");
let messageController = class messageController {
    constructor(messagesService, usersService, jwtService) {
        this.messagesService = messagesService;
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    getRegisterForm(res, req) {
        const filePath = path.resolve(__dirname, "../../src/client/register.html");
        res.sendFile(filePath);
    }
    registerInSocket(res, req, createUserDto) {
        try {
            this.usersService.create(createUserDto);
            res.send(`
        <script>
          alert("You're registered successfully!");
          window.location.href = 'http://localhost:3000/api/v1/login';
        </script>
      `);
        }
        catch (error) {
            console.log(error);
        }
    }
    getLoginForm(res, req) {
        const filePath = path.resolve(__dirname, "../../src/client/login.html");
        res.sendFile(filePath);
    }
    async logInSocket(res, req, createUserDto) {
        try {
            const user = await this.usersService.findByUsername(createUserDto.username);
            if (user?.password !== createUserDto.password) {
                throw new common_1.UnauthorizedException();
            }
            const payload = { username: user.username, sub: user.id };
            const access_token = await this.jwtService.signAsync(payload);
            return res
                .cookie("access_token", access_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
            })
                .status(200)
                .redirect("chat");
        }
        catch (error) {
            console.log(error);
        }
    }
    getIndexChat(res, req, next) {
        try {
            const filePath = path.resolve(__dirname, "../../src/client/index.html");
            res.sendFile(filePath);
        }
        catch (error) {
            console.log("Error", error);
        }
    }
    homePage(res, req, next) {
        try {
            const filePath = path.resolve(__dirname, "../../src/client/home.html");
            res.sendFile(filePath);
        }
        catch (error) {
            console.log("Error", error);
        }
    }
    roomPage(roomId, res, req, next) {
        try {
            const filePath = path.resolve(__dirname, "../../src/client/index.html");
            res.sendFile(filePath);
        }
        catch (error) {
            console.log("Error", error);
        }
    }
};
exports.messageController = messageController;
__decorate([
    (0, common_1.Get)("register"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], messageController.prototype, "getRegisterForm", null);
__decorate([
    (0, common_1.Post)("register"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], messageController.prototype, "registerInSocket", null);
__decorate([
    (0, common_1.Get)("login"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], messageController.prototype, "getLoginForm", null);
__decorate([
    (0, common_1.Post)("login"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], messageController.prototype, "logInSocket", null);
__decorate([
    (0, common_1.Get)("chat"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", void 0)
], messageController.prototype, "getIndexChat", null);
__decorate([
    (0, common_1.Get)("home"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", void 0)
], messageController.prototype, "homePage", null);
__decorate([
    (0, common_1.Get)("chat/:roomId"),
    __param(0, (0, common_1.Param)("roomId")),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Function]),
    __metadata("design:returntype", void 0)
], messageController.prototype, "roomPage", null);
exports.messageController = messageController = __decorate([
    (0, public_decorators_1.Public)(),
    (0, common_1.Controller)("api/v1"),
    __metadata("design:paramtypes", [messages_service_1.MessagesService,
        users_service_1.UsersService,
        jwt_1.JwtService])
], messageController);
//# sourceMappingURL=messages.controller.js.map