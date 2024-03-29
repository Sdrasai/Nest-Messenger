import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./common/guards/auth.guard";

import { MessagesModule } from "./messages/messages.module";
import { MessagesGateway } from "./messages/messages.gateway";
import { SocketAuthGuardMiddleware } from "./middlewares/messenger.middleware";

@Module({
  imports: [
    UsersModule,
    AuthModule,
    MongooseModule.forRoot("mongodb://mongodb:27017/Messenger"),
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
