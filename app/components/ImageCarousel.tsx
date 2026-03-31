"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import Image from "next/image";
import { urlFor } from "../lib/sanity";

// Swiper CSS — imported via swiper/css
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

interface GalleryImage {
  _id: string;
  image: object;
  caption?: string;
  alt?: string;
}

const placeholderSlides = [
  {
    _id: "p1",
    image: null,
    caption: "Café Philosophy Session — Victoria, BC",
    alt: "Philosophy discussion group",
    emoji: "☕",
  },
  {
    _id: "p2",
    image: null,
    caption: "Philosophy Sports — Team Dialogue",
    alt: "Philosophy sports event",
    emoji: "⚡",
  },
  {
    _id: "p3",
    image: null,
    caption: "One-on-One Philosophical Coaching",
    alt: "Coaching session",
    emoji: "🎯",
  },
  {
    _id: "p4",
    image: null,
    caption: "Douglas College — Faculty Office Hours",
    alt: "Faculty teaching",
    emoji: "📚",
  },
];

export default function ImageCarousel({ data }: { data?: GalleryImage[] }) {
  const slides = data?.length
    ? data.map((img) => ({
        _id: img._id,
        image: img.image,
        caption: img.caption || "",
        alt: img.alt || img.caption || "Gallery image",
        emoji: "φ",
      }))
    : placeholderSlides;

  return (
    <section id="gallery" className="py-20 relative overflow-hidden" style={{ background: "var(--bg-muted)" }}>
      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-12 px-6"
      >
        <span
          className="text-xs tracking-[0.3em] uppercase font-medium"
          style={{ color: "var(--accent)" }}
        >
          Visual Journey
        </span>
        <h2
          className="text-5xl md:text-6xl font-bold mt-3"
          style={{ fontFamily: "DM Serif Display, serif", color: "var(--text-heading)" }}
        >
          Gallery
        </h2>
        <div className="divider-gold" />
      </motion.div>

      {/* Swiper carousel */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          centeredSlides
          loop
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1.2 },
            768: { slidesPerView: 1.5 },
            1024: { slidesPerView: 2.2 },
            1280: { slidesPerView: 2.8 },
          }}
          className="pb-14"
          style={{ paddingLeft: "2rem", paddingRight: "2rem" }}
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide._id}>
              <div
                className="relative aspect-[16/10] rounded-2xl overflow-hidden group"
                style={{ border: "1px solid var(--border)", background: "var(--bg-card)" }}
              >
                {slide.image ? (
                  <Image
                    src={urlFor(slide.image).width(800).height(500).url()}
                    alt={slide.alt}
                    fill
                    style={{ objectFit: "cover" }}
                    className="transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center"
                    style={{ background: "var(--bg-card)" }}
                  >
                    <div className="text-6xl mb-4">{slide.emoji}</div>
                    <p className="text-sm text-center px-8" style={{ color: "var(--text-muted)" }}>
                      Add images via Sanity Studio
                    </p>
                  </div>
                )}

                {/* Caption overlay */}
                {slide.caption && (
                  <div
                    className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                    style={{ background: "linear-gradient(to top, rgba(45, 40, 32, 0.95), transparent)" }}
                  >
                    <p
                      className="text-sm font-medium"
                      style={{ color: "#faf8f5", fontFamily: "Space Grotesk, sans-serif" }}
                    >
                      {slide.caption}
                    </p>
                  </div>
                )}

                {/* Accent corner dot */}
                <div
                  className="absolute top-3 right-3 w-2 h-2 rounded-full"
                  style={{ background: "var(--accent)" }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </section>
  );
}
