import { browser } from '$app/environment';
import {
	type LauncherItem,
	launcherItems,
	type LauncherSelectableItem
} from '$lib/constants/launcher';
import { enableScrolling } from '$lib/utils/dom/scroll';
import { useCycle } from '$lib/utils/store/cycle';
import { diceCoefficient } from 'dice-coefficient';
import { get, writable } from 'svelte/store';

const getBaseSelectableItems = (launcherItems: LauncherItem[]) => {
	return launcherItems
		.map((item, index) => ({ ...item, matchedBy: null, coefficient: 0, index }))
		.filter(({ enabled }) => enabled === undefined || get(enabled));
};

const allOptions = writable(launcherItems);
const isOpen = writable(false);
const search = writable<string | null>(null);
const isdetailed = writable(true);
const filteredAndSortedOptions = writable<LauncherSelectableItem[]>(
	getBaseSelectableItems(launcherItems)
);
const focusedIndex = useCycle({ max: () => get(filteredAndSortedOptions).length - 1 });

isOpen.subscribe((isOpen) => {
	if (!browser) return;

	enableScrolling(!isOpen);

	// close everything
	if (!isOpen) {
		search.set(null);
		focusedIndex.set(0);
		allOptions.set(launcherItems);
	}
});

allOptions.subscribe((opts) => {
	search.set(null);
	focusedIndex.set(0);
	filteredAndSortedOptions.set(getBaseSelectableItems(opts));
});

search.subscribe((searchTermRaw) => {
	const searchTerm = searchTermRaw?.trim();

	if (!searchTerm) return filteredAndSortedOptions.set(getBaseSelectableItems(get(allOptions)));

	const mapped = get(allOptions)
		.map((data, index) => ({ ...data, index }))
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
				return { ...opt, matchedBy: null, coefficient: 0 };
			}

			return { ...opt, matchedBy: matching[0], coefficient: matching[1] };
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
		search: { subscribe: search.subscribe, set: search.set },
		detailed: {
			setDetailed: () => isdetailed.set(true),
			setUndetailed: () => isdetailed.set(false),
			subscribe: isdetailed.subscribe
		},
		allOptions: { set: allOptions.set, subscribe: allOptions.subscribe },
		filteredAndSortedOptions: { subscribe: filteredAndSortedOptions.subscribe }
	};
}

/**
 * When possible use `useLauncher`
 * This function is needed in `src/lib/constants/launcher.ts`.
 */
export function closeLauncher() {
	isOpen.set(false);
}

/**
 * Set a new list => a new submenu
 */
export function setNewList(list: LauncherItem[]) {
	allOptions.set(list);
}
