<script lang="ts">
	import { onMount } from "svelte";
    import Fa from 'svelte-fa';

    export let name: string;
    export let color: string|null = null;
    export let size: string = 'lg';

    let iconDefinition : any = null;

    onMount(async () => {
        iconDefinition = (await import('@fortawesome/free-solid-svg-icons'))[name];
    });
</script>

<Fa icon={iconDefinition} color={color} size={size}/>