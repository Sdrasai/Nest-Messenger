import { Module } from "@nestjs/common";
import { MessagesService } from "./messages.service";
import { MessagesGateway } from "./messages.gateway";
import { Message, messageSchema } from "./schema/message.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersService } from "src/users/users.service";
import { JwtModule } from "@nestjs/jwt";
import { SECRET_KEY } from "src/common/constants/auth.constants";
import { AuthService } from "src/auth/auth.service";
import { UsersModule } from "src/users/users.module";
import { messageController } from "./messages.controller";
import { ChatRoomsModule } from "src/chat-rooms/chat-rooms.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: messageSchema }]),
    JwtModule.register({
      global: true,
      secret: SECRET_KEY,
      signOptions: { expiresIn: 60 * 60 * 60 },
    }),
    UsersModule,
    ChatRoomsModule,
  ],
  controllers: [messageController],
  providers: [MessagesGateway, MessagesService],
  exports: [MessagesService],
})
export class MessagesModule {}
