export class CreateMaterialDto {
  titles: string[];
  typeIDs: string[];
  similarMaterialIDs?: string[];
  description?: string;
  images?: string[];
  categoryID: string;
  clusterID?: string;
}
