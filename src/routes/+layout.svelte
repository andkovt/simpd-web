<script lang="ts">
	import Header from '../components/Header.svelte';
	import './styles.css';
	import Notifications from '../components/Notifications.svelte';
</script>

<div class="app">
	<Header/>

	<main>
		<div class="max-w-7xl mx-auto bg-base-200 p-2 rounded-b shadow-sm border border-base-300">
			<slot />
			<Notifications />
		</div>
	</main>

	<footer>
	</footer>
</div>