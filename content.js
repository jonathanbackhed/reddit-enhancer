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

// Comment Navigation Feature
const isCommentsPage = () => {
  return /^https:\/\/www\.reddit\.com\/r\/[^/]+\/comments\//.test(window.location.href);
};

let commentIndex = -1;
let navButton = null;

const createNavButton = () => {
  if (navButton) return;

  navButton = document.createElement("button");
  navButton.textContent = "↓";
  navButton.setAttribute("aria-label", "Scroll to next comment");
  navButton.style.cssText = `
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: none;
    background: #ff4500;
    color: white;
    font-size: 24px;
    cursor: pointer;
    z-index: 9999;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    transition: background 0.2s, transform 0.2s;
  `;

  navButton.addEventListener("mouseenter", () => {
    navButton.style.background = "#e03d00";
    navButton.style.transform = "scale(1.1)";
  });

  navButton.addEventListener("mouseleave", () => {
    navButton.style.background = "#ff4500";
    navButton.style.transform = "scale(1)";
  });

  navButton.addEventListener("click", scrollToNextComment);
  document.body.appendChild(navButton);
};

const removeNavButton = () => {
  if (navButton) {
    navButton.remove();
    navButton = null;
    commentIndex = -1;
  }
};

const NAVBAR_OFFSET = 64; // 56px navbar + 8px padding

const scrollToNextComment = () => {
  const comments = document.querySelectorAll("shreddit-comment-tree > shreddit-comment");
  if (comments.length === 0) return;

  commentIndex++;
  if (commentIndex >= comments.length) {
    commentIndex = 0;
  }

  const targetComment = comments[commentIndex];
  const elementTop = targetComment.getBoundingClientRect().top + window.scrollY;

  window.scrollTo({
    top: elementTop - NAVBAR_OFFSET,
    behavior: "smooth"
  });
};

const checkAndToggleNavButton = () => {
  if (isCommentsPage()) {
    createNavButton();
  } else {
    removeNavButton();
  }
};

checkAndToggleNavButton();

const observer = new MutationObserver(() => {
  checkAndToggleNavButton();
});

observer.observe(document.body, { childList: true, subtree: true });
