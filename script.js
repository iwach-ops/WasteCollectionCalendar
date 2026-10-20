const strasseSelect = document.getElementById("strasseId");
const hausNummerSelect = document.getElementById("hausNummerId");
const termineAnzeige = document.getElementById("termineAnzeigeId");


fetch("http://localhost:3000/strassen")
    //.then(response => response.json())
    .then(response => {
        if (!response.ok) {
            throw new Error("HTTP-Fehler: " + response.status);
        }

        return response.json();
    })
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
        //.then(response => response.json())
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP-Fehler: " + response.status);
            }
            return response.json();
        })
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

            //.then(response => response.json())

            .then(response => {
                if (!response.ok) {
                    throw new Error("HTTP-Fehler: " + response.status);
                }
                return response.json();
            })
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