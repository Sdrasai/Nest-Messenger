// import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
// import { Reflector } from "@nestjs/core";
// import cookie from "cookie";
// import { JwtService } from "@nestjs/jwt";
// import { SECRET_KEY } from "src/common/constants/auth.constants";
// import { Socket } from "socket.io";

// @Injectable()
// export class SocketAuthGuard implements CanActivate {
//   constructor(
//     private reflector: Reflector,
//     private jwtService: JwtService
//   ) {}

//   async canActivate(context: ExecutionContext) {
//     try {
//       const client = context.switchToWs().getClient();
//       // console.log("Cookie : ", client.headers.cookie);

//       const extractedCookie = client.headers.cookie;
//       if (!extractedCookie) {
//         throw new Error("No cookies found in the handshake headers");
//       }

//       const accessToken = extractedCookie.split("=")[1];
//       // console.log(accessToken);

//       if (!accessToken) {
//         throw new Error("Access token not found");
//       }

//       const payload = await this.jwtService.verifyAsync(accessToken, {
//         secret: SECRET_KEY,
//       });

//       client.headers.user = payload;
//       // console.log("+++++++++++++++++++++++++++++++++++++", client.headers.user);
//       return true;
//       // //TODO: use cookie parser
//       // const parsedCookie2 = cookie.parse(extractedCookie);

//       // if (!parsedCookie || !parsedCookie["access_token"]) {
//       //   throw new Error("Access token not found");
//       // }

//       // const accessToken = parsedCookie["access_token"];
//       // const payload = await this.jwtService.verifyAsync(accessToken, {
//       //   secret: SECRET_KEY,
//       // });

//       // // Assuming you want to store user information in socket's handshake data
//       // // This can be accessed later in your gateway
//       // //   client.handshake.user = payload;
//       // const aa = payload;
//       // console.log(
//       //   "++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++",
//       //   payload
//       // );

//       // return true; // Allow access
//     } catch (error) {
//       console.error("Error in SocketAuthGuard:", error.message);
//       return false;
//     }
//   }
// }
import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { JwtService } from "@nestjs/jwt";
import { SECRET_KEY } from "src/common/constants/auth.constants";

@Injectable()
export class SocketAuthGuardMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const client = req["client"]; // Assuming you attach client to request object in some earlier middleware

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
        secret: SECRET_KEY,
      });

      client.headers.user = payload;
      console.log("User payload:", client.headers.user);

      next(); // Call next to proceed with the request
    } catch (error) {
      next(error); // Pass any errors to the error handling middleware
    }
  }
}
