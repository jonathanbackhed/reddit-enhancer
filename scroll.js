const post = document.querySelector("#main-content");
const comments = document.querySelector("#comment-tree");
console.log("COMMENTS IS " + comments);

const NAVBAR_HEIGHT = 56;
let commentIndex = 1;

const targetNode = document.querySelector("#main-content");

if (comments === null) {
  const addIdsToComments = () => {
    console.log("addIdsToComments");
    const comments = document.querySelector("#comment-tree");
    let count = 1;
    comments.childNodes.forEach((node, index) => {
      if (node.nodeName === "SHREDDIT-COMMENT") {
        node.id = `comment-${count}`;
        count++;
      }
    });
  };

  const observer = new MutationObserver((mutationList) => {
    console.log(mutationList);
    mutationList.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.id.includes("comment-tree-content-anchor-")) {
          addIdsToComments();
        }
      });
    });
  });
  observer.observe(targetNode, {
    childList: true,
  });
} else {
  console.log("COMMENTS EXIST");
  let count = 1;
  comments.childNodes.forEach((node, index) => {
    if (node.nodeName === "SHREDDIT-COMMENT") {
      node.id = `comment-${count}`;
      count++;
    }
  });
}

// SCROLL BTN & LOGIC
const createDomElement = (html) => {
  const dom = new DOMParser().parseFromString(html, "text/html");
  return dom.body.firstElementChild;
};

const scrollToNext = () => {
  window.scrollTo({
    top: cmt.offsetTop - NAVBAR_HEIGHT,
    behavior: "smooth",
  });
  commentIndex++;
};

const scrollBtn = createDomElement(`
    <button id="scrollToNextButton" type="button" class="scrollBtn centerText">
      V
    </button>
  `);

post.prepend(scrollBtn);

const scrollToNextButton = document.querySelector("#scrollToNextButton");
scrollToNextButton.addEventListener("click", scrollToNext);
