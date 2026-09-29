const abfuhrtermin = {
    abfallart: "Restmüll",
    datum: "15.03.2023"
}

const abfallartElement = document.getElementById("abfallart");
const datumElement = document.getElementById("datum");

abfallartElement.textContent = abfuhrtermin.abfallart;
datumElement.textContent = abfuhrtermin.datum;