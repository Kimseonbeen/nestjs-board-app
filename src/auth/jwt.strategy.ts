import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";
import * as config from 'config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {
        super({
            // auth.module에서는 생성, 여기부분은 확인
            secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }
    
    // 위에서 토큰이 유효한지 체크가 되면 validate 메소드에서 payload에 있는 유저이름이 데이터베이스에서
    // 있는 유저인지 확인 후 있다면 유저 객체를 return값을 던져줍니다.
    // return 값은 @UseGuards(AuthGuard())를 이용한 모든 요청의 Request Object에 들어갑니다.
    async validate(payload) {
        console.log("들어오나?");
        console.log("payload : ", payload);
        
        
        const { username } = payload;
        const user: User = await this.userRepository.findOne({ username });

        if(!user) {
            throw new UnauthorizedException();
        }
        // requset 객체로 들어간다
        return user;
    }
}