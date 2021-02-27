const ipUtility = document.querySelector(".ip-utility");
const unixTimestamp = document.querySelector(".unix-timestamp");
const epochTimestamp = document.querySelector("#epoch-timestamp");
const localTime = document.querySelector("#local-time");

//Epoch converter Events
localTime.addEventListener("click", ()=>convertToLocal);


fetch('https://api.ipify.org/?format=json')
  .then(response => response.json())
  .then(data => ipUtility.innerHTML = JSON.stringify(data["ip"]).replaceAll('"',""));


  //Events
  setInterval(function()
  {
      unixTimestamp.innerHTML = "CURRENT UNIX TIMESTAMP IS-"+Math.round(Date.now() / 1000);
  },1000)

  convertToLocal = ()=>{
      localTime,innerHTML = new Date(0).setUTCSeconds(epochTimestamp.value);
  }