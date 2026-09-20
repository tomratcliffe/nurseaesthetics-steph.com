import { useEffect } from 'react';
import { site } from '../content';

/**
 * Loads Cloudflare Web Analytics, which is cookieless: it sets no cookies and
 * writes nothing to storage, so the site needs no consent banner.
 *
 * Injected here rather than hardcoded in index.html for two reasons: it stays
 * inert until a token is configured, and it never loads on the dev server, so
 * developing the site does not send traffic to the dashboard.
 *
 * Route changes need no work on our side. The beacon detects client-side
 * navigation itself — via the Soft Navigations API, the Navigation API, or by
 * patching history.pushState and listening for popstate — and reads
 * window.location directly, so it stays correct under the router's basename and
 * after the custom domain replaces the project path prefix.
 */
export function Analytics() {
  useEffect(() => {
    // MODE, not PROD: Vite derives PROD from NODE_ENV rather than from the
    // build mode, so on a machine with NODE_ENV=development a production build
    // reports PROD false and would ship with analytics silently disabled.
    if (!site.analyticsToken || import.meta.env.MODE !== 'production') return;
    if (document.querySelector('script[data-cf-beacon]')) return;

    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://static.cloudflareinsights.com/beacon.min.js';
    // The `spa` option defaults to true, which is what we want.
    script.dataset.cfBeacon = JSON.stringify({ token: site.analyticsToken });
    document.head.append(script);
  }, []);

  return null;
}
