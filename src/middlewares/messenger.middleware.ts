import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { JwtService } from "@nestjs/jwt";
import { SECRET_KEY } from "src/common/constants/auth.constants";

@Injectable()
export class SocketAuthGuardMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const extractedCookie = req.headers.cookie;

    //TODO: Pass the error to controller!
    if (!extractedCookie) {
      // throw new Error("No cookies found in the handshake headers");
      console.log("No cookies found in the handshake headers");
      return res.redirect("http://localhost:3000/api/v1/login");
    }

    const accessToken = extractedCookie.split("=")[1];

    if (!accessToken) {
      // throw new Error("Access token not found");
      console.log("Access token not found");
      return res.redirect("http://localhost:3000/api/v1/login");
    }

    try {
      const payload = await this.jwtService.verifyAsync(accessToken, {
        secret: SECRET_KEY,
      });

      req.headers.user = payload;
      // console.log("User payload:", req.headers.user);

      next();
    } catch (error) {
      next(error);
    }
  }
}
