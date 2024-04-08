import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<import("src/users/user.interface").IUser>;
    findAll(): Promise<import("src/users/user.interface").IUser[]>;
    findOne(id: string): Promise<import("src/users/user.interface").IUser>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("src/users/user.interface").IUser>;
    remove(id: string, res: Response): Response<any, Record<string, any>>;
}
