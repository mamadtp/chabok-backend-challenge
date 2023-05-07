import { Controller, Get, Post, Body, Req, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Request, Response } from 'express';
import { User } from 'src/user/entities/user.entity';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { GetUser } from './decorators/get-user.decorator';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<void> {
    const { access_token } = await this.authService.login(req.user as User);
    res
      .cookie('access_token', access_token, {
        httpOnly: true,
        sameSite: 'lax',
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
  logout(@Body() createAuthDto: LoginAuthDto) {
    return this.authService.logout(createAuthDto);
  }
}
