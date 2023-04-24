<script lang="ts">
	import type { FlashMessage } from "../types";

    export let message: FlashMessage;
    export let onRemoveClick: any;

    const typeClass = `alert-${message.type}`;

    const removeClicked = () => {
        onRemoveClick(message);
    }
</script>

<div class="alert {typeClass}">
    <div>
        {message.message}
    </div>
    <div class="flex-none">
        <a href="#" on:click={removeClicked}>x</a>
    </div>
</div>