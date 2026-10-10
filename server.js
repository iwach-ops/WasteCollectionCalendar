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
    const formData = new URLSearchParams();

    formData.append("r", "findStrasse");
    formData.append("strasse", "Henny");

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

    res.send(data);
});

app.get("/hausnummern", async (req, res) => {
    const formData = new URLSearchParams();

    formData.append("r", "getStandplatzInfo");
    formData.append("strasse", "Henny-Porten-Straße");

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

    res.send(data);
});

app.get("/termine", async (req, res) => {
    const formData = new URLSearchParams();

    formData.append("r", "getHausnummerInfo");
    formData.append("strasse", "Henny-Porten-Straße");
    formData.append("hausnummer", "12");

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

    const ersteAbfallart = $("h3").first().text();

     const ersterTermin = $("h3")
        .first()
        .nextAll(".termintable")
        .first()
        .find(".col-lg-2")
        .first()
        .text()
        .trim();

    console.log(ersteAbfallart);

    const termin = {
        abfallart: ersteAbfallart,
        datum: ersterTermin
    };
    //res.send(data);
    res.json(termin);


   

    console.log(ersterTermin);




    console.log(termin);

});

