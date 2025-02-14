//@ts-nocheck
const INACTIVITY_THRESHOLD = 5 * 60 * 1000; // 5 minutes (in ms)
const INITIAL_STATE = {
    currentVideo: null, // e.g. 'intro', 'video1', …, 'video14'
    phase: 'waiting',   // "waiting", "playing", "choices", or "transitioning"
    lastUpdated: Date.now()
};

let videoState = { ...INITIAL_STATE };

export function getVideoState() {
    // If no activity has occurred for longer than the threshold, reset the state.
    if (Date.now() - videoState.lastUpdated > INACTIVITY_THRESHOLD) {
        resetState();
    }
    return videoState;
}

export function setVideoState(newState) {
    videoState = { ...videoState, ...newState, lastUpdated: Date.now() };
}

export function resetState() {
    videoState = { ...INITIAL_STATE, lastUpdated: Date.now() };
}
