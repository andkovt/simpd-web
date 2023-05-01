<script lang="ts">
	import type { Directory } from "../types";
	import Icon from "./common/Icon.svelte";

    export let tree: Directory[];
    export let onClick: onClickHandler;

    let unHidden: Directory[] = [];

    interface onClickHandler{
        (directory: Directory): void;
    }

    const onClickHandler = (directoryEntry: Directory) => {
        const indexOf = unHidden.indexOf(directoryEntry);
        if (indexOf == -1) {
            unHidden.push(directoryEntry);
        } else {
            unHidden.splice(indexOf, 1);
        }

        unHidden = unHidden;

        onClick(directoryEntry);
    }
</script>

<div class="">
    <ul class="pl-1">
    {#each tree as directoryEntry}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <li class="cursor-pointer" on:click={() => onClickHandler(directoryEntry)}>
            <div class="flex gap-1 items-center cursor-pointer">
                <Icon name="faFolder" color="#ea6947"/>
                {directoryEntry.name}
                {#if directoryEntry.subDirectories.length > 0}
                    <Icon name="faTurnDown" size="xs" />
                {/if}
            </div>
        </li>

        <div class="pl-4" class:hidden={unHidden.indexOf(directoryEntry) == -1}>
            {#if directoryEntry.subDirectories.length > 0}
                <svelte:self tree={directoryEntry.subDirectories} onClick="{onClick}"/>
            {/if}
        </div>
    {/each}
    </ul>
</div>

