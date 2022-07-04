import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetCurrentUser } from 'src/auth/decorators/get-user.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/guards/roles.enum';
import { RolesGuard } from 'src/auth/guards/roles.guards';
import { IJwtPayload } from 'src/auth/interfaces/jwt.payload.interface';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PaymentService } from './payment.service';

@Controller('payment')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post(':id')
  @Roles(Role.USER)
  create(
    @Param('id', ParseIntPipe) planId: number,
    @GetCurrentUser() currentUser: IJwtPayload,
  ) {
    return this.paymentService.create(currentUser.sub, planId);
  }

  @Get()
  @Roles(Role.USER, Role.ADMIN)
  findAll(@GetCurrentUser() currentUser: IJwtPayload) {
    return this.paymentService.findAll(currentUser);
  }

  @Get(':id')
  @Roles(Role.USER)
  findOne(@Param('id') id: string, @GetCurrentUser() currentUser: IJwtPayload) {
    return this.paymentService.findOne(currentUser.sub, id);
  }

  @Patch(':id')
  @Roles(Role.USER)
  update(
    @Param('id') id: string,
    @Body() updatePaymentDto: UpdatePaymentDto,
    @GetCurrentUser() currentUser: IJwtPayload,
  ) {
    return this.paymentService.update(id, currentUser.sub, updatePaymentDto);
  }

  @Delete(':id')
  @Roles(Role.USER)
  remove(@Param('id') id: string, @GetCurrentUser() currentUser: IJwtPayload) {
    return this.paymentService.remove(currentUser.sub, id);
  }
}
