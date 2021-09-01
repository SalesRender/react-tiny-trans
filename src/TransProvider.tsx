import * as React from 'react';
import { ReactElement, createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { ContextType, NeedUpdate, TransProviderProps } from './types';

const TransContext = createContext<ContextType>(null);
const NeedUpdateContext = createContext<NeedUpdate>(null);

export const useTransContext = <Locale extends string = string>(): ContextType<Locale> =>
  useContext(TransContext) as ContextType<Locale>;

export const useNeedUpdate = (): NeedUpdate => useContext(NeedUpdateContext);

export const TransProvider = <Locale extends string = string>({
  children,
  trans,
  translations,
  initLocale,
  pluralRecord,
}: TransProviderProps<Locale>): ReactElement => {
  const [loading, setLoading] = useState(false);
  const [updatedTrigger, toggleUpdatedTrigger] = useReducer((v) => !v, false);

  const loadstart = useCallback(() => setLoading(true), []);
  const loadend = useCallback(() => setLoading(false), []);

  useEffect(() => {
    trans.addEventListener('loadstart', loadstart);
    trans.addEventListener('loadend', loadend);
    trans.addEventListener('change-locale', toggleUpdatedTrigger);
    trans.addEventListener('init', toggleUpdatedTrigger);
    return (): void => {
      trans.removeEventListener('loadstart', loadstart);
      trans.removeEventListener('loadend', loadend);
      trans.removeEventListener('change-locale', toggleUpdatedTrigger);
      trans.removeEventListener('init', toggleUpdatedTrigger);
    };
  }, [loadend, loadstart, trans]);

  useEffect(() => {
    trans.init({ translations, locale: initLocale, pluralRecord });
  }, [pluralRecord, initLocale, trans, translations]);

  const value = useMemo<ContextType<Locale>>(
    () => ({ loading, locale: initLocale, trans, updatedTrigger }),
    [loading, initLocale, trans, updatedTrigger]
  );

  return (
    <TransContext.Provider value={value}>
      <NeedUpdateContext.Provider value={updatedTrigger}>{children}</NeedUpdateContext.Provider>
    </TransContext.Provider>
  );
};
