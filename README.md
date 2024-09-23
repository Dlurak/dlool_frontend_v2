# Dlool

[Deutsche README](./README.de.md)

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
