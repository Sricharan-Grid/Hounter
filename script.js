import { errorHandler } from "./helper.js";
//Hamburger menu

const hamburger = document?.querySelector(".hamburger-menu");
const hamburgerBtn = document?.querySelector(".hamburger-menu__bar");
const hamburgerOptions = document?.querySelector(".hamburger-menu__options");

console.log(hamburger, hamburgerBtn, hamburgerOptions);

hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
  console.log("inside Click");

  try {
    console.log("hamburger Clicked");
    hamburgerBtn?.classList?.toggle("hamburger-menu__bar--close");
    hamburgerOptions?.classList?.toggle("hamburger-hidden");
  } catch (err) {
    errorHandler(err, "Hamburger Event Listener ", "helper");
  }
});

// Close Cookies

const cookiesCloseEl = document.querySelector(".cookies__close");
const cookiesEl = document.querySelector(".cookies");

cookiesCloseEl.addEventListener("click", () => {
  cookiesEl.classList.add("cookies-disable");
});
