
const getCountryCapital = async (inputFromForm) => {
  const response = await fetch(
    `https://restcountries.com/v3.1/name/${inputFromForm}`
  );
  console.log(response);
  if (!response.ok) {
    throw new Error("Enter a valid country name");
  }

  const data = await response.json();
  console.log(data);

  const countryData = data[0];

  const capitalData = {
    name: countryData.name.common,
    capital: countryData.capital,
  };
  console.log(capitalData);
  return capitalData;
};

const createCountryCard = (place, parent) => {
  const card = document.createElement("div");
  const heading = createTextEl("h3", place.name);
  card.appendChild(heading);
  const para = createTextEl("p", place.capital);
  card.appendChild(para);
  parent.appendChild(card);
};

const createTextEl = (type, text) => {
  const el = document.createElement(type);
  const textNode = document.createTextNode(text);
  el.appendChild(textNode);
  return el;
};

const div = document.querySelector("div");
const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  document.querySelector("#country").innerHTML = "";
  const inputFromForm = document.querySelector("input").value.toLowerCase();
  document.querySelector("#wait").innerText = "Grabbing the capital...";

  try {
    const capital = await getCountryCapital(inputFromForm);
    console.log(capital);
    createCountryCard(capital, document.querySelector("#country"));
    
  } catch (e) {
    const errorP = document.createElement("p");
    const errorText = document.createTextNode(e.message);
    errorP.appendChild(errorText);
    document.querySelector("#country").appendChild(errorP);
  } finally {
    document.querySelector("#wait").innerText = "";
    form.reset();
  }
});
