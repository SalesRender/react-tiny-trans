import * as React from 'react';
import { Trans, Content } from 'tiny-trans';
// import ru from './lang_ru.json';
// import en from './lang_en.json';
import { TransProvider } from './TransProvider';
import { Test } from './Test';

// const translations = { ru, en };
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const translations = {
  ru: (): Promise<Content> => new Promise((resolve) => import('./lang_ru.json').then((res) => resolve(res.default))),
  en: (): Promise<Content> => new Promise((resolve) => import('./lang_en.json').then((res) => resolve(res.default))),
};
enum Locale {
  ru = 'ru',
  en = 'en',
}

const trans = new Trans<Locale>({
  translations,
  locale: Locale.ru,
});

export const App: React.FC = () => (
  <TransProvider trans={trans}>
    <div>App</div>
    <Test />
  </TransProvider>
);
