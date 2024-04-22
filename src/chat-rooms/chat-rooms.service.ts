import { Injectable } from "@nestjs/common";
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

  async createChatRoom(roomId: string, usernames: string[]) {
    // console.log("***************************");
    // console.log(roomId);
    // console.log(usernames);

    if (usernames.length == 2) {
      const checkIfExist = await this.chatRoomModel.findOne({
        user: usernames,
      });
      // console.log("***********************************", checkIfExist);

      const usernames1 = [];
      usernames1.push(usernames[1]);
      usernames1.push(usernames[0]);
      const checkIfExist1 = await this.chatRoomModel.findOne({
        user: usernames1,
      });
      // console.log("***********************************", checkIfExist1);

      if (checkIfExist) {
        // console.log("***********************************", checkIfExist);

        return checkIfExist.chatRoomId;
      } else if (checkIfExist1) {
        // console.log("***********************************", checkIfExist1);

        return checkIfExist1.chatRoomId;
      }
    }
    //TODO: handle if usernames.length === 1
    await this.chatRoomModel.create({
      user: usernames,
      chatRoomId: roomId,
    });
    // console.log("&&&&&&&&&&&&&&&", usernames);

    return roomId;
  }
}
