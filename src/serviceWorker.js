// This optional code is used to register a service worker.
// register() is not called by default.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on subsequent visits to a page, after all the
// existing tabs open on the page have been closed, since previously cached
// resources are updated in the background.

// To learn more about the benefits of this model and instructions on how to
// opt-in, read https://bit.ly/CRA-PWA

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.0/8 are considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

export function register(config) {
  if (
    (process.env.NODE_ENV === 'production' || isLocalhost) &&
    'serviceWorker' in navigator
  ) {
    // The URL constructor is available in all browsers that support SW.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      // Our service worker won't work if PUBLIC_URL is on a different origin
      // from what our page is served on. This might happen if a CDN is used to
      // serve assets; see https://github.com/facebook/create-react-app/issues/2374
      return;
    }

    window.addEventListener('push', e => {
      console.log('push event listerner called');
      // navigator.serviceWorker.getRegistration().then(reg => {
      //   // TODO 2.4 - Add 'options' object to configure the notification
      //   const options = {
      //     body: 'First notification!',
      //     icon: 'images/notification-flat.png',
      //     vibrate: [100, 50, 100],
      //     data: {
      //       dateOfArrival: Date.now(),
      //       primaryKey: 1
      //     },
      //     // TODO 2.5 - add actions to the notification
      //     actions: [
      //       {
      //         action: 'explore',
      //         title: 'Go to the site',
      //         icon: 'images/checkmark.png'
      //       },
      //       {
      //         action: 'close',
      //         title: 'Close the notification',
      //         icon: 'images/xmark.png'
      //       }
      //     ]
      //     // TODO 5.1 - add a tag to the notification
      //   };

      //   reg.showNotification('Hello world!', options);
      // });
      var options = {
        body: 'This notification was generated from a push!',
        icon: 'images/example.png',
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: '2'
        },
        actions: [
          {
            action: 'explore',
            title: 'Explore this new world',
            icon: 'images/checkmark.png'
          },
          { action: 'close', title: 'Close', icon: 'images/xmark.png' }
        ]
      };
      e.waitUntil(
        window.navigator.serviceWorker.getRegistration().then(reg => {
          reg.showNotification('Hello World', options);
        })
      );
      // e.waitUntil(self.registration.showNotification('Hello world!', options));
    });

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        // This is running on localhost. Let's check if a service worker still exists or not.
        checkValidServiceWorker(swUrl, config);

        // Add some additional logging to localhost, pointing developers to the
        // service worker/PWA documentation.
        navigator.serviceWorker.ready.then(() => {
          console.log(
            'This web app is being served cache-first by a service ' +
              'worker. To learn more, visit https://bit.ly/CRA-PWA'
          );
        });
      } else {
        // Is not localhost. Just register service worker
        registerValidSW(swUrl, config);
      }
    });
  }
}

function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl, { scope: '/' })
    .then(registration => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // At this point, the updated precached content has been fetched,
              // but the previous service worker will still serve the older
              // content until all client tabs are closed.
              console.log(
                'New content is available and will be used when all ' +
                  'tabs for this page are closed. See https://bit.ly/CRA-PWA.'
              );

              // Execute callback
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              // At this point, everything has been precached.
              // It's the perfect time to display a
              // "Content is cached for offline use." message.
              console.log('Content is cached for offline use.');

              // Execute callback
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };

      // TODO 2.1 - check for notification support
      if (!('Notification' in window)) {
        console.log('This browser does not support notifications!');
        return;
      }

      // TODO 2.2 - request permission to show notifications
      Notification.requestPermission(status => {
        console.log('Notification permission status:', status);
        if (Notification.permission === 'granted') {
          subscribe();
          // displayNotification();
        }
      });

      const subscribe = async () => {
        const sw = await window.navigator.serviceWorker.ready;
        //ApplicationServerKey is created from web-push package
        const push = await sw.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey:
            'BLijwO21fuI9hOQbL_O2GMzQtbGilclWGSB3XUWJ-Qew2t_IflL9a-r9WjvQxMgh39RmKu3ZwFNOE8CK6vCm3qo'
        });
        console.log(JSON.stringify(push));
      };

      function displayNotification() {
        // TODO 2.3 - display a Notification
        if (Notification.permission === 'granted') {
          navigator.serviceWorker.getRegistration().then(reg => {
            // TODO 2.4 - Add 'options' object to configure the notification
            const options = {
              body: 'First notification!',
              icon: 'images/notification-flat.png',
              vibrate: [100, 50, 100],
              data: {
                dateOfArrival: Date.now(),
                primaryKey: 1
              },
              // TODO 2.5 - add actions to the notification
              actions: [
                {
                  action: 'explore',
                  title: 'Go to the site',
                  icon: 'images/checkmark.png'
                },
                {
                  action: 'close',
                  title: 'Close the notification',
                  icon: 'images/xmark.png'
                }
              ]
              // TODO 5.1 - add a tag to the notification
            };

            reg.showNotification('Hello world!', options);
          });
        }
      }
    })
    .catch(error => {
      console.error('Error during service worker registration:', error);
    });
}

function checkValidServiceWorker(swUrl, config) {
  // Check if the service worker can be found. If it can't reload the page.
  fetch(swUrl, {
    headers: { 'Service-Worker': 'script' }
  })
    .then(response => {
      // Ensure service worker exists, and that we really are getting a JS file.
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        // No service worker found. Probably a different app. Reload the page.
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker found. Proceed as normal.
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log(
        'No internet connection found. App is running in offline mode.'
      );
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}
