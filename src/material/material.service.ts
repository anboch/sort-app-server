import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateMaterialDto } from './dto/create-material.dto';
import { MaterialDocument, MaterialModel } from './material.model';

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

  async findById(id: string): Promise<MaterialModel | null> {
    return this.materialModel.findById(id).exec();
  }

  async deleteById(id: string): Promise<MaterialModel | null> {
    return this.materialModel.findByIdAndDelete(id).exec();
  }

  async updateById(id: string, dto: CreateMaterialDto): Promise<MaterialModel | null> {
    return this.materialModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }
}
