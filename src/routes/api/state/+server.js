// src/routes/api/state/+server.js
import { getVideoState } from '$lib/state.js';

export function GET() {
    return new Response(JSON.stringify(getVideoState()), {
        headers: { 'Content-Type': 'application/json' }
    });
}
