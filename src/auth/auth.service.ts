import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { generateIntCode } from 'src/common/utils';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { VerifyAuthDto } from './dto/verify-auth.dto';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async login(loginAuthDto: LoginAuthDto): Promise<{ code: number }> {
    const { username } = loginAuthDto;

    const user = await this.findByName(username);

    if (!user)
      throw new HttpException('invalid credential', HttpStatus.NOT_FOUND);

    user.code = generateIntCode();

    user.save();

    return { code: user.code };
  }

  verify(verifyAuthDto: VerifyAuthDto) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findOne({ id }).exec();
  }

  async findByName(username: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ username });
    console.log(user);
    return user;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }
}
