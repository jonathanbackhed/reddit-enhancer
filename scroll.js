const NAVBAR_HEIGHT = 56;
let scrollIndex = 1;

const runFunctionOnObserve = (elementId, targetNode, callback) => {
  const observer = new MutationObserver((mutationList) => {
    console.log(mutationList);
    mutationList.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.id.includes(elementId)) {
          callback();
        }
      });
    });
  });
  observer.observe(targetNode, {
    childList: true,
  });
};

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

// let targetNode = document.querySelector("#main-content");
// runFunctionOnObserve("comment-tree-content-anchor-", targetNode, addIdsToComments);

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
  scrollIndex++;
};

// X 1. wait for navigation event to /r/
// 2. wait for comments to load
// 3. run addIdsToComments
// 4. add scroll button

window.addEventListener("popstate", (event) => {
  if (location.pathname.startsWith("/r/")) {
    console.log("YOU'RE ON A POST PAGE");

    let asd = document.querySelector("#main-content");
    console.log(asd);

    const observer = new MutationObserver((mutationList) => {
      console.log(mutationList);
      // mutationList.forEach((mutation) => {
      //   mutation.addedNodes.forEach((node) => {
      //     if (node.id.includes(elementId)) {
      //       callback();
      //     }
      //   });
      // });
    });
    observer.observe(asd, {
      childList: true,
    });
  } else {
    console.log("YOU'RE NOT ON A POST PAGE");
  }
});

// window.addEventListener("popstate", (event) => {
//   console.log("POPSTATE EVENT");
//   if (location.pathname.startsWith("/r/")) {
//     // you're on a post page
//     console.log("YOU'RE ON A POST PAGE");
//     scrollIndex = 1;

//     const post = document.querySelector("#main-content");
//     const comments = document.querySelector("#comment-tree");

//     const scrollBtn = createDomElement(`
//     <button id="scrollToNextButton" type="button" class="scrollBtn centerText">
//       V
//     </button>
//   `);

//     post.prepend(scrollBtn);

//     const scrollToNextButton = document.querySelector("#scrollToNextButton");
//     scrollToNextButton.addEventListener("click", scrollToNext);
//   } else {
//     console.log("YOU'RE NOT ON A POST PAGE");
//     // var element = document.querySelector("#scrollToNextButton");
//     // element.parentNode.removeChild(element);
//   }
// });
