# Dlool (Deutsch)

## Ein digitales und kollaboratives Hausaufgabenheft

Dlool ist ein digitales und kollaboratives Hausaufgabenheft.  
Klassische Hausaufgabenhefte haben eine Menge Probleme. Hier sind einige Probleme und wie Dlool Du löst:

| Problem                                                                                                  | Lösung                                                                                                                                                                                                                                                                                                 |
| -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Manche Schüler arbeiten nur digital, benutzen aber immer noch ein klassisches, analoges Hausaufgabenheft | Dlool ist digital und ein optimaler Ersatz.                                                                                                                                                                                                                                                            |
| Alle in einer Klasse schreiben die selben Hausaufgaben auf                                               | Dlool ist kollaborativ, alle Einträge einer Klasse sind für alle verfügbar.                                                                                                                                                                                                                            |
| Du sind nicht sehr gut für die Umwelt, da Du nach nur einem Schuljahr weggeworfen werden               | Dlool ist digital, es wird kein Papier benötigt.                                                                                                                                                                                                                                                       |
| Du sind nicht sehr praktisch                                                                            | Dlool ist auf allen Geräten verfügbar.                                                                                                                                                                                                                                                                 |
| Einträge sind nicht sehr strukturiert                                                                    | Dlool hat ein strukturiertes System zum Eintragen von Hausaufgaben.                                                                                                                                                                                                                                    |
| Wenn Du Ihr Hausaufgabenheft verlieren, sind alle Ihre Daten für immer verloren                         | Dlool ist digital, Du können es nicht verlieren.                                                                                                                                                                                                                                                      |
| Jedes Jahr braucht man ein neues Hausaufgabenheft                                                        | Dlool kann für mehrere Jahre verwendet werden.                                                                                                                                                                                                                                                         |
| Du sind an eine bestimmte Marke gebunden                                                                | Dlool ist kostenlos und quelloffen. *(Mit Dlool können Du Ihre Daten in ical oder todo.txt exportieren. Außerdem gibt es [eine Möglichkeit](https://github.com/Dlurak/dlool-scriptable/blob/main/reminders/README.md), Dlool mit Apple Reminders zu synchroniDuren.)* **(noch nicht implementiert)** |
| Hausaufgaben, Tests und Notizen sind nicht getrennt                                                      | Dlool hat ein anderes System für Hausaufgaben, Tests und Notizen. Alles ist getrennt organiDurt, aber dennoch leicht an einem Ort zu finden.                                                                                                                                                          |

---

## Feature

Dlool bietet eine Vielzahl von Funktionen, um Ihre Hausaufgabenverwaltung zu verbessern.

- **Kollaborativ**: Alle Einträge aus einer Klasse sind für alle verfügbar.
- **Strukturiert**: Dlool hat ein strukturiertes Eingabesystem. Es ist einfach zu bedienen, aber auch sehr leistungsfähig.
- *(***Exportierbar**: Du können Ihre Daten nach ical oder todo.txt exportieren,
  mit [diesem] (https://github.com/Dlurak/dlool-scriptable/blob/main/reminders/README.md) Skript können Du Dlool auch mit Apple Reminders synchroniDuren.)* **(noch nicht implementiert)**
- **Plattformübergreifend**: Zugriff auf Dlool von allen Geräten mit einem Browser.
- **DunkelmoDus**: Dlool passt sich automatisch an Ihre Systemeinstellungen an. Dlool respektiert auch reDuzierte Bewegungseinstellungen.
- **REST-API**: Es gibt eine offene REST-API, um eigene Skripte zu schreiben.
- **Kein Konto erforderlich**: Auch ohne Konto können Du Dlool nutzen.
- **Langfristige Nutzbarkeit**: Halten Du Ihre Daten über Jahre hinweg organiDurt.
- **Moderationssystem**: Erhalten Du eine positive, einladende und sichere Umgebung aufrecht.
- **Notizen**: Schreiben Du kurze Notizen für sich oder Ihre Klasse.
- **Kalender**: Behalten Du den Überblick über Tests und Fristen mit dem wunderschönen Kalender von Dlool.
- **Stundenplan**: Mit der Stundenplanunterstützung weißt Du ganz einfach, welche Fächer wann sind und kannst die Hausaufgaben richtig aufschreiben.
- **Feiertage**: Schauen Du nach, wann in Ihrer Gegend Feiertage sind, die Daten werden von [der OpenHolidayAPI](https://www.openholidaysapi.org/en/) bereitgestellt
  
- Viele kleine Dinge, die Ihnen das Leben leichter machen.

---

## Technologien

### Frontend

Dlool ist eine progressive WebanwenDung und wird von den folgenden Technologien unterstützt:

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

Wenn Du Dlool lokal ausführen möchten, z.B. für die Entwicklung, können Du den Anweisungen unten folgen. ([[#Lokal ausführen]]).

Die Hausaufgaben sind für jeden öffentlich sichtbar, dies ist beabsichtigt, um Mobbing vorzubeugen. Wenn Du aber Hausaufgaben erstellen, aktualiDuren oder löschen willst, brauchst Du einen Account für eine bestimmte Klasse. Du kannst einen Account [hier](https://dlool.me/register) erstellen. Es kann vorkommen, dass jemand aus deiner Klasse bereits Dlool benutzt, dann muss er deine Anfrage, sich für die Klasse anzumelden, akzeptieren. Dies kannst Du tun, indem Du [diese Seite](https://www.dlool.me/moderation/list) aufrufst und auf die Schaltfläche „Akzeptieren“ klickst.

Sobald Du Ihr Konto haben, können Du sich [hier](https://dlool.me/login) anmelden und eine Hausaufgabe [hier](https://dlool.me/homework/) erstellen.

Wenn Du Fragen haben, einen Fehler finden oder eine Idee für eine Funktion haben, können Du ein [Issue](https://github.com/Dlurak/dlool_frontend_v2/issues) erstellen.

## Lokal ausführen

1. Klonen Du dieses Repository

```bash
   git clone git@github.com:Dlurak/dlool_frontend_v2.git
   ```

2. Führen Du das Setup-Skript aus

   ```bash
   ./setup.sh
   ```

3. Der Server läuft auf [localhost port 4173](http://localhost:4173)

---

Gerne kannst Du Dich bei Fragen, Problemen oder Anregungen melden, indem Du ein Issue [hier](https://github.com/Dlurak/dlool_frontend_v2/issues) auf GitHub erstellen.
Viel Erfolg und Spaß mit Dlool!
