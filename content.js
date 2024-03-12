const doc = document.documentElement;
const btn = document.querySelector("[name='darkmode-switch-name']");

const darkModePref = window.matchMedia("(prefers-color-scheme: dark)");

const setDarkTheme = () => {
  btn.ariaChecked = true;
  btn.setAttribute("checked", "");

  doc.classList.remove("theme-light");
  doc.classList.add("theme-dark");
};

const setLightTheme = () => {
  btn.ariaChecked = false;
  btn.removeAttribute("checked");

  doc.classList.remove("theme-dark");
  doc.classList.add("theme-light");
};

if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
  setDarkTheme();
} else {
  setLightTheme();
}

darkModePref.addEventListener("change", (e) => {
  if (e.matches) {
    setDarkTheme();
  } else {
    setLightTheme();
  }
});
