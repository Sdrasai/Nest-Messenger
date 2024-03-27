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
exports.SocketAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const cookie_1 = require("cookie");
const jwt_1 = require("@nestjs/jwt");
const auth_constants_1 = require("../common/constants/auth.constants");
let SocketAuthGuard = class SocketAuthGuard {
    constructor(reflector, jwtService) {
        this.reflector = reflector;
        this.jwtService = jwtService;
    }
    async canActivate(context) {
        try {
            const client = context.switchToWs().getClient();
            console.log("Handshake object:", client.handshake);
            if (!client.handshake) {
                throw new Error("Invalid handshake object");
            }
            const extractedCookie = client.handshake.headers?.cookie;
            if (!extractedCookie) {
                throw new Error("No cookies found in the handshake headers");
            }
            const parsedCookie = cookie_1.default.parse(extractedCookie);
            if (!parsedCookie || !parsedCookie["access_token"]) {
                throw new Error("Access token not found");
            }
            const accessToken = parsedCookie["access_token"];
            const payload = await this.jwtService.verifyAsync(accessToken, {
                secret: auth_constants_1.SECRET_KEY,
            });
            const aa = payload;
            console.log("+++++++++++++++++++++++++", payload);
            return true;
        }
        catch (error) {
            console.error("Error in SocketAuthGuard:", error.message);
            return false;
        }
    }
};
exports.SocketAuthGuard = SocketAuthGuard;
exports.SocketAuthGuard = SocketAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        jwt_1.JwtService])
], SocketAuthGuard);
//# sourceMappingURL=messenger.middleware.js.map