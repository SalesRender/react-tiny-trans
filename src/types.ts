import React from 'react';
import { EventsManager } from 'tiny-trans';

export type Content = Record<string, unknown>;
export type DynamicContent<T extends Content> = () => Promise<{ default: T }>;
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

export declare class Trans<Locale extends string = string> extends EventsManager {
  locale: Locale;

  content: Content;

  init<T extends Content>(params: {
    translations: Record<Locale, T>;
    locale: Locale;
    pluralRecord?: Record<Locale, PluralFn>;
  }): Promise<void>;

  init<T extends Content>(params: {
    translations: Record<Locale, DynamicContent<T>>;
    locale: Locale;
    pluralRecord?: Record<Locale, PluralFn>;
  }): Promise<void>;

  changeLocale(locale: Locale): Promise<void>;

  createTranslate<T extends Variables = Variables>(module: string | TemplateStringsArray): Translate<T>;
}

export type TransProviderProps<Locale extends string = string> = {
  children: React.ReactChildren | React.ReactNode;
  trans: Trans<Locale>;
  translations: any;
};

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
