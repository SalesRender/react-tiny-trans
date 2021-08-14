import React from 'react';
import { useTranslate } from './hooks';
import { useTransContext } from './TransProvider';

export const Test: React.FC = () => {
  const { trans } = useTransContext();
  const { translate } = useTranslate`screens.Home`;
  return (
    <div>
      {translate`title`}
      <button type="button" onClick={(): unknown => trans.changeLocale(trans.locale === 'en' ? 'ru' : 'en')}>
        test
      </button>
    </div>
  );
};
