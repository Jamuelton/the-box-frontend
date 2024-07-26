export enum CategoryDocumentsEnum {
    "APOIO", 
    "MANUAL_DOS_CALOUROS",
  }
  
  export interface DocumentsInterface {
    title?: string | undefined;
    description?: string | undefined;
    url?: string | undefined;
    category?: CategoryDocumentsEnum | undefined | string;
    user_id?: number | undefined;
  }
  