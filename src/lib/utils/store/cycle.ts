import { counter } from 'nutzlich';
import { get } from 'svelte/store';

interface CycleProps {
	max: () => number;
}

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
		subscribe: c.subscribe
	};
};
