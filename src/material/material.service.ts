import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryModel } from '../category/category.model';
import { TagModel } from '../tag/tag.model';
import { CreateMaterialDto } from './dto/create-material.dto';
import { MATERIAL_NOT_FOUND_ERROR } from './material.constants';
import { MaterialDocument, MaterialModel } from './material.model';

export type SearchList = Pick<MaterialModel, 'titles' | 'categoryID' | 'tagIDs'>[];
@Injectable()
export class MaterialService {
  constructor(@InjectModel(MaterialModel.name) private materialModel: Model<MaterialDocument>) {}

  async create(dto: CreateMaterialDto): Promise<MaterialModel> {
    const createdModel = new this.materialModel(dto);
    return createdModel.save();
  }

  async findAll(): Promise<MaterialModel[]> {
    return this.materialModel.find().exec();
  }

  async findById(id: string): Promise<MaterialModel> {
    const material = await this.materialModel.findById(id).exec();
    if (!material) throw new NotFoundException(MATERIAL_NOT_FOUND_ERROR);
    return material;
  }

  async getSearchList(): Promise<SearchList> {
    const materialList = await this.materialModel.find({}, 'titles').populate([
      {
        path: 'tagIDs',
        model: TagModel.name,
      },
      {
        path: 'categoryID',
        model: CategoryModel.name,
      },
    ]);
    if (!materialList) throw new NotFoundException(MATERIAL_NOT_FOUND_ERROR);
    return materialList;
  }

  async deleteById(id: string): Promise<MaterialModel | null> {
    return this.materialModel.findByIdAndDelete(id).exec();
  }

  async updateById(id: string, dto: CreateMaterialDto): Promise<MaterialModel | null> {
    return this.materialModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }
}
