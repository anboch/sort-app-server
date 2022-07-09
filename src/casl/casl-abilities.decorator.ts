import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { Action, Subjects } from './casl-ability.factory';

export interface IPolicyRule {
  action: Action;
  subject: Subjects;
}

export const CHECK_POLICIES_KEY = 'check_policy';
export const CheckAbilities = (...requirements: IPolicyRule[]): CustomDecorator<string> =>
  SetMetadata(CHECK_POLICIES_KEY, requirements);
