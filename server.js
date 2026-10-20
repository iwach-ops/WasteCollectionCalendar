const cors = require("cors");
const cheerio = require("cheerio");
const express = require("express");


const app = express();
app.use(cors());
const port = 3000;

app.get("/test", (req, res) => {
    res.send("Server läuft");
});

app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});

app.get("/strassen", async (req, res) => {

    try {

        console.log("Straßenliste wurde angefordert");

        const response = await fetch(
            "https://sab.ssl.metageneric.de/app/sab_i_tp/index.php"
            //"https://ungueltige-sab-testadresse.invalid/index.php"
        );

        const data = await response.text();

        const $ = cheerio.load(data);

        const strassen = [];

        $("#strasse option").each((index, element) => {
            const strasse = $(element).text().trim();

            if (strasse !== "") {
                strassen.push(strasse);
            }
        });

        console.log("Anzahl Straßen:", strassen.length);
        console.log("Erste fünf Straßen:", strassen.slice(0, 5));

        res.json(strassen);
    } catch (error) {
        console.error("Fehler beim Abrufen der Straßen:", error);
        res.status(500).json({
            error: "Straßenliste konnte nicht geladen werden"
        });
    }
});

app.get("/hausnummern", async (req, res) => {


    const formData = new URLSearchParams();

    const selectedStrasse = req.query.strasse;

    formData.append("r", "getStandplatzInfo");
    formData.append("strasse", selectedStrasse);

    const response = await fetch(
        "https://sab.ssl.metageneric.de/app/sab_i_tp/index.2025_2026.php",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: formData
        }
    );

    const data = await response.text();

    const $ = cheerio.load(data);


    const buttons = $(".btn_hnr");

    const hausNummern = [];

    buttons.each((index, element) => {
        hausNummern.push($(element).text());
        //console.log($(element).text());



    });

    //console.log("Anzahl Hausnummern:", buttons.length);
    console.log("Hausnummern:", hausNummern);

    res.json(hausNummern);


});

app.get("/termine", async (req, res) => {
    const selectedStrasse = req.query.strasse;
    const selectedHausNummer = req.query.hausnummer;


    console.log("Straße:", selectedStrasse);
    console.log("Hausnummer:", selectedHausNummer);

    const formData = new URLSearchParams();

    formData.append("r", "getHausnummerInfo");
    formData.append("strasse", selectedStrasse);
    formData.append("hausnummer", selectedHausNummer);

    console.log(formData.toString());


    const response = await fetch(
        "https://sab.ssl.metageneric.de/app/sab_i_tp/index.2025_2026.php",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: formData
        }
    );

    const data = await response.text();

    const $ = cheerio.load(data);

    $("h3").each((index, element) => {
        console.log($(element).text());


    });

    const terminTabellen = $(".termintable");

    const abfuhrTermine = {};

    const muellArten = [
        "Restabfall",
        "Bioabfall",
        "Altpapier",
        "Gelbe Tonne"
    ];


    terminTabellen.each((index, element) => {
        console.log("Tabelle:", index);

        console.log("Termine:", $(element).text().trim());

        const termine = $(element).find(".row > div");
        console.log("Anzahl Termine:", termine.length);

        const termineArray = [];

        termine.each((i, terminElement) => {
            const termin = $(terminElement).text().trim();
            termineArray.push(termin);

            // NEU: Termine unter der jeweiligen Müllart speichern

        });

        abfuhrTermine[muellArten[index]] = termineArray;

        console.log("Alle Abfuhrtermine:", abfuhrTermine);

        console.log("Termine-Array:", termineArray);

        console.log("Müllart:", muellArten[index]);
    });

    console.log(abfuhrTermine);

    console.log("Anzahl Termintabellen:", terminTabellen.length);
    console.log("Erste Tabelle:", terminTabellen.eq(0).text());

    res.json(abfuhrTermine);

});