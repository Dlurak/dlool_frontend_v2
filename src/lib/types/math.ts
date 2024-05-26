import type { Enumerate, LastItem } from './array';

/**
 * Computes the sum of two numbers `T` and `N`.
 *
 * @template T - The first number.
 * @template N - The second number.
 * @returns The sum of `T` and `N`.
 *
 * @example
 * ```typescript
 * type Five = Add<2, 3>; // Five is 5
 * ```
 */
export type Add<T extends number, N extends number> = [...Enumerate<T>, ...Enumerate<N>]['length'];

/**
 * Subtracts one from the given number `T`.
 *
 * @template T - The number to subtract one from.
 * @returns `T` minus one.
 *
 * @example
 * ```typescript
 * type Two = SubtractOne<3>; // Two is 2
 * ```
 */
export type SubtractOne<T extends number> = LastItem<Enumerate<T>, 0>;

/**
 * Computes the product of two numbers `T` and `N`.
 *
 * @template T - The first number.
 * @template N - The second number.
 * @returns The product of `T` and `N`.
 *
 * @example
 * ```typescript
 * type Six = Multiply<2, 3>; // Six is 6
 * ```
 */
export type Multiply<T extends number, N extends number> = N extends 1
	? T
	: // @ts-ignore
		Add<T, Multiply<T, SubtractOne<N>>>;

type PrivatePowerOf<
	Base extends number,
	Top extends number,
	Result extends number = Base
> = Top extends 1
	? Result
	: // @ts-ignore
		PowerOf<Base, SubtractOne<Top>, Multiply<Result, Base>>;

/**
 * Computes the power of `Base` raised to `Top`.
 *
 * @template Base - The base number.
 * @template Top - The exponent.
 * @returns `Base` raised to the power of `Top`.
 *
 * @example
 * ```typescript
 * type Eight = PowerOf<2, 3>; // Eight is 8
 * ```
 */
export type PowerOf<Base extends number, Top extends number> = PrivatePowerOf<Base, Top>;
