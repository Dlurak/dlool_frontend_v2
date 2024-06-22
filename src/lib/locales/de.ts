import type { I18nDict } from './types';

const de = {
	error: 'Etwas ist schief gelaufen',
	loading: 'Lädt',
	update: 'Aktualisieren',

	school: 'Schule',
	class: 'Klasse',

	'toast.login.success': 'Erfolgreich eingeloggt',
	'toast.login.incorrect': 'Falscher Nutzername oder falsches Passwort',
	'toast.refreshToken.error':
		'Es konnte kein neues Zugangstoken beantragt werden, bitte melde Dich erneut an',

	'toast.join.joined': 'Erfolgreich der Klasse beigetreten!',
	'toast.join.requested': 'Erfolgreich angefragt der Klasse beizutreten!',
	'toast.join.alreadyInClass': 'Du bist bereits in dieser Klasse.',
	'toast.join.requestExists': 'Du hast bereits angefragt dieser Klasse beizutreten.',

	'toast.mod.foreing.accept.success': 'Erfolgreich akzeptiert!',
	'toast.mod.foreing.reject.success': 'Erfolgreich abgelehnt!',

	'toast.filter.applied': 'Erfolgreich Filter angewendet',

	'launcher.placeholder': 'Deine Suche...',
	'launcher.home': 'Startseite',
	'launcher.home.terms': 'Homepage',
	'launcher.login': 'Einloggen',
	'launcher.login.terms': 'Login\nAnmelden',
	'launcher.homework': 'Hausaufgaben',
	'launcher.homework.terms': 'Aufgaben\nArbeitsauftrag',
	'launcher.register': 'Registrieren',
	'launcher.register.terms': 'Account',
	'launcher.join': 'Einer Klasse beitreten',
	'launcher.join.terms': 'Klasse\nbeitreten\nKurs\nGruppe\nhinzufügen',
	'launcher.mod.own': 'Eigene Anfragen',
	'launcher.mod.own.terms': 'Moderation\nEigeneAnfragen',
	'launcher.mod.own.desc': 'Hier kannst du sehen in welchene Klassen Du angeommen wurdest',
	'launcher.mod.list': 'Fremde Anfragen',
	'launcher.mod.list.terms': 'Moderation\nFremde\nAnfragen',
	'launcher.mod.list.desc':
		'Hier kannst Du Anfragen, Deinen Klassen beizutreten, anderer moderiereren',
	'launcher.notes': 'Notizen',
	'launcher.notes.terms': 'Notizbuch',
	'launcher.calendar': 'Kalender',
	'launcher.calendar.terms': 'Arbeiten\nTest\nTermin\nKlausur\nKlassenarbeit\nLernkontrolle\nEvent',
	'launcher.settings': 'Einstellungen',
	'launcher.settings.terms': 'Option \nKonfiguration\nPräferenzen',
	'launcher.logout': 'Ausloggen',
	'launcher.logout.terms': 'Signout\nAnonymous',
	'launcher.holidays': 'Ferien',
	'launcher.holidays.terms': 'Ferien\nFeiertage\nSchulfrei\nFreizeit',

	'register.register': 'Registrieren',
	'register.nametaken': 'Nutzername vergeben :(',
	'register.nametaken.desc':
		'Aber Du kannst noch immer den selben Anzeigenamen und das selbe Passwort nutzen',
	'register.success': 'Erfolgreich registriert (ﾉ◕ヮ◕)ﾉ',

	'login.login': 'Einloggen',

	'join.joinClass': 'Beitreten',

	'moderation.state.Accepted': 'Akzeptiert',
	'moderation.state.Rejected': 'Abgelehnt',
	'moderation.state.Pending': 'Ausstehend',
	'moderation.state.all': 'Alle',
	'moderation.own.noData': 'Es gibt keine Anfragen für Dich.',
	'moderation.own.review': 'Überprüfung',
	'moderation.foreign.noData': 'Es gibt keine Anfragen, Die Du überprüfen darfst.',
	'moderation.foreign.acceptedIn.others': {
		counts: {
			default: 'Und $count anderen Klassen',
			1: 'Und einer anderen Klasse'
		}
	},
	'moderation.foreign.accept': 'Akzeptieren',
	'moderation.foreign.reject': 'Ablehnen',

	'nav.homework': 'Hausaufgaben',
	'nav.calendar': 'Kalender',
	'nav.notes': 'Notizen',
	'nav.login': 'Einloggen',
	'nav.register': 'Registrieren',
	'nav.launcher': 'Suche',

	'nav.footer.auth': 'Account',
	'nav.footer.auth.login': 'Einloggen',
	'nav.footer.auth.register': 'Registrieren',
	'nav.footer.auth.join': 'Klasse beitreten',
	'nav.footer.notes': 'Notizen',
	'nav.footer.notes.notes': 'Notizen',
	'nav.footer.calendar': 'Kalender',
	'nav.footer.calendar.calendar': 'Kalender',
	'nav.footer.homework': 'Hausaufgaben',
	'nav.footer.homework.homework': 'Hausaufgaben',
	'nav.footer.mod': 'Moderation',
	'nav.footer.mod.own': 'Eigene Anfragen',
	'nav.footer.mod.list': 'Fremde Anfragen',
	'nav.footer.else': 'Sonstige',
	'nav.footer.else.settings': 'Einstellungen',

	'title.calendar': 'Kalendar',
	'title.homework': 'Hausaufgaben',
	'title.join': 'Klasse beitreten',
	'title.login': 'Einloggen',
	'title.moderation.list': 'Fremde Beitritsanfragen',
	'title.moderation.own': 'Eigene Beitritsanfragen',
	'title.notes': 'Notizen',
	'title.register': 'Registrieren',
	'title.settings': 'Einstellungen',
	'title.settings.profile': 'Profil Einstellungen',
	'title.settings.general': 'Allgemeine Einstellungen',

	'home.subtitle': 'Das Hausaufgabenheft der nächsten Generation für Deine ganze Klasse',
	'home.digitalEra': 'Ein Hausaufgabenheft für das digitale Zeitalter',
	'home.quick.getStarted': '🚀 Loslegen',
	'home.quick.why': 'Warum Dlool?',
	'home.quick.github': 'Auf GitHub anzeigen',
	'home.logo.alt': 'Das wunderschöne Dlool Logo',
	'home.homeworkBut': 'Hausaufgabenhefte aber',
	'home.homeworkBut.collaborative': 'Kollaborativ',
	'home.homeworkBut.collaborative.1': 'Ein Nutzer trägt die Daten in Dlool ein',
	'home.homeworkBut.collaborative.2': 'Jeder kann es sehen',
	'home.homeworkBut.collaborative.3':
		'Um Cybermobbing zu verhinden, braucht man keinen Account um Daten zu sehen',
	'home.homeworkBut.collaborative.4':
		'Andere registrierte Nutzer können die Daten editieren um Fehler zu korrigieren',
	'home.homeworkBut.collaborative.5':
		'Es ist nicht mehr Nötig in der Klassengruppe nach Hausaufgaben zu fragen (ﾉ◕ヮ◕)ﾉ',

	'home.homeworkBut.convenient': 'Angenehm',
	'home.homeworkBut.convenient.1': 'Du kannst deine Aufgaben jederzeit von überall einsehen',
	'home.homeworkBut.convenient.2':
		'Dank fachspezifischen Icons und Farben, ist es leicht die Fächer auf anhieb zu erkennen.',
	'home.homeworkBut.convenient.3':
		'Der Stundenplan und die Voreinstellungen erlauben schnelle und präzise Änderungen',
	'home.homeworkBut.convenient.4': 'Exportiere Deine Daten als ical oder todo.txt',
	'home.homeworkBut.convenient.5':
		'Nutze einen Siri-Kurzbefehl um die Dlool Hausaufgaben mit Apple Erinnerungen zu synchronisieren',

	'home.homeworkBut.free': 'Gratis',
	'home.homeworkBut.free.1': 'Dlool ist komplett kostenlos, ohne versteckte Überraschungen!',
	'home.homeworkBut.free.2': 'Es ist Open-Source Software unter der GPL lizensiert.',
	'home.homeworkBut.free.3': 'Keine Spionage, keine Werbung und keine Abos!',
	'home.homeworkBut.free.4': 'Kostenlos nutzbare API',

	'home.more': 'Entdecke mehr',
	'home.more.gh.frontend': 'Frontend auf GitHub',
	'home.more.gh.backend': 'Backend auf GitHub',
	'home.more.mastodon': '#dlool auf Mastodon',
	'home.more.ccc': 'Mein Kurz-Vortrag',

	'home.boxes.crossPlattform': 'Geräteübergreifend',
	'home.boxes.crossPlattform.description':
		'Dlool kann als Webapp auf allen Geräten und allen Betriebssystem genutzt werden.',
	'home.boxes.collaborative': 'Kollaborativ',
	'home.boxes.collaborative.description':
		'Der Kollaborative Grundgedanke war von Beginn an sehr wichtig',
	'home.boxes.customizable': 'Personalisierbar',
	'home.boxes.customizable.description':
		'Viele Einstellungen erlauben es Dir wirklich Dein Dlool zu nutzen!',
	'home.boxes.libre': 'Frei',
	'home.boxes.libre.description':
		'Jede einzige Zeile Code sowie alle Bibliotheken und APIs sind freie Software',
	'home.boxes.students': 'Für Schüler gemacht',
	'home.boxes.students.description': 'Dlool wurde von Schülern für Schüler erstellt',
	'home.boxes.easy': 'Schnell & Einfach zu nutzen',
	'home.boxes.easy.description':
		'Obwohl Dlool viele fortschrittliche Funktionen hat ist es dennoch leicht es zu bedienen.',

	'lang.de': 'Deutsch',
	'lang.en': 'Englisch',

	'footer.creator': 'Erstellt von Dlurak',
	'footer.creator.license': 'Lizensiert unter der Gnu General Public License 3',
	'footer.contact': 'Kontakt',
	'footer.contact.backend': 'Backend auf GitHub',
	'footer.contact.frontend': 'Frontend auf GitHub',

	username: 'Nutzername',
	displayname: 'Anzeigename',

	password: 'Passwort',
	'password.validation.length': 'Muss länger als 7 Zeichen seien',
	'password.validation.lowercase': 'Muss min. einen Kleinbuchstaben enthalten',
	'password.validation.upper': 'Muss min. einen Großbuchstaben enthalten',
	'password.validation.digit': 'Muss min. eine Ziffer enthalten',
	'password.validation.special': 'Muss min. ein Sonderzeichen enthalten',

	'confirmation.default.content': 'Bist Du Dir sicher?',
	'confirmation.default.cancel': 'Abbrechen',
	'confirmation.default.ok': 'Ok',

	'assignments.assignment.date': 'Vom $start bis zum $end',
	'assignments.filter.needToSet': 'Spezifiziere bitte die Schule und Klasse',
	'assignments.filter.due': 'Bis zum',
	'assignments.filter.due.earliest': 'Frühstens',
	'assignments.filter.due.latest': 'Spätestens',
	'assignments.filter.from': 'Vom',
	'assignments.filter.from.earliest': 'Frühstens',
	'assignments.filter.from.latest': 'Spätestens',
	'assignments.filter.apply': 'Anwenden',
	'assignments.noData': 'Es gibt keine Aufgaben ＼(●´ϖ`●)／',
	'assignments.create': 'Erstelle eine Aufgabe',
	'assignments.create.subject': 'Fach',
	'assignments.create.description': 'Aufgabe',
	'assignments.create.from': 'Vom',
	'assignments.create.due': 'Zum',
	'assignments.create.create': 'Hinzufügen',
	'assignments.create.success': 'Aufgabe erfolgreich erstellt',
	'assignments.delete.desc': 'Möchtest Du diese Aufgabe wirklich löschen?',
	'assignments.delete.ok': 'Löschen',
	'assignments.delete.success': 'Erfolgreich gelöscht',
	'assignments.update.success': 'Erfolgreich aktualisiert',
	'assignments.pages.currently': 'Seite $current von $total',
	'assignments.edit': 'Hausaufgabe bearbeiten',

	'calendar.month': {
		counts: {
			default: '$year',
			0: 'Januar $year',
			1: 'Februar $year',
			2: 'März $year',
			3: 'April $year',
			4: 'Mai $year',
			5: 'Juni $year',
			6: 'Juli $year',
			7: 'August $year',
			8: 'September $year',
			9: 'Oktober $year',
			10: 'November $year',
			11: 'Dezember $year'
		}
	},
	'calendar.weekday': {
		counts: {
			default: '',
			0: 'Sonntag',
			1: 'Montag',
			2: 'Dienstag',
			3: 'Mittwoch',
			4: 'Donnerstag',
			5: 'Freitag',
			6: 'Samstag'
		}
	},
	'calendar.weekday.abbr': {
		counts: {
			default: '',
			0: 'S',
			1: 'M',
			2: 'D',
			3: 'M',
			4: 'D',
			5: 'F',
			6: 'S'
		}
	},
	'calendar.select': 'Wähle ein Datum aus',

	'note.title': 'Titel',
	'note.title.placeholder': 'Titel',
	'note.summary': 'Zusammenfassung',
	'note.summary.placeholder': 'Zusammenfassung',
	'notes.nothing': 'Hier gibt es nichts zu sehen :]',
	'notes.delete.ok': 'Löschen',
	'notes.delete.desc': 'Willst du diese Notiz wirklich löschnen?',
	'note.delete.success': 'Erfolgreich gelöscht',
	'note.priority': 'Priorität',
	'note.priority.Critical': 'Kritisch',
	'note.priority.High': 'Hoch',
	'note.priority.Medium': 'Mittel',
	'note.priority.Low': 'Niedrig',
	'note.priority.Minimal': 'Minimal',
	'note.scope': 'Bearbeitungsrechte',
	'note.scope.self': 'Nur der Ersteller',
	'note.scope.class': 'Die Klasse',
	'note.scope.school': 'Die Schule',
	'note.update.success': 'Erfolgreich bearbeitet',
	'note.create.success': 'Erfolgreich erstellt',
	'note.create.new': 'Erstellen',
	'note.noData': 'Es gibt keine Notizen',

	'time.ago.created.seconds': {
		counts: {
			default: 'Vor $diff Sekunden von $name erstellt',
			1: 'Vor einer Sekunde von $name erstellt'
		}
	},
	'time.ago.created.minutes': {
		counts: {
			default: 'Vor $diff Minuten von $name erstellt',
			1: 'Vor einer Minute von $name erstellt',
			2: 'Vor zwei Minute von $name erstellt',
			3: 'Vor drei Minute von $name erstellt'
		}
	},
	'time.ago.created.hours': {
		counts: {
			default: 'Vor $diff Stunden von $name erstellt',
			1: 'Vor einer Stunde von $name erstellt',
			2: 'Vor zwei Stunden von $name erstellt',
			3: 'Vor drei Stunden von $name erstellt',
			4: 'Vor vier Stunden von $name erstellt'
		}
	},
	'time.ago.created.days': {
		counts: {
			default: 'Vor $diff Stunden von $name erstellt',
			1: 'Vor einem Tag von $name erstellt',
			2: 'Vor zwei Tagen von $name erstellt',
			3: 'Vor drei Tagen von $name erstellt',
			4: 'Vor vier Tagen von $name erstellt',
			5: 'Vor fünf Tagen von $name erstellt',
			6: 'Vor sechs Tagen von $name erstellt'
		}
	},
	'time.ago.created.weeks': {
		counts: {
			default: 'Vor $diff Wochen von $name erstellt',
			1: 'Vor einer Woche von $name erstellt'
		}
	},
	'time.ago.created.months': {
		counts: {
			default: 'Vor $diff Monaten von $name erstellt',
			1: 'Vor einem Monat von $name erstellt'
		}
	},
	'time.ago.created.years': {
		counts: {
			default: 'Vor $diff Jahren von $name erstellt',
			1: 'Vor einem Jahr von $name erstellt',
			10: 'Vor einem Jahrzehnt von $name erstellt'
		}
	},

	'time.ago.edited.seconds': {
		counts: {
			default: 'Vor $diff Sekunden von $name bearbeitet worden',
			1: 'Vor einer Sekunde von $name bearbeitet worden'
		}
	},
	'time.ago.edited.minutes': {
		counts: {
			default: 'Vor $diff Minuten von $name bearbeitet worden',
			1: 'Vor einer Minute von $name bearbeitet worden',
			2: 'Vor zwei Minute von $name bearbeitet worden',
			3: 'Vor drei Minute von $name bearbeitet worden'
		}
	},
	'time.ago.edited.hours': {
		counts: {
			default: 'Vor $diff Stunden von $name bearbeitet worden',
			1: 'Vor einer Stunde von $name bearbeitet worden',
			2: 'Vor zwei Stunden von $name bearbeitet worden',
			3: 'Vor drei Stunden von $name bearbeitet worden',
			4: 'Vor vier Stunden von $name bearbeitet worden'
		}
	},
	'time.ago.edited.days': {
		counts: {
			default: 'Vor $diff Stunden von $name bearbeitet worden',
			1: 'Vor einem Tag von $name bearbeitet worden',
			2: 'Vor zwei Tagen von $name bearbeitet worden',
			3: 'Vor drei Tagen von $name bearbeitet worden',
			4: 'Vor vier Tagen von $name bearbeitet worden',
			5: 'Vor fünf Tagen von $name bearbeitet worden',
			6: 'Vor sechs Tagen von $name bearbeitet worden'
		}
	},
	'time.ago.edited.weeks': {
		counts: {
			default: 'Vor $diff Wochen von $name bearbeitet worden',
			1: 'Vor einer Woche von $name bearbeitet worden'
		}
	},
	'time.ago.edited.months': {
		counts: {
			default: 'Vor $diff Monaten von $name bearbeitet worden',
			1: 'Vor einem Monat von $name bearbeitet worden'
		}
	},
	'time.ago.edited.years': {
		counts: {
			default: 'Vor $diff Jahren von $name bearbeitet worden',
			1: 'Vor einem Jahr von $name bearbeitet worden',
			10: 'Vor einem Jahrzehnt von $name bearbeitet worden'
		}
	},

	'select.select': 'Wähle eine Option aus',

	'calendar.title': 'Titel',
	'calendar.title.placeholder': 'Titel',
	'calendar.timeRange.withEnd': 'Von $start bis $end',
	'calendar.timeRange.withoutEnd': 'Ab $start',
	'calendar.new': 'Neues Ereignis',
	'calendar.new.create': 'Erstellen',
	'calendar.new.modal.title': 'Neues Ereignis erstellen',
	'calendar.priority.Minimal': 'Unwichtig',
	'calendar.priority.Low': 'Bischen wichtig',
	'calendar.priority.Medium': 'Mittelwichtig',
	'calendar.priority.High': 'Sehr wichtig',
	'calendar.priority.Critical': 'Extrem wichtig',

	// the i18n system stops dynamic parts only at space not `?`or `"`
	'calendar.delete.confirm': 'Willst du das Kalendar Event $name wirklich löschen?',
	'calendar.delete.confirm.ok': 'Löschen',
	'calendar.delete.success': 'Erfolgreich gelöscht',
	'calendar.update.success': 'Erfolgreich aktualisiert',
	'calendar.update.update': 'Aktualisieren',
	'calendar.create.success': 'Erreignis erfolgreich erstellt',

	'settings.noneSelected': 'Wähle eine Kategorie aus',
	'settings.profile': 'Profil',

	'settings.logout': 'Abmelden',
	'settings.logout.all': 'Von allen Sitzungen Abmelden',
	'settings.logout.success': 'Erfolgreich Abgemeldet',
	'settings.logout.all.success': {
		counts: {
			1: 'Erfolgreich aus einer Sitzungen abgemeldet.',
			2: 'Erfolgreich aus zwei Sitzungen abgemeldet.',
			3: 'Erfolgreich aus drei Sitzungen abgemeldet.',
			default: 'Erfolgreich aus $count Sitzungen abgemeldet.'
		}
	},
	'settings.logout.confirm.ok': 'Abmelden',
	'settings.logout.confirm.desc':
		'Willst Du Dich wirklich abmelden? Du kannst Dich anschließend wieder einloggen.',
	'settings.logout.all.confirm.desc':
		'Willst Du Dich wirklich von allen Sitzungen (inklusiver dieser) abmelden? Du kannst dich anschließend wieder einloggen.',

	'settings.profileDetails.change': 'Ändere Deine Profil Details',
	'settings.profileDetails.displayname': 'Anzeigename',
	'settings.profileDetails.displayname.success': 'Anzeigenamen auf $name geändert',
	'settings.profileDetails.password': 'Passwort',
	'settings.profileDetails.password.success': 'Erfolgreich Passwort geändert',
	'settings.profileDetails.password.error': 'Dein Passwort wurde nicht geändert',

	'settings.deleteAccount': 'Deinen Account löschen',
	'settings.deleteAccount.delete': 'Löschen',
	'settings.deleteAccount.confirm.title': 'Account löschen',
	'settings.deleteAccount.confirm.desc':
		'Möchstest Du Deinen Account $name wirklich löschen, dass kann nicht rückgemacht werden!',
	'settings.deleteAccount.confirm.ok': 'Löschen',
	'settings.deleteAccount.success': 'Den Account $name erfolgreich gelöscht',

	'settings.general': 'Allgemein',
	'settings.general.nav': 'Navigation',
	'settings.general.nav.texts': 'Texte in der Navigationsleiste anzeigen',
	'settings.general.calendar': 'Kalender',
	'settings.general.calendar.weekStartsOn': 'Erster Tag der Woche',
	'settings.general.assignments': 'Hausaufgaben',
	'settings.general.assignments.transparency': 'Transparenz überfälliger Hausaufgaben',
	'settings.general.launcher': 'Suche',
	'settings.general.launcher.outlineWidth': 'Breite der grünen Umrandung',

	'settings.color': 'Farben',
	'settings.color.title': 'Farbeinstellungen',
	'settings.color.new': 'Fach hinzufügen',
	'settings.color.subject.placeholder': 'Fach',
	'settings.color.showHex': 'Farbcode anzeigen',
	'settings.color.modal.title': 'Eine Farbe für $subject auswählen',
	'settings.color.importAndExport': 'Import und export',
	'settings.color.import': 'Importieren',
	'settings.color.import.error':
		'Die Datei konnte nicht importiert werden. Hat sie das richtige Format?',
	'settings.color.import.success': 'Farben erfolgreich importiert!',
	'settings.color.import.confirm': {
		counts: {
			default:
				'Bist Du Dir sicher, dass du die Farben importieren willst? Deine bisherigen $amount werden dann überschrieben!',
			1: 'Bist Du Dir sicher, dass du die Farben importieren willst? Deine bisherige Farbe wird dann überschrieben!',
			2: 'Bist Du Dir sicher, dass du die Farben importieren willst? Deine bisherigen zwei werden dann überschrieben!'
		}
	},
	'settings.color.export': 'Exportieren',

	'settings.timetable': 'Stundenplan',
	'settings.timetable.title': 'Stundenplan',
	'settings.timetable.subject.placeholder': 'Fach',
	'settings.timetable.importAndExport': 'Import und Export',
	'settings.timetable.export': 'Exportieren',
	'settings.timetable.import': 'Importieren',
	'settings.timetable.import.success': 'Stundenplan erfolgreich importiert',
	'settings.timetable.import.error':
		'Die Datei konnte nicht importiert werden. Enthält sie einen gültigen Stundenplan?',
	'settings.timetable.confirm.desc': 'Möchtest du wirklich deine bisherigen Farben überschreiben?',
	'settings.timetable.showWeekend': 'Zeige das Wochende im Editor an',

	'settings.general.holiday': 'Ferien & Feiertage',
	'settings.genral.holiday.autoDetect': 'Erkenne den Standort automatisch',
	'settings.genral.holiday.country': 'Staat',
	'settings.genral.holiday.state': 'Bundesland',

	'settings.save': 'Speichern',

	'holiday.noData': 'Es gibt keine Daten für diesen Monat',
	'holiday.timeRange': 'Vom $start bis zum $end',
	'holiday.date': 'Am $date',
	'holiday.quality.mandatory': 'Verpflichtend',
	'holiday.quality.optional': 'Optional',

	/*
	 * TODO:Add some specific to countries, e.g
	 * `Bund` and `Bundesländer` for germany
	 */
	'holiday.nationwide.true': 'Im gesamten Land',
	'holiday.nationwide.false': 'Nur in einigen Provinzen',

	'filter.filter': 'Filter',

	literal: '$literal'
} as const satisfies I18nDict;

export default de;
