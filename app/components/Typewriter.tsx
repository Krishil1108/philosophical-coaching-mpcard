"use client";

import { useState, useEffect } from "react";

interface TypewriterProps {
  text: string;
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function Typewriter({ 
  text, 
  speed = 30, 
  className = "",
  style = {}
}: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  // Typewriter effect
  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  // Blinking cursor
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <p className={className} style={style}>
      {displayedText}
      <span 
        style={{ 
          borderRight: showCursor ? '3px solid var(--accent)' : '3px solid transparent',
          paddingRight: '2px',
          marginLeft: '2px',
        }}
      />
    </p>
  );
}
