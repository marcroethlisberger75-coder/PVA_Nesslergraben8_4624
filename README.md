# Nesslergraben 8 – PV-Web-App

React/Vite-Web-App für die Photovoltaikanlage am Nesslergraben 8. Die öffentliche App zeigt ausschliesslich **aggregierte Gebäudedaten**. Einzelne Wohnungs-/Eigentümerdaten aus dem Solar-Manager-Export werden weder angezeigt noch beim Import zentral gespeichert.

## Enthaltener Datenstand

Die mitgelieferte Solar-Manager-Datei wurde als Startbestand verarbeitet:

- erster Messwert: **12.04.2024**
- letzter Messwert: **28.09.2026**
- Originaldatei: 86'205 15-Minuten-Datensätze, 38 Spalten
- in der App gespeichert: tägliche aggregierte Werte für Produktion, Gesamtverbrauch, PV-Eigenverbrauch, Netzbezug und Einspeisung

Hinweis: Eigenverbrauch/Netzbezug/Einspeisung werden aus `Consumption` und `Production` je importiertem 15-Minuten-Intervall berechnet. Die App speichert keine einzelnen Wohnungszähler.

## GitHub → Netlify

1. Alle Dateien dieses Ordners in ein GitHub-Repository hochladen.
2. Netlify → **Add new site → Import an existing project → GitHub**.
3. Das Repository auswählen. `netlify.toml` enthält Build- und Redirect-Einstellungen.
4. Unter **Site configuration → Environment variables** setzen:
   - `ADMIN_PASSWORD` = dein Admin-Passwort
   - `ADMIN_TOKEN_SECRET` = eine lange zufällige Zeichenfolge (mind. 32 Zeichen)
5. Deploy auslösen.

Das Passwort gehört nicht in GitHub. Ohne gesetzte Variable existiert für lokale Tests ein Fallback; für den öffentlichen Betrieb die Variable unbedingt setzen.

## Bedienung

Im öffentlichen Bereich sind Dashboard, Vergleiche, Finanzen und Amortisation verfügbar. Der Adminbereich ist passwortgeschützt. Dort können neue Solar-Manager-CSV-Dateien importiert und Jahrestarife sowie Investitionswerte gepflegt werden. Neue Importe werden mit dem bestehenden Bestand zusammengeführt; gleiche Tage werden ersetzt, neue Tage ergänzt.

## Tarife / Investition

Vorbelegt sind die gelieferten Werte 2024–2026 sowie:

- Inbetriebnahme: 12.04.2024
- Investition brutto: CHF 72'690.00
- Einmalvergütung: CHF 11'795.90
- Nettoinvestition: CHF 60'894.10

Die laufende Amortisation rechnet mit Solartarif auf dem PV-Eigenverbrauch plus EW-Vergütung auf der Einspeisung.

## Technik

- React + Vite
- Recharts
- Papa Parse
- Netlify Functions
- Netlify Blobs als zentraler Datenspeicher
- Responsive Darstellung für Desktop/Tablet/Smartphone

## iPad / GitHub Upload
Diese Ausgabe ist absichtlich **flach** aufgebaut: Alle Dateien liegen im Hauptverzeichnis des GitHub-Repositories. Keine Ordner müssen auf GitHub manuell erstellt werden. Beim Netlify-Build erzeugt `build.mjs` die benötigten technischen Unterordner automatisch.
