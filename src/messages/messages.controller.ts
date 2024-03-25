import { MessagesService } from './messages.service'
import { UsersService } from 'src/users/users.service'
import { JwtService } from '@nestjs/jwt'
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common'
import { dirname, join } from 'path'
import { Response, Request } from 'express'
import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { CreateMessageDto } from './dto/create-message.dto'
import { Public } from 'src/common/decorators/public.decorators'

@Public()
@Controller('api/v1')
export class messageController {
  constructor(
    private readonly messagesService: MessagesService,
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  //   // @Public()
  //   @Get('/')
  //   testDirname() {
  //     console.log('direname : +++++++++++++++++++++++++++', __filename)
  //   }

  @Get('register')
  getRegisterForm(@Res() res: Response, @Req() req: Request) {
    // res.sendFile(join(__dirname, 'register.html'))
    res.sendFile(join('/app/src/client', 'register.html'))
  }

  @Post('register')
  registerInSocket(
    @Res() res: Response,
    @Req() req: Request,
    @Body() createUserDto: CreateUserDto,
  ) {
    try {
      this.usersService.create(createUserDto)
      return res.json({
        msg: 'user has been created by socket inputs',
        user: createUserDto.username,
      })
    } catch (error) {
      console.log(error)
    }
  }

  @Get('login')
  getLoginForm(@Res() res: Response, @Req() req: Request) {
    // res.sendFile(join(__dirname, 'login.html'))
    res.sendFile(join('/app/src/client', 'login.html'))
  }

  @Post('login')
  async logInSocket(
    @Res() res: Response,
    @Req() req: Request,
    @Body() createUserDto: CreateUserDto,
  ) {
    try {
      const user = await this.usersService.findByUsername(
        createUserDto.username,
      )
      if (user?.password !== createUserDto.password) {
        throw new UnauthorizedException()
      }

      const payload = { username: user.username, sub: user.id }
      //   return {
      //     access_token: await this.jwtService.signAsync(payload),
      //   }
      console.log({ access_token: await this.jwtService.signAsync(payload) })
    } catch (error) {
      console.log(error)
    }
  }
}
