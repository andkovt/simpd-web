<script lang="ts">
	import type { Container } from "../types";

    export let container: Container;
</script>

<div class="p-2 border-b flex justify-between items-center">
    <div class="flex flex-col">
        <span>{container.name}</span>
        <span class="text-sm">{container.image}</span>
    </div>
    <div>
        <!-- Mounts -->
    </div>
    <div>
        <button class="btn btn-sm">Edit</button>
        <button class="btn btn-sm btn-error">Delete</button>
    </div>
</div>