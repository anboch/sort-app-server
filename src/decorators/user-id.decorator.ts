import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Requestor = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  return ctx.switchToHttp().getRequest().user;
});
