export enum CategoryMaterialEnum {
  "BAREMA",
  "REQUERIMENTO",
  "UNICO",
  "EDITAIS",
  "EDITAIS_DE_BOLSAS",
}

export interface MaterialInterface {
  title?: string | undefined;
  description?: string | undefined;
  url?: string | undefined;
  category?: CategoryMaterialEnum | undefined | string;
  user_id?: number | undefined;
}
