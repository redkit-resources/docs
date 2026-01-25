window.REDIRECT_CONFIG = {
  debug: false,

  versions: {
    ru: {
      basePaths: ['/docs'],
      redirects: {
        // Wildcards:
        // * - один сегмент пути
        // ** - любое количество сегментов

        // Примеры:
        // "/guides/*/old.html": "/guides/*/new.html",
        // "/**/unnoficial_docs/**": "/**/unofficial_docs/**",

        // "/unnoficial_docs/**": "/unofficial_docs/**",

      },

      // Regex
      regex: [
        // {
        //   pattern: /\/old-(\d+)\/(.+)/,
        //   replace: '/new-$1/$2',
        //   description: 'Redirect old-123/path to new-123/path'
        // }
      ]
    },

    en: {
      basePaths: ['/docs/en', '/docs/en/en'],
      redirects: {
        // "/unnoficial_docs/**": "/unofficial_docs/**",
      },
    }
  }
};
