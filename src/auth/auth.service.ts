import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string) {
    console.log('+++++++++++++++++++++++++++', username, pass)
    const user = await this.usersService.findByUsername(username)
    console.log('++++++++++++++++++++++++++++', user)

    if (user?.password !== pass) {
      throw new UnauthorizedException()
    }
    const payload = { username: user.username, sub: user.id }
    return {
      access_token: await this.jwtService.signAsync(payload),
    }
  }
}
