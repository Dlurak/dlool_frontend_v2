import { counter } from 'nutzlich';
import { get } from 'svelte/store';

interface CycleProps {
	max: () => number;
}

/**
 * A custom Svelte hook that cycles through a range of numbers from 0 to a specified maximum value.
 * Provides methods to increment, decrement, reset, set, and subscribe to the counter.
 *
 * @param props - The properties object.
 * @param props.max - The maximum value the counter can reach before cycling back to 0.
 * @returns An object containing methods to manipulate and subscribe to the counter.
 * @returns returns.inc - Increments the counter. If the counter reaches the maximum value, it resets to 0.
 * @returns returns.dec - Decrements the counter. If the counter reaches 0, it cycles back to the maximum value.
 * @returns returns.reset - Resets the counter to 0.
 * @returns returns.set - Sets the counter to a specific value.
 * @returns returns.subscribe - Subscribes to changes in the counter value.
 */
export const useCycle = (props: CycleProps) => {
	const c = counter(0);

	return {
		inc() {
			if (get(c) === props.max()) c.set(0);
			else c.inc();
		},
		dec() {
			if (get(c) === 0) c.set(props.max());
			else c.dec();
		},
		reset() {
			c.set(0);
		},
		set: c.set,
		subscribe: c.subscribe
	};
};
