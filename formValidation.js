import { debuggerLog } from "./config.js";
import { errorHandler, triggerToast } from "./helper.js";

const subscribeBtnEl = document.querySelector(".subscribe-btn");
const subscribeMailId = document.querySelector(".subscribe-input");

const messageBoxEl = document.querySelector(
  ".community-joining-form__messageBox",
);
const messageEl = document.querySelector(
  ".community-joining-form__messageBox--input",
);

const charCntEl = document.querySelector(".charCount");
const charsEl = document.querySelector(
  ".community-joining-form__messageBox--charsCount",
);

let messageCnt = 0;

// Subscribe mail Validation
let mailValidation = (emailId) => {
  try {
    if (debuggerLog) {
      console.log(`Invoked mailValidation() , emailId : ${emailId}`);
    }
    emailId = emailId.toLowerCase().trim();

    if (emailId === "") {
      triggerToast("info", "Mail Id not Entered", "Please Enter a Mail");
    } else if (![...emailId].includes("@") || ![...emailId].includes(".")) {
      triggerToast(
        "failed",
        "Invalid Mail Id",
        "the mail Id must contain '@' followed by any domain (example@domain.com)",
      );
    } else {
      triggerToast(
        "success",
        "Success! You're Subscribed.",
        "A confirmation email is waiting in your inbox.",
      );
    }
  } catch (err) {
    errorHandler(err, "mailValidation()", "formValidation");
  }
};

subscribeBtnEl.addEventListener("click", () => {
  console.log("mailValidation Click");
  mailValidation(subscribeMailId?.value);
});

// CommunityForm Mail validation

let messageBoxValidation = (message) => {
  try {
    if (debuggerLog) {
      console.log(`Invoked messageBoxValidation() , message : ${message}`);
    }

    messageBoxEl.classList.remove("community-joining-form__disableMessageBox");
    charCntEl.innerHTML = 0;
    if (message) {
      messageCnt = message.split("").length;
      console.log("message", message);
      charCntEl.innerHTML = "";
      charCntEl?.insertAdjacentHTML("beforeend", messageCnt);
      charsEl.classList.remove(
        "community-joining-form__messageBox--charsCountExceeds",
      );

      if (messageCnt > 500) {
        messageBoxEl.classList.add("community-joining-form__disableMessageBox");
        charsEl.classList.add(
          "community-joining-form__messageBox--charsCountExceeds",
        );
        messageEl.value = message.split("").slice(0, 500).join("");
        charCntEl.innerHTML = "";
        charCntEl?.insertAdjacentHTML("beforeend", 500);
      }
      // let messageCnt =
    }
  } catch (err) {
    errorHandler(err, "messageBoxValidation()", "formValidation");
  }
};

messageEl.addEventListener("input", () => {
  console.log("mailValidation Click");
  messageBoxValidation(messageEl?.value);
});


