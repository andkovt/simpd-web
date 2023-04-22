<script lang="ts">
    import type { Container, Mount } from "../types";
	import MountEdit from "./MountEdit.svelte";
    import {v4 as uuidv4 } from 'uuid';

    export let container: Container;

    let nameError: string = '';
    let imageError: string = '';
    
    const onAddMountClick = () => {
        container.mounts.push({id: uuidv4() , source: '', destination: '', mode: 'rw'});
        container.mounts = container.mounts;
    };

    const onRemoveMountClick = (mount: Mount) => {
        const index = container.mounts.findIndex((m, i, o) => {
            return mount.id === m.id;
        });

        container.mounts.splice(index, 1);
        container.mounts = container.mounts
    };

    export const validate = () => {
        let hasErrors: boolean = false;

        nameError = '';
        imageError = '';

        if (container.name.length === 0) {
            nameError = 'Container name should not be empty';
            hasErrors = true;
        }

        if (container.image.length === 0) {
            imageError = 'Container image should not be empty';
            hasErrors = true;
        }

        return !hasErrors;
    };

    export const setBackendErrors = (errors: any) => {
        if ('Name' in errors) {
            nameError = errors['Name'][0];
        }

        if ('Image' in errors) {
            imageError = errors['Image'][0];
        }
    };

</script>
<div>
    <div class="collapse collapse-open">
		<input type="checkbox" />
		<div class="collapse-title text-xl font-medium">General</div>
		<div class="collapse-content">
			<div class="form-control">
                <label class="w-40 label" for="name">Name:</label>
                <input class="input" id="name" bind:value="{container.name}"/>
                <label class="label" for="name">
                    <span class="label-text-alt text-red-700">{nameError}</span>
                </label>
            </div>
        
            <div class="form-control f">
                <label class="w-40 label" for="image">Image:</label>
                <input class="input grow" id="image" bind:value="{container.image}" />
                <label class="label" for="name">
                    <span class="label-text-alt text-red-700">{imageError}</span>
                </label>
            </div>
		</div>
	</div>

	<div class="collapse collapse-arrow">
		<input type="checkbox" />
		<div class="collapse-title text-xl font-medium">Mounts</div>
		<div class="collapse-content">
			{#each container.mounts as mount}
                <MountEdit mount={mount} onRemove={onRemoveMountClick} />
            {/each}
            <button class="btn btn-primary btn-sm" on:click={onAddMountClick}>Add</button>
		</div>
	</div>

    <div class="collapse collapse-arrow">
		<input type="checkbox" />
		<div class="collapse-title text-xl font-medium">Network</div>
		<div class="collapse-content">
			<p>hello</p>
		</div>
	</div>

    <div class="collapse collapse-arrow">
		<input type="checkbox" />
		<div class="collapse-title text-xl font-medium">Environment Variables</div>
		<div class="collapse-content">
			<p>hello</p>
		</div>
	</div>
</div>
