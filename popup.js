document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("videoUrl");
  const preset = document.getElementById("preset");
  const saveBtn = document.getElementById("saveBtn");

  // Load current video URL
  chrome.storage.local.get(["bgVideo"], (result) => {
    if (result.bgVideo) {
      input.value = result.bgVideo;
    }
  });

  // When user selects a preset
  preset.addEventListener("change", () => {
    if (preset.value) {
      input.value = preset.value; // auto-fill the input
    }
  });

  // Save video URL
  saveBtn.addEventListener("click", () => {
    const url = input.value.trim();
    if (url) {
      chrome.storage.local.set({ bgVideo: url }, () => {
        chrome.tabs.query({ url: "https://anilist.co/*" }, (tabs) => {
          tabs.forEach(tab => {
            chrome.tabs.sendMessage(tab.id, { action: "updateVideo", url });
          });
        });
      });
    }
  });
});
