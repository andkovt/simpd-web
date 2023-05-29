<script lang="ts">
	import { onMount, onDestroy } from "svelte";
	import type { Container } from "../types";
	import { env } from '$env/dynamic/public';
	import Button from "../components/common/Button.svelte";
	import { goto } from "$app/navigation";
	import notificationManager from "$lib/notification-manager";
	import ContainerList from "../components/container/ContainerList.svelte";
	import urlBuilder from "$lib/url-builder";
	
	let containers: Container[] = [];
	let loaded: boolean = false;

	let refreshIntervalId = -1;
	const loadContainers = async () => {
		try {
			const response = await fetch(urlBuilder('containers'));
			const body = await response.json()
			containers = body;
			loaded = true;
		} catch(e) {
			notificationManager.add('Unable to connect to the backend', 'error');
		}
	}

	onMount(async () => {
		await loadContainers();
		
		if (loaded) {
			refreshIntervalId = setInterval(async () => {
				await loadContainers();
			}, 1000);
		}
	});

	onDestroy(() => {
		if (refreshIntervalId !== -1) {
			clearInterval(refreshIntervalId);
		}
	})

	const onDeleteClick = async (container: Container) => {
		try {
			const response = await fetch(urlBuilder(`containers/${container.id}`), {
				method: 'DELETE',
			});

			if (response.ok) {
				var indexOf = containers.indexOf(container);
				containers.splice(indexOf, 1);
				containers = containers;

				return;
			}

			notificationManager.add('Unknown error deleting container', 'error');
		} catch (e) {
			console.log(e);
		}
	};

	const onToggleStateClick = async (container: Container) => {
		const preferredState = container.state === 'running' ? 0 : 1;
		const response = await fetch(urlBuilder(`containers/${container.id}/state`), {
				method: 'PUT',
				headers: {
                	'Accept': 'application/json',
                	'Content-Type': 'application/json'
            	},
            	body: JSON.stringify({state: preferredState}),
			});

		await loadContainers();
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	{#if loaded}
		<div class="flex justify-between border-b border-base-300 p-2">
			<div class="flex gap-1">
				<Button name="Add" icon="faPlus" type="primary" onClick="{() => goto('/create-container')}" />
			</div>
		</div>

		<ContainerList containers={containers} onDelete={onDeleteClick} onToggleState={onToggleStateClick} />
	{/if}
</section>