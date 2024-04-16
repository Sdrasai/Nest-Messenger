import { MessagesService } from "./messages.service";
import { UsersService } from "src/users/users.service";
import { JwtService } from "@nestjs/jwt";
import {
  Body,
  Controller,
  Get,
  Next,
  Param,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from "@nestjs/common";

import { Response, Request, NextFunction } from "express";
import { CreateUserDto } from "src/users/dto/create-user.dto";

import { Public } from "src/common/decorators/public.decorators";
import * as path from "path";

@Public()
@Controller("api/v1")
export class messageController {
  constructor(
    private readonly messagesService: MessagesService,
    private readonly usersService: UsersService,
    private jwtService: JwtService
  ) {}

  @Get("register")
  getRegisterForm(@Res() res: Response, @Req() req: Request) {
    const filePath = path.resolve(__dirname, "../../src/client/register.html");
    res.sendFile(filePath);
  }

  @Post("register")
  async registerInSocket(
    @Res() res: Response,
    @Req() req: Request,
    @Body() createUserDto: CreateUserDto
  ) {
    try {
      await this.usersService.create(createUserDto);

      // Send success message and redirect to chat page
      res.send(`
        <script>
          alert("You're registered successfully!");
          window.location.href = 'http://localhost:3000/api/v1/login';
        </script>
      `);
    } catch (error) {
      console.log(error);
      // Handle error if necessary
    }
  }

  @Get("login")
  getLoginForm(@Res() res: Response, @Req() req: Request) {
    const filePath = path.resolve(__dirname, "../../src/client/login.html");
    res.sendFile(filePath);
  }

  @Post("login")
  async logInSocket(
    @Res() res: Response,
    @Req() req: Request,
    @Body() createUserDto: CreateUserDto
  ) {
    try {
      const user = await this.usersService.findByUsername(
        createUserDto.username
      );
      if (user?.password !== createUserDto.password) {
        throw new UnauthorizedException();
      }

      const payload = { username: user.username, sub: user.id };
      const access_token = await this.jwtService.signAsync(payload);

      return res
        .cookie("access_token", access_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        })
        .status(200)
        .redirect("home");
    } catch (error) {
      console.log(error);
    }
  }

  @Get("chat/public")
  getIndexChat(
    @Res() res: Response,
    @Req() req: Request,
    @Next() next: NextFunction
  ) {
    try {
      // return res.sendFile(join("/app/src/client", "index.html"));
      const filePath = path.resolve(__dirname, "../../src/client/index.html");
      res.sendFile(filePath);
    } catch (error) {
      console.log("Error", error);
    }
  }

  @Get("home")
  homePage(
    @Res() res: Response,
    @Req() req: Request,
    @Next() next: NextFunction
  ) {
    try {
      // return res.sendFile(join("/app/src/client", "index.html"));
      const filePath = path.resolve(__dirname, "../../src/client/home.html");
      res.sendFile(filePath);
    } catch (error) {
      console.log("Error", error);
    }
  }

  @Get("chat/:roomId")
  roomPage(
    @Param("roomId") roomId: any,
    @Res() res: Response,
    @Req() req: Request,
    @Next() next: NextFunction
  ) {
    try {
      // return res.sendFile(join("/app/src/client", "index.html"));
      const filePath = path.resolve(__dirname, "../../src/client/index.html");
      res.sendFile(filePath);
    } catch (error) {
      console.log("Error", error);
    }
  }
}
