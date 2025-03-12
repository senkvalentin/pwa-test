import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute, Route, NavigationRoute } from 'workbox-routing';
import { NetworkFirst, CacheFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';

self.skipWaiting();
precacheAndRoute(self.__WB_MANIFEST);
registerRoute(new NavigationRoute(createHandlerBoundToURL('index.html')));

const locationRoute = new Route(
  ({ url }) => url.pathname === '/api/locations',
  new NetworkFirst({
    cacheName: 'locations-cache',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 1,
      }),
    ],
    cacheableResponse: {
      statuses: [0, 200],
    },
  }),
);
const assetsRoute = new Route(
  ({ url }) => /.*assets\/.*.woff/.test(url.pathname),
  new CacheFirst({
    cacheName: 'assets-cache',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 1,
      }),
    ],
    cacheableResponse: {statuses: [0, 200]},
  }),
);
registerRoute(locationRoute);
registerRoute(assetsRoute);

