<script>
	//@ts-nocheck
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { videoPaths } from '$lib/videoPaths';

	let state = { currentVideo: null, phase: 'waiting' };
	let options = [];
	// Controls whether the container is rendered.
	let showContainer = true;

	async function fetchState() {
		try {
			const res = await fetch('/api/state');
			state = await res.json();
			console.log('Fetched state:', state);
			// When the state is in 'choices', grab the options from videoPaths.
			if (state.currentVideo && state.phase === 'choices') {
				options = videoPaths[state.currentVideo]?.nextOptions || [];
			} else {
				options = [];
			}
		} catch (error) {
			console.error('Error fetching state:', error);
		}
	}

	onMount(() => {
		// Reset state on page load.
		fetch('/api/reset', { method: 'POST' });
		fetchState();
		const interval = setInterval(fetchState, 1000);
		return () => clearInterval(interval);
	});

	// This function is called whenever a branch option is selected.
	async function selectOption(nextVideo) {
		// Fade out the container.
		showContainer = false;
		// Wait for the fade-out to complete (duration: 500ms).
		await new Promise((resolve) => setTimeout(resolve, 500));
		// Call the API to select the next video.
		await fetch('/api/select', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ nextVideo })
		});
	}

	// NEW: This function sends a command to skip to the next selection phase.
	async function skipToChoices() {
		await fetch('/api/phase', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ phase: 'choices' })
		});
	}

	// When the state phase switches to 'choices' (after the video finishes),
	// fade the container back in.
	$: if (state.phase === 'choices') {
		if (!showContainer) {
			showContainer = true;
		}
	}
</script>

<!-- The container (with transition:fade) wraps all of your content. -->
<div class="fade-container">
	{#if showContainer}
		<div
			transition:fade={{ duration: 500 }}
			class="flex min-h-screen flex-col items-center justify-center bg-black text-white"
		>
			{#if state.phase === 'waiting'}
				<button
					on:click={() => selectOption('intro')}
					class="single rounded-lg border-gray-300 px-14 py-8 text-gray-100"
				>
					Start Tribunal
				</button>
			{/if}

			{#if state.phase === 'choices' && options.length > 0}
				<div class="flex h-screen w-screen flex-col items-center justify-center">
					<h1 class="mt-12 text-4xl">Choose your question</h1>
					<div class="flex h-[30%] w-10/12 flex-row items-center justify-around">
						{#each options as option}
							<button
								on:click={() => selectOption(option.id)}
								class="h-36 w-[47%] rounded-xl border-2 border-gray-400 bg-gray-800 px-14 py-6 text-white"
							>
								{option.text}
							</button>
						{/each}
					</div>
				</div>
			{/if}

			{#if state.currentVideo && state.phase !== 'waiting' && state.phase !== 'choices'}
				<div class="flex h-screen w-screen flex-col items-center justify-center">
					<button
						on:click={skipToChoices}
						class="h-32 rounded-lg border-2 border-gray-300 px-14 py-8 text-gray-100"
					>
						Skip
					</button>
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	h1 {
		font-family: 'Inter', sans-serif;
		font-weight: 500;
		color: rgb(175, 175, 175);
		font-size: clamp(2.25rem, 3.25vw, 4rem);
	}
	button {
		font-family: 'Inter', sans-serif;
		font-weight: 400;
		background-color: rgb(46, 46, 46);
		font-size: clamp(2rem, 2.5vw, 3rem);
		border: solid 3px;
		border-color: rgb(209 213 219 / var(--tw-border-opacity, 1));
	}
	.single {
		font-family: 'Inter', sans-serif;
		font-weight: 400;
		background-color: rgb(46, 46, 46);
		font-size: clamp(2rem, 3vw, 3rem);
	}
</style>
