//@ts-nocheck
import { setVideoState } from '$lib/state.js';
import { videoPaths } from '$lib/videoPaths.js';

export async function POST({ request }) {
    const { nextVideo } = await request.json();
    // Allow the "intro" selection or any valid video from videoPaths.
    if (nextVideo !== 'intro' && !videoPaths[nextVideo]) {
        return new Response(JSON.stringify({ error: 'Invalid video selection' }), { status: 400 });
    }
    // Update the state and trigger a transition.
    setVideoState({ currentVideo: nextVideo, phase: 'transitioning' });
    return new Response(JSON.stringify({ success: true }), { status: 200 });
}
