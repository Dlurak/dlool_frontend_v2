/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			screens: {
				print: { raw: 'print' },
				touch: { raw: '(hover: none) and (pointer: coarse)' }
			}
		}
	},

	plugins: [require('@tailwindcss/container-queries')]
};

module.exports = config;
