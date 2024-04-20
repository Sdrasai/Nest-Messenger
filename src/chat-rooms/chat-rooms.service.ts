import { Injectable } from "@nestjs/common";
import { CreateChatRoomDto } from "./dto/create-chat-room.dto";
import { UpdateChatRoomDto } from "./dto/update-chat-room.dto";
import { InjectModel } from "@nestjs/mongoose";
import { ChatRooms } from "./schema/chat-room.schema";
import { Model } from "mongoose";
import { IChatRooms } from "./chatRoom.interface";

@Injectable()
export class ChatRoomsService {
  constructor(
    @InjectModel(ChatRooms.name) private chatRoomModel: Model<IChatRooms>
  ) {}

  async findByRoomId(roomId: string) {
    const chatRoom = await this.chatRoomModel.findOne({ chatRoomId: roomId });
    return chatRoom;
  }

  async getChatRooms(userId: string): Promise<ChatRooms[]> {
    return await this.chatRoomModel.find({ user: userId }).populate("user");
  }

  async createChatRoom(
    roomId: string,
    usernames: string[] | string
  ): Promise<string> {
    if (usernames.length == 2) {
      const checkIfExist = await this.chatRoomModel.findOne({
        user: usernames,
      });
      const usernames1 = [];
      usernames1.push(usernames[1]);
      usernames1.push(usernames[0]);
      const checkIfExist1 = await this.chatRoomModel.findOne({
        user: usernames1,
      });
      if (checkIfExist) {
        return checkIfExist.chatRoomId;
      } else if (checkIfExist1) {
        return checkIfExist1.chatRoomId;
      }
    }
    //TODO: handle if usernames.length === 1
    await this.chatRoomModel.create({
      user: usernames,
      chatRoomId: roomId,
    });
    return roomId;
  }
}
