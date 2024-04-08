import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./schema/user.schema";
import { IUser } from "./user.interface";
import { Message } from "src/messages/schema/message.schema";
<<<<<<< HEAD
=======
import { ChatRooms } from "src/chat-rooms/schema/chat-room.schema";
import { IChatRooms } from "src/chat-rooms/chatRoom.interface";
>>>>>>> 5e553e57e490483e319f607598792c2ab841dca2

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<IUser>
    // @InjectModel(ChatRooms.name) private chatRoomModel: Model<IChatRooms>
  ) {}
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

  async findByUsername(username: string): Promise<IUser> {
    return await this.userModel.findOne({ username });
<<<<<<< HEAD
  }

  async createChatRoom(
    roomId: string,
    usernames: string[] | string
  ): Promise<string> {

    if (Array.isArray(usernames)) {
      usernames.forEach(async (user) => {
        await this.userModel.findOneAndUpdate(
          { username: user },
          { $push: { userRooms: roomId } },
          { new: true }
        );
      });
    } else {
      await this.userModel.findOneAndUpdate(
        { username: usernames },
        { $push: { userRooms: roomId } },
        { new: true }
      );
    }

    return roomId;
=======
>>>>>>> 5e553e57e490483e319f607598792c2ab841dca2
  }

  // async createChatRoom(
  //   roomId: string,
  //   usernames: string[] | string
  // ): Promise<string> {
  //   // await this.chatRoomModel.create({
  //   //   user :
  //   // });
  //   if (Array.isArray(usernames)) {
  //     usernames.forEach(async (user) => {
  //       await this.userModel.findOneAndUpdate(
  //         { username: user },
  //         { $push: { userRooms: roomId } },
  //         { new: true }
  //       );
  //     });
  //   } else {
  //     await this.userModel.findOneAndUpdate(
  //       { username: usernames },
  //       { $push: { userRooms: roomId } },
  //       { new: true }
  //     );
  //   }

  //   return roomId;
  // }
}
