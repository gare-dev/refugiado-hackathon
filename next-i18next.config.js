// next-i18next.config.jjs
const path = require('path')

module.exports = {
    i18n: {
        locales: ['es', 'pt'],
        defaultLocale: 'pt',

    },
    localePath: path.resolve('./public/locales'),
};