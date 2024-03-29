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
exports.SocketAuthGuardMiddleware = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const auth_constants_1 = require("../common/constants/auth.constants");
let SocketAuthGuardMiddleware = class SocketAuthGuardMiddleware {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async use(req, res, next) {
        const client = req["client"];
        const extractedCookie = req.headers.cookie;
        if (!extractedCookie) {
            throw new Error("No cookies found in the handshake headers");
        }
        const accessToken = extractedCookie.split("=")[1];
        if (!accessToken) {
            throw new Error("Access token not found");
        }
        try {
            const payload = await this.jwtService.verifyAsync(accessToken, {
                secret: auth_constants_1.SECRET_KEY,
            });
            client.headers.user = payload;
            console.log("User payload:", client.headers.user);
            next();
        }
        catch (error) {
            next(error);
        }
    }
};
exports.SocketAuthGuardMiddleware = SocketAuthGuardMiddleware;
exports.SocketAuthGuardMiddleware = SocketAuthGuardMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], SocketAuthGuardMiddleware);
//# sourceMappingURL=messenger.middleware.js.map