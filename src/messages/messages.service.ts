import { Injectable } from "@nestjs/common";
import { CreateMessageDto } from "./dto/create-message.dto";

import { SubscribeMessage } from "@nestjs/websockets";
import { InjectModel } from "@nestjs/mongoose";
import { Message } from "./entities/message.entity";
import { Model } from "mongoose";

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>
  ) {}

  createMessageService(user: any, message: string) {
    return this.messageModel.create(user, message);
  }

  findAllService() {
    return this.messageModel.find();
  }
}
