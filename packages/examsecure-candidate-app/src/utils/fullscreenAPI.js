/* Wrapper functions for common tasks related to the fullscreen API */

// Takes the page into fullscreen. Returns 1 on success and 0 on failure
export async function makeFullScreen() {
  let elem = document.documentElement;

  if (document.fullscreenEnabled) {
    await elem.requestFullscreen();
    return 1;
  } else {
    alert("Browser does not support Fullscreen mode.");
    return 0;
  }
}

export async function exitFullScreen() {
  window.addEventListener(
    "fullscreenchange",
    function (event) {
      event.stopPropagation();
    },
    true
  );
  await document.exitFullscreen();
}

export function defineFullscreenChangeEvent(
  onFullscreenExit,
  onFullscreenEnter
) {
  document.addEventListener("fullscreenchange", (event) => {
    // Note to self: `fullscreenchange` event is fired immediately after the browser switched into or out of full screen mode
    if (document.fullscreenElement) {
      onFullscreenEnter();
      console.log("entered fullscreen");
    } else {
      onFullscreenExit();
      console.log("exitedfullscreen");
    }
  });
}
