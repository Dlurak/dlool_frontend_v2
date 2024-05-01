import type { I18nDict } from './types';

const de = {
	error: 'Etwas ist schief gelaufen',

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

	'register.register': 'Registrieren',
	'register.nametaken': 'Nutzername vergeben :(',
	'register.nametaken.desc':
		'Aber Du kannst noch immer den selben Anzeigenamen und das selbe Passwort nutzen',
	'register.success': 'Erfolgreich registriert (ﾉ◕ヮ◕)ﾉ',

	'login.login': 'Einloggen',

	'join.joinClass': 'Beitreten',

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
	'home.homeworkBut.convenient.4': 'Exporitere deine Daten als ical oder todo.txt',
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
		'Viele Einstellungen erlauben es dir wirklich dein Dlool zu nutzen!',
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
	'password.validation.length': 'Muss läner als 7 Zeichen seien',
	'password.validation.lowercase': 'Muss min. einen Kleinbuchstaben enthalten',
	'password.validation.upper': 'Muss min. einen Großbuchstaben enthalten',
	'password.validation.digit': 'Muss min. eine Ziffer enthalten',
	'password.validation.special': 'Muss min. ein Sonderzeichen enthalten',

	literal: '$literal'
} as const satisfies I18nDict;

export default de;
