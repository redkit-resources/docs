(function() {
  'use strict';

  function init() {
    if (!window.REDIRECT_CONFIG) {
      console.error('redirect-config.js not loaded!');
      return;
    }
    checkRedirect();
  }

  function patternToRegex(pattern) {
    let regex = pattern;

    regex = regex.replace(/\*\*/g, '___DOUBLESTAR___');
    regex = regex.replace(/\*/g, '___STAR___');

    regex = regex.replace(/[.+?^${}()|[\]\\]/g, '\\$&');

    regex = regex.replace(/___DOUBLESTAR___/g, '(.*)');
    regex = regex.replace(/___STAR___/g, '([^/]+)');

    return new RegExp('^' + regex + '$');
  }

  function applyCaptures(template, captures) {
    let result = template;
    let captureIndex = 0;

    result = result.replace(/\*\*|\*/g, function() {
      return captures[captureIndex++] || '';
    });

    return result;
  }

  function checkRedirect() {
    const cfg = window.REDIRECT_CONFIG;
    const fullPath = window.location.pathname;

    if (cfg.debug) {
      console.log('[Redirect] Full Path:', fullPath);
    }

    if (!cfg.versions) {
      console.error('[Redirect] No versions configured');
      return;
    }

    for (let versionName in cfg.versions) {
      const version = cfg.versions[versionName];
      const basePaths = version.basePaths || [];
      const redirects = version.redirects || {};
      const regexRules = version.regex || [];

      for (let basePath of basePaths) {
        basePath = basePath.replace(/\/+$/, '');

        if (!fullPath.startsWith(basePath)) {
          continue;
        }

        let relativePath = fullPath.substring(basePath.length);

        if (!relativePath.startsWith('/')) {
          relativePath = '/' + relativePath;
        }

        for (let from in redirects) {
          let to = redirects[from];

          const regex = patternToRegex(from);
          const match = relativePath.match(regex);

          if (match) {
            const captures = match.slice(1);
            const targetRelativePath = applyCaptures(to, captures);

            if (targetRelativePath !== relativePath) {
              const targetFullPath = basePath + targetRelativePath;
              const fullUrl = window.location.origin + targetFullPath + window.location.search + window.location.hash;

              if (cfg.debug) {
                console.log('[Redirect] Wildcard match found!');
                console.log('  Version:', versionName);
                console.log('  BasePath:', basePath);
                console.log('  Pattern:', from);
                console.log('  From:', relativePath);
                console.log('  To:', targetRelativePath);
                console.log('  Captures:', captures);
                console.log('  Full URL:', fullUrl);
              }

              window.location.replace(fullUrl);
              return;
            }
          }
        }

        for (let rule of regexRules) {
          const match = relativePath.match(rule.pattern);

          if (match) {
            let targetRelativePath;

            if (typeof rule.replace === 'function') {
              targetRelativePath = rule.replace(relativePath, ...match.slice(1));
            } else {
              targetRelativePath = rule.replace;
              match.slice(1).forEach((capture, index) => {
                targetRelativePath = targetRelativePath.replace(new RegExp('\\$' + (index + 1), 'g'), capture);
              });
            }

            if (targetRelativePath !== relativePath) {
              const targetFullPath = basePath + targetRelativePath;
              const fullUrl = window.location.origin + targetFullPath + window.location.search + window.location.hash;

              if (cfg.debug) {
                console.log('[Redirect] Regex match found!');
                console.log('  Version:', versionName);
                console.log('  BasePath:', basePath);
                console.log('  Pattern:', rule.pattern);
                console.log('  From:', relativePath);
                console.log('  To:', targetRelativePath);
                console.log('  Description:', rule.description || 'N/A');
                console.log('  Full URL:', fullUrl);
              }

              window.location.replace(fullUrl);
              return;
            }
          }
        }
      }
    }

    if (cfg.debug) {
      console.log('[Redirect] No redirect required');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
