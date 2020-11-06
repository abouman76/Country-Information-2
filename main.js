// === De data is een Array met 250 objecten. ===

async  function getWorldCountries() {

    try {

        const resultWorldCountry = await axios.get("https://restcountries.eu/rest/v2/all");
        // let infoCountry = resultWorldCountry;

        // const countries = resultWorldCountry.data;
        const { data } = resultWorldCountry; //=> destructuring

// === sorteer de data van laagste populatie, naar hoogste populatie. ===

    resultWorldCountry.data.sort((a, b) => {
        return a.population - b.population;
    });

// == lijst met landnamen en vlag in de DOM verkrijgen. Gebruik .map() ==
// == dit doet iets voor elke entry in de Array (loopt over elke entry) ==
// == maak een list item met daarin:
        // afbeelding vlag.
        // element voor de naam vh land

        const listCountry = document.getElementById("list-country-names"); // = anker element UL

    data.map((countryObject) => {
        const { flag, name, region, population } = countryObject; // = destructuring, waardoor we flag attribute meteen aan kunnen spreken.
        // == Li maken ==
        const listCountryElement = document.createElement("li");

        // == vlag element ==
        const flagElement = document.createElement("img")  ;
        flagElement.setAttribute("src", flag); // ipv countryObject.flag vanwege destruct.
        flagElement.setAttribute("class", "flag");

        // == const flagElement "img" aan de "li" toevoegen ==
        listCountryElement.appendChild(flagElement);

        // == naam land toevoegen ==
        const nameCountryElement = document.createElement("span");
        nameCountryElement.textContent = name;
        // schrijf de switch statement met een function.
        nameCountryElement.setAttribute("class", getColorRegion(region)) //=> region is van Land-Object

        // == const nameCountryElement - "span" toevoegen aan "li".
        listCountryElement.appendChild(nameCountryElement);

        // event-listener
        listCountryElement.addEventListener("click", showPopulation);
        // de showPopulation moeten we een functie voor maken en we willen aan de listCountryElement een extra element
        // aan toe voegen. bijv: "p" element
        function showPopulation() {
            const isPopulationMessage = document.getElementById(`population-${name}`);
            if(isPopulationMessage) {
                listCountryElement.removeChild(isPopulationMessage);
            } else {
                const showPopulation = document.createElement("p");
                showPopulation.setAttribute("id", `population-${name}`);
                showPopulation.textContent = `${population} inhabitants`;
                listCountryElement.appendChild(showPopulation); // => toegevoegd aan "li" element
            }
            
        }

        // == Li aan anker-element UL toevoegen ==
        listCountry.appendChild(listCountryElement);

    });

        console.log(resultWorldCountry);

    } catch (e) {

        console.error(e);
    }

}

getWorldCountries();

// function met switch statement. Deze is buiten de try gemaakt, maar wordt aangeroepen in de
// in de "try" nameCountryElement.setAttribute, waardoor wij hem wel kunnen gebruiken. Returned een String.

function getColorRegion(worldRegion) { // is "een willekeurige naam voor de waarde.
    switch (worldRegion) {
        case "Africa":
            return "blue";

        case "Americas":
            return "green";

        case "Asia":
            return "red";

        case "Europe":
            return "yellow";

        case "Oceania":
            return "purple"

        default:
            return "default";
    }
}


