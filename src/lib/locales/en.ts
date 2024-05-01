import type { I18nDict } from './types';

const en = {
	error: 'Something went wrong',

	school: 'School',
	class: 'Class',

	'toast.login.success': 'Erfolgreich eingeloggt',
	'toast.login.incorrect': 'Falscher Nutzername oder Passwort',
	'toast.refreshToken.error': 'A new access token could not be requested, please log in again',

	'toast.join.joined': 'Successfully joined the class!',
	'toast.join.requested': 'Successfully requested to join the class!',
	'toast.join.alreadyInClass': "You're already a member of this class",
	'toast.join.requestExists': "You've already requested to join that class",

	'register.register': 'Register',
	'register.nametaken': 'Username taken :(',
	'register.nametaken.desc': 'But you can stil use the same displayname and password',
	'register.success': 'Successfully registered (ﾉ◕ヮ◕)ﾉ',

	'login.login': 'Login',

	'join.joinClass': 'Join now',

	'moderation.state.Accepted': 'Accepted',
	'moderation.state.Rejected': 'Rejected',
	'moderation.state.Pending': 'Pending',
	'moderation.own.noData': 'There are no requests for you.',
	'moderation.own.review': 'Review',

	'nav.homework': 'Homework',
	'nav.calendar': 'Calendar',
	'nav.notes': 'Notes',
	'nav.login': 'Login',
	'nav.register': 'Register',
	'nav.launcher': 'Launcher',

	'nav.footer.auth': 'Account',
	'nav.footer.auth.login': 'Login',
	'nav.footer.auth.register': 'Register',
	'nav.footer.auth.join': 'Join class',
	'nav.footer.notes': 'Notes',
	'nav.footer.notes.notes': 'Notes',
	'nav.footer.calendar': 'Calendar',
	'nav.footer.calendar.calendar': 'Calendar',
	'nav.footer.homework': 'Homework',
	'nav.footer.homework.homework': 'Homework',
	'nav.footer.mod': 'Moderation',
	'nav.footer.mod.own': 'Own requests',

	'home.subtitle': 'Next generation homework for your entire class',
	'home.digitalEra': 'A homework management system for the digital era',
	'home.quick.getStarted': '🚀 Get Started',
	'home.quick.why': 'Why Dlool?',
	'home.quick.github': 'View on GitHub',
	'home.logo.alt': 'The beautifull Dlool Logo',
	'home.homeworkBut': 'Homeworkbooks but',
	'home.homeworkBut.collaborative': 'Collaborative',
	'home.homeworkBut.collaborative.1': 'One users writes the data into Dlool',
	'home.homeworkBut.collaborative.2': 'Everybody can see it',
	'home.homeworkBut.collaborative.3':
		'To prevent cybermobbing it is public, no account is needed to view data',
	'home.homeworkBut.collaborative.4': 'Other registered users can edit it to correct errors',
	'home.homeworkBut.collaborative.5': 'No need to ask for homework in messangers',

	'home.homeworkBut.convenient': 'Convenient',
	'home.homeworkBut.convenient.1': 'You can see your assignments everytime from everywhere',
	'home.homeworkBut.convenient.2':
		'Thanks to subject specific icons and colors it is easy to identify subjects at first glance',
	'home.homeworkBut.convenient.3': 'The timetable and presets allow for quick and precice edits',
	'home.homeworkBut.convenient.4': 'Export your data as ical or todo.txt',
	'home.homeworkBut.convenient.5': 'Use a siri-shortcut to integrate Dlool with apple reminders',

	'home.homeworkBut.free': 'Free',
	'home.homeworkBut.free.1': 'Dlool is completly free, no hidden costs!',
	'home.homeworkBut.free.2': 'It is Open-Source Software liscenced under the GPL',
	'home.homeworkBut.free.3': 'No spying, no ads, no abos!',
	'home.homeworkBut.free.4': 'Free to use API',

	'home.more': 'Discover more',
	'home.more.gh.frontend': 'Frontend on GitHub',
	'home.more.gh.backend': 'Backend on GitHub',
	'home.more.mastodon': '#dlool on Mastodon',
	'home.more.ccc': 'My (German) Lightning-Talk',

	'home.boxes.crossPlattform': 'Cross plattform',
	'home.boxes.crossPlattform.description':
		'As a progressive web app Dlool can be used on all devices and all operating systems',
	'home.boxes.collaborative': 'Collaborative',
	'home.boxes.collaborative.description':
		'The collaborative idea has been a focal point from the very beginning.',
	'home.boxes.customizable': 'Customizable',
	'home.boxes.customizable.description': 'A lot of settings allow you to it really your Dlool',
	'home.boxes.libre': 'Libre',
	'home.boxes.libre.description':
		'Every single line of code as well as all libraries and APIs in use are free Software ',
	'home.boxes.students': 'Made for students',
	'home.boxes.students.description': 'Dlool was made by students for students',
	'home.boxes.easy': 'Easy & fast to use',
	'home.boxes.easy.description':
		'Eventhough Dlool has many advanced features it is still very easy and intuitive to use',

	'lang.de': 'German',
	'lang.en': 'English',

	'footer.creator': 'Created by Dlurak',
	'footer.creator.license': 'Liscenced under the GNU General Public License Version 3',
	'footer.contact': 'Contact',
	'footer.contact.backend': 'Backend on GitHub',
	'footer.contact.frontend': 'Frontend on GitHub',

	username: 'Username',
	displayname: 'Displayname',

	password: 'Password',
	'password.validation.length': 'Must be longer then 7 charachters',
	'password.validation.lowercase': 'Must include at least one lowercase charachter',
	'password.validation.upper': 'Must include at least one uppercase charachter',
	'password.validation.digit': 'Must include at least one digit',
	'password.validation.special': 'Must include at least one special charachter',

	literal: '$literal'
} as const satisfies I18nDict;

export default en;
