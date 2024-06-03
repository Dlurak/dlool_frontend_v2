import { browser } from '$app/environment';
import { launcherItems, type LauncherSelectableItem } from '$lib/constants/launcher';
import { useCycle } from '$lib/utils/store/cycle';
import { diceCoefficient } from 'dice-coefficient';
import { get, writable } from 'svelte/store';

const getBaseSelectableItems = () => {
	return launcherItems
		.map((item) => ({
			...item,
			matchedBy: null,
			coefficient: 0
		}))
		.filter(({ enabled }) => {
			if (enabled === undefined) {
				return true;
			}

			return get(enabled);
		});
};

const isOpen = writable(false);
const search = writable<string | null>(null);
const isdetailed = writable(true);
const allOptions = writable(launcherItems);
const filteredAndSortedOptions = writable<LauncherSelectableItem[]>(getBaseSelectableItems());
const focusedIndex = useCycle({
	max: () => get(filteredAndSortedOptions).length - 1
});

isOpen.subscribe((isOpen) => {
	if (!browser) return;

	if (isOpen) {
		document.body.style.overflow = 'hidden';
		return;
	}

	// close everything
	search.set(null);
	focusedIndex.set(0);
	allOptions.set(launcherItems);
	document.body.style.overflow = 'initial';
});

allOptions.subscribe(() => {
	search.set(null);
});

search.subscribe((searchTermRaw) => {
	const searchTerm = searchTermRaw?.trim();

	if (!searchTerm) {
		filteredAndSortedOptions.set(getBaseSelectableItems());
		return;
	}

	const mapped = get(allOptions)
		.filter(({ enabled }) => {
			if (enabled === undefined) {
				return true;
			}

			return get(enabled);
		})
		.map((opt) => {
			const matching = [...get(opt.searchTerms), get(opt.label)]
				.map((s) => [s, diceCoefficient(s, searchTerm)] as const)
				.sort(([_, a], [__, b]) => b - a)
				.at(0);

			if (matching === undefined) {
				return {
					...opt,
					matchedBy: null,
					coefficient: 0
				};
			}

			return {
				...opt,
				matchedBy: matching[0],
				coefficient: matching[1]
			};
		});

	const sorted = mapped
		.filter(({ coefficient }) => coefficient > 0.2)
		.sort(({ coefficient: a }, { coefficient: b }) => b - a);

	filteredAndSortedOptions.set(sorted);
	focusedIndex.set(0);
});

/**
 * Custom hook for managing launcher state.
 *
 * @returns An object containing methods and state for controlling the launcher.
 */
export function useLauncher() {
	return {
		isOpen: {
			close: () => isOpen.set(false),
			open: () => isOpen.set(true),
			toggle: () => isOpen.update((b) => !b),
			subscribe: isOpen.subscribe
		},
		focusedIndex: { ...focusedIndex },
		search: {
			subscribe: search.subscribe,
			set: search.set
		},
		detailed: {
			setDetailed: () => isdetailed.set(true),
			setUndetailed: () => isdetailed.set(false),
			subscribe: isdetailed.subscribe
		},
		allOptions: {
			set: allOptions.set,
			subscribe: allOptions.subscribe
		},
		filteredAndSortedOptions: {
			subscribe: filteredAndSortedOptions.subscribe
		}
	};
}

/**
 * When possible use `useLauncher`
 * This function is needed in `src/lib/constants/launcher.ts`.
 */
export function closeLauncher() {
	isOpen.set(false);
}
