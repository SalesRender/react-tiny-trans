import React, { useMemo } from 'react';
import { useNeedUpdate, useTransContext } from './TransProvider';
import { TranslateProps, Variables, ModuleType } from './types';

export const useTranslate = <Locale extends string = string, T extends Variables = Variables>(
  module?: ModuleType
): TranslateProps<Locale, T> => {
  const { trans, locale } = useTransContext<Locale>();
  const updatedTrigger = useNeedUpdate();
  const translate = useMemo(() => trans.createTranslate(module), [module, trans, updatedTrigger]); // eslint-disable-line react-hooks/exhaustive-deps
  return {
    locale: trans.locale || locale,
    changeLocale: trans.changeLocale,
    translate,
  };
};

export const withTranslate =
  (module?: ModuleType) =>
  <P, Locale extends string = string, T extends Variables = Variables>(
    Component: React.ComponentType<P & TranslateProps<Locale, T>>
  ) =>
  (props: P): React.ReactElement => {
    const trans = useTranslate<Locale>(module);
    return <Component {...props} {...trans} />;
  };
