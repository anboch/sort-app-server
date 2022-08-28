import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ForbiddenError } from '@casl/ability';

import { CHECK_POLICIES_KEY, IPolicyRule } from './casl-abilities.decorator';
import { AbilityFactory } from './casl-ability.factory';

@Injectable()
export class AbilityGuard implements CanActivate {
  constructor(private reflector: Reflector, private abilityFactory: AbilityFactory) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const rules = this.reflector.get<IPolicyRule[]>(CHECK_POLICIES_KEY, ctx.getHandler()) || [];

    const requestor = ctx.switchToHttp().getRequest().user;

    const ability = this.abilityFactory.createForUser(requestor);

    try {
      rules.forEach(({ action, subject }) => {
        ForbiddenError.from(ability).throwUnlessCan(action, subject);
      });
    } catch (err) {
      if (err instanceof ForbiddenError) {
        throw new ForbiddenException(err.message);
      }
    }
    return true;
  }
}
