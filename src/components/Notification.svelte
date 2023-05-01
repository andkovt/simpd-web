<script lang="ts">
	import Icon from "./common/Icon.svelte";

    interface closeCallback{
        (id:string): void;
    };

    export let id: string;
    export let type: string;
    export let onClose: closeCallback;

    const alertClass = `alert-${type}`;
</script>

<div class="alert {alertClass} max-w-sm flex items-baseline">
    <div>
        <slot></slot>
    </div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="hover:cursor-pointer" on:click={() => onClose(id)}>
        <Icon name="faClose" />
    </div>
</div>