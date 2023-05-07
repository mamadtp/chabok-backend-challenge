import { Controller, Get, Post, Body, Res, UseGuards, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Request as RequestExpress, Response } from 'express';
import { User } from 'src/user/entities/user.entity';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { GetUser } from './decorators/get-user.decorator';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginAuthDto: LoginAuthDto, @Res({ passthrough: true }) res: Response): Promise<void> {
    const { access_token } = await this.authService.login(loginAuthDto);
    res
      .cookie('access_token', access_token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: false, //TODO: set true for production
        expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
      })
      .send({ status: 'ok' });
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile(@GetUser() user: User) {
    return this.authService.profile(user);
  }

  @Post('logout')
  logoutPost(@Request() req: RequestExpress, @Res({ passthrough: true }) res: Response) {
    return this.authService.logout(req, res);
  }

  @Get('logout')
  logoutGet(@Request() req: RequestExpress, @Res({ passthrough: true }) res: Response) {
    return this.authService.logout(req, res);
  }
}
