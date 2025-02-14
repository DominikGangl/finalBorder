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
            { id: 'video3', text: 'Ask about research foundation' }
        ]
    },
    video2: {
        videoUrl: '/videos/2.mov',
        nextOptions: [
            { id: 'video4', text: 'Ask about ethical assessment' },
            { id: 'video5', text: 'Confront about accountability' }
        ]
    },
    video3: {
        videoUrl: '/videos/3.mov',
        nextOptions: [
            { id: 'video4', text: 'What are your goals?' },
            { id: 'video5', text: 'What are your challenges?' }
        ]
    },
    video4: {
        videoUrl: '/videos/4.mov',
        nextOptions: [
            { id: 'video6', text: 'Ask about redacted papers' },
            { id: 'video8', text: 'Ask about accountability' }
        ]
    },
    video5: {
        videoUrl: '/videos/5.mov',
        nextOptions: [
            { id: 'video6', text: 'Ask about redacted papers' },
            { id: 'video7', text: 'Ask about accountability' }
        ]
    },
    video6: {
        videoUrl: '/videos/6.mov',
        nextOptions: [
            { id: 'video9', text: 'Ask about redacted papers' },
            { id: 'video10', text: 'Ask about accountability' }
        ]
    },
    video7: {
        videoUrl: '/videos/7.mov',
        nextOptions: [
            { id: 'video9', text: 'Ask about redacted papers' },
            { id: 'video10', text: 'Ask about accountability' }
        ]
    },
    video8: {
        videoUrl: '/videos/8.mov',
        nextOptions: [
            { id: 'video10', text: 'Ask about redacted papers' },
            { id: 'video11', text: 'Ask about accountability' }
        ]
    },
    video9: {
        videoUrl: '/videos/9.mov',
        nextOptions: [
            { id: 'outro', text: 'Ask about redacted papers' },
            { id: 'outro', text: 'Ask about accountability' }
        ]
    },
    video10: {
        videoUrl: '/videos/10.mov',
        nextOptions: [
            { id: 'outro', text: 'Ask about redacted papers' },
            { id: 'outro', text: 'Ask about accountability' }
        ]
    },
    video11: {
        videoUrl: '/videos/11.mov',
        nextOptions: [
            { id: 'outro', text: 'Ask about redacted papers' },
            { id: 'outro', text: 'Ask about accountability' }
        ]
    },
    // … add the remaining videos up to video14
    outro: {
        videoUrl: '/videos/1.mov',
        nextOptions: [] // terminal video—no next options
    }
    // You can add more videos as needed.
};
