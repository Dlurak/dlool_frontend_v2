<script>
	import { browser } from '$app/environment';
	import TableRow from '$lib/components/profile/TableRow.svelte';
	import MetaData from '$lib/components/utils/MetaData.svelte';
	import Store from '$lib/components/utils/Store.svelte';
	import { ownUserInfo } from '$lib/dlool/userInfo/own';
	import { i } from '$lib/i18n/store';
	import { currentLang } from '$lib/stores';
	import { sortByPredicate } from '$lib/utils/arrays/sort';
	import { smartSubject } from '$lib/utils/dlool/smartSubject';
	import { getSubjectIcon } from '$lib/utils/icons/subjectIcons';
	import { safeMap } from '$lib/utils/null/safeMap';
	import { retry } from '$lib/utils/promises/retry';
	import { useAuth } from '$lib/utils/store/auth';
	import { svocal } from '$lib/utils/store/svocal';
	import { onDestroy, onMount } from 'svelte';
	import { AcademicCap, BuildingLibrary, Clock, User, Icon } from 'svelte-hero-icons';

	const { userDetails, isLoggedIn } = useAuth();

	const ownUserDetailsSvocal = svocal('dlool.ownUserDetails');

	const refreshData = async () => {
		const { data } = await ownUserInfo();
		ownUserDetailsSvocal.set(data);
	};

	onMount(() => {
		if (!browser) return;
		retry(refreshData, 3).catch(() => {});
	});
	onDestroy(() => {
		if (!browser) return;
		retry(refreshData, 3).catch(() => {});
	});
</script>

<MetaData title={i('profile.title')} />

{#if $userDetails && $isLoggedIn}
	{@const ud = $userDetails}
	{@const school = ud.classes.at(0)?.school.name}

	<div class="grid w-full grid-cols-1 gap-3 sm:grid-cols-[1fr_2fr] sm:gap-5 md:grid-cols-[1fr_3fr]">
		<div class="flex justify-center">
			<div class="flex flex-col items-center gap-2 px-3">
				<div
					class="flex aspect-square items-center justify-center rounded-full bg-zinc-300 p-5 shadow dark:bg-zinc-600"
				>
					<Icon src={User} class="w-16" small />
				</div>

				<h2>{ud.displayname}</h2>
				<span>{ud.username}</span>
				<hr class="w-full border-zinc-300 dark:border-zinc-700" />
				<table>
					<tbody>
						{#if school}
							<TableRow icon={BuildingLibrary}>
								{school}
							</TableRow>
						{/if}
						<TableRow icon={AcademicCap}>
							<Store
								store={i(
									'profile.classes.count',
									{ count: ud.classes.length },
									{ count: ud.classes.length }
								)}
							/>
						</TableRow>
						<TableRow icon={Clock}>
							<Store
								store={i('profile.registered', {
									date: new Date(ud.created).toLocaleDateString($currentLang)
								})}
							/>
						</TableRow>
					</tbody>
				</table>
				<hr class="w-full border-zinc-300 dark:border-zinc-700" />
				<a href="/moderation/own" class="w-full">
					<Store store={i('profile.links.reqs')} />
				</a>
				<a href="/settings/profile" class="w-full">
					<Store store={i('profile.links.settings')} />
				</a>
			</div>
		</div>
		<div>
			<h3>
				<Store store={i('profile.classes')} />
			</h3>
			<ul class="grid grid-cols-[repeat(auto-fill,minmax(min(16rem,100%),1fr))] gap-2">
				{#each sortByPredicate(ud.classes, ({ name }) => name) as { name: className }}
					{@const subject = smartSubject(className)}
					{@const icon = safeMap(subject, getSubjectIcon)}
					<li
						class="flex items-center gap-2 rounded px-2 py-1 outline outline-2 outline-zinc-400 dark:outline-zinc-700"
					>
						{#if icon}
							<Icon src={icon} class="h-8 w-8" mini />
							<div class="h-full w-0.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
						{/if}
						{className}
					</li>
				{:else}
					<span>
						<Store store={i('profile.classes.count', { count: 0 }, { count: 0 })} />
					</span>
				{/each}
			</ul>
		</div>
	</div>
{:else}
	<Store store={i('profile.logInRequired')} />
	<a href="/login?redirect=/profile">
		<Store store={i('profile.logInRequired.link')} />
	</a>
{/if}
