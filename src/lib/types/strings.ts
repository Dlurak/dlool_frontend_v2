type AddSpaces<T extends string> = ` ${T} `;
type Trimmed<T extends string> = T extends `${' ' | '\t' | '\n'}${infer R}`
	? Trimmed<R>
	: T extends `${infer L}${' ' | '\t' | '\n'}`
		? Trimmed<L>
		: T;

type ExtractWordsAfterSignBase<
	T extends string,
	Sign extends string,
	Acc extends string[] = []
> = T extends `${infer _}${Sign}${infer Rest} ${infer R}`
	? ExtractWordsAfterSignBase<R, Sign, [...Acc, Rest]>
	: Acc;

export type ExtractWordsAfterSign<
	T extends string,
	Sign extends string
> = ExtractWordsAfterSignBase<AddSpaces<T>, Sign>;

type ExtractWordsAfterDollarSign<T extends string> = ExtractWordsAfterSign<T, '$'>[number];

type ReplaceSubstringTypeBase<
	T extends string,
	R extends Record<ExtractWordsAfterDollarSign<T>, string>
> = T extends `${infer Before}$${infer Key} ${infer After}`
	? Key extends keyof R
		? `${Before}${R[Key]} ${ReplaceSubstringType<After, R>}`
		: `${Before}$${Key} ${ReplaceSubstringType<After, R>}`
	: T;

export type ReplaceSubstringType<
	T extends string,
	R extends Record<ExtractWordsAfterDollarSign<T>, string>
> = Trimmed<ReplaceSubstringTypeBase<AddSpaces<T>, R>>;

export type Length<
	S extends string,
	Result extends number = 0
> = S extends `${infer _}${infer Right}`
	? // @ts-ignore
		Length<Right, Add<Result, 1>>
	: Result;
