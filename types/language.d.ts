import { internationOption } from "@/assets/state/data/staticData";

declare global {
  type Title18n = {
    [p.label in internationOption]: string;
  };
}

export type LanguageType = 'ch' | 'en';

export interface LanguageItem {
  key: LanguageType,
  label: string
}

export interface LanguageState {
  locale: LanguageType;
}

