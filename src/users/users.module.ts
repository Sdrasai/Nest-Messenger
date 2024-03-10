import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { MongooseModule } from '@nestjs/mongoose'
import { UsersController } from './users.controller'
import { User, userSchema } from './schema/user.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
