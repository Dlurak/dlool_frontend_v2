import { i } from '$lib/i18n/store';
import type { Readable } from 'svelte/store';

const longEnough = (pwd: string) => pwd.length > 8;
const hasLowercaseChar = (pwd: string) => /[a-z]/.test(pwd);
const hasUppercaseChar = (pwd: string) => /[A-Z]/.test(pwd);
const hasDigit = (pwd: string) => /[0-9]/.test(pwd);
const hasSpecialChar = (pwd: string) => /[#?!@$ %^&*-]/.test(pwd);

type Condition = {
	isValid: (pwd: string) => boolean;
	string: Readable<string>;
};

const conditions = [
	{
		isValid: longEnough,
		string: i('password.validation.length')
	},
	{
		isValid: hasLowercaseChar,
		string: i('password.validation.lowercase')
	},
	{
		isValid: hasUppercaseChar,
		string: i('password.validation.upper')
	},
	{
		isValid: hasDigit,
		string: i('password.validation.digit')
	},
	{
		isValid: hasSpecialChar,
		string: i('password.validation.special')
	}
] satisfies Condition[];

export const getConditions = (pwd: string) => {
	return conditions
		.map((cn) => ({
			...cn,
			isValid: cn.isValid(pwd.trim())
		}))
		.sort((a, b) => {
			if (a.isValid === b.isValid) return 0;
			if (a.isValid) return -1;
			return 1;
		});
};
