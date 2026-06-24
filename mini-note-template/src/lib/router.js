// src/lib/router.js — hash-based route helpers used in the single-file
// standalone build. In the multi-file build, linkTo() returns a regular
// href so real <a> navigation works.
(function () {
  const ROUTES = [
    'login', 'signup', 'signup-sent',
    'forgot', 'forgot-code', 'forgot-new', 'forgot-done',
    'success',
  ];

  // Detect whether we're running inside the merged single-file build
  // (identified by a <meta name="nimbus-build" content="bundle">) or as
  // separate per-screen HTML files.
  function isBundle() {
    const m = document.querySelector('meta[name="nimbus-build"]');
    return !!(m && m.getAttribute('content') === 'bundle');
  }

  function parseHash() {
    const h = (window.location.hash || '').replace(/^#\/?/, '').trim();
    return ROUTES.indexOf(h) >= 0 ? h : 'login';
  }

  function go(route) {
    if (isBundle()) {
      window.location.hash = '#/' + route;
    } else {
      window.location.href = route + '.html';
    }
  }

  function linkTo(file) {
    const route = file.replace(/\.html$/, '');
    if (isBundle()) {
      return {
        href: '#/' + route,
        onClick: function (e) { e.preventDefault(); go(route); },
      };
    }
    return { href: route + '.html' };
  }

  function useRoute() {
    const [route, setRoute] = React.useState(parseHash);
    React.useEffect(function () {
      const onHash = function () { setRoute(parseHash()); };
      window.addEventListener('hashchange', onHash);
      return function () { window.removeEventListener('hashchange', onHash); };
    }, []);
    return route;
  }

  window.Router = { ROUTES: ROUTES, isBundle: isBundle, go: go, linkTo: linkTo, useRoute: useRoute };
})();
