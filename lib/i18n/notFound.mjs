import { createTranslator } from '../i18n.mjs';

const strings = {
  en: {
    heading: 'Page not found',
    backLink: 'Back to all contributors',
  },
  fr: {
    heading: 'Page introuvable',
    backLink: 'Retour à tous les contributeurs',
  },
};

export const tNotFound = createTranslator(strings);