import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BinModel, BinSchema } from '../bin/bin.model';
import { CategoryModel, CategorySchema } from '../category/category.model';
import { ClusterModel, ClusterSchema } from '../cluster/cluster.model';
import { MaterialModel, MaterialSchema } from '../material/material.model';
import { RecyclePointModel, RecyclePointSchema } from '../recycle-point/recycle-point.model';
import { TypeModel, TypeSchema } from '../type/type.model';
import { UserModel, UserSchema } from '../user/user.model';
import { AbilityFactory } from './casl-ability.factory';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserModel.name, schema: UserSchema },
      { name: TypeModel.name, schema: TypeSchema },
      { name: RecyclePointModel.name, schema: RecyclePointSchema },
      { name: MaterialModel.name, schema: MaterialSchema },
      { name: ClusterModel.name, schema: ClusterSchema },
      { name: CategoryModel.name, schema: CategorySchema },
      { name: BinModel.name, schema: BinSchema },
    ]),
  ],
  providers: [AbilityFactory],
  exports: [AbilityFactory],
})
export class CaslModule {}
