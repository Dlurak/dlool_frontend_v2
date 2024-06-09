import type { I18nDict } from './types';

const en = {
	error: 'Something went wrong',
	loading: 'Loading',
	update: 'Update',

	school: 'School',
	class: 'Class',

	'toast.login.success': 'Erfolgreich eingeloggt',
	'toast.login.incorrect': 'Falscher Nutzername oder Passwort',
	'toast.refreshToken.error': 'A new access token could not be requested, please log in again',

	'toast.join.joined': 'Successfully joined the class!',
	'toast.join.requested': 'Successfully requested to join the class!',
	'toast.join.alreadyInClass': "You're already a member of this class",
	'toast.join.requestExists': "You've already requested to join that class",

	'toast.mod.foreing.accept.success': 'Successfully accepted!',
	'toast.mod.foreing.reject.success': 'Successfully rejected!',

	'toast.filter.applied': 'Successfully applied filters',

	'launcher.placeholder': 'Your search...',
	'launcher.home': 'Homepage',
	'launcher.home.terms': 'Homepage',
	'launcher.login': 'Login',
	'launcher.login.terms': 'Login\nSignin',
	'launcher.homework': 'Assignments',
	'launcher.homework.terms': 'Task\nHomework',
	'launcher.register': 'Register',
	'launcher.register.terms': 'Account',
	'launcher.join': 'Join a class',
	'launcher.join.terms': 'Class\nJoin\nCourse\nGroup\nAdd',
	'launcher.mod.own': 'Own join requests',
	'launcher.mod.own.terms': 'Moderation\nOwn\nRequest',
	'launcher.mod.own.desc': "Here you can see in which classes you've been accepted",
	'launcher.mod.list': 'Foreign requests',
	'launcher.mod.list.terms': 'Moderation\nForeign\nRequest',
	'launcher.mod.list.desc': 'Here you can see your own others requests to join your class',
	'launcher.notes': 'Notes',
	'launcher.notes.terms': '',
	'launcher.calendar': 'Calendar',
	'launcher.calendar.terms': 'Exam\nTest\nAppointment',
	'launcher.settings': 'Settings',
	'launcher.settings.terms': 'Option\nConfiguration\nPreference',
	'launcher.logout': 'Ausloggen',
	'launcher.logout.terms': 'Abmelden\nAnonym',

	'register.register': 'Register',
	'register.nametaken': 'Username taken :(',
	'register.nametaken.desc': 'But you can still use the same displayname and password',
	'register.success': 'Successfully registered (ﾉ◕ヮ◕)ﾉ',

	'login.login': 'Login',

	'join.joinClass': 'Join now',

	'moderation.state.Accepted': 'Accepted',
	'moderation.state.Rejected': 'Rejected',
	'moderation.state.Pending': 'Pending',
	'moderation.state.all': 'All',
	'moderation.own.noData': 'There are no requests for you.',
	'moderation.own.review': 'Review',
	'moderation.foreign.noData': 'There are no requests you can review.',
	'moderation.foreign.acceptedIn.others': {
		counts: {
			default: 'And $count other classes',
			1: 'And one other class'
		}
	},
	'moderation.foreign.accept': 'Accept',
	'moderation.foreign.reject': 'Reject',

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
	'nav.footer.mod.list': 'Foreign requests',
	'nav.footer.else': 'Else',
	'nav.footer.else.settings': 'Settings',

	'title.calendar': 'Calendar',
	'title.homework': 'Homework',
	'title.join': 'Join a class',
	'title.login': 'Login',
	'title.moderation.list': 'Foreign joinrequests',
	'title.moderation.own': 'Own joinrequests',
	'title.notes': 'Notes',
	'title.register': 'Register',
	'title.settings': 'Settings',
	'title.settings.profile': 'Profile settings',
	'title.settings.general': 'General settings',

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
	'footer.creator.license': 'Licensed under the GNU General Public License Version 3',
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

	'confirmation.default.content': 'Are you really sure?',
	'confirmation.default.cancel': 'Cancel',
	'confirmation.default.ok': 'Ok',

	'assignments.assignment.date': 'From $start to $end',
	'assignments.filter.needToSet': 'Please specify your school und class',
	'assignments.filter.due': 'Until',
	'assignments.filter.due.earliest': 'Earlist',
	'assignments.filter.due.latest': 'Latest',
	'assignments.filter.from': 'From',
	'assignments.filter.from.earliest': 'Earlist',
	'assignments.filter.from.latest': 'Latest',
	'assignments.filter.apply': 'Apply',
	'assignments.noData': "There aren't any assignments ＼(●´ϖ`●)／",
	'assignments.create': 'Create an assignment',
	'assignments.create.subject': 'Subject',
	'assignments.create.description': 'Description',
	'assignments.create.from': 'From',
	'assignments.create.due': 'To',
	'assignments.create.create': 'Add',
	'assignments.create.success': 'Successfully created assignment',
	'assignments.delete.desc': 'Do you really want to delete this assignment?',
	'assignments.delete.ok': 'Delete',
	'assignments.delete.success': 'Successfully deleted',
	'assignments.update.success': 'Successfully updated',
	'assignments.pages.currently': 'Page $current of $total',
	'assignments.edit': 'Edit assignment',

	'calendar.month': {
		counts: {
			default: '$year',
			0: 'January $year',
			1: 'February $year',
			2: 'March $year',
			3: 'April $year',
			4: 'May $year',
			5: 'June $year',
			6: 'July $year',
			7: 'August $year',
			8: 'September $year',
			9: 'October $year',
			10: 'November $year',
			11: 'December $year'
		}
	},
	'calendar.weekday': {
		counts: {
			default: '',
			0: 'Sunday',
			1: 'Monday',
			2: 'Tuesday',
			3: 'Wednesday',
			4: 'Thursday',
			5: 'Friday',
			6: 'Saturday'
		}
	},
	'calendar.weekday.abbr': {
		counts: {
			default: '',
			0: 'S',
			1: 'M',
			2: 'T',
			3: 'W',
			4: 'T',
			5: 'F',
			6: 'S'
		}
	},
	'calendar.select': 'Select a date',

	'note.title': 'Title',
	'note.title.placeholder': 'Title',
	'note.summary': 'Summary',
	'note.summary.placeholder': 'Summary',
	'notes.nothing': "Here's nothing to see :]",
	'notes.delete.ok': 'Delete',
	'notes.delete.desc': 'Do you really want to delete this note?',
	'note.delete.success': 'Successfully deleted',
	'note.priority': 'Priority',
	'note.priority.Critical': 'Critical',
	'note.priority.High': 'High',
	'note.priority.Medium': 'Medium',
	'note.priority.Low': 'Low',
	'note.priority.Minimal': 'Minimal',
	'note.scope': 'Bearbeitungsrechte',
	'note.scope.self': 'Nur der Ersteller',
	'note.scope.class': 'Die Klasse',
	'note.scope.school': 'Die Schule',
	'note.update.success': 'Successfully edited',
	'note.create.success': 'Successfully created',
	'note.create.new': 'Create',
	'note.noData': 'There are no notes',

	'time.ago.created.seconds': {
		counts: {
			default: 'Created $diff seconds ago by $name',
			1: 'Created one second ago by $name'
		}
	},
	'time.ago.created.minutes': {
		counts: {
			default: 'Created $diff seconds ago by $name',
			1: 'Created 1 second ago by $name',
			2: 'Created 2 seconds ago by $name',
			3: 'Created 3 seconds ago by $name'
		}
	},
	'time.ago.created.hours': {
		counts: {
			default: 'Created $diff hours ago by $name',
			1: 'Created one hours ago by $name',
			2: 'Created two hours ago by $name',
			3: 'Created three hours ago by $name',
			4: 'Created four hours ago by $name'
		}
	},
	'time.ago.created.days': {
		counts: {
			default: 'Created $diff days ago by $name',
			1: 'Created one day ago by $name',
			2: 'Created two days ago by $name',
			3: 'Created three days ago by $name',
			4: 'Created four days ago by $name',
			5: 'Created five days ago by $name',
			6: 'Created six days ago by $name'
		}
	},
	'time.ago.created.weeks': {
		counts: {
			default: 'Created $diff weeks ago by $name',
			1: 'Created one week ago by $name'
		}
	},
	'time.ago.created.months': {
		counts: {
			default: 'Created $diff months ago by $name',
			1: 'Created one month ago by $name'
		}
	},
	'time.ago.created.years': {
		counts: {
			default: 'Created $diff years ago by $name',
			1: 'Created one year ago by $name'
		}
	},

	'time.ago.edited.seconds': {
		counts: {
			default: 'Edited $diff seconds ago by $name',
			1: 'Edited one second ago by $name'
		}
	},
	'time.ago.edited.minutes': {
		counts: {
			default: 'Edited $diff seconds ago by $name',
			1: 'Edited 1 second ago by $name',
			2: 'Edited 2 seconds ago by $name',
			3: 'Edited 3 seconds ago by $name'
		}
	},
	'time.ago.edited.hours': {
		counts: {
			default: 'Edited $diff hours ago by $name',
			1: 'Edited one hours ago by $name',
			2: 'Edited two hours ago by $name',
			3: 'Edited three hours ago by $name',
			4: 'Edited four hours ago by $name'
		}
	},
	'time.ago.edited.days': {
		counts: {
			default: 'Edited $diff days ago by $name',
			1: 'Edited one day ago by $name',
			2: 'Edited two days ago by $name',
			3: 'Edited three days ago by $name',
			4: 'Edited four days ago by $name',
			5: 'Edited five days ago by $name',
			6: 'Edited six days ago by $name'
		}
	},
	'time.ago.edited.weeks': {
		counts: {
			default: 'Edited $diff weeks ago by $name',
			1: 'Edited one week ago by $name'
		}
	},
	'time.ago.edited.months': {
		counts: {
			default: 'Edited $diff months ago by $name',
			1: 'Edited one month ago by $name'
		}
	},
	'time.ago.edited.years': {
		counts: {
			default: 'Edited $diff years ago by $name',
			1: 'Edited one year ago by $name'
		}
	},

	'select.select': 'Select an option',

	'calendar.title': 'Title',
	'calendar.title.placeholder': 'Title',
	'calendar.timeRange.withEnd': '$start until $end',
	'calendar.timeRange.withoutEnd': '$start',
	'calendar.priority.Minimal': 'Unimportant',
	'calendar.priority.Low': 'Kinda important',
	'calendar.priority.Medium': 'Medium important',
	'calendar.priority.High': 'Very important',
	'calendar.priority.Critical': 'Extremely important',

	// the i18n system stops dynamic parts only at space not `?`or `"`
	'calendar.delete.confirm': 'Are you sure you want to delete the calendar event $name ?',
	'calendar.delete.confirm.ok': 'Delete',
	'calendar.delete.success': 'Successfully deleted',
	'calendar.update.success': 'Successfully updated',
	'calendar.update.update': 'Update',

	'settings.noneSelected': 'Select a category',
	'settings.profile': 'Account',

	'settings.logout': 'Logout',
	'settings.logout.all': 'Logout from all sessions',
	'settings.logout.success': 'Successfully logged out',
	'settings.logout.all.success': {
		counts: {
			1: 'Successfully logged out of one sessions',
			2: 'Successfully logged out of two sessions',
			3: 'Successfully logged out of three sessions',
			default: 'Successfully logged out of $count sessions'
		}
	},
	'settings.logout.confirm.ok': 'Logout',
	'settings.logout.confirm.desc': 'Are you sure you want to log out from this sessions?',
	'settings.logout.all.confirm.desc': 'Are you sure you want to log out from all sessions?',

	'settings.profileDetails.change': 'Change your account details',
	'settings.profileDetails.displayname': 'Displayname',
	'settings.profileDetails.displayname.success': 'Change displayname to $name',
	'settings.profileDetails.password': 'Password',
	'settings.profileDetails.password.success': 'Successfully changed password',
	'settings.profileDetails.password.error': "Your password wasn't changed",

	'settings.deleteAccount': 'Delete your Account',
	'settings.deleteAccount.delete': 'Delete',
	'settings.deleteAccount.confirm.title': 'Delete your account',
	'settings.deleteAccount.confirm.desc':
		"Are you sure you want to delete your account $name This can't be undone!",
	'settings.deleteAccount.confirm.ok': 'Delete',
	'settings.deleteAccount.success': 'Successfully deleted the account $name',

	'settings.general': 'General',
	'settings.general.nav': 'Navigation',
	'settings.general.nav.texts': 'Texte in der Navigationsleiste anzeigen',
	'settings.general.calendar': 'Calendar',
	'settings.general.calendar.weekStartsOn': 'First day of the week',
	'settings.general.assignments': 'Assignments',
	'settings.general.assignments.transparency': 'transparency of overdue assignments',

	'settings.color': 'Colors',
	'settings.color.title': 'Color settings',
	'settings.color.new': 'Add a subject',
	'settings.color.subject.placeholder': 'Subject',
	'settings.color.showHex': 'Show hex values',
	'settings.color.modal.title': 'Pick a color for $subject',
	'settings.color.importAndExport': 'Import and export',
	'settings.color.import': 'Import',
	'settings.color.import.error': "The file couldn't be imported. Is it in the right format?",
	'settings.color.import.success': 'Successfully imported colors!',
	'settings.color.import.confirm': {
		counts: {
			default:
				'Are you sure, that you want to import the colors from a file? Your current $amount colors will be overwritten!',
			1: 'Are you sure, that you want to import the colors from a file? Your current one will be overwritten!',
			2: 'Are you sure, that you want to import the colors from a file? Your current two colors will be overwritten!'
		}
	},
	'settings.color.export': 'Export',

	'settings.save': 'Save',

	'filter.filter': 'Filters',

	literal: '$literal'
} as const satisfies I18nDict;

export default en;
