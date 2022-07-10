import { ForbiddenException, Injectable } from '@nestjs/common';
import {
  InferSubjects,
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  ForbiddenError,
} from '@casl/ability';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IRequestor } from '../auth/interfaces/requestor.interface';
import { BinModel, BinDocument } from '../bin/bin.model';
import { CategoryModel } from '../category/category.model';
import { ClusterModel } from '../cluster/cluster.model';
import { MaterialModel } from '../material/material.model';
import { RecyclePointModel } from '../recycle-point/recycle-point.model';
import { TypeModel } from '../type/type.model';
import { UserModel, UserDocument, Role } from '../user/user.model';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export type Subjects =
  | InferSubjects<
      | typeof UserModel
      | Model<UserDocument>
      | typeof TypeModel
      | typeof RecyclePointModel
      | typeof MaterialModel
      | typeof ClusterModel
      | typeof CategoryModel
      | typeof BinModel
      | Model<BinDocument>
    >
  | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class AbilityFactory {
  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserDocument>,
    @InjectModel(BinModel.name) private binModel: Model<BinDocument>
  ) {}

  createForUser(requestor: IRequestor): AppAbility {
    const { can, cannot, build } = new AbilityBuilder<Ability<[Action, Subjects]>>(
      Ability as AbilityClass<AppAbility>
    );

    // TODO to switch case
    if (requestor.role === Role.ADMIN) {
      can(Action.Manage, 'all');
    } else {
      can(Action.Manage, this.userModel, { _id: { $eq: requestor._id } });
      can(Action.Manage, [BinModel, this.binModel], { _id: { $in: requestor.binIDs } });
    }

    return build({
      detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>,
    });
  }

  async checkUserAbility(requestor: IRequestor, action: Action, subject: Subjects): Promise<void> {
    const ability = this.createForUser(requestor);
    try {
      ForbiddenError.from(ability).throwUnlessCan(action, subject);
    } catch (err) {
      if (err instanceof ForbiddenError) throw new ForbiddenException(err.message);
    }
  }
}
