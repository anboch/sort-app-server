import { Injectable } from '@nestjs/common';
import { mongoId } from './common/types';
import { MaterialService, MaterialWithPropsItem } from './material/material.service';
import { TagGroup, TagModel } from './tag/tag.model';
import { TagService } from './tag/tag.service';

enum SearchItemKind {
  material = 'material',
  tag = 'tag',
  // category = 'category',
}

interface IUnionListItem {
  _id: mongoId;
  title: string;
  kind: SearchItemKind;
}

interface IUnionListItem {
  _id: mongoId;
  title: string;
  kind: SearchItemKind;
}

export interface ISearchLists {
  // materials: MaterialWithTagItem[];
  materialsObj: { [key: string]: MaterialWithPropsItem };
  // categories: CategoryModel[];
  tags: TagModel[];
  union: IUnionListItem[];
}

@Injectable()
export class AppService {
  constructor(
    private readonly materialService: MaterialService,
    private readonly tagService: TagService
  ) {}

  async getSearchList(): Promise<ISearchLists> {
    const union: IUnionListItem[] = [];
    // TODO sort tags (category first or frequently usage first)
    const tags = await this.tagService.findAll();
    const materials = await this.materialService.getAllWithProps();

    tags
      .filter((tag) => tag.group === TagGroup.CATEGORY)
      .forEach((tag) =>
        tag.titles.forEach((title) => union.push({ _id: tag._id, title, kind: SearchItemKind.tag }))
      );
    tags
      .filter((tag) => tag.group !== TagGroup.CATEGORY)
      .forEach((tag) =>
        tag.titles.forEach((title) => union.push({ _id: tag._id, title, kind: SearchItemKind.tag }))
      );

    materials.forEach((material) =>
      material.titles.forEach((title) =>
        union.push({ _id: material._id, title, kind: SearchItemKind.material })
      )
    );

    const materialsObj = materials.reduce(
      (acc, item) => ({ ...acc, [item._id.toString()]: item }),
      {}
    );

    return {
      tags,
      materialsObj,
      union,
    };
  }
}
