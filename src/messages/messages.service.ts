<<<<<<< HEAD
import { Injectable } from "@nestjs/common";
import { CreateMessageDto } from "./dto/create-message.dto";

import { SubscribeMessage } from "@nestjs/websockets";
import { InjectModel } from "@nestjs/mongoose";
import { Message } from "./schema/message.schema";
import { Model } from "mongoose";
=======
import { Injectable } from '@nestjs/common'
import { CreateMessageDto } from './dto/create-message.dto'

import { SubscribeMessage } from '@nestjs/websockets'
import { InjectModel } from '@nestjs/mongoose'
import { Message } from './entities/message.entity'
import { Model } from 'mongoose'
>>>>>>> main

@Injectable()
export class MessagesService {
  constructor(
<<<<<<< HEAD
    @InjectModel(Message.name) private messageModel: Model<Message>
  ) {}

  async createMessageService(user: any, message: string): Promise<Message> {
    return await this.messageModel.create({
      user,
      message,
    });
  }
  findAllService() {
    return this.messageModel.find();
=======
    @InjectModel(Message.name) private messageModel: Model<Message>,
  ) {}

  createMessageService(createMessageDto: CreateMessageDto) {
    return this.messageModel.create(createMessageDto)
  }

  findAllService() {
    return this.messageModel.find()
>>>>>>> main
  }
}
