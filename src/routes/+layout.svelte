<script>
	import Header from '../components/Header.svelte';
	import './styles.css';
</script>

<div class="app">
	<Header/>

	<main>
		<div class="max-w-7xl mx-auto bg-gray-50 p-2 rounded-b shadow-sm border border-gray-100">
			<slot />
		</div>
	</main>

	<footer>
	</footer>
</div>