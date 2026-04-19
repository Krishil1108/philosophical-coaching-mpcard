"use client";

import { useState, useEffect, useRef } from "react";

interface TypewriterProps {
  text?: string;
  texts?: string[];
  speed?: number;
  deleteSpeed?: number;
  pauseMs?: number;
  loop?: boolean;
  className?: string;
  style?: React.CSSProperties;
  triggerOnScroll?: boolean;
}

export default function Typewriter({ 
  text = "",
  texts,
  speed = 30, 
  deleteSpeed = 18,
  pauseMs = 1800,
  loop = false,
  className = "",
  style = {},
  triggerOnScroll = false
}: TypewriterProps) {
  const activeTexts = texts && texts.length > 0 ? texts : [text];
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
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

  // Typewriter effect (supports single text and rotating text list)
  useEffect(() => {
    if (!hasStarted || activeTexts.length === 0) return;

    const currentText = activeTexts[textIndex] || "";
    let timeout: ReturnType<typeof setTimeout> | undefined;

    if (!isDeleting && displayedText.length < currentText.length) {
      timeout = setTimeout(() => {
        setDisplayedText(currentText.slice(0, displayedText.length + 1));
      }, speed);
    } else if (!isDeleting && displayedText.length === currentText.length) {
      if (loop && activeTexts.length > 1) {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pauseMs);
      }
    } else if (isDeleting && displayedText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayedText(currentText.slice(0, displayedText.length - 1));
      }, deleteSpeed);
    } else if (isDeleting && displayedText.length === 0) {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % activeTexts.length);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [
    hasStarted,
    activeTexts,
    textIndex,
    displayedText,
    isDeleting,
    speed,
    deleteSpeed,
    pauseMs,
    loop,
  ]);

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
