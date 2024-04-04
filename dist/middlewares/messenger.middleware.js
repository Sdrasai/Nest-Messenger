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
        try {
            const extractedCookie = req.headers.cookie;
            if (!extractedCookie) {
                console.log("No cookies found in the handshake headers");
                return res.redirect("http://localhost:3000/api/v1/login");
            }
            const accessToken = extractedCookie.split(";")[0].split("=")[1];
            if (!accessToken) {
                console.log("Access token not found");
                return res.redirect("http://localhost:3000/api/v1/login");
            }
            const payload = await this.jwtService.verifyAsync(accessToken, {
                secret: auth_constants_1.SECRET_KEY,
            });
            res.cookie("userName", payload.username, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
            });
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