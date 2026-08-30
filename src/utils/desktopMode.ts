// Desktop mode switching is completely disabled on mobile devices
if (typeof window !== "undefined") {
  try {
    localStorage.removeItem("forced_desktop_mode");
    document.documentElement.classList.remove("force-desktop-mode");
  } catch (_) {}
}

export function enableDesktopMode() {
  // Disabled - mobile always stays in responsive mobile layout
}

export function disableDesktopMode() {
  const meta = document.querySelector('meta[name="viewport"]') as HTMLMetaElement;
  if (meta) {
    meta.setAttribute(
      "content",
      "width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes"
    );
  }
  document.documentElement.classList.remove("force-desktop-mode");
  localStorage.removeItem("forced_desktop_mode");
}

export function isForcedDesktopMode(): boolean {
  return false;
}

