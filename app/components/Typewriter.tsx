"use client";

import { useState, useEffect, useRef } from "react";

interface TypewriterProps {
  text: string;
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
  triggerOnScroll?: boolean;
}

export default function Typewriter({ 
  text, 
  speed = 30, 
  className = "",
  style = {},
  triggerOnScroll = false
}: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [hasStarted, setHasStarted] = useState(!triggerOnScroll);
  const elementRef = useRef<HTMLParagraphElement>(null);

  // IntersectionObserver for scroll-triggered typing
  useEffect(() => {
    if (!triggerOnScroll || hasStarted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted) {
            setHasStarted(true);
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of element is visible
        rootMargin: "0px"
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [triggerOnScroll, hasStarted]);

  // Typewriter effect
  useEffect(() => {
    if (hasStarted && currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed, hasStarted]);

  // Blinking cursor
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <p ref={elementRef} className={className} style={style}>
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
