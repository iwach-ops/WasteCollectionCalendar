/*
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

const abfuhrterminListeElement = document.getElementById("abfuhrterminListeId");

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

fetch("https://sab.ssl.metageneric.de/app/abfuhrkalender2026/app.php3?cmd=get&modus=2&datum_1=10.07.2026&turnus_1=2&datum_2=13.07.2026&turnus_2=2&datum_3=08.07.2026&turnus_3=2&stadtteil_id=1601&dsd_behaelter_value=b120_b240&with_strasse=sab_with_strasse&strasse=Henny-Porten-Stra%DFe%2012")
    .then(response => {
        console.log(response);
    });
  

const formData = new URLSearchParams();

formData.append("r", "findStrasse");
formData.append("strasse", "Henny");

fetch("https://sab.ssl.metageneric.de/app/sab_i_tp/index.2025_2026.php", {
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    body: formData
})
    .then(response => response.text())
    .then(data => {
        console.log(data);
    });
     */
 
fetch("http://localhost:3000/termine")
    .then(response => response.json())
    .then(data => {
       console.log(data);

    document.getElementById("datumId").textContent = data.datum;
    document.getElementById("abfuhrArtId").textContent = data.abfallart;
    });
    