export class CreateMaterialDto {
  title: string;
  types: string[];
  similarMaterials?: string[];
  description?: string;
  images?: string[];
  synonyms?: string[];
}
