import i18n from 'i18next';

const changeLanguage = (code) => {
  // using Promises
  i18n.changeLanguage(code).then((t) => {
    t('key'); // -> same as i18next.t
  });
};

export default changeLanguage;
