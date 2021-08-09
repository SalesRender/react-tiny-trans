import React, { createContext, memo, useContext } from 'react';
import { Trans } from 'trans';

export type Props = {
  trans: Trans;
  children: React.ReactChildren | React.ReactNode;
};

const TransContext = createContext<Trans>(null);

export const useTransContext = (): Trans => useContext(TransContext);

export const TransProvider = memo<Props>(({ trans, children }) => (
  <TransContext.Provider value={trans}>{children}</TransContext.Provider>
));
