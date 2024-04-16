import { Injectable } from "@nestjs/common";
import { CreateMessageDto } from "./dto/create-message.dto";

import { SubscribeMessage } from "@nestjs/websockets";
import { InjectModel } from "@nestjs/mongoose";
import { Message } from "./schema/message.schema";
import { Model, Types } from "mongoose";

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>
  ) {}

  async createMessageService(
    user: any,
    message: string,
    chatRoom: any
  ): Promise<Message> {
    return await this.messageModel.create({
      user,
      message,
      chatRoom,
    });
  }
  findAllService() {
    return this.messageModel.find();
  }
  async getMessagesForRoom(roomId: Types.ObjectId): Promise<Message[]> {
    try {
      const messages = await this.messageModel
        .find({ chatRoom: roomId })
        .sort({ createdAt: "asc" }) // or 'desc' depending on your requirement
        .exec();
      return messages;
    } catch (error) {
      console.error("Error fetching messages:", error);
      throw error;
    }
  }
}
