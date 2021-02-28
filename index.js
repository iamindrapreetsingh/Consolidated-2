const ipUtility = document.querySelector(".ip-utility");
const unixTimestamp = document.querySelector(".unix-timestamp");
const epochTimestamp = document.querySelector("#epoch-timestamp");
const localTime = document.querySelector("#local-time");
const epochBtn = document.querySelector("#epoch-btn");
const epochOutput = document.querySelector("#epoch-output");

//Epoch converter Events
epochBtn.addEventListener("click", () => convertToLocal());

const convertToLocal = () => {
  epochOutput.innerHTML = new Date(Math.round(parseInt(epochTimestamp.value)/1000));
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
    "CURRENT UNIX TIMESTAMP IS-" + Math.round(Date.now() / 1000);
}, 1000);
