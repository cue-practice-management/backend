import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@users/schemas/user.schema';
import { UserService } from '@users/user.service';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { RefreshToken } from './schemas/refresh-token.schema';
import { InjectModel } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';
import { LoginRequestDto, LoginResponseDto } from './dtos/login.dto';
import { RefreshTokenRequestDto, RefreshTokenResponseDto } from './dtos/refresh-token.dto';
import { InvalidCredentialsException } from './exceptions/invalid-credentials.exception';
import { InvalidRefreshTokenException } from './exceptions/invalid-refresh-token.exception';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        @InjectModel(RefreshToken.name)
        private readonly refreshTokenModel: Model<RefreshToken>
    ) { }


    async login({ email, password }: LoginRequestDto): Promise<LoginResponseDto> {
        const user = await this.userService.findByEmail(email);

        if (!user) {
            throw new InvalidCredentialsException();
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new InvalidCredentialsException();
        }

        const tokens = await this.generateTokens(user);

        return tokens;
    }

    async refreshToken({ refreshToken }: RefreshTokenRequestDto): Promise<RefreshTokenResponseDto> {
        const token = await this.refreshTokenModel.findOneAndDelete(
            {
                token: refreshToken,
                expiresAt: { $gt: new Date() }
            }
        ).populate('user');

        if (!token) {
            throw new InvalidRefreshTokenException();
        }

        const user = token.user as unknown as User;

        return this.generateTokens(user);
    }

    private async generateTokens(user: User): Promise<LoginResponseDto> {
        const payload = {
            sub: user._id,
            userId: user._id,
            role: user.role,
            email: user.email,
        };

        const accessToken = this.jwtService.sign(payload);
        const refreshToken = uuidv4();

        await this.saveRefreshToken(user._id.toString(), refreshToken);

        return { accessToken, refreshToken };
    }

    private async saveRefreshToken(userId: string, refreshToken: string): Promise<void> {
        const expiresAt = new Date();
        const expirationDays = this.configService.get<number>('JWT_REFRESH_EXPIRATION_DAYS') || 30;

        expiresAt.setDate(expiresAt.getDate() + expirationDays);

        await this.refreshTokenModel.updateOne(
            { user: userId },
            {
                $set: {
                    token: refreshToken,
                    expiresAt: expiresAt
                }
            },
            { upsert: true }
        )
    }

}
