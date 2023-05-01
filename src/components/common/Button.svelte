<script lang="ts">
	import { onMount } from "svelte";
    import Fa from 'svelte-fa';

    export let name: string;
    export let icon: string|null = null;
    export let type: string = '';
    export let small: boolean = false;

    export let onClick: any = null;

    let iconDefinition : any = null;

    const typeClass = type === '' ? '' : `btn-${type}`;
    const smallClass = small ? 'btn-sm' : '';

    onMount(async () => {
        if (icon !== null) {
            iconDefinition = (await import('@fortawesome/free-solid-svg-icons'))[icon];
        }
    });
    
    const click = () => {
        if (onClick !== null) {
            onClick();
        }
    };
    
</script>

<button class="btn {typeClass} {smallClass}" on:click={click}>
    <span class="pr-1"><Fa icon={iconDefinition} /></span>
    {name}
</button>