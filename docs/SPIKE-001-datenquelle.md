Erstelle die Datei docs/SPIKE-001-datenquelle.md.

Dokumentiere nur die folgenden bereits untersuchten Fakten, ohne zusätzlichen Anwendungscode zu erzeugen:

Titel: SPIKE-001 – Datenquelle untersuchen

Ziel:
Herausfinden, wie die Abfuhrtermine des Magdeburger Abfuhrkalenders technisch abgerufen werden können.

Endpoint:
POST https://sab.ssl.metageneric.de/app/sab_i_tp/index.2025_2026.php

Content-Type:
application/x-www-form-urlencoded

Ablauf:

1. Straßensuche
r=findStrasse
strasse=xxxx

2. Hausnummern einer Straße laden
r=getStandplatzInfo
strasse=xxxx-yyyy-Straße

3. Abfuhrtermine einer Adresse laden
r=getHausnummerInfo
strasse=xxxx-yyyy-Straße
hausnummer=12

Ergebnis:
Die Response ist HTML und enthält Restabfall, Bioabfall, Altpapier und Gelbe Tonne inklusive Terminen.

Technische Erkenntnis:
Die Anwendung kann die Daten grundsätzlich direkt vom SAB-Server abrufen. Es handelt sich nicht um eine JSON-API. Die HTML-Antwort muss später geparst werden.

Offene Punkte:
- Verhalten beim Jahreswechsel untersuchen
- HTML-Parsing untersuchen
- prüfen, ob direkte Requests aus unserer Anwendung technisch erlaubt/möglich sind
- Fehlerfälle untersuchen, z. B. unbekannte Straße oder Hausnummer