const DEFAULT_SETTINGS = {
  persistHiddenState: true
};

const persistCheckbox = document.getElementById("persistHiddenState");
const statusMessage = document.getElementById("statusMessage");

function setStatus(message) {
  statusMessage.textContent = message;
}

async function loadSettings() {
  const { persistHiddenState } = await chrome.storage.sync.get(DEFAULT_SETTINGS);
  persistCheckbox.checked = persistHiddenState === true;
}

async function saveSettings() {
  const persistHiddenState = persistCheckbox.checked;

  await chrome.storage.sync.set({ persistHiddenState });

  if (!persistHiddenState) {
    await chrome.storage.local.set({ hiddenOrigins: {} });
  }

  setStatus("Settings saved.");

  window.clearTimeout(saveSettings.statusTimeoutId);
  saveSettings.statusTimeoutId = window.setTimeout(() => {
    setStatus("");
  }, 1600);
}

persistCheckbox.addEventListener("change", () => {
  void saveSettings();
});

document.addEventListener("DOMContentLoaded", () => {
  void loadSettings();
});
