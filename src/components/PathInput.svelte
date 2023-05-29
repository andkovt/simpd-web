<script lang="ts">
	import { onMount } from "svelte";
	import type { Directory } from "../types";
	import DirectoryTree from "./DirectoryTree.svelte";
    import { env } from '$env/dynamic/public';
    import { clickOutside } from '$lib/click-outside';
    import urlBuilder from "$lib/url-builder";

    export let value: string;

    let tree: Directory[] = []
    let selectedDirectory: Directory = {name: '', path: value, subDirectories: []};
    let inputFocused = false;

    onMount(async () => {
        const response = await fetch(urlBuilder('autocomplete/path?path=/'));
        const body = await response.json();

        tree = body;
    });

    const onDirectoryClick = async (directory: Directory) => {
        const response = await fetch(urlBuilder(`autocomplete/path?path=${directory.path}`));
        const body = await response.json();

        updateTree(directory.path, body);
        selectedDirectory = directory;
    }

    const updateTree = (path: string, subDirectories: Directory[]) => {
        const pathSplit = path.split('/');

        const node = findNode(path, tree);
        if (node !== null) {
            node.subDirectories = subDirectories;
        }

        tree = tree;
    }

    const findNode = (path: string, tree: Directory[]): Directory|null => {
        for (const node of tree) {
            if (node.path === path) {
                return node;
            }

            if (node.subDirectories.length > 0) {
                const foundNode = findNode(path, node.subDirectories);
                if (foundNode) {
                    return foundNode;
                }
            }
        }

        return null;
    }

    const onCLickOutside = (event: any) => {
        inputFocused = false;
    }
</script>

<div class="flex" use:clickOutside on:clickOutside={onCLickOutside}>
    <input type="text" class="grow input" bind:value={selectedDirectory.path} on:focus={() => inputFocused = true}>
    {#if inputFocused}
        <div class="fixed mt-12 max-h-96 overflow-scroll bg-base-300 border border-base-300 rounded w-96 z-10 p-2">
            <DirectoryTree tree={tree} onClick={onDirectoryClick}/>
        </div>
    {/if}
</div>