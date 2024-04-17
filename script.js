const registerServiceWorker = async () => {
    if ("serviceWorker" in navigator) {
      try {
          const registration = await navigator.serviceWorker.register("my.first.pwa/sw.js", {
              scope: "/my.first.pwa",
        });
        if (registration.installing) {
          console.log("Service worker installing");
        } else if (registration.waiting) {
          console.log("Service worker installed");
        } else if (registration.active) {
          console.log("Service worker active");
        }
      } catch (error) {
        console.error(`Registration failed with ${error}`);
      }
    }
};

registerServiceWorker();

console.log('version', 3);