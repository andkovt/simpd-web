<script lang="ts">
	import FlashMessage from '../components/FlashMessage.svelte';
	import Header from '../components/Header.svelte';
	import './styles.css';
	import { flashMessages } from '$lib/stores';
	import flashManager from '$lib/flash-manager';
	import type { FlashMessage as FlashMessage2 } from '../types';

	const onRemoveFlashMessageClicked = (flashMessage: FlashMessage2) => {
		flashManager.remove(flashMessage);
	}
</script>

<div class="app">
	<Header/>

	<main>
		<div class="max-w-7xl mx-auto bg-gray-50 p-2 rounded-b shadow-sm border border-gray-100">
			<div class="flex flex-col gap-2">
				{#each $flashMessages as flashMessage}
					<FlashMessage message="{flashMessage}" onRemoveClick={onRemoveFlashMessageClicked}/>
				{/each}
			</div>
			<slot />
		</div>
	</main>

	<footer>
	</footer>
</div>