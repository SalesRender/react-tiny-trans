import React from 'react';
import { Trans, Variables, Translate } from 'tiny-trans';

export { PluralFn, Content, AsyncContent, Variables, Translate } from 'tiny-trans';

export type TranslateProps<Locale extends string = string, T extends Variables = Variables> = {
  translate: Translate<T>;
  locale: Locale;
  changeLocale: (locale: string) => Promise<void>;
};

export type TransProviderProps<Locale extends string = string> = {
  children: React.ReactNode;
  trans: Trans<Locale>;
};

export type NeedUpdate = boolean;

export type ContextType<Locale extends string = string> = {
  loading: boolean;
  locale: Locale;
  trans: Trans<Locale>;
};

export type ModuleType = string | TemplateStringsArray;

export declare function useTransContext<Locale extends string = string>(): ContextType<Locale>;
export declare function useTranslate<Locale extends string = string, T extends Variables = Variables>(
  module?: ModuleType
): TranslateProps<Locale, T>;
export declare function TransProvider<Locale extends string = string>(
  params: TransProviderProps<Locale>
): React.ReactElement;

export declare function withTranslate(
  module?: ModuleType
): <P, Locale extends string = string, T extends Variables = Variables>(
  Component: React.ComponentType<P & TranslateProps<Locale, T>>
) => (props: P) => React.ReactElement;
