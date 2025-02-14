// src/routes/api/reset/+server.js
import { resetState } from '$lib/state.js';

export function POST() {
    resetState();
    return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json' }
    });
}
