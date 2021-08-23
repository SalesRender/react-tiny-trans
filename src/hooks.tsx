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

export const useTranslate = <T extends Variables = Variables>(
  module: string | TemplateStringsArray
): TranslateProps<T> => {
  const { trans } = useTransContext();
  const updatedTrigger = useNeedUpdate();
  const translate = useMemo(() => createMemoTranslate(trans.createTranslate(module)), [module, trans, updatedTrigger]); // eslint-disable-line react-hooks/exhaustive-deps
  return useMemo(
    () => ({
      locale: trans.locale,
      changeLocale: trans.changeLocale,
      translate,
    }),
    [translate, trans]
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
