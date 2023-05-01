<script lang="ts">
	import { goto } from "$app/navigation";

	const onLogoClick = () => {
		goto('/');
	}
</script>

<header class="bg-accent w-full text-accent-content shadow-sm">
	<div class="max-w-7xl p-1 mx-auto">
		<a class="text-lg mb-0 pb-0" href="/">SimpD</a>
		<div class="text-sm mt-0 pt-0">Simple Docker Managemenet</div>
	</div>
</header>