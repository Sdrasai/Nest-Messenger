// import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
// import { Reflector } from "@nestjs/core";
// import cookie from "cookie";
// import { JwtService } from "@nestjs/jwt";
// import { SECRET_KEY } from "src/common/constants/auth.constants";
// import { Server } from "socket.io";

// @Injectable()
// export class SocketAuthGuard implements CanActivate {
//   constructor(
//     private reflector: Reflector,
//     private jwtService: JwtService
//   ) {}
//   server: Server;

//   async canActivate(context: ExecutionContext) {
//     try {
//       const extractedCookie = context.switchToWs().getClient().handshake
//         .headers.cookie;
//       const parsedCookie = cookie.parse(extractedCookie);
//       const payload = await this.jwtService.verifyAsync(
//         parsedCookie["access_token"],
//         {
//           secret: SECRET_KEY,
//         }
//       );
//       this.server.sockets{user} = payload;
//     } catch (error) {}
//   }
// // }
// import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
// import { Reflector } from "@nestjs/core";
// import cookie from "cookie";
// import { JwtService } from "@nestjs/jwt";
// import { SECRET_KEY } from "src/common/constants/auth.constants";
// import { Server } from "socket.io";

// @Injectable()
// export class SocketAuthGuard implements CanActivate {
//   constructor(
//     private reflector: Reflector,
//     private jwtService: JwtService
//   ) {}

//   async canActivate(context: ExecutionContext) {
//     try {
//       const socket = context.switchToWs().getClient();
//       const extractedCookie = socket.handshake.headers.cookie;
//       const parsedCookie = cookie.parse(extractedCookie);

//       if (!parsedCookie || !parsedCookie["access_token"]) {
//         throw new Error("Access token not found");
//       }

//       const accessToken = parsedCookie["access_token"];
//       const payload = await this.jwtService.verifyAsync(accessToken, {
//         secret: SECRET_KEY,
//       });

//       // Assuming you want to store user information in socket's handshake data
//       // This can be accessed later in your gateway
//       socket.handshake.user = payload;

//       return true; // Allow access
//     } catch (error) {
//       // Handle errors such as invalid token or missing token
//       console.error("Error in SocketAuthGuard:", error.message);
//       return false; // Deny access
//     }
//   }
// }
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import cookie from "cookie";
import { JwtService } from "@nestjs/jwt";
import { SECRET_KEY } from "src/common/constants/auth.constants";
import { Socket } from "socket.io";

@Injectable()
export class SocketAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService
  ) {}

  async canActivate(context: ExecutionContext) {
    try {
      const client = context.switchToWs().getClient();
      console.log("Handshake object:", client.handshake);

      // Ensure that the handshake object exists
      if (!client.handshake) {
        throw new Error("Invalid handshake object");
      }

      const extractedCookie = client.handshake.headers?.cookie;
      if (!extractedCookie) {
        throw new Error("No cookies found in the handshake headers");
      }

      const parsedCookie = cookie.parse(extractedCookie);
      if (!parsedCookie || !parsedCookie["access_token"]) {
        throw new Error("Access token not found");
      }

      const accessToken = parsedCookie["access_token"];
      const payload = await this.jwtService.verifyAsync(accessToken, {
        secret: SECRET_KEY,
      });

      // Assuming you want to store user information in socket's handshake data
      // This can be accessed later in your gateway
      //   client.handshake.user = payload;
      const aa = payload;
      console.log("+++++++++++++++++++++++++", payload);

      return true; // Allow access
    } catch (error) {
      // Handle errors such as invalid token or missing token
      console.error("Error in SocketAuthGuard:", error.message);
      return false; // Deny access
    }
  }
}
