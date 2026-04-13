import { debuggerLog } from "./config.js";
import { errorHandler, getJSONdata } from "./helper.js";

const prevBtnEl = document.querySelector(".prevBtn");
const nextBtnEl = document.querySelector(".nextBtn");
const slideEl = document.querySelector(".featuredHome-sildes");

const houseBtnEl = document.querySelector(".houseBtn");
const villaBtnEl = document.querySelector(".villaBtn");
const apartmentBtnEl = document.querySelector(".apartmentBtn");
let propsList = [];

let featurePropertyCategory = "House";

// Next Button Event Listener
nextBtnEl.addEventListener("click", () => {
  try {
    if (debuggerLog) {
      console.log(`Invoked next btn event listener`);
    }
    const pixelsToScroll = slideEl.clientWidth * (100 / 100);
    slideEl.scrollBy({ left: pixelsToScroll, behavior: "smooth" });
  } catch (err) {
    errorHandler(err, "nextBtnClick", "featuredPropertiesScript");
  }
});

// Prev Button Event Listener
prevBtnEl.addEventListener("click", () => {
  try {
    if (debuggerLog) {
      console.log(`Invoked prev btn event listener`);
    }
    const pixelsToScroll = slideEl.clientWidth * (100 / 100) * -1;
    slideEl.scrollBy({ left: pixelsToScroll, behavior: "smooth" });
  } catch (err) {
    errorHandler(err, "prevBtnClick", "featuredPropertiesScript");
  }
});

// Function ot Update the Status of Action Button
const updateButtons = () => {
  try {
    if (debuggerLog) {
      console.log(`Invoked updateButtons()`);
    }
    prevBtnEl.disabled = slideEl.scrollLeft <= 0;
    nextBtnEl.disabled =
      slideEl.scrollLeft + slideEl.clientWidth >= slideEl.scrollWidth - 1;
  } catch (err) {
    errorHandler(err, "updateButtons()", "featuredPropertiesScript");
  }
};

// Function to render Featured Property
const renderFeatuedProps = (featurePropertyCategory, props) => {
  try {
    if (debuggerLog) {
      console.log(
        `Invoked renderFeatuedProps() , featurePropertyCategory : ${featurePropertyCategory} , props : ${props} `,
      );
    }
    featurePropertyCategory = featurePropertyCategory?.toLowerCase()?.trim();
    let propsToDisplay = [];

    if (featurePropertyCategory) {
      propsToDisplay = props.filter((e) => {
        return e.category.toLowerCase().trim() === featurePropertyCategory;
      });
    }
    else {
      errorHandler(
        { error: `featurePropertyCategory is ${featurePropertyCategory}` },
        "renderFeatuedProps()",
        "featuredPropertiesScript",
      );
    }

    if (propsToDisplay?.length) {
      slideEl.innerHTML = "";

      propsToDisplay.forEach((e) => {
        const cardTemplate = `<div class="featuredHome-sildes__card">
          <img
            src="${e.propertyImage}"
            alt="${e.propertyName}"
            class="featuredHome-sildes__card--img"
          />
          <!-- Card Details  -->
          <div class="featuredHome-sildes__card--details">
            <span class="featuredHome-sildes__cardDetails--tag ${e.propertyClass}">${e.propertyTag}</span>
            <h3 class="featuredHome-sildes__cardDetails--houseName">
              ${e.propertyName}
            </h3>
            <p class="featuredHome-sildes__cardDetails--price">${e.cost}</p>
          </div>

          <div class="card-owner">
            <img
              src="${e.ownerImage}"
              alt="${e.ownerName}\'s Image"
              class="card-owner__profilePic"
            />
            <div class="card-owner__profileDetails">
              <p class="card-owner__profileDetails--ownerName">
               ${e.ownerName}
              </p>
              <p class="card-owner__profileDetails--location">
               ${e.location}
              </p>
            </div>
          </div>
        </div>`;
        slideEl?.insertAdjacentHTML("beforeend", cardTemplate);
      });
    }
     else {
      errorHandler(
        { error: `propsToDisplay is ${propsToDisplay}` },
        "renderFeatuedProps()",
        "featuredPropertiesScript",
      );
    }

  } catch (err) {
    errorHandler(err, "renderFeatuedProps()", "featuredPropertiesScript");
  }
};

//OnLoad function
const onLoad = async () => {
  try {
    if (debuggerLog) {
      console.log(`Invoked onLoad()`);
    }
    updateButtons;
    houseBtnEl?.focus();
    featurePropertyCategory = "house";
    propsList = await getJSONdata("./propertiesList.json");
    if (propsList.length) {
      renderFeatuedProps(featurePropertyCategory, propsList);
    }
    else {
      errorHandler(
        { error: `propsList is ${propsList}` },
        "onLoad()",
        "featuredPropertiesScript",
      );
    }
  } catch (err) {
    errorHandler(err, "onLoad()", "featuredPropertiesScript");
  }
};

//Event Listener for Villa Category Button
villaBtnEl.addEventListener("click", () => {
  renderFeatuedProps("villa", propsList);
});

//Event Listener for House Category Button
houseBtnEl.addEventListener("click", () => {
  renderFeatuedProps("house", propsList);
});

//Event Listener for Apartment Category Button
apartmentBtnEl.addEventListener("click", () => {
  renderFeatuedProps("apartment", propsList);
});

slideEl.addEventListener("scroll", updateButtons);
window.addEventListener("load", onLoad());
