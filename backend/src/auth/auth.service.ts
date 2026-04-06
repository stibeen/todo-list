import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInInput } from './dto/signin-input';
import { SignUpInput } from './dto/signup-input';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as argon from "argon2";
import { JwtPayload } from 'src/common/types/jwtPayload';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService
  ) {}

  async signUp(payload: SignUpInput) {
    const hashedPassword = await argon.hash(payload.password);
    const user = await this.prisma.user.create({
      data: {
        username: payload.username,
        hashedPassword,
      }
    });
    const accessToken = this.jwt.sign({ userId: user.id, username: user.username });
    const refreshToken = this.jwt.sign({ userId: user.id, username: user.username, accessToken });
    await this.updateRefresh(user.id, refreshToken);
    return {
      user,
      message: `User ${user.username} signed up successfully`,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
    
  }

  async signUpAdmin(payload: SignUpInput) {
    const hashedPassword = await argon.hash(payload.password);
    const user = await this.prisma.user.create({
      data: {
        username: payload.username,
        hashedPassword,
        role: "ADMIN",
      }
    });
    const accessToken = this.jwt.sign({ userId: user.id, username: user.username });
    const refreshToken = this.jwt.sign({ userId: user.id, username: user.username, accessToken });

    await this.updateRefresh(user.id, refreshToken);
    return {
      user,
      role: user.role,
      message: `User ${user.username} signed up successfully`,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
    
  }

  async signIn(payload: SignInInput) {
    const user = await this.prisma.user.findUnique({
      where: {
        username: payload.username,
      }
    });
    if (!user) {
      throw new UnauthorizedException("User not found");
    }
    const isPasswordValid = await argon.verify(user.hashedPassword, payload.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid password");
    }

    const accessToken = this.jwt.sign({ userId: user.id, username: user.username });
    const refreshToken = this.jwt.sign({ userId: user.id, username: user.username, accessToken });
    await this.updateRefresh(user.id, refreshToken);
    return {
      user,
      isSignedIn: true,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  async updateRefresh(userId: string, refreshToken: string) {
    const hashedRefreshToken = await argon.hash(refreshToken);
    await this.prisma.user.update({
      where: { id: userId },
      data: { hashedRefreshToken },
    });
  }

  async validateUser(payload: JwtPayload) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.userId },
    });
    if (!user) {
      throw new UnauthorizedException("User not found");
    }
    return user;
  }
}
