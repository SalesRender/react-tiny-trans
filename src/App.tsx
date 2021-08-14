import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Trans } from './src';
// import ru from './lang_ru.json';
// import en from './lang_en.json';
import { TransProvider } from './TransProvider';
import { Test } from './Test';

// const translations = { ru, en };
const translations = { ru: (): unknown => import('./lang_ru.json'), en: (): unknown => import('./lang_en.json') };
enum Locale {
  ru = 'ru',
  en = 'en',
}

const trans = new Trans<Locale>();

export const App: React.FC = () => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <TransProvider translations={translations} trans={trans}>
    <div>App</div>
    <Test />
  </TransProvider>
);
