export enum TopLevelCategory {
	WastePaper,
	Glass,
	Plastic,
	Wood,
	Other,
}

export class TypeModel {
	_id: string;
	title: string;
	category: TopLevelCategory;
	synonyms?: string[];
}
