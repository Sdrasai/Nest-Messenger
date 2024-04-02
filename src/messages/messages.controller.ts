import { MessagesService } from "./messages.service";
import { UsersService } from "src/users/users.service";
import { JwtService } from "@nestjs/jwt";
import {
  Body,
  Controller,
  Get,
  Next,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { dirname, join } from "path";
import { Response, Request, NextFunction } from "express";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { CreateMessageDto } from "./dto/create-message.dto";
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
    // res.sendFile(join(__dirname, 'register.html'))
    // res.sendFile(join("/app/src/client", "register.html"));
    const filePath = path.resolve(__dirname, "../../src/client/register.html");
    res.sendFile(filePath);
  }

  @Post("register")
  registerInSocket(
    @Res() res: Response,
    @Req() req: Request,
    @Body() createUserDto: CreateUserDto
  ) {
    try {
      this.usersService.create(createUserDto);
      return res.json({
        msg: "user has been created by socket inputs",
        user: createUserDto.username,
      });
    } catch (error) {
      console.log(error);
    }
  }

  @Get("login")
  getLoginForm(@Res() res: Response, @Req() req: Request) {
    // res.sendFile(join(__dirname, 'login.html'))
    // res.sendFile(join("/app/src/client", "login.html"));
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

      console.log("Tokennnnn", access_token);

      return res
        .cookie("access_token", access_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        })
        .status(200)
        .redirect("chat");
    } catch (error) {
      console.log(error);
    }
  }

  @Get("chat")
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
      // return res.redirect("http://localhost:3000/api/v1/login");
    }
  }
}
