// src/lib/videoPaths.js
export const videoPaths = {
    intro: {
        videoUrl: '/videos/intro.mov',
        subtitlesUrl: 'subtitles/introSubFinal.vtt',
        nextOptions: [
            { id: 'video1', text: 'Ask about redacted documents' },
            { id: 'video1', text: 'Ask about research foundation' }
        ]
    },
    video1: {
        videoUrl: '/videos/4.mov',
        nextOptions: [
            { id: 'video2', text: 'Ask about lie detection' },
            { id: 'video2', text: 'Ask about research foundation' }
        ]
    },
    video2: {
        videoUrl: '/videos/2.mov',
        nextOptions: [
            { id: 'video3', text: 'Ask about ethical assessment' },
            { id: 'video3', text: 'Confront about accountability' }
        ]
    },
    video3: {
        videoUrl: '/videos/3.mov',
        nextOptions: [
            { id: 'video4', text: 'What are your goals?' },
            { id: 'video4', text: 'What are your challenges?' }
        ]
    },
    video4: {
        videoUrl: '/videos/4.mov',
        nextOptions: [
            { id: 'video1', text: 'Ask about redacted papers' },
            { id: 'video1', text: 'Ask about accountability' }
        ]
    },
    // … add the remaining videos up to video14
    video14: {
        videoUrl: '/videos/1.mov',
        nextOptions: [] // terminal video—no next options
    }
    // You can add more videos as needed.
};
