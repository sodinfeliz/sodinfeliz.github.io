// The top bar's switch between light and dark. It flips the theme, remembers it for the whole site, tints the
// browser's bar to match, and tells the page, which may have pictures of its own to change.
(() => {
  const root = document.documentElement;
  const toggle = document.querySelector(".theme-toggle");
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const tint = () => { if (themeColor) themeColor.content = root.dataset.theme === "dark" ? "#14171F" : "#F6F3EC"; };
  tint();
  if (!toggle) return;
  toggle.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    try { localStorage.setItem("unfurl-theme", root.dataset.theme); } catch (e) {}
    tint();
    document.dispatchEvent(new CustomEvent("unfurl-theme"));
  });
})();
