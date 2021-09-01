import React, { useMemo } from 'react';
import { useNeedUpdate, useTransContext } from './TransProvider';
import { Translate, TranslateProps, Variables } from './types';

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

export const useTranslate = <Locale extends string = string, T extends Variables = Variables>(
  module?: string | TemplateStringsArray
): TranslateProps<Locale, T> => {
  const { trans, locale } = useTransContext<Locale>();
  const updatedTrigger = useNeedUpdate();
  const translate = useMemo(() => createMemoTranslate(trans.createTranslate(module)), [module, trans, updatedTrigger]); // eslint-disable-line react-hooks/exhaustive-deps
  return useMemo(
    () => ({
      locale: trans.locale || locale,
      changeLocale: trans.changeLocale,
      translate,
    }),
    [translate, trans, locale]
  );
};

export const withTranslate =
  <P, Locale extends string = string, T extends Variables = Variables>(
    Component: React.ComponentType<P & TranslateProps<Locale, T>>,
    module?: string | TemplateStringsArray
  ) =>
  (props: P): React.ReactElement => {
    const trans = useTranslate<Locale>(module);
    return <Component {...props} {...trans} />;
  };
