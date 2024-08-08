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
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@{date}/v1/{endpoint}";

const dropdowns = document.querySelectorAll(".dropdown select");

for (let select of dropdowns) {
  for (currCode in countryList) {
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
    let newSrc = `"https://flagsapi.com/${ currCode}/flat/64.png"`
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}