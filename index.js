const utilityInfo = document.querySelector(".utility-info");

const ipUtility = document.querySelector(".ip-utility");
const ipFinder = document.querySelector(".ip-finder");

const epochUtility = document.querySelector(".epoch-utility");
const epochConverter = document.querySelector(".epoch-converter");
const unixTimestamp = document.querySelector(".unix-timestamp");
const epochTimestamp = document.querySelector("#epoch-timestamp");
const localTime = document.querySelector("#local-time");
const toLocalBtn = document.querySelector("#to-local-btn");
const toEpochBtn = document.querySelector("#to-epoch-btn");
const toLocalOutput = document.querySelector("#to-local-output");
const toEpochOutput = document.querySelector("#to-epoch-output");

//Select a particular utility
ipFinder.addEventListener("click", ()=>selectUtility("IP_FINDER"));
epochConverter.addEventListener("click", ()=>selectUtility("EPOCH_UTILITY"));

//Epoch converter Events
toLocalBtn.addEventListener("click", () => convertToLocal());
toEpochBtn.addEventListener("click", ()=>convertToEpoch());

selectUtility = (utility)=>
{  
  switch(utility)
  {
    case "IP_FINDER" : 
          utilityInfo.innerHTML = "YOUR IP ADDRESS IS";
          ipUtility.style.display = "block";
          epochUtility.style.display = "none";
          break;
    case "EPOCH_UTILITY" :
          utilityInfo.innerHTML = "EPOCH UTILITY";
          epochUtility.style.display ="block";
          ipUtility.style.display = "none"
    break;
  }
   
}

const convertToLocal = () => {
  if(epochTimestamp.value.length===0)
  {
    toLocalOutput.innerHTML = "Input can't be empty!"  
  }
  else
  {
  toLocalOutput.innerHTML = new Date(epochTimestamp.value*1000);
  }
};

const convertToEpoch = () => {
  const y = parseInt(document.querySelector("#year-input").value);
  const m = parseInt(document.querySelector("#month-input").value)-1;
  const d = parseInt(document.querySelector("#day-input").value);
  const hh = parseInt(document.querySelector("#hour-input").value);
  const mm = parseInt(document.querySelector("#min-input").value);
  const ss = parseInt(document.querySelector("#sec-input").value);

  const date = Math.round(new Date(y,m,d,hh,mm,ss).getTime() / 1000);

  if(isNaN(date))
  {
  toEpochOutput.innerHTML = "Please Input Valid Local Date!";
  }
  
  else
  {
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
    "CURRENT UNIX TIMESTAMP IS-" + Math.round(Date.now() / 1000);
}, 1000);
