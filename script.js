const abfuhrterminListe = [
    {
        abfallart: "Restmüll",
        datum: "15.03.2023"
    },
    {
        abfallart: "Biomüll",
        datum: "30.03.2023"
    },
    {
        abfallart: "Papier",
        datum: "29.03.2023"
    },
    {
        abfallart: "Gelber Sack",
        datum: "05.04.2023"
    }
];

const abfuhrterminListeElement = document.getElementById("abfuhrterminListe");

abfuhrterminListe.forEach(termin => {
    const terminElement = document.createElement("li");
    terminElement.textContent = `${termin.abfallart} - ${termin.datum}`;

    if (termin.abfallart === "Restmüll") {
        terminElement.classList.add("restmuell");
    }
    if (termin.abfallart === "Biomüll") {
        terminElement.classList.add("biomuell");
    }
    if (termin.abfallart === "Papier") {
        terminElement.classList.add("papier");
    }
    if (termin.abfallart === "Gelber Sack") {
        terminElement.classList.add("gelber-sack");
    }

    abfuhrterminListeElement.appendChild(terminElement);
});