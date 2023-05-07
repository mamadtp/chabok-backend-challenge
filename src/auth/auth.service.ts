import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Response, Request } from 'express';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}
  async login(loginAuthDto: LoginAuthDto) {
    const { password, username } = loginAuthDto;
    const user = await this.validateUser(username, password);
    const payload = { username: user.username, userId: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async profile(user: User) {
    return await this.userService.findOne(user.username);
  }

  logout(req: Request, res: Response) {
    if (req.cookies['access_token']) {
      res.cookie('access_token', '').send({ status: 'ok', message: 'log out successfully' });
    } else {
      res.send({ status: 'nok', message: 'no auth saved!!!' });
    }
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
