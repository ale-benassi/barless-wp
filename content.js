const STYLE_ID = "hide-wp-admin-bar-extension-style";
const DEFAULT_SETTINGS = {
  persistHiddenState: true
};

function getOriginKey() {
  return window.location.origin;
}

function getStyleElement() {
  return document.getElementById(STYLE_ID);
}

function isHidden() {
  return Boolean(getStyleElement());
}

function createStyleElement() {
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    :root {
      --wp-admin--admin-bar--height: 0px !important;
      scroll-padding-top: 0 !important;
    }

    html,
    body {
      margin-top: 0 !important;
      padding-top: 0 !important;
    }

    #wpadminbar {
      display: none !important;
      visibility: hidden !important;
      pointer-events: none !important;
    }
  `;
  return style;
}

function notifyAdminBarState(hasAdminBar, hidden) {
  void chrome.runtime.sendMessage({
    type: "ADMIN_BAR_STATE",
    hasAdminBar,
    hidden
  }).catch(() => {
    // Ignore delivery failures during navigation or extension reloads.
  });
}

function applyHiddenState() {
  if (isHidden()) {
    return true;
  }

  const style = createStyleElement();
  const parent = document.head || document.documentElement;

  if (!parent) {
    return false;
  }

  parent.appendChild(style);
  return true;
}

function removeHiddenState() {
  const style = getStyleElement();

  if (!style) {
    return false;
  }

  style.remove();
  return true;
}

async function getPersistedState() {
  const [settings, localState] = await Promise.all([
    chrome.storage.sync.get(DEFAULT_SETTINGS),
    chrome.storage.local.get({ hiddenOrigins: {} })
  ]);

  return {
    persistHiddenState: settings.persistHiddenState === true,
    hiddenOrigins: localState.hiddenOrigins || {}
  };
}

async function setOriginHidden(origin, hidden) {
  const { hiddenOrigins } = await chrome.storage.local.get({ hiddenOrigins: {} });
  const nextHiddenOrigins = { ...(hiddenOrigins || {}) };

  if (hidden) {
    nextHiddenOrigins[origin] = true;
  } else {
    delete nextHiddenOrigins[origin];
  }

  await chrome.storage.local.set({ hiddenOrigins: nextHiddenOrigins });
}

function waitForAdminBarResolution() {
  return new Promise((resolve) => {
    if (document.getElementById("wpadminbar")) {
      resolve(true);
      return;
    }

    if (document.readyState === "complete") {
      resolve(false);
      return;
    }

    let settled = false;
    let observer;

    const finish = (hasAdminBar) => {
      if (settled) {
        return;
      }

      settled = true;
      observer?.disconnect();
      document.removeEventListener("readystatechange", handleReadyStateChange);
      resolve(hasAdminBar);
    };

    const check = () => {
      if (document.getElementById("wpadminbar")) {
        finish(true);
        return;
      }

      if (document.readyState === "complete") {
        finish(false);
      }
    };

    function handleReadyStateChange() {
      check();
    }

    observer = new MutationObserver(() => {
      check();
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    });

    document.addEventListener("readystatechange", handleReadyStateChange);
    check();
  });
}

async function toggleAdminBar() {
  const adminBar = document.getElementById("wpadminbar");

  if (!adminBar) {
    const response = {
      ok: true,
      hasAdminBar: false,
      hidden: false
    };
    notifyAdminBarState(response.hasAdminBar, response.hidden);
    return response;
  }

  const nextHidden = !isHidden();

  if (nextHidden) {
    applyHiddenState();
  } else {
    removeHiddenState();
  }

  const { persistHiddenState } = await chrome.storage.sync.get(DEFAULT_SETTINGS);

  if (persistHiddenState) {
    await setOriginHidden(getOriginKey(), nextHidden);
  }

  const response = {
    ok: true,
    hasAdminBar: true,
    hidden: nextHidden
  };
  notifyAdminBarState(response.hasAdminBar, response.hidden);
  return response;
}

async function initializeAdminBarState() {
  const hasAdminBar = await waitForAdminBarResolution();
  const { persistHiddenState, hiddenOrigins } = await getPersistedState();

  if (hasAdminBar && persistHiddenState && hiddenOrigins[getOriginKey()]) {
    applyHiddenState();
  }

  notifyAdminBarState(hasAdminBar, hasAdminBar ? isHidden() : false);
}

function getCurrentAdminBarState() {
  const hasAdminBar = Boolean(document.getElementById("wpadminbar"));

  return {
    ok: true,
    hasAdminBar,
    hidden: hasAdminBar ? isHidden() : false
  };
}

const initializationPromise = initializeAdminBarState();

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type === "TOGGLE_ADMIN_BAR") {
    toggleAdminBar()
      .then((response) => sendResponse(response))
      .catch(() =>
        sendResponse({
          ok: false,
          hasAdminBar: Boolean(document.getElementById("wpadminbar"))
        })
      );

    return true;
  }

  if (message?.type === "GET_ADMIN_BAR_STATE") {
    initializationPromise
      .then(() => sendResponse(getCurrentAdminBarState()))
      .catch(() =>
        sendResponse({
          ok: false,
          hasAdminBar: Boolean(document.getElementById("wpadminbar"))
        })
      );

    return true;
  }
});
