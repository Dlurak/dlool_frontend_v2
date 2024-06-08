import type { LocaleAbbr } from '$lib/i18n/i18n';
import type { RGBColorObject } from 'colorame';

/*
Colors are from tailwind
Light = variant-200
Normal = variant-500
Dark = variant-800
*/

const WHITE = { r: 255, g: 255, b: 255 };
const BLACK = { r: 0, g: 0, b: 0 };
const LIGHTGRAY = { r: 241, g: 245, b: 249 };
const GRAY = { r: 107, g: 114, b: 128 };
const DARKGRAY = { r: 55, g: 65, b: 81 };
const LIGHTRED = { r: 254, g: 202, b: 202 };
const RED = { r: 239, g: 68, b: 68 };
const DARKRED = { r: 153, g: 27, b: 27 };
const LIGHTORANGE = { r: 254, g: 215, b: 170 };
const ORANGE = { r: 249, g: 115, b: 22 };
const DARKORANGE = { r: 154, g: 52, b: 18 };
const LIGHTYELLOW = { r: 254, g: 240, b: 138 };
const YELLOW = { r: 234, g: 179, b: 8 };
const DARKYELLOW = { r: 133, g: 77, b: 14 };
const LIGHTGREEN = { r: 187, g: 247, b: 208 };
const GREEN = { r: 34, g: 197, b: 94 };
const DARKGREEN = { r: 22, g: 101, b: 52 };
const LIGHTTEAL = { r: 153, g: 246, b: 228 };
const TEAL = { r: 20, g: 184, b: 166 };
const DARKTEAL = { r: 17, g: 94, b: 89 };
const LIGHTCYAN = { r: 165, g: 243, b: 252 };
const CYAN = { r: 6, g: 182, b: 212 };
const DARKCYAN = { r: 21, g: 94, b: 117 };
const LIGHTBLUE = { r: 191, g: 219, b: 254 };
const BLUE = { r: 59, g: 130, b: 246 };
const DARKBLUE = { r: 30, g: 64, b: 175 };
const LIGHTVIOLET = { r: 221, g: 214, b: 254 };
const VIOLET = { r: 139, g: 92, b: 246 };
const DARKVIOLET = { r: 91, g: 33, b: 182 };
const LIGHTFUCHSIA = { r: 245, g: 208, b: 254 };
const FUCHSIA = { r: 217, g: 70, b: 239 };
const DARKFUCHSIA = { r: 134, g: 25, b: 143 };
const LIGHTPINK = { r: 251, g: 207, b: 232 };
const PINK = { r: 236, g: 72, b: 153 };
const DARKPINK = { r: 157, g: 23, b: 77 };

export const colorNames: Record<LocaleAbbr, Record<string, RGBColorObject>> = {
	de: {
		Weiß: WHITE,
		Schwarz: BLACK,
		Hellgrau: LIGHTGRAY,
		Grau: GRAY,
		Dunkelgrau: DARKGRAY,
		Hellrot: LIGHTRED,
		Rot: RED,
		Dunkelrot: DARKRED,
		Hellorange: LIGHTORANGE,
		Orange: ORANGE,
		Dunkelorange: DARKORANGE,
		Hellgelb: LIGHTYELLOW,
		Gelb: YELLOW,
		Dunkelgelb: DARKYELLOW,
		Hellgrün: LIGHTGREEN,
		Grün: GREEN,
		Dunkelgrün: DARKGREEN,
		Helltürkis: LIGHTTEAL,
		Türkis: TEAL,
		Dunkeltürkis: DARKTEAL,
		Hellcyan: LIGHTCYAN,
		Cyan: CYAN,
		Dunkelcyan: DARKCYAN,
		Hellblau: LIGHTBLUE,
		Blau: BLUE,
		Dunkelblau: DARKBLUE,
		Hellviolett: LIGHTVIOLET,
		Violett: VIOLET,
		Dunkelviolett: DARKVIOLET,
		Hellfuchsia: LIGHTFUCHSIA,
		Fuchsia: FUCHSIA,
		Dunkelfuchsia: DARKFUCHSIA,
		Hellrosa: LIGHTPINK,
		Rosa: PINK,
		Dunkelrosa: DARKPINK
	},
	en: {
		White: WHITE,
		Black: BLACK,
		'Light Gray': LIGHTGRAY,
		Gray: GRAY,
		'Dark Gray': DARKGRAY,
		'Light Red': LIGHTRED,
		Red: RED,
		'Dark Red': DARKRED,
		'Light Orange': LIGHTORANGE,
		Orange: ORANGE,
		'Dark Orange': DARKORANGE,
		'Light Yellow': LIGHTYELLOW,
		Yellow: YELLOW,
		'Dark Yellow': DARKYELLOW,
		'Light Green': LIGHTGREEN,
		Green: GREEN,
		'Dark Green': DARKGREEN,
		'Light Teal': LIGHTTEAL,
		Teal: TEAL,
		'Dark Teal': DARKTEAL,
		'Light Cyan': LIGHTCYAN,
		Cyan: CYAN,
		'Dark Cyan': DARKCYAN,
		'Light Blue': LIGHTBLUE,
		Blue: BLUE,
		'Dark Blue': DARKBLUE,
		'Light Violet': LIGHTVIOLET,
		Violet: VIOLET,
		'Dark Violet': DARKVIOLET,
		'Light Fuchsia': LIGHTFUCHSIA,
		Fuchsia: FUCHSIA,
		'Dark Fuchsia': DARKFUCHSIA,
		'Light Pink': LIGHTPINK,
		Pink: PINK,
		'Dark Pink': DARKPINK
	}
};
