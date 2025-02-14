// src/routes/api/phase/+server.js
import { setVideoState } from '$lib/state.js';

export async function POST({ request }) {
    const { phase } = await request.json();
    const allowedPhases = ['waiting', 'playing', 'choices', 'transitioning'];
    if (!allowedPhases.includes(phase)) {
        return new Response(JSON.stringify({ error: 'Invalid phase' }), { status: 400 });
    }
    setVideoState({ phase });
    return new Response(JSON.stringify({ success: true }), { status: 200 });
}
