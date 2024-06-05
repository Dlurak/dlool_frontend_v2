const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const allChars = lowerChars + upperChars;

export const randomNumber = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const randomItem = <T>(arr: T[]) => arr[randomNumber(0, arr.length - 1)];

export const randomChar = () => randomItem(allChars.split(''));

export function randomStr(length: number) {
	const chars = new Array(length).fill(null).map(randomChar);
	return chars.join('');
}
