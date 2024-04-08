import { Module } from "@nestjs/common";
import { ChatRoomsService } from "./chat-rooms.service";
import { ChatRoomsGateway } from "./chat-rooms.gateway";
import { UsersModule } from "src/users/users.module";
import { MongooseModule } from "@nestjs/mongoose";
import { ChatRooms, chatRoomsSchema } from "./schema/chat-room.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ChatRooms.name, schema: chatRoomsSchema },
    ]),
    UsersModule,
  ],
  providers: [ChatRoomsGateway, ChatRoomsService],
  exports: [ChatRoomsService],
})
export class ChatRoomsModule {}
