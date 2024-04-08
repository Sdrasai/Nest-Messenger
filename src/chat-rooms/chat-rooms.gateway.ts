import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from "@nestjs/websockets";
import { ChatRoomsService } from "./chat-rooms.service";
import { CreateChatRoomDto } from "./dto/create-chat-room.dto";
import { UpdateChatRoomDto } from "./dto/update-chat-room.dto";

@WebSocketGateway()
export class ChatRoomsGateway {
  constructor(private readonly chatRoomsService: ChatRoomsService) {}

  // @SubscribeMessage('createChatRoom')
  // create(@MessageBody() createChatRoomDto: CreateChatRoomDto) {
  //   return this.chatRoomsService.create(createChatRoomDto);
  // }

  // @SubscribeMessage('findAllChatRooms')
  // findAll() {
  //   return this.chatRoomsService.findAll();
  // }

  // @SubscribeMessage('findOneChatRoom')
  // findOne(@MessageBody() id: number) {
  //   return this.chatRoomsService.findOne(id);
  // }

  // @SubscribeMessage('updateChatRoom')
  // update(@MessageBody() updateChatRoomDto: UpdateChatRoomDto) {
  //   return this.chatRoomsService.update(updateChatRoomDto.id, updateChatRoomDto);
  // }

  // @SubscribeMessage('removeChatRoom')
  // remove(@MessageBody() id: number) {
  //   return this.chatRoomsService.remove(id);
  // }
}
