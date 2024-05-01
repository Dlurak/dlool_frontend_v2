import { counter, useInterval } from 'nutzlich';

interface CounterProps {
	isPaused: () => boolean;
}

export function counterMs(props: CounterProps) {
	const co = counter(0);

	useInterval(() => {

		if (!props.isPaused()) co.inc(5);
	}, 5);

	return co
}
