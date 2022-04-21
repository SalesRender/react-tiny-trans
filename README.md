# react-tiny-trans
Use [tiny-trans](https://www.npmjs.com/package/tiny-trans) in the React applications

## Install
```
npm i tiny-trans react-tiny-trans
// or
yarn add tiny-trans react-tiny-trans
```

## Usage

You can use different files for translates. Below I use follow example files

**lang_ru.json**
```
{
  "screens": {
    "Home": {
      "title": "Заголовок",
      "description": "Описание ${desc} ${name}",
      "plural": {
        "zero": "${COUNT} бананов",
        "one": "${COUNT} банан",
        "two": "${COUNT} банана",
        "few": "${COUNT} банана",
        "many": "${COUNT} бананов",
        "other": "${COUNT} бананов"
      }
    }
  }
  "extrapoint": {
    "anything": "Что-нибудь"
  }
}
```
**lang_en.json**
```
{
  "screens": {
    "Home": {
      "title": "Title",
      "description": "Description ${desc} ${name}",
      "plural": {
        "zero": "${COUNT} bananas",
        "one": "${COUNT} banane",
        "two": "${COUNT} bananas",
        "few": "${COUNT} bananas",
        "many": "${COUNT} bananas",
        "other": "${COUNT} bananas"
      }
    }
  }
  "extrapoint": {
    "anything": "Anything"
  }
}
```

### TransProvider
```
import { Trans } from 'tiny-trans';
import { TransProvider } from 'react-tiny-trans';
import ru from './lang_ru.json';
import en from './lang_en.json';

enum Locale {
  ru = 'ru',
  en = 'en',
}

const trans = new Trans<Locale>();

export const App: React.FC = () => (
  /**
  * trans: Trans<Locale>;
  * initLocale: Locale;
  * pluralRecord?: Record<Locale, PluralFn>;
  */
  <TransProvider translations={translations} trans={trans} initLocale={Locale.ru}>
    ...
  </TransProvider>
);
```

### useTranslate
```
export const SomeComponent: React.FC = () => {
  /**
  * translate: Translate<T>;
  * locale: string;
  * changeLocale: (locale: string) => Promise<void>;
  */
  const { translate, locale, changeLocale } = useTranslate`extrapoint`
  return (
    <div>
      {translate`anything`}
    </div>
  )
};
```

### useTransContext
```
export const SomeComponent: React.FC = () => {
  /**
  * loading: boolean; // it changes during dynamic import
  * trans: Trans;
  */
  const { loading, trans } = useTransContext()
  return (
    <div>
      ...
    </div>
  )
};
```

### withTranslate
```
/**
* translate: Translate<T>;
* locale: string;
* changeLocale: (locale: string) => Promise<void>;
*/
export const SomeComponent: React.FC = ({ translate, locale, changeLocale }) => {
  return (
    <div>
      {translate`anything`}
    </div>
  )
};

const TranslatedSomeComponent = withTranslate(SomeComponent, 'extrapoint');
```

About `translate`, `changeLocale` you can read in the [tiny-trans doc](https://www.npmjs.com/package/tiny-trans)
