import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { getConnectionToken, MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./common/guards/auth.guard";

import { MessagesModule } from "./messages/messages.module";
import { SocketAuthGuardMiddleware } from "./middlewares/messenger.middleware";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
// import { Message, messageSchema } from "./messages/entities/message.entity";
// import { Connection } from "mongoose";
import { ChatRoomsModule } from "./chat-rooms/chat-rooms.module";
// import * as AutoIncrementFactory from "mongoose-sequence";

@Module({
  imports: [
    UsersModule,
    AuthModule,
    MongooseModule.forRoot("mongodb://localhost:27017/Messenger"),
    // MongooseModule.forFeatureAsync([
    //   {
    //     name: Message.name,
    //     useFactory: async (connection: Connection) => {
    //       const schema = messageSchema;
    //       const AutoIncrement = AutoIncrementFactory(connection);
    //       schema.plugin(AutoIncrement, { inc_field: "id" });
    //       return schema;
    //     },
    //     inject: [getConnectionToken("mongodb://mongodb:27017/Messenger")],
    //   },
    // ]),
    ServeStaticModule.forRoot({
      serveRoot: "/api/v1/chat",
      rootPath: join(__dirname, "../../../src", "client"),
    }),

    MessagesModule,

    ChatRoomsModule,
  ],
  controllers: [AppController],
  providers: [
    // MessagesGateway,
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SocketAuthGuardMiddleware)
      .exclude("api/v1/login")
      .forRoutes("api/v1/chat/public", "api/v1/home", "api/v1/chat/*");
  }
}
// export class AppModule {}
