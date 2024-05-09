type Unit = 'seconds' | 'minutes' | 'hours' | 'days' | 'weeks' | 'months' | 'years';

type Diff = {
	diff: number;
	unit: Unit;
};

export function getDifference(original: Date, current: Date): Diff {
	const secDiff = Math.max(Math.floor((current.getTime() - original.getTime()) / 1_000), 1);

	if (secDiff < 60) {
		return {
			diff: secDiff,
			unit: 'seconds'
		};
	}
	if (secDiff < 3600) {
		return {
			diff: Math.floor(secDiff / 60),
			unit: 'minutes'
		};
	}
	if (secDiff < 86400) {
		return {
			diff: Math.floor(secDiff / 3600),
			unit: 'hours'
		};
	}
	if (secDiff < 604800) {
		return {
			diff: Math.floor(secDiff / 86400),
			unit: 'days'
		};
	}
	if (secDiff < 2628000) {
		return {
			diff: Math.floor(secDiff / 604800),
			unit: 'weeks'
		};
	}
	if (secDiff < 31536000) {
		return {
			diff: Math.floor(secDiff / 2628000),
			unit: 'months'
		};
	}

	return {
		diff: Math.floor(secDiff / 31536000),
		unit: 'years'
	};
}
