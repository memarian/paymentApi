import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../schema/user.schema';

export const GetCurrentUser = createParamDecorator(
  (_data, ctx: ExecutionContext): User => {
    return ctx.switchToHttp().getRequest().user ?? null;
  },
);
