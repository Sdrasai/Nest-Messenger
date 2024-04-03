import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
<<<<<<< HEAD
import { getConnectionToken, MongooseModule } from "@nestjs/mongoose";
=======
import { MongooseModule } from "@nestjs/mongoose";
>>>>>>> main
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./common/guards/auth.guard";

import { MessagesModule } from "./messages/messages.module";
<<<<<<< HEAD
import { SocketAuthGuardMiddleware } from "./middlewares/messenger.middleware";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
// import { Message, messageSchema } from "./messages/entities/message.entity";
// import { Connection } from "mongoose";
// import * as AutoIncrementFactory from "mongoose-sequence";
=======
import { MessagesGateway } from "./messages/messages.gateway";
import { SocketAuthGuardMiddleware } from "./middlewares/messenger.middleware";
>>>>>>> main

@Module({
  imports: [
    UsersModule,
    AuthModule,
<<<<<<< HEAD
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

=======
    MongooseModule.forRoot("mongodb://mongodb:27017/Messenger"),
>>>>>>> main
    MessagesModule,
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
    consumer.apply(SocketAuthGuardMiddleware).forRoutes("api/v1/chat");
  }
}
// export class AppModule {}
