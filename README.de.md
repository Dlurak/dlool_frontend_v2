# Dlool

[English README](./README.md)

## Ein digitales und kollaboratives Hausaufgabenheft

Dlool ist ein digitales und kollaboratives Hausaufgabenheft.  
Klassische Hausaufgabenhefte haben eine Menge Probleme. Hier sind einige Probleme und wie Dlool sie löst:

| Problem                                                                                                  | Lösung                                                                                                                                                                                                                                                                                               |
| -------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Manche Schüler arbeiten nur digital, benutzen aber immer noch ein klassisches, analoges Hausaufgabenheft | Dlool ist digital und ein optimaler Ersatz.                                                                                                                                                                                                                                                          |
| Alle in einer Klasse schreiben die selben Hausaufgaben auf                                               | Dlool ist kollaborativ, alle Einträge einer Klasse sind für alle verfügbar.                                                                                                                                                                                                                          |
| Nicht sehr gut für die Umwelt, da sie nach nur einem Schuljahr weggeworfen werden                        | Dlool ist digital, es wird kein Papier benötigt.                                                                                                                                                                                                                                                     |
| Sie sind nicht sehr praktisch                                                                            | Dlool ist auf allen Geräten verfügbar.                                                                                                                                                                                                                                                               |
| Einträge sind nicht sehr strukturiert                                                                    | Dlool hat ein strukturiertes System zum Eintragen von Hausaufgaben.                                                                                                                                                                                                                                  |
| Wenn Du Dein Hausaufgabenheft verlierst, sind alle Deine Daten für immer verloren                        | Dlool ist digital, Du kannst es nicht verlieren.                                                                                                                                                                                                                                                     |
| Jedes Jahr braucht man ein neues Hausaufgabenheft                                                        | Dlool kann für mehrere Jahre verwendet werden.                                                                                                                                                                                                                                                       |
| Du bist an eine bestimmte Marke gebunden                                                                 | Dlool ist kostenlos und quelloffen. *(Mit Dlool kanst Du Deine Daten in ical oder todo.txt exportieren. Außerdem gibt es [eine Möglichkeit](https://github.com/Dlurak/dlool-scriptable/blob/main/reminders/README.md), Dlool mit Apple Reminders zu synchronisieren.)* **(noch nicht implementiert)** |
| Hausaufgaben, Tests und Notizen sind nicht getrennt                                                      | Dlool hat ein anderes System für Hausaufgaben, Tests und Notizen. Alles ist getrennt organisiert, aber dennoch leicht an einem Ort zu finden.                                                                                                                                                        |

---

## Features

Dlool bietet eine Vielzahl von Funktionen, um Deine Hausaufgabenverwaltung zu erleichtern.

- **Kollaborativ**: Alle Einträge aus einer Klasse sind für alle verfügbar.
- **Strukturiert**: Dlool hat ein strukturiertes Eingabesystem. Es ist einfach zu bedienen, aber auch sehr leistungsfähig.
- *(**Exportierbar**: Du kannst Deine Daten nach ical oder todo.txt exportieren,
  mit [diesem](https://github.com/Dlurak/dlool-scriptable/blob/main/reminders/README.md) Skript kannst Du Dlool auch mit Apple Reminders synchronisieren.)* **(noch nicht implementiert)**
- **Plattformübergreifend**: Zugriff auf Dlool von allen Geräten mit einem Browser.
- **Dunkelmodus**: Dlool passt sich automatisch an Ihre Systemeinstellungen an. Dlool respektiert auch reduzierte Bewegungseinstellungen.
- **REST-API**: Es gibt eine offene REST-API, um eigene Skripte zu schreiben.
- **Kein Konto erforderlich**: Auch ohne Konto kannst Du Dlool nutzen.
- **Langfristige Nutzbarkeit**: Halte deine Daten über Jahre hinweg organisiert.
- **Moderationssystem**: Erhalte eine positive, einladende und sichere Umgebung aufrecht.
- **Notizen**: Schreib kurze Notizen für Dich oder Deine Klasse.
- **Kalender**: Behalte den Überblick über Tests und Fristen mit dem wunderschönen Kalender von Dlool.
- **Stundenplan**: Mit der Stundenplanunterstützung weißt Du ganz einfach, welche Fächer wann sind und kannst die Hausaufgaben richtig aufschreiben.
- **Feiertage**: Schaue nach, wann in Deiner Gegend Feiertage sind, die Daten werden von [der OpenHolidayAPI](https://www.openholidaysapi.org/en/) bereitgestellt
  
- Viele kleine Dinge, die Dir das Leben leichter machen.

---

## Technologien

### Frontend

Dlool ist eine progressive Webanwendung und baut auf den folgenden Technologien:

- [SvelteKit](https://kit.svelte.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Vercel](https://vercel.com/)

### [Backend](https://github.com/Dlurak/dlool_backend_v2)

Das [Backend](https://github.com/Dlurak/dlool_backend_v2) von Dlool baut auf den folgenden Technologien:

- [Bun](https://bun.sh)
- [Elysia](https://elysiajs.com/)
- [EdgeDB](https://www.edgedb.com/)
- [Render](https://render.com/)

---

## Erste Schritte

Der einfachste Weg, Dlool auszuprobieren, ist ein Besuch auf [der offiziellen Website](https://dlool.me/).

Wenn Du Dlool lokal ausführen möchten, z.B. für die Entwicklung, kannst Du [den Anweisungen](#Lokal-ausführen) unten folgen.

Die Hausaufgaben sind für jeden öffentlich sichtbar, dies ist beabsichtigt, um Mobbing vorzubeugen. Wenn Du aber Hausaufgaben erstellen, aktualisieren oder löschen willst, brauchst Du einen Account für eine bestimmte Klasse. Du kannst einen Account [hier](https://dlool.me/register) erstellen. Es kann vorkommen, dass jemand aus Deiner Klasse bereits Dlool benutzt, dann muss er Deine Anfrage, sich für die Klasse anzumelden, akzeptieren. Dies kann man tun, indem man [diese Seite](https://www.dlool.me/moderation/list) besucht und auf die Schaltfläche „Akzeptieren“ klickt.

Sobald Du Dein Konto hast, kannst Du Dich [hier](https://dlool.me/login) einloggen und eine Hausaufgabe [hier](https://dlool.me/homework/) erstellen.

Wenn Du Fragen hast, einen Fehler findest oder eine Idee für eine Funktion hast, kannst Du ein [Issue](https://github.com/Dlurak/dlool_frontend_v2/issues) erstellen.

## Lokal ausführen

1. Klone dieses Repository

```bash
   git clone git@github.com:Dlurak/dlool_frontend_v2.git
   ```

2. Führe das Setup-Skript aus

   ```bash
   ./setup.sh
   ```

3. Der Server läuft auf [localhost port 4173](http://localhost:4173)

---

Gerne kannst Du Dich bei Fragen, Problemen oder Anregungen melden, indem Du ein Issue [hier](https://github.com/Dlurak/dlool_frontend_v2/issues) auf GitHub erstellen.

Viel Erfolg und Spaß mit Dlool!
