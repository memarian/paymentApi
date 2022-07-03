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
import { IJwtPayload } from 'src/auth/interfaces/jwt.payload.interface';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PaymentService } from './payment.service';

@Controller('payment')
@UseGuards(AuthGuard('jwt'))
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post(':id')
  create(
    @Param('id', ParseIntPipe) planId: number,
    @GetCurrentUser() user: IJwtPayload,
  ) {
    console.log(user);
    return this.paymentService.create(user.sub, planId);
  }

  @Get()
  findAll(@GetCurrentUser() user: IJwtPayload) {
    return this.paymentService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne('62befeadffdef6fc98dbc0de', id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(+id, updatePaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentService.remove(+id);
  }
}
