<script lang="ts">
    import type { Container, EnvironmentVariable, Mount, Port } from "../../types";
	import MountEdit from "./MountEdit.svelte";
    import {v4 as uuidv4 } from 'uuid';
	import NetworkEdit from "./NetworkEdit.svelte";
	import EnvironmentVariableEdit from "./EnvironmentVariableEdit.svelte";

    export let container: Container;

    let nameError: string = '';
    let imageError: string = '';
    
    const onAddMountClick = () => {
        container.mounts.push({id: uuidv4() , source: '', destination: '', mode: 'ReadWrite'});
        container.mounts = container.mounts;
    };

    const onAddPortClick = () => {
        container.ports.push({id: uuidv4(), host: '', container: '', type: 'Tcp'});
        container.ports = container.ports;
    }

    const onAddEnvironmentVariableClick = () => {
        container.environmentVariables.push({id: uuidv4(), name: '', value: ''});
        container.environmentVariables = container.environmentVariables;
    }

    const onRemoveMountClick = (mount: Mount) => {
        const index = container.mounts.findIndex((m, i, o) => {
            return mount.id === m.id;
        });

        container.mounts.splice(index, 1);
        container.mounts = container.mounts
    };

    const onRemovePortClick = (port: Port) => {
        const index = container.ports.findIndex((m, i, o) => {
            return port.id === m.id;
        });

        container.ports.splice(index, 1);
        container.ports = container.ports
    };

    const onRemoveEnvironmentVariableClick = (variable: EnvironmentVariable) => {
        const index = container.environmentVariables.indexOf(variable);
        container.environmentVariables.splice(index, 1);
        container.environmentVariables = container.environmentVariables;
    }

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
        
            <div class="form-control">
                <label class="w-40 label" for="image">Image:</label>
                <input class="input grow" id="image" bind:value="{container.image}" />
                <label class="label" for="name">
                    <span class="label-text-alt text-red-700">{imageError}</span>
                </label>
            </div>
		</div>
	</div>

	<div class="collapse collapse-arrow border-b border-base-300">
		<input type="checkbox" checked="{container.mounts.length > 0}" />
		<div class="collapse-title text-xl font-medium">Mounts</div>
		<div class="collapse-content">
			{#each container.mounts as mount}
                <MountEdit mount={mount} onRemove={onRemoveMountClick} />
            {/each}
            <button class="btn btn-success btn-sm" on:click={onAddMountClick}>Add</button>
		</div>
	</div>

    <div class="collapse collapse-arrow border-b border-base-300">
		<input type="checkbox" checked="{container.ports.length > 0}"/>
		<div class="collapse-title text-xl font-medium">Network</div>
		<div class="collapse-content">
			{#each container.ports as port}
                <NetworkEdit port={port} onRemove={onRemovePortClick} />
            {/each}
            <button class="btn btn-success btn-sm" on:click={onAddPortClick}>Add</button>
		</div>
	</div>

    <div class="collapse collapse-arrow border-b border-base-300">
		<input type="checkbox" checked="{container.environmentVariables.length > 0}"/>
		<div class="collapse-title text-xl font-medium">Environment Variables</div>
		<div class="collapse-content">
			{#each container.environmentVariables as variable}
                <EnvironmentVariableEdit variable={variable} onRemove={onRemoveEnvironmentVariableClick} />
            {/each}
            <button class="btn btn-success btn-sm" on:click={onAddEnvironmentVariableClick}>Add</button>
		</div>
	</div>
</div>
