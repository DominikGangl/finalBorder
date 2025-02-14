<script>
	//@ts-nocheck
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { videoPaths } from '$lib/videoPaths';

	let state = { currentVideo: null, phase: 'waiting' };
	let videoData = null;
	let videoVisible = true;
	let videoElement;

	// Fetch the shared state from the API.
	async function fetchState() {
		try {
			const res = await fetch('/api/state');
			state = await res.json();
			if (state.currentVideo) {
				videoData = videoPaths[state.currentVideo];
			}
		} catch (error) {
			console.error('Error fetching state:', error);
		}
	}

	// On mount, reset the state (so a page reload always starts fresh)
	onMount(() => {
		fetch('/api/reset', { method: 'POST' });
		fetchState();
		const interval = setInterval(fetchState, 1000);
		return () => clearInterval(interval);
	});

	// When the video ends, either move to the next choice phase or (if this is video14) reset.
	async function handleVideoEnd() {
		if (state.phase === 'playing') {
			if (state.currentVideo === 'video14') {
				await fetch('/api/reset', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' }
				});
			} else {
				await fetch('/api/phase', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ phase: 'choices' })
				});
			}
		}
	}

	// When the state changes to "transitioning", perform a fade out/in transition.
	async function startTransition() {
		videoVisible = false; // fade out the video
		await new Promise((resolve) => setTimeout(resolve, 2000)); // wait 2 seconds
		await fetchState(); // update to the new videoData
		videoVisible = true; // fade in the new video
		// Once the new video is visible, update the phase to "playing"
		await fetch('/api/phase', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ phase: 'playing' })
		});
	}

	// Reactively check if we need to start a transition.
	$: if (state.phase === 'transitioning') {
		startTransition();
	}

	// NEW: If the shared phase is set to "choices" (for example by a skip command)
	// and the video is still playing, pause it.
	$: if (state.phase === 'choices' && videoElement && !videoElement.paused) {
		console.log('Skip command received; pausing the current video.');
		videoElement.pause();
	}
</script>

<div class="relative flex min-h-screen items-center justify-center bg-black">
	{#if videoData && videoVisible}
		<!-- Wrap the video in a div so we can apply a fade transition -->
		<div transition:fade={{ duration: 2001 }}>
			<!-- svelte-ignore a11y_media_has_caption -->
			<video
				bind:this={videoElement}
				autoplay
				on:ended={handleVideoEnd}
				class="mt-[15vh] h-[85vh] max-w-none overflow-clip"
			>
				<source src={videoData.videoUrl} type="video/mp4" />
				<track kind="subtitles" src={videoData.subtitlesUrl} srclang="en" label="English" default />
			</video>
		</div>
	{/if}
</div>

<style>
	/* Styles for the subtitles */
	video::cue {
		font-size: 2.75rem !important;
		text-align: left !important;
		display: block !important;
		width: 100%;
		/* line-height: 1.25 !important; */
	}
</style>
