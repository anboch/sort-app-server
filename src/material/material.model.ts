import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { CategoryModel } from 'src/category/category.model';
import { ClusterModel } from 'src/cluster/cluster.model';
import { collectionNames } from 'src/configs/mongo.config';
import { TypeModel } from 'src/type/type.model';

export type MaterialDocument = MaterialModel & Document;
@Schema({ collection: collectionNames.MATERIAL })
export class MaterialModel {
  _id: string;

  @Prop({
    required: true,
    type: [{ type: mongoose.Schema.Types.String }],
    unique: true,
  })
  titles: string[];

  @Prop({
    required: true,
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: collectionNames.TYPE }],
  })
  typeIDs: TypeModel[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: collectionNames.MATERIAL }] })
  similarMaterialIDs: MaterialModel[];

  @Prop()
  description: string;

  @Prop([String])
  images: string[];

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: collectionNames.CATEGORY })
  categoryID: CategoryModel;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: collectionNames.CLUSTER })
  clusterID: ClusterModel;
}

export const MaterialSchema = SchemaFactory.createForClass(MaterialModel);
