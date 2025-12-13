import React, { useEffect, useState } from 'react';

interface AnimatedHeroTitleProps {
    text1: string;
    text2: string;
}

export const AnimatedHeroTitle: React.FC<AnimatedHeroTitleProps> = ({ text1, text2 }) => {
    const [displayText, setDisplayText] = useState('');
    const [isTypingComplete, setIsTypingComplete] = useState(false);

    useEffect(() => {
        let currentIndex = 0;
        const typingInterval = setInterval(() => {
            if (currentIndex <= text1.length) {
                setDisplayText(text1.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(typingInterval);
                setIsTypingComplete(true);
            }
        }, 100); // Typing speed

        return () => clearInterval(typingInterval);
    }, [text1]);

    return (
        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-8 leading-tight drop-shadow-lg min-h-[160px] md:min-h-[220px]">
            <span className="block mb-2">
                {displayText}
                {!isTypingComplete && <span className="animate-pulse">|</span>}
            </span>
            <span
                className={`block text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-300 bg-[length:200%_auto] animate-text-shine transition-opacity duration-1000 ${isTypingComplete ? 'opacity-100' : 'opacity-0'}`}
            >
                {text2}
            </span>
        </h1>
    );
};
