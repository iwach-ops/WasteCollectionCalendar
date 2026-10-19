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

const strasseSelect = document.getElementById("strasseId");
const hausNummerSelect = document.getElementById("hausNummerId");
const termineAnzeige = document.getElementById("termineAnzeigeId");


fetch("http://localhost:3000/strassen")
    .then(response => response.json())
    .then(strassen => {
        console.log("Anzahl Straßen:", strassen.length);


        strassen.forEach(strasse => {
            const option = document.createElement("option");

            option.value = strasse;
            option.textContent = strasse;

            strasseSelect.appendChild(option);
        });


    })
    .catch(error => {
        console.error("Fehler beim Laden der Straßen:", error);
        alert("Die Straßenliste konnte nicht geladen werden.");
    });
/*
strasseSelect.addEventListener("change", () => {
    const selectedStrasse = strasseSelect.value;
    hausNummerSelect.value = "";
 
    if (selectedStrasse) {
        console.log("Strasse wurde geändert");
        hausNummerSelect.hidden = false;
    }
    else {
        hausNummerSelect.hidden = true;
 
    }
});
 
*/

termineAnzeige.textContent = "Abfuhrtermine werden hier angezeigt";


strasseSelect.addEventListener("change", () => {
    const selectedStrasse = strasseSelect.value;

    hausNummerSelect.hidden = true;
    hausNummerSelect.innerHTML = "";
    termineAnzeige.textContent = "";

    if (selectedStrasse === "") {
        return;
    }
    console.log("Hausnummern laden für: " + selectedStrasse);



    fetch(`http://localhost:3000/hausnummern?strasse=${encodeURIComponent(selectedStrasse)}`)
        .then(response => response.json())
        .then(hausNummern => {

            if (strasseSelect.value !== selectedStrasse) {
                console.log("Die ausgewählte Straße hat sich geändert. Abbruch der Verarbeitung.");
                return;
            }
            console.log("Hausnummern geladen:", hausNummern);
            console.log("Ist Array:", Array.isArray(hausNummern));

            if (Array.isArray(hausNummern) && hausNummern.length > 0) {

                const placeholder = document.createElement("option");
                placeholder.value = "";
                placeholder.textContent = "Haus auswählen";

                hausNummerSelect.appendChild(placeholder);

                hausNummern.forEach(hausNummer => {
                    const option = document.createElement("option");
                    option.value = hausNummer;
                    option.textContent = hausNummer;
                    hausNummerSelect.appendChild(option);

                });
                hausNummerSelect.hidden = false;
            }

        })
        .catch(error => {
            console.error("Fehler beim Laden der Hausnummern:", error);
            alert("Die Hausnummernliste konnte nicht geladen werden.");
        });

});


hausNummerSelect.addEventListener("change", () => {
    const selectedHausNummer = hausNummerSelect.value;
    const selectedStrasse = strasseSelect.value;

    termineAnzeige.textContent = "";

    if (selectedHausNummer) {
        console.log("Ausgewählte Adresse:", selectedStrasse, " ", selectedHausNummer);

        fetch(`http://localhost:3000/termine?strasse=${encodeURIComponent(selectedStrasse)}&hausnummer=${encodeURIComponent(selectedHausNummer)}`)

            .then(response => response.json())
            .then(abfuhrTermine => {

                if (
                    strasseSelect.value !== selectedStrasse ||
                    hausNummerSelect.value !== selectedHausNummer
                ) {
                    return;
                }
                termineAnzeige.textContent =
                    "Restabfall: " + abfuhrTermine["Restabfall"][0] + "\n" +
                    "Bioabfall: " + abfuhrTermine["Bioabfall"][0] + "\n" +
                    "Altpapier: " + abfuhrTermine["Altpapier"][0] + "\n" +
                    "Gelbe Tonne: " + abfuhrTermine["Gelbe Tonne"][0];
                console.log("Abfuhrtermine:", abfuhrTermine);
            })
             .catch(error => {
            console.error("Fehler beim Laden der Abfuhrtermine:", error);
            alert("Die Abfuhrtermine konnten nicht geladen werden.");
        });
    }

});


/*
fetch("http://localhost:3000/termine")
    .then(response => response.json())
    .then(data => {
        console.log(data);

        document.getElementById("datumId").textContent = data.datum;
        document.getElementById("abfuhrArtId").textContent = data.abfallart;
    });
*/