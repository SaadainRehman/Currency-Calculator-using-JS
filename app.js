// const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@{date}/v1/{endpoint}"
// const dropdown = document.querySelector(".dropdown select");

// for (let select of dropdown){
//     for (let code in countryList){
//         let newOpt = document.createElement("option");
//         newOpt.innerText = code;
//         newOpt.value = code;
//         select.append(newOpt);
//     }
// }

const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@{latest}/v1/{currencies}";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "PKR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

// btn.addEventListener("click" , (evt) => {
//   evt.preventDefault();
//   let amount = document.querySelector(".amount input");
//   let amtVal = amount.value;
//   if (amtVal === "" || amtVal < 1){
//     amtVal = 1 ;
//     amount.val = "1";
//   }
  // console.log(amtVal)
  // console.log( fromCurr.value.toLowerCase() , toCurr.value.toLowerCase());
//   const fromCurr = fromCurr.toLowerCase();
//   const toCurr = toCurr.toLowerCase();
//   const URL = `${BASE_URL}/currencies/${fromCurrency}.json`;
// })

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;

  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
  
  const fromCurrency = fromCurr.value.toLowerCase();
  const toCurrency = toCurr.value.toLowerCase();
  const URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrency}.json`;



  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[fromCurrency][toCurrency];

  let finalAmount = amtVal * rate;
  let newAmount = finalAmount.toFixed(2);
  msg.innerText = `${amtVal} ${fromCurr.value} = ${newAmount} ${toCurr.value}`;
  // msg.innerText = "Hello";
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});
window.addEventListener("load", () => {
  updateExchangeRate();
});