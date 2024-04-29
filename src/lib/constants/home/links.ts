import type { Token } from '$lib/i18n/i18n';

export const links: {
	href: string;
	text: Token;
	icon: 'github' | 'mastodon' | 'cam';
}[] = [
	{
		href: 'https://github.com/Dlurak/dlool_frontend_v2',
		icon: 'github',
		text: 'home.more.gh.frontend'
	},
	{
		href: 'https://github.com/Dlurak/dlool_backend_v2',
		text: 'home.more.gh.backend',
		icon: 'github'
	},
	{
		href: 'https://mastodon.social/tags/dlool',
		icon: 'mastodon',
		text: 'home.more.mastodon'
	},
	{
		href: 'https://media.ccc.de/v/37c3-lightningtalks-58009-dlool-schulplaner-fr-das-digitale-zeitalter',
		icon: 'cam',
		text: 'home.more.ccc'
	}
];
