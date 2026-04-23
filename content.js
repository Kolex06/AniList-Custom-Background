// Modular CSS
const cssFiles = [
  "https://carloshdrp.github.io/anilist-css/files/banner-remove.css",
  "https://carloshdrp.github.io/anilist-css/files/navbar.css",
  "https://carloshdrp.github.io/anilist-css/files/font.css",
  "https://carloshdrp.github.io/anilist-css/files/stats2.css",
  "https://carloshdrp.github.io/anilist-css/files/favourites.css",
  "https://carloshdrp.github.io/anilist-css/files/feed.css",
  "https://carloshdrp.github.io/anilist-css/files/footer.css"
];

cssFiles.forEach(url => {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = url;
  document.head.appendChild(link);
});

// Default video
let defaultVideo = "https://i.imgur.com/WVXOFcd.mp4";

// Function to insert video
function insertVideo(url) {
  let existing = document.getElementById("anilist-bg-video");
  if (existing) existing.remove();

  const video = document.createElement("video");
  video.src = url;
  video.autoplay = true;
  video.loop = true;
  video.muted = true;
  video.playsInline = true;
  video.id = "anilist-bg-video";
  document.body.prepend(video);
}

// Load video from storage
chrome.storage.local.get(["bgVideo"], result => {
  insertVideo(result.bgVideo || defaultVideo);
});

// Listen for updates from popup
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "updateVideo") {
    insertVideo(message.url);
  }
});

// Styles
const style = document.createElement("style");
style.textContent = `
  #anilist-bg-video {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    object-fit: cover;
    z-index: -1;
    pointer-events: none;
  }
  body {
    background: rgba(0,0,0,0.6) !important;
  }
  .header-wrap .nav-wrap .link:nth-child(1):before {
    content: "";
    display: inline-block;
    width: 24px;
    height: 24px;
    background: url("https://anilist.co/img/icons/icon.svg") no-repeat center center;
    background-size: contain;
  }
  .header-wrap .nav-wrap .link {
    color: var(--color-primary) !important;
  }
`;
document.head.appendChild(style);
