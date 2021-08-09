import { Translate, Variables } from 'trans/index';
import React, { useMemo } from 'react';
import { useTransContext } from './TransProvider';

const createMemoTranslate = (translate: Translate): Translate => {
  const map: Record<string, string> = {};
  return (path, options): string => {
    const key = path?.toString();
    if (key in map) return map[key];
    const result = translate(path, options);
    map[key] = result;
    return result;
  };
};

export type TranslateProps<T extends Variables = Variables> = {
  translate: Translate<T>;
  locale: string;
  changeLocale: (locale: string) => Promise<void>;
};

export const useTranslate = <T extends Variables = Variables>(
  module: string | TemplateStringsArray
): TranslateProps<T> => {
  const trans = useTransContext();
  return useMemo(
    () => ({
      locale: trans.locale,
      changeLocale: trans.changeLocale,
      translate: createMemoTranslate(trans.createTranslate(module)),
    }),
    [module, trans]
  );
};

export const withTranslate =
  <P, T extends Variables = Variables>(
    Component: React.ComponentType<P & TranslateProps<T>>,
    module: string | TemplateStringsArray
  ) =>
  (props: P): React.ReactElement => {
    const trans = useTranslate(module);
    return <Component {...props} {...trans} />;
  };
