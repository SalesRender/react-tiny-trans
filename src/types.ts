import React from 'react';
import { Trans } from './src';

export type Content = Record<string, unknown>;
export type DynamicContent = () => Promise<{ default: Content }>;
export type Variables = Record<string, string>;
export type ErrorsMode = 'ignore' | 'throw' | ((error: Error) => string);
export type PluralContent = Partial<Record<Intl.LDMLPluralRule, string>>;
export type PluralFn = (count: number, locale: string) => Intl.LDMLPluralRule;
export enum Config {
  count = 'COUNT',
}

export type TranslateOptions<T extends Variables = Variables> = {
  /**
   * ignore the error, handle error or throw error (by default)
   * */
  errorsMode?: ErrorsMode;
  /**
   * it uses for the plural if it exists
   * */
  count?: number;
  /**
   * for replaced the variable patters - ${variable}
   * */
  variables?: T;
};

export type Translate<T extends Variables = Variables> = (
  path: string | TemplateStringsArray,
  options?: TranslateOptions<T>
) => string;

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
  updatedTrigger: boolean;
  trans: Trans<Locale>;
};

export declare type useTransContext = <Locale extends string = string>() => ContextType<Locale>;
export declare type TransProvider = <Locale extends string = string>(
  params: TransProviderProps<Locale>
) => React.ReactElement;

export type withTranslate = <P, T extends Variables = Variables>(
  Component: React.ComponentType<P & TranslateProps<T>>,
  module: string | TemplateStringsArray
) => (props: P) => React.ReactElement;
