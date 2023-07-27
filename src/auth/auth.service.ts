import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(email: any, pass: string): Promise<any> {
        const user = await this.usersService.findByUsername(email);
        if (user && user.password === pass) {
            const { updated, created, password, ...result } = user;
            return this.login(result);
        }
        return {
            Message: 'Password wong'
        }
    }

    async login(user: any) {
        const payload = { username: user.email, sub: user.id };
        return {
            user,
            access_token: this.jwtService.sign(payload),
        };
    }
}
