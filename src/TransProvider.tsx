import * as React from 'react';
import { ReactElement, createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { ContextType, TransProviderProps } from './types';

const TransContext = createContext<ContextType>(null);

export const useTransContext = <Locale extends string = string>(): ContextType<Locale> =>
  useContext(TransContext) as ContextType<Locale>;

export const TransProvider = <Locale extends string = string>({
  children,
  trans,
  translations,
  initLocale,
}: TransProviderProps<Locale>): ReactElement => {
  const [loading, setLoading] = useState(false);
  const [updatedTrigger, toggleUpdatedTrigger] = useReducer((v) => !v, false);

  const loadstart = useCallback(() => {
    requestAnimationFrame(() => setLoading(true));
  }, []);

  const loadend = useCallback(() => {
    requestAnimationFrame(() => {
      setLoading(false);
      toggleUpdatedTrigger();
    });
  }, []);

  useEffect(() => {
    trans.addEventListener('loadstart', loadstart);
    trans.addEventListener('loadend', loadend);
    return (): void => {
      trans.removeEventListener('loadstart', loadstart);
      trans.removeEventListener('loadend', loadend);
    };
  }, [loadend, loadstart, trans]);

  useEffect(() => {
    trans.init({ translations, locale: initLocale });
  }, [initLocale, trans, translations]);

  const value = useMemo<ContextType<Locale>>(
    () => ({ loading, trans, updatedTrigger }),
    [updatedTrigger, trans, loading]
  );

  return <TransContext.Provider value={value}>{children}</TransContext.Provider>;
};
