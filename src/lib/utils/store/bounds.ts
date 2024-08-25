import { get, writable, type Updater } from 'svelte/store';

type BoundProps = {
	initial: number;
	min?: number;
	max?: number;
};

export function useBounds(props: BoundProps) {
	const { subscribe, set } = writable(props.initial);
	const min = props.min ?? 0;
	const max = props.max ?? Infinity;

	const boundedSet = (value: number) => {
		if (value < min) return set(min);
		if (value > max) return set(max);

		return set(value);
	};

	return {
		subscribe,
		set: boundedSet,
		update(updater: Updater<number>) {
			const value = updater(get({ subscribe }));
			boundedSet(value);
		},
		inc(amount = 1) {
			boundedSet(get({ subscribe }) + amount);
		},
		dec(amount = 1) {
			boundedSet(get({ subscribe }) - amount);
		}
	};
}
