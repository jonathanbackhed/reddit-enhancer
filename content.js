let doc = document.documentElement;
let btn;

const darkModePref = window.matchMedia("(prefers-color-scheme: dark)");

const setDarkTheme = () => {
  if (btn) {
    btn.setAttribute("checked", "");
    btn.setAttribute("aria-checked", "true");
  }

  doc.classList.remove("theme-light");
  doc.classList.add("theme-dark");
};

const setLightTheme = () => {
  if (btn) {
    btn.removeAttribute("checked");
    btn.removeAttribute("aria-checked");
  }

  doc.classList.remove("theme-dark");
  doc.classList.add("theme-light");
};

function init() {
  btn = document.querySelector("[name='darkmode-switch-name']");

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
}

init();
