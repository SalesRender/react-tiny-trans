import * as React from 'react';
import { Trans } from 'tiny-trans';
// import ru from './lang_ru.json';
// import en from './lang_en.json';
import { TransProvider } from './TransProvider';
import { Test } from './Test';

// const translations = { ru, en };
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const translations = { ru: () => import('./lang_ru.json'), en: () => import('./lang_en.json') };
enum Locale {
  ru = 'ru',
  en = 'en',
}

const trans = new Trans<Locale>();

export const App: React.FC = () => (
  <TransProvider translations={translations} trans={trans} initLocale={Locale.ru}>
    <div>App</div>
    <Test />
  </TransProvider>
);
