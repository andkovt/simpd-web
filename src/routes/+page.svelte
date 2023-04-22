<script lang="ts">
	import { onMount } from "svelte";
	import Toolbar from '../components/Toolbar.svelte';
	import type { Container } from "../types";
	import ContainerView from "../components/ContainerView.svelte";
	
	let containers: Container[] = [];

	onMount(async () => {
		var response = await fetch("http://localhost:5051/containers");
		var body = await response.json()

		containers = body;
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<Toolbar/>
	{#each containers as container}
		<ContainerView container={container} />
	{/each}
</section>