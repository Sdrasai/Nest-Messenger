import { MessagesService } from './messages.service';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
export declare class messageController {
    private readonly messagesService;
    private readonly usersService;
    private jwtService;
    constructor(messagesService: MessagesService, usersService: UsersService, jwtService: JwtService);
    getRegisterForm(res: Response, req: Request): void;
    registerInSocket(res: Response, req: Request, createUserDto: CreateUserDto): Response<any, Record<string, any>>;
    getLoginForm(res: Response, req: Request): void;
    logInSocket(res: Response, req: Request, createUserDto: CreateUserDto): Promise<void>;
}
