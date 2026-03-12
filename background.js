const DEFAULT_SETTINGS = {
  persistHiddenState: false,
};
const DEFAULT_TITLE = "Toggle WordPress admin bar";
const NO_ADMIN_BAR_TITLE = "No WordPress admin bar on this page";
const SHOW_TITLE = "Show WordPress admin bar";
const HIDE_TITLE = "Hide WordPress admin bar";
const UNSUPPORTED_PAGE_TITLE = "This page does not support the extension";
const NO_ADMIN_BAR_BADGE_TEXT = "N/A";
const UNSUPPORTED_PAGE_BADGE_TEXT = "N/A";
const NO_ADMIN_BAR_BADGE_COLOR = "#a52f0e";
const UNSUPPORTED_PAGE_BADGE_COLOR = "#475569";
const FEEDBACK_DURATION_MS = 1200;
const ACTION_ICONS = {
  visible: {
    16: "icons/visible-16.png",
    32: "icons/visible-32.png",
    48: "icons/visible-48.png",
    128: "icons/visible-128.png",
  },
  hidden: {
    16: "icons/hidden-16.png",
    32: "icons/hidden-32.png",
    48: "icons/hidden-48.png",
    128: "icons/hidden-128.png",
  },
};
const feedbackTimeouts = new Map();

chrome.runtime.onInstalled.addListener(async () => {
  const current = await chrome.storage.sync.get("persistHiddenState");

  if (typeof current.persistHiddenState !== "boolean") {
    await chrome.storage.sync.set(DEFAULT_SETTINGS);
  }
});

async function resolveTargetTab(clickedTab) {
  if (clickedTab?.id) {
    return clickedTab;
  }

  const [activeTab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  return activeTab;
}

async function setActionAppearance(tabId, { hasAdminBar, hidden }) {
  const path =
    hasAdminBar && hidden ? ACTION_ICONS.hidden : ACTION_ICONS.visible;
  const title = !hasAdminBar
    ? NO_ADMIN_BAR_TITLE
    : hidden
      ? SHOW_TITLE
      : HIDE_TITLE;

  await Promise.all([
    chrome.action.setIcon({ tabId, path }),
    chrome.action.setTitle({ tabId, title }),
  ]);
}

function clearFeedbackTimeout(tabId) {
  const timeoutId = feedbackTimeouts.get(tabId);

  if (timeoutId) {
    clearTimeout(timeoutId);
    feedbackTimeouts.delete(tabId);
  }
}

async function clearActionFeedback(tabId) {
  clearFeedbackTimeout(tabId);
  await chrome.action.setBadgeText({ tabId, text: "" });
}

async function showTemporaryFeedback(tabId, { text, color, title }) {
  clearFeedbackTimeout(tabId);

  await Promise.all([
    chrome.action.setBadgeText({ tabId, text }),
    chrome.action.setBadgeBackgroundColor({ tabId, color }),
    title ? chrome.action.setTitle({ tabId, title }) : Promise.resolve(),
  ]);

  const timeoutId = setTimeout(() => {
    feedbackTimeouts.delete(tabId);
    void chrome.action.setBadgeText({ tabId, text: "" });
  }, FEEDBACK_DURATION_MS);

  feedbackTimeouts.set(tabId, timeoutId);
}

async function resetActionAppearance(tabId) {
  await clearActionFeedback(tabId);
  await Promise.all([
    chrome.action.setIcon({ tabId, path: ACTION_ICONS.visible }),
    chrome.action.setTitle({ tabId, title: DEFAULT_TITLE }),
  ]);
}

async function syncActionAppearance(tabId) {
  try {
    const response = await chrome.tabs.sendMessage(tabId, {
      type: "GET_ADMIN_BAR_STATE",
    });

    if (response?.ok) {
      await clearActionFeedback(tabId);
      await setActionAppearance(tabId, response);
      return;
    }
  } catch (error) {
    // Ignore tabs where content scripts are unavailable.
  }

  await resetActionAppearance(tabId);
}

chrome.action.onClicked.addListener(async (clickedTab) => {
  const targetTab = await resolveTargetTab(clickedTab);

  if (!targetTab?.id) {
    return;
  }

  try {
    const response = await chrome.tabs.sendMessage(targetTab.id, {
      type: "TOGGLE_ADMIN_BAR",
    });

    if (response?.ok) {
      await setActionAppearance(targetTab.id, response);

      if (!response.hasAdminBar) {
        await showTemporaryFeedback(targetTab.id, {
          text: NO_ADMIN_BAR_BADGE_TEXT,
          color: NO_ADMIN_BAR_BADGE_COLOR,
          title: NO_ADMIN_BAR_TITLE,
        });
      }
    }
  } catch (error) {
    await showTemporaryFeedback(targetTab.id, {
      text: UNSUPPORTED_PAGE_BADGE_TEXT,
      color: UNSUPPORTED_PAGE_BADGE_COLOR,
      title: UNSUPPORTED_PAGE_TITLE,
    });
  }
});

chrome.runtime.onMessage.addListener((message, sender) => {
  if (message?.type !== "ADMIN_BAR_STATE" || !sender.tab?.id) {
    return;
  }

  void setActionAppearance(sender.tab.id, message);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status === "loading") {
    void resetActionAppearance(tabId);
  }

  if (changeInfo.status === "complete") {
    void syncActionAppearance(tabId);
  }
});

chrome.tabs.onActivated.addListener(({ tabId }) => {
  void syncActionAppearance(tabId);
});
