import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schema/user.schema';
import { IUser } from './schema/user.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<IUser>) {}
  async create(createUserDto: CreateUserDto): Promise<IUser> {
    return await this.userModel.create(createUserDto);
  }

  async findAll(): Promise<IUser[]> {
    return await this.userModel.find();
  }

  async findOne(id: string): Promise<IUser> {
    return await this.userModel.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<IUser> {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
  }

  async remove(id: string): Promise<IUser> {
    return await this.userModel.findByIdAndDelete(id);
  }
}
