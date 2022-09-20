import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RuleSetModel } from '../rule-set/rule-set.model';
import { RuleModel } from '../rule/rule.model';
import { TagModel } from '../tag/tag.model';
import { TypeModel } from '../type/type.model';
import { CreateMaterialDto } from './dto/create-material.dto';
import { MATERIAL_NOT_FOUND_ERROR } from './material.constants';
import { MaterialDocument, MaterialModel } from './material.model';

export type MaterialWithPropsItem = Pick<
  MaterialModel,
  '_id' | 'titles' | 'tagIDs' | 'typeIDs' | 'similarMaterialIDs' | 'description' | 'images'
> & { sortedRules: IRuleLists };

interface IRuleWithCounter extends RuleModel {
  numberOfRef: number;
}

interface IRuleLists {
  generalRules: IRuleWithCounter[];
  localRules: IRuleWithCounter[];
}

interface IRuleCash {
  [key: string]: IRuleWithCounter;
}
@Injectable()
export class MaterialService {
  constructor(@InjectModel(MaterialModel.name) private materialModel: Model<MaterialDocument>) {}

  async create(dto: CreateMaterialDto): Promise<MaterialModel> {
    // TODO check that all ref are exist
    const createdModel = new this.materialModel(dto);
    return createdModel.save();
  }

  async findAll(): Promise<MaterialModel[]> {
    return this.materialModel.find().exec();
  }

  async findById(id: string): Promise<MaterialModel> {
    const material = await this.materialModel.findById(id).exec();
    if (!material) {
      throw new NotFoundException(MATERIAL_NOT_FOUND_ERROR);
    }
    return material;
  }

  async getAllWithProps(): Promise<MaterialWithPropsItem[]> {
    const materialList = await this.materialModel
      .find({}, ['titles', 'description', 'images'])
      .populate([
        {
          path: 'tagIDs',
          model: TagModel.name,
        },
        {
          path: 'similarMaterialIDs',
          model: MaterialModel.name,
          select: 'titles',
        },
        {
          path: 'typeIDs',
          model: TypeModel.name,
          populate: {
            path: 'ruleSetIDs',
            model: RuleSetModel.name,
            populate: {
              path: 'ruleIDs',
              model: RuleModel.name,
            },
          },
        },
      ])
      .exec();
    if (!materialList) {
      throw new NotFoundException(MATERIAL_NOT_FOUND_ERROR);
    }

    // TODO make it in DB
    // TODO move the function to a separate place!?
    function sortRulesFromTypes(typeIDs: MaterialModel['typeIDs']): IRuleLists {
      const ruleCash: IRuleCash = {};
      let numberOfRuleSets = 0;

      for (const type of typeIDs) {
        if (!('ruleSetIDs' in type)) {
          continue;
        }
        for (const ruleSet of type.ruleSetIDs) {
          if (!('ruleIDs' in ruleSet)) {
            continue;
          }
          numberOfRuleSets += 1;
          for (const rule of ruleSet.ruleIDs) {
            if (!('description' in rule) || !('_id' in rule)) {
              continue;
            }
            if (ruleCash[rule._id.toString()]) {
              ruleCash[rule._id.toString()].numberOfRef += 1;
            } else {
              ruleCash[rule._id.toString()] = {
                numberOfRef: 1,
                _id: rule._id,
                description: rule.description.toString(),
              };
            }
          }
        }
      }

      const allRules = Object.values(ruleCash).sort((a, b) => b.numberOfRef - a.numberOfRef);

      return {
        generalRules: allRules.filter((rule) => rule.numberOfRef >= numberOfRuleSets),
        localRules: allRules.filter((rule) => rule.numberOfRef < numberOfRuleSets),
      };
    }

    return materialList.map(
      ({ _id, titles, typeIDs, similarMaterialIDs, description, images, tagIDs }) => {
        return {
          _id,
          titles,
          typeIDs,
          similarMaterialIDs,
          description,
          images,
          tagIDs,
          sortedRules: sortRulesFromTypes(typeIDs),
        };
      }
    );
  }

  async deleteById(id: string): Promise<MaterialModel | null> {
    return this.materialModel.findByIdAndDelete(id).exec();
  }

  async updateById(id: string, dto: CreateMaterialDto): Promise<MaterialModel | null> {
    return this.materialModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }
}
