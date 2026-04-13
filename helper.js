//Error handler

import { debuggerLog } from "./config.js";
import { toastIcons } from "./toastMessage.js";

export const errorHandler = (err, moduleinvoked, scriptFile) => {
  const errorData = {
    module: moduleinvoked,
    scriptFile: scriptFile,
    statusCode: err?.status,
    errorMessage: err?.message || "Something Went Wrong",
    error: err,
  };
  console.error(errorData);
  triggerToast(
    "failed",
    `Oops! Something slipped.`,
    `We ran into a minor hiccup. Please try again`,
  );
};

// API Call
export const getJSONdata = async (sourceData) => {
  try {
    if (debuggerLog) {
      console.log(`Invoked getJSONdata() , sourceData : ${sourceData}`);
      // triggerToast("", "invoked getJson", "here i have invoked Json");
    }
    const response = await fetch(sourceData);
    const props = await response?.json();

    return props;
  } catch (err) {
    errorHandler(err, "getJSONdata()", "helper");
  }
};

// Toast Message Triger

export const triggerToast = (tone, headline, message) => {
  tone = tone.toLowerCase().trim() || "info";
  const toastMessageContainerEl = document.querySelector(".toastMessage");
  const toastMessageImgEl = document.querySelector(".toastMessage__img");
  const toastMessageContentEl = document.querySelector(
    ".toastMessage__content",
  );

  try {
    if (debuggerLog) {
      console.log(
        `Invoked triggerToast() , tone : ${tone} ,headline:${headline},message: ,${message} `,
      );
    }

    toastMessageContainerEl.classList.remove("toastDisable");
    toastMessageContentEl.innerHTML = "";

    if (
      tone &&
      message &&
      headline &&
      typeof tone == "string" &&
      typeof message == "string" &&
      typeof headline == "string" &&
      toastIcons[tone]
    ) {
      const toastTemplate = `
        <p class="toastMessage__content--heading">${headline}</p>
        <p class="toastMessage__content--message">${message}</p>`;

      toastMessageContentEl.innerHTML = "";
      toastMessageContentEl?.insertAdjacentHTML("beforeend", toastTemplate);

      toastMessageImgEl.innerHTML = "";
      toastMessageImgEl?.insertAdjacentHTML("beforeend", toastIcons[tone]);

      const closeToast = setTimeout(() => {
        toastMessageContainerEl.classList.add("toastDisable");
      }, 3000);
    } else {
      errorHandler(
        {
          error: `tone : ${tone} ,headline : ${headline},message: ${message},typeof tone : ${typeof tone},  typeof headline : ${typeof headline}  typeof message : ${typeof message} ,  toastIcons[tone] : ${toastIcons[tone]}`,
        },
        "triggerToast()",
        "helper",
      );
    }
  } catch {
    errorHandler(err, "triggerToast()", "helper");
  }
};

