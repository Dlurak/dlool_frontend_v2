# Dlool (English)
[Deutsche README](#Deutsch)
## A digital and collaborative homework book

Dlool is a digital and collaborative homework book.  
Classical homework books have a lot of problems. These are some of them and how Dlool solves them:

| Problem                                                                           | Solution                                                                                                                                                                                                                                                   |
| --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Some students work only digitally but still use a classical, analog homework book | Dlool is digital and a highly optimized drop-in replacement.                                                                                                                                                                                               |
| Everyone in a class writes down the same homework                                 | Dlool is collaborative, all entries from one class are available for everyone.                                                                                                                                                                             |
| They are not environmentally friendly, as they are discarded after just one year  | Dlool is digital, eliminating the need for paper.                                                                                                                                                                                                          |
| They are not very practical                                                       | Dlool is available on all devices.                                                                                                                                                                                                                         |
| Entries are not very structured                                                   | Dlool has a structured system for entering homework.                                                                                                                                                                                                       |
| If you lose your homework book, all your data is gone forever                     | Dlool is digital, you can't lose it.                                                                                                                                                                                                                       |
| Every year you need a new homework book                                           | Dlool can be used for multiple years.                                                                                                                                                                                                                      |
| Traditional homework books lock you into a specific brand                         | Dlool is free and open source. *(With Dlool you can export your data to ical or todo.txt. Also, there is [a way](https://github.com/Dlurak/dlool-scriptable/blob/main/reminders/README.md) to sync Dlool with Apple Reminders.)* **(not yet implemented)** |
| Homework, tests and notes are not separate                                        | Dlool offers a distinct system for homework, tests, and notes. Everything is separated but still in one place and easy to find.                                                                                                                            |

---

## Features

Dlool offers a lot of features to enhance your homework management experience.

- **Collaborative**: All entries from one class are available for everyone.
- **Structured**: Dlool has a structured entry system. It is easy to use but also very powerful.
- *(**Exportable**: You can export your data to ical or todo.txt,
  using [this](https://github.com/Dlurak/dlool-scriptable/blob/main/reminders/README.md) script, you can also sync Dlool with Apple Reminders.)* **(not yet implemented)**
- **Cross-Platform**: Access Dlool on all devices with a browser.
- **Dark mode**: Dlool automatically adapts to your system settings. Dlool also respects reduced motion settings.
- **REST API**: There is an open REST-API to write own scripts.
- **No Account required**: Even without an account, you can use Dlool.
- **Long-Term Usability**: Keep your data organized for years to come.
- **Moderation system**: Maintain a positive, welcoming and safe environment.
- **Notes**: Write short notes for yourself or your class.
- **Calendar**: Keep track of tests and deadlines using Dlool's gorgeous calendar.
- **Timetable**: Easily know which subjects are when and write down the homework correctly using the timetable support
- **Holidays**: Check holidays in your area with data provided by [the OpenHolidayAPI](https://www.openholidaysapi.org/en/)
- A lot of small things to make your life easier.

---

## Technologies

### Frontend

Dlool is a progressive web app and is powered by the following technologies:

- [SvelteKit](https://kit.svelte.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Vercel](https://vercel.com/)

### [Backend](https://github.com/Dlurak/dlool_backend_v2)

Dlool's [backend](https://github.com/Dlurak/dlool_backend_v2) is powered by the following technologies:

- [Bun](https://bun.sh)
- [Elysia](https://elysiajs.com/)
- [EdgeDB](https://www.edgedb.com/)
- [Render](https://render.com/)

---

## Getting started

The easiest way to try Dlool is to visit [the official deployment](https://dlool.me/).

If you want to run it locally e.g. for development you can follow the instructions below ([[#Running locally]]).

Homework will be publicly visible for everyone, this isn't a bug but to prevent bullying. However, if you want to create, update, or delete homework entries, you will need an account for a specific class. You can create one [here](https://dlool.me/register).If someone from your class is already using Dlool, then they will need to accept your request to sign up for the class. This can be done by going to [this page](https://dlool-frontend.vercel.app/requests/list) and clicking on the accept button.

After creating your account you can login [here](https://dlool.me/login) and create a homework [here](https://dlool.me/homework/).

When you have any questions, find a bug or have an idea for a feature you can create an issue.

## Running locally

1. Clone this repository

   ```bash
   git clone git@github.com:Dlurak/dlool_frontend_v2.git
   ```

2. Run the setup script

   ```bash
   ./setup.sh
   ```

3. The server runs on [localhost port 4173](http://localhost:4173)

---

Feel free to reach out, report issues, or share your ideas by creating an issue [here](https://github.com/Dlurak/dlool_frontend_v2/issues) on GitHub.  
Enjoy using Dlool!

---
---
---
---
---

# Deutsch

# Dlool

## Ein digitales und kollaboratives Hausaufgabenheft

Dlool ist ein digitales und kollaboratives Hausaufgabenheft.  
Klassische Hausaufgabenhefte haben eine Menge Probleme. Hier sind einige Probleme und wie Dlool sie löst:

| Problem                                                                                                  | Lösung                                                                                                                                                                                                                                                                                                 |
| -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Manche Schüler arbeiten nur digital, benutzen aber immer noch ein klassisches, analoges Hausaufgabenheft | Dlool ist digital und ein optimaler Ersatz.                                                                                                                                                                                                                                                            |
| Alle in einer Klasse schreiben die selben Hausaufgaben auf                                               | Dlool ist kollaborativ, alle Einträge einer Klasse sind für alle verfügbar.                                                                                                                                                                                                                            |
| Sie sind nicht sehr gut für die Umwelt, da sie nach nur einem Schuljahr weggeworfen werden               | Dlool ist digital, es wird kein Papier benötigt.                                                                                                                                                                                                                                                       |
| Sie sind nicht sehr praktisch                                                                            | Dlool ist auf allen Geräten verfügbar.                                                                                                                                                                                                                                                                 |
| Einträge sind nicht sehr strukturiert                                                                    | Dlool hat ein strukturiertes System zum Eintragen von Hausaufgaben.                                                                                                                                                                                                                                    |
| Wenn Sie Ihr Hausaufgabenheft verlieren, sind alle Ihre Daten für immer verloren                         | Dlool ist digital, Sie können es nicht verlieren.                                                                                                                                                                                                                                                      |
| Jedes Jahr braucht man ein neues Hausaufgabenheft                                                        | Dlool kann für mehrere Jahre verwendet werden.                                                                                                                                                                                                                                                         |
| Sie sind an eine bestimmte Marke gebunden                                                                | Dlool ist kostenlos und quelloffen. *(Mit Dlool können Sie Ihre Daten in ical oder todo.txt exportieren. Außerdem gibt es [eine Möglichkeit](https://github.com/Dlurak/dlool-scriptable/blob/main/reminders/README.md), Dlool mit Apple Reminders zu synchronisieren.)* **(noch nicht implementiert)** |
| Hausaufgaben, Tests und Notizen sind nicht getrennt                                                      | Dlool hat ein anderes System für Hausaufgaben, Tests und Notizen. Alles ist getrennt organisiert, aber dennoch leicht an einem Ort zu finden.                                                                                                                                                          |

---

## Funktionen

Dlool bietet eine Vielzahl von Funktionen, um Ihre Hausaufgabenverwaltung zu verbessern.

- **Kollaborativ**: Alle Einträge aus einer Klasse sind für alle verfügbar.
- **Strukturiert**: Dlool hat ein strukturiertes Eingabesystem. Es ist einfach zu bedienen, aber auch sehr leistungsfähig.
- *(***Exportierbar**: Sie können Ihre Daten nach ical oder todo.txt exportieren,
  mit [diesem] (https://github.com/Dlurak/dlool-scriptable/blob/main/reminders/README.md) Skript können Sie Dlool auch mit Apple Reminders synchronisieren.)* **(noch nicht implementiert)**
- **Plattformübergreifend**: Zugriff auf Dlool von allen Geräten mit einem Browser.
- **Dunkelmodus**: Dlool passt sich automatisch an Ihre Systemeinstellungen an. Dlool respektiert auch reduzierte Bewegungseinstellungen.
- **REST-API**: Es gibt eine offene REST-API, um eigene Skripte zu schreiben.
- **Kein Konto erforderlich**: Auch ohne Konto können Sie Dlool nutzen.
- **Langfristige Nutzbarkeit**: Halten Sie Ihre Daten über Jahre hinweg organisiert.
- **Moderationssystem**: Erhalten Sie eine positive, einladende und sichere Umgebung aufrecht.
- **Notizen**: Schreiben Sie kurze Notizen für sich oder Ihre Klasse.
- **Kalender**: Behalten Sie den Überblick über Tests und Fristen mit dem wunderschönen Kalender von Dlool.
- **Stundenplan**: Mit der Stundenplanunterstützung weißt du ganz einfach, welche Fächer wann sind und kannst die Hausaufgaben richtig aufschreiben.
- **Feiertage**: Schauen Sie nach, wann in Ihrer Gegend Feiertage sind, die Daten werden von [der OpenHolidayAPI](https://www.openholidaysapi.org/en/) bereitgestellt
  
- Viele kleine Dinge, die Ihnen das Leben leichter machen.

---

## Technologien

### Frontend

Dlool ist eine progressive Webanwendung und wird von den folgenden Technologien unterstützt:

- [SvelteKit](https://kit.svelte.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Vercel](https://vercel.com/)

### [Backend](https://github.com/Dlurak/dlool_backend_v2)

Das [Backend](https://github.com/Dlurak/dlool_backend_v2) von Dlool wird von den folgenden Technologien unterstützt:

- [Bun](https://bun.sh)
- [Elysia](https://elysiajs.com/)
- [EdgeDB](https://www.edgedb.com/)
- [Render](https://render.com/)

---

## Erste Schritte

Der einfachste Weg, Dlool auszuprobieren, ist ein Besuch auf [der offiziellen Website](https://dlool.me/).

Wenn Sie Dlool lokal ausführen möchten, z.B. für die Entwicklung, können Sie den Anweisungen unten folgen. ([[#Lokal ausführen]]).

Die Hausaufgaben sind für jeden öffentlich sichtbar, dies ist beabsichtigt, um Mobbing vorzubeugen. Wenn du aber Hausaufgaben erstellen, aktualisieren oder löschen willst, brauchst du einen Account für eine bestimmte Klasse. Du kannst einen Account [hier](https://dlool.me/register) erstellen. Es kann vorkommen, dass jemand aus deiner Klasse bereits Dlool benutzt, dann muss er deine Anfrage, sich für die Klasse anzumelden, akzeptieren. Dies kannst du tun, indem du [diese Seite](https://www.dlool.me/moderation/list) aufrufst und auf die Schaltfläche „Akzeptieren“ klickst.

Sobald Sie Ihr Konto haben, können Sie sich [hier](https://dlool.me/login) anmelden und eine Hausaufgabe [hier](https://dlool.me/homework/) erstellen.

Wenn Sie Fragen haben, einen Fehler finden oder eine Idee für eine Funktion haben, können Sie ein [Issue](https://github.com/Dlurak/dlool_frontend_v2/issues) erstellen.

## Lokal ausführen

1. Klonen Sie dieses Repository

```bash
   git clone git@github.com:Dlurak/dlool_frontend_v2.git
   ```

2. Führen Sie das Setup-Skript aus

   ```bash
   ./setup.sh
   ```

3. Der Server läuft auf [localhost port 4173](http://localhost:4173)

---

Fühlen Sie sich frei, mich zu kontaktieren, Probleme zu melden oder Ihre Ideen einzubringen, indem Sie ein Issue [hier](https://github.com/Dlurak/dlool_frontend_v2/issues) auf GitHub erstellen.  
Viel Erfolg und Spaß mit Dlool!
