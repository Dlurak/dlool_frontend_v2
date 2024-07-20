<script lang="ts" context="module">
	import type { LocaleAbbr } from '$lib/i18n/i18n';

	interface KeyProps {
		key: string;
		isApple: boolean;
		lang: LocaleAbbr;
	}

	function keyFmter({ key, isApple, lang }: KeyProps) {
		if (key === 'Ctrl' && isApple) return '⌘ Cmd';
		if (key === 'Ctrl' && lang === 'de') return 'Strg';

		return key;
	}
</script>

<script lang="ts">
	import { currentLang } from '$lib/stores';

	export let key: string;
	export let isApple: boolean;
</script>

<kbd class="rounded-sm bg-zinc-300 px-1 dark:bg-zinc-600">
	{keyFmter({
		key,
		isApple,
		lang: $currentLang
	})}
</kbd>
