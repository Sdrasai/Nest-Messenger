import { Injectable } from "@nestjs/common";
import { CreateMessageDto } from "./dto/create-message.dto";

import { SubscribeMessage } from "@nestjs/websockets";
import { InjectModel } from "@nestjs/mongoose";
import { Message } from "./schema/message.schema";
import { Model } from "mongoose";

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>
  ) {}

  async recoveryMessages(chatRoomId: string) {
    const messages = await this.messageModel
      .find({ chatRoom: chatRoomId })
      .populate("user");
    return messages;
  }

  async createMessageService(
    user: any,
    message: string,
    chatRoom: any,
    time: string
  ): Promise<Message> {
    return await this.messageModel.create({
      user,
      message,
      chatRoom,
      time,
    });
  }
  findAllService() {
    return this.messageModel.find();
  }
}
