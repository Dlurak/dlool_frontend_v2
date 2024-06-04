import type { Add, Multiply, PowerOf, SubtractOne } from '$lib/types/math';
import type { Length } from './strings';

type DigitMap = {
	'0': 0;
	'1': 1;
	'2': 2;
	'3': 3;
	'4': 4;
	'5': 5;
	'6': 6;
	'7': 7;
	'8': 8;
	'9': 9;
};
type DigitStr = keyof DigitMap;
type DigitToNum<S extends string> = S extends DigitStr ? DigitMap[S] : 0;

type FirstDigitToNum<
	S extends string,
	Result extends number = 0
> = S extends `${infer First}${infer _}`
	? Length<S> extends 1
		? DigitToNum<First>
		: Multiply<DigitToNum<First>, PowerOf<10, SubtractOne<Length<S>>>>
	: Result;

type PrivateNumberToString<
	S extends string,
	Result extends number = 0
> = S extends `${infer _}${infer Right}`
	? // @ts-expect-error Too deep
		Add<FirstDigitToNum<S>, PrivateNumberToString<Right>>
	: Result;

export type NumberToString<S extends string | number> = S extends number
	? S
	: //@ts-expect-error S isn't identified as a string
		PrivateNumberToString<S>;
