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
import { LoginAuthDto } from './dto/login-auth.dto';
import { VerifyAuthDto } from './dto/verify-auth.dto';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginAuthDto: LoginAuthDto): Promise<{ code: number }> {
    const { username } = loginAuthDto;

    let user = await this.findByName(username);

    if (!user)
      throw new HttpException('invalid credential', HttpStatus.NOT_FOUND);

    user = await this.setUserCode(user);

    return { code: user.code };
  }

  async verify(verifyAuthDto: VerifyAuthDto): Promise<{ accessToken: string }> {
    const { username, password, code } = verifyAuthDto;

    const user = await this.findByName(username);

    if (user.password !== password && user.code !== code)
      throw new UnauthorizedException('invalid credential');

    await this.setUserCode(user);

    return {
      accessToken: this.jwtService.sign(
        { role: 'user', sub: user._id },
        { secret: process.env.JWT_KEY },
      ),
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

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  private async setUserCode(user: any): Promise<UserDocument> {
    if (user && user.code) user.code = null;
    else user.code = generateIntCode();
    return await user.save();
  }
}
