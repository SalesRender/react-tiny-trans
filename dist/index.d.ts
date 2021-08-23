import React from 'react';
import { Trans, PluralFn, Content, DynamicContent, Variables, Translate } from 'tiny-trans';

export { PluralFn, Content, DynamicContent, Variables, Translate } from 'tiny-trans';

export type TranslateProps<T extends Variables = Variables> = {
  translate: Translate<T>;
  locale: string;
  changeLocale: (locale: string) => Promise<void>;
};

export interface TransProviderCommonProps<Locale extends string = string> {
  children: React.ReactChildren | React.ReactNode;
  trans: Trans<Locale>;
  initLocale: Locale;
  pluralRecord?: Record<Locale, PluralFn>;
}

export interface SimpleTranslation<Locale extends string = string> {
  translations: Record<Locale, Content>;
}

export interface DynamicTranslation<Locale extends string = string> {
  translations: Record<Locale, DynamicContent>;
}

export type TransProviderProps<Locale extends string = string> = TransProviderCommonProps<Locale> &
  (SimpleTranslation<Locale> | DynamicTranslation<Locale>);

export type ContextType<Locale extends string = string> = {
  loading: boolean;
  trans: Trans<Locale>;
};

export declare function useTransContext<Locale extends string = string>(): ContextType<Locale>;
export declare function useTranslate<T extends Variables = Variables>(
  module: string | TemplateStringsArray
): TranslateProps<T>;
export declare function TransProvider<Locale extends string = string>(
  params: TransProviderProps<Locale>
): React.ReactElement;

export declare function withTranslate<P, T extends Variables = Variables>(
  Component: React.ComponentType<P & TranslateProps<T>>,
  module: string | TemplateStringsArray
): (props: P) => React.ReactElement;
