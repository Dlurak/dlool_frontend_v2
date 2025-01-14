<script>
	import SettingsButton from '$lib/components/buttons/SettingsButton.svelte';
	import Info from '$lib/components/utils/Info.svelte';
	import { objToQueryParams } from '$lib/utils/url/query';
	import { PUBLIC_TODOIST_SECRET, PUBLIC_TODOIST_CLIENT_ID } from '$env/static/public';
	import { page } from '$app/stores';
	import { svocal } from '$lib/utils/store/svocal';
	import BoolSetting from '$lib/components/settings/BoolSetting.svelte';
	import { derived, writable } from 'svelte/store';
	import { browser } from '$app/environment';
	import Modal from '$lib/components/modal/Modal.svelte';
	import TodoIstModal from '$lib/components/settings/todo/todoist/Modal.svelte';
	import Store from '$lib/components/utils/Store.svelte';
	import { i } from '$lib/i18n/store';
	import MetaData from '$lib/components/utils/MetaData.svelte';

	const todoistCode = svocal('settings.todo.todoist.code');
	const todoistEnabled = svocal('settings.todo.todoist.enabled');
	const todoistListId = svocal('settings.todo.todoist.listId');
	const todoistSections = svocal('settings.todo.todoist.projectIds')
	const todoistTasks = svocal('settings.todo.todoist.taskIds')

	const todoistCodeUrl = derived(page, ({ url }) => url.searchParams.get('todoist'));
	todoistCodeUrl.subscribe((code) => {
		if (code && browser) {
			todoistCode.set(code);
		}
	});

	let activationRunning = false;
</script>

<MetaData title={i('title.settings.todo')} />

<div class="flex flex-col gap-2">
	<Info>Du kannst Dlool mit einer ToDo-App Syncrhoniesieren</Info>

	<section class="flex flex-col gap-2">
		<h3>Todoist</h3>
		<div class="flex flex-wrap gap-2">
			<span>
				<SettingsButton
					color="blue"
					on:click={() => {
						window.location.href = `https://todoist.com/oauth/authorize?${objToQueryParams({
							client_id: PUBLIC_TODOIST_CLIENT_ID,
							scope: 'data:read_write',
							state: PUBLIC_TODOIST_SECRET
						})}`;
					}}
					disabled={!!$todoistCode}
				>
					Login
				</SettingsButton>
			</span>
			{#if $todoistListId}
				<span>
					<SettingsButton
						on:click={() => {
							activationRunning = true;
						}}
					>
						<Store store={i('todoist.createListButton')} />
					</SettingsButton>
				</span>
			{/if}
		</div>

		{#if $todoistCode}
			<BoolSetting
				label={i('todoist.enable')}
				bind:value={$todoistEnabled}
				on:activate={() => {
					if (!$todoistListId) {
						activationRunning = true;
					}
				}}
			/>
		{/if}
	</section>
</div>

<Modal bind:isOpen={activationRunning}>
	<div slot="title"><Store store={i('todoist.createList')} /></div>
	<div slot="body">
		<TodoIstModal
			on:finish={({ detail: id }) => {
				activationRunning = false;
				todoistListId.set(id);
				todoistSections.set({});
				todoistTasks.set({});
			}}
		/>
	</div>
</Modal>
