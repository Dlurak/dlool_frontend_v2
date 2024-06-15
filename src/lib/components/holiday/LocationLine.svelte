<script context="module" lang="ts">
	type LanguageEntry = { language: string; text: string };
	type NameObj = { name: LanguageEntry[] };

	function getMatchingLanguageEntry(obj: NameObj, desiredLanguage: string) {
		const entries = obj.name;
		const desired = entries.find(({ language }) => language === desiredLanguage.toUpperCase());
		const english = entries.find(({ language }) => language === 'EN');

		return desired ?? english;
	}

	function formatLocation(country: string | undefined, state: string | undefined) {
		if (country && state) return `${state}, ${country}`;
		if (country) return `${country}`;

		return undefined;
	}
</script>

<script lang="ts">
	import { currentLang } from '$lib/stores';

	export let country: NameObj | undefined;
	export let state: NameObj | undefined;

	$: fmtCountry = getMatchingLanguageEntry(country ?? { name: [] }, $currentLang)?.text;
	$: fmtState = getMatchingLanguageEntry(state ?? { name: [] }, $currentLang)?.text;
</script>

{formatLocation(fmtCountry, fmtState)}
