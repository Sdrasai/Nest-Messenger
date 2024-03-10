import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { SECRET_KEY } from 'src/common/constants/auth.constants';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: SECRET_KEY,
      signOptions: { expiresIn: 60 * 60 * 60 },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
