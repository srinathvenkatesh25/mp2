// Counterpart of public/spa-redirect.js: if we arrived as /mp2/?redirect=meal%2F123,
// swap the address bar back to /mp2/meal/123 WITHOUT reloading, so that
// BrowserRouter reads the correct path on its first render.
export function restoreRedirect(): void {
  const redirect = new URLSearchParams(window.location.search).get('redirect')
  if (redirect !== null) {
    window.history.replaceState(null, '', import.meta.env.BASE_URL + redirect)
  }
}
