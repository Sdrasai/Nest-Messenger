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

  async getRecentConversationsForUser(username: string): Promise<any[]> {
    // Logic to fetch recent conversations for the user
    try {
      const recentConversations = await this.messageModel.aggregate([
        {
          $match: {
            user: username, // Assuming 'user' field in your message schema refers to the username
          },
        },
        {
          $group: {
            _id: "$chatRoom",
            lastMessage: { $last: "$message" }, // Get the last message for each chat room
            count: { $sum: 1 }, // Count the total number of messages in each chat room
          },
        },
      ]);
      return recentConversations;
    } catch (error) {
      console.error("Error fetching recent conversations:", error);
      throw error;
    }
  }
}
