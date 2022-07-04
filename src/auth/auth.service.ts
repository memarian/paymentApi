import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { generateIntCode } from 'src/common/utils';
import { VerifyAuthDto } from './dto/verify-auth.dto';
import { Role } from './guards/roles.enum';
import { IJwtPayload } from './interfaces/jwt.payload.interface';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User): Promise<{ code: number }> {
    user = await this.setUserCode(user);
    return { code: user.code };
  }

  async verify(verifyAuthDto: VerifyAuthDto): Promise<{ accessToken: string }> {
    const { username, password, code } = verifyAuthDto;

    const user = await this.findByName(username);

    if (user.password !== password || user?.code !== code)
      throw new UnauthorizedException('invalid credential');

    user.code = null;
    await user.save();

    const role = username === Role.USER ? Role.USER : Role.ADMIN;

    return this.jwtSign({ sub: user.id, role });
  }

  jwtSign(payload: IJwtPayload) {
    return {
      accessToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_KEY,
      }),
    };
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findOne({ id }).exec();
  }

  async findByName(username: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ username });
    if (!user)
      throw new HttpException('username not found', HttpStatus.NOT_FOUND);

    return user;
  }

  jwtVerify() {
    throw new Error('Method not implemented.');
  }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  private async setUserCode(user: any): Promise<UserDocument> {
    user.code = generateIntCode();
    return await user.save();
  }
}
