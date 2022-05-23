export enum TopLevelCategory {
  WastePaper,
  Glass,
  Plastic,
  Wood,
  Other,
}

export class TypeModel {
  title: string;
  category: TopLevelCategory;
  synonyms?: string[];
}
