"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image, { ImageProps } from "next/image";

interface ParallaxImageProps extends Omit<ImageProps, "alt"> {
  alt: string;
  speed?: number;
}

export default function ParallaxImage({ alt, speed = 0.15, style, ...props }: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"], // Maps 0 to 1 when container enters bottom and leaves top
  });

  // Calculate parallax offset based on speed
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);

  return (
    <div ref={containerRef} style={{ ...style, overflow: "hidden", position: "relative" }} className="w-full h-full">
      <motion.div
        style={{
          position: "absolute",
          top: `-${speed * 50}%`,
          bottom: `-${speed * 50}%`,
          left: 0,
          right: 0,
          y,
        }}
      >
        <Image alt={alt} {...props} style={{ objectFit: "cover" }} />
      </motion.div>
    </div>
  );
}