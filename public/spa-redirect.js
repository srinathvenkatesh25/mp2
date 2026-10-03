// Runs on the 404 page. Sends the browser to the app's root and keeps the
// original path in ?redirect=..., which src/restoreRedirect.ts turns back into
// the real URL before React Router starts.
// Must match `base` in vite.config.ts.
var base = '/mp2/'
var loc = window.location
var path = loc.pathname.indexOf(base) === 0 ? loc.pathname.slice(base.length) : ''
loc.replace(base + '?redirect=' + encodeURIComponent(path + loc.search + loc.hash))
