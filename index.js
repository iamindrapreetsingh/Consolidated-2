const utilityInfo = document.querySelector(".utility-info");

const ipUtility = document.querySelector(".ip-utility");

const epochUtility = document.querySelector(".epoch-utility");
const unixTimestamp = document.querySelector(".unix-timestamp");
const epochTimestamp = document.querySelector("#epoch-timestamp");
const localTime = document.querySelector("#local-time");
const toLocalBtn = document.querySelector("#to-local-btn");
const toEpochBtn = document.querySelector("#to-epoch-btn");
const toLocalOutput = document.querySelector("#to-local-output");
const toEpochOutput = document.querySelector("#to-epoch-output");

//Languge translator const
const translatorUtility = document.querySelector(".translator-utility");
const inputLanguage = document.querySelector("#input-language");
const outputLanguage = document.querySelector("#output-language");
const textToConvert = document.querySelector("#language-input-textarea");
const convertedLanguageText = document.querySelector(
  "#language-output-textarea"
);

//Select a particular utility
document
  .querySelector(".ip-finder")
  .addEventListener("click", () => selectUtility("IP_FINDER"));
document
  .querySelector(".translator")
  .addEventListener("click", () => selectUtility("LANG_TRANS"));
document
  .querySelector(".epoch-converter")
  .addEventListener("click", () => selectUtility("EPOCH_UTILITY"));

//Epoch converter Events
toLocalBtn.addEventListener("click", () => convertToLocal());
toEpochBtn.addEventListener("click", () => convertToEpoch());

//Translator Events
document
  .querySelector("#language-convert-btn")
  .addEventListener("click", () => translateLanguage());

translateLanguage = () => {
  fetch(
    `https://api.mymemory.translated.net/get?q=${textToConvert.value}&langpair=${inputLanguage.value}|${outputLanguage.value}`
  )
    .then((res) => res.json())
    .then((data) => {
      const output = data.matches;
      convertedLanguageText.value = output[0].translation;
    });
};

selectUtility = (utility) => {
  switch (utility) {
    case "IP_FINDER":
      utilityInfo.innerHTML = "YOUR IP ADDRESS IS";
      ipUtility.style.display = "flex";
      epochUtility.style.display = "none";
      translatorUtility.style.display = "none";
      break;
    case "EPOCH_UTILITY":
      utilityInfo.innerHTML = "EPOCH UTILITY";
      epochUtility.style.display = "flex";
      ipUtility.style.display = "none";
      translatorUtility.style.display = "none";
      break;
    case "LANG_TRANS":
      utilityInfo.innerHTML = "LANGUAGE TRANSLATOR";
      translatorUtility.style.display = "flex";
      epochUtility.style.display = "none";
      ipUtility.style.display = "none";
  }
};

const convertToLocal = () => {
  if (epochTimestamp.value.length === 0) {
    toLocalOutput.innerHTML = "Input can't be empty!";
  } else {
    toLocalOutput.innerHTML = new Date(epochTimestamp.value * 1000);
  }
};

const convertToEpoch = () => {
  const y = parseInt(document.querySelector("#year-input").value);
  const m = parseInt(document.querySelector("#month-input").value) - 1;
  const d = parseInt(document.querySelector("#day-input").value);
  const hh = parseInt(document.querySelector("#hour-input").value);
  const mm = parseInt(document.querySelector("#min-input").value);
  const ss = parseInt(document.querySelector("#sec-input").value);

  const date = Math.round(new Date(y, m, d, hh, mm, ss).getTime() / 1000);

  if (isNaN(date)) {
    toEpochOutput.innerHTML = "Please Input Valid Local Date!";
  } else {
    toEpochOutput.innerHTML = date;
  }
};

fetch("https://api.ipify.org/?format=json")
  .then((response) => response.json())
  .then(
    (data) =>
      (ipUtility.innerHTML = JSON.stringify(data["ip"]).replaceAll('"', ""))
  );

//Events
setInterval(function () {
  unixTimestamp.innerHTML =
    "CURRENT UNIX TIMESTAMP IS-" + Math.round(Date.now() / 1000) + "s";
}, 1000);
