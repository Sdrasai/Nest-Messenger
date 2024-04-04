/// <reference types="cookie-parser" />
import { MessagesService } from "./messages.service";
import { UsersService } from "src/users/users.service";
import { JwtService } from "@nestjs/jwt";
import { Response, Request, NextFunction } from "express";
import { CreateUserDto } from "src/users/dto/create-user.dto";
export declare class messageController {
    private readonly messagesService;
    private readonly usersService;
    private jwtService;
    constructor(messagesService: MessagesService, usersService: UsersService, jwtService: JwtService);
    getRegisterForm(res: Response, req: Request): void;
<<<<<<< HEAD
    registerInSocket(res: Response, req: Request, createUserDto: CreateUserDto): Response<any, Record<string, any>>;
    getLoginForm(res: Response, req: Request): void;
    logInSocket(res: Response, req: Request, createUserDto: CreateUserDto): Promise<void>;
    getIndexChat(res: Response, req: Request, next: NextFunction): void;
=======
    registerInSocket(res: Response, req: Request, createUserDto: CreateUserDto): void;
    getLoginForm(res: Response, req: Request): void;
    logInSocket(res: Response, req: Request, createUserDto: CreateUserDto): Promise<void>;
    getIndexChat(res: Response, req: Request, next: NextFunction): void;
    homePage(res: Response, req: Request, next: NextFunction): void;
    roomPage(roomId: any, res: Response, req: Request, next: NextFunction): void;
>>>>>>> 563b972bb51baf7c058b82b4c70b02d22f39a585
}
