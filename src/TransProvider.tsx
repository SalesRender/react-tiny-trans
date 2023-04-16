import * as React from 'react';
import { ReactElement, createContext, useContext, useEffect, useReducer, useState } from 'react';
import { ContextType, NeedUpdate, TransProviderProps } from './types';

const TransContext = createContext<ContextType>(null);
const NeedUpdateContext = createContext<NeedUpdate>(null);

export const useTransContext = <Locale extends string = string>(): ContextType<Locale> =>
  useContext(TransContext) as ContextType<Locale>;

export const useNeedUpdate = (): NeedUpdate => useContext(NeedUpdateContext);

export const TransProvider = <Locale extends string = string>({
  children,
  trans,
}: TransProviderProps<Locale>): ReactElement => {
  const [loading, setLoading] = useState(false);
  const [updatedTrigger, toggleUpdatedTrigger] = useReducer((v) => !v, false);

  useEffect(() => {
    const loadstart = (): void => setLoading(true);
    const loadend = (): void => setLoading(false);

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
  }, [trans]);

  useEffect(() => {
    trans.init();
  }, [trans]);

  const value: ContextType<Locale> = { loading, locale: trans.locale, trans };

  return (
    <TransContext.Provider value={value}>
      <NeedUpdateContext.Provider value={updatedTrigger}>{children}</NeedUpdateContext.Provider>
    </TransContext.Provider>
  );
};
