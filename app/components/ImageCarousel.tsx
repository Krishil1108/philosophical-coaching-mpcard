"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import Image from "next/image";
import { urlFor } from "../lib/sanity";

// Swiper CSS
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

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
    caption: "Café Philosophy Sessions",
    alt: "Philosophy discussion group",
  },
  {
    _id: "p2",
    image: null,
    caption: "Philosophy Sports Events",
    alt: "Philosophy sports event",
  },
  {
    _id: "p3",
    image: null,
    caption: "One-on-One Coaching",
    alt: "Coaching session",
  },
  {
    _id: "p4",
    image: null,
    caption: "Public Lectures & Talks",
    alt: "Public lecture",
  },
  {
    _id: "p5",
    image: null,
    caption: "Douglas College Teaching",
    alt: "Faculty teaching",
  },
];

export default function ImageCarousel({ data }: { data?: GalleryImage[] }) {
  const slides = data?.length
    ? data.map((img) => ({
        _id: img._id,
        image: img.image,
        caption: img.caption || "",
        alt: img.alt || img.caption || "Gallery image",
      }))
    : placeholderSlides;

  return (
    <section 
      id="gallery" 
      className="relative overflow-hidden" 
      style={{ 
        background: "linear-gradient(180deg, var(--bg) 0%, var(--bg-muted) 50%, var(--bg) 100%)",
        padding: "8rem 0",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      {/* Decorative background element */}
      <div
        className="font-cinzel"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "clamp(12rem, 25vw, 28rem)",
          lineHeight: 1,
          color: "rgba(139, 107, 74, 0.03)",
          pointerEvents: "none",
          userSelect: "none",
          fontWeight: 900,
        }}
      >
        φ
      </div>

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16 px-6"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "1rem",
          }}
        >
          <div style={{ width: "2.5rem", height: "1px", background: "var(--accent)" }} />
          <span
            className="font-cinzel"
            style={{
              fontSize: "0.625rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "var(--accent)",
              fontWeight: 600,
            }}
          >
            Moments in Philosophy
          </span>
          <div style={{ width: "2.5rem", height: "1px", background: "var(--accent)" }} />
        </div>
        
        <h2
          className="font-serif"
          style={{
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            color: "var(--text-heading)",
            lineHeight: 1.2,
            marginBottom: "1rem",
          }}
        >
          The Practice in Images
        </h2>
        
        <p
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontSize: "0.9375rem",
            color: "var(--text-muted)",
            maxWidth: "42rem",
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          From café dialogues to one-on-one sessions — a visual journey through philosophical practice
        </p>
      </motion.div>

      {/* Carousel */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{ position: "relative", zIndex: 1 }}
      >
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          loop={true}
          autoplay={{ 
            delay: 4000, 
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          coverflowEffect={{
            rotate: 15,
            stretch: 0,
            depth: 250,
            modifier: 1,
            slideShadows: true,
          }}
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          pagination={{ 
            clickable: true,
            dynamicBullets: true,
          }}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 1.5 },
            1024: { slidesPerView: 2.2 },
            1280: { slidesPerView: 2.5 },
          }}
          className="pb-16"
          style={{ 
            paddingLeft: "2rem", 
            paddingRight: "2rem",
            paddingTop: "2rem",
          }}
        >
          {slides.map((slide, index) => (
            <SwiperSlide 
              key={slide._id}
              style={{ width: "600px", maxWidth: "90vw" }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
                style={{
                  position: "relative",
                  aspectRatio: "4/3",
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)",
                  border: "2px solid var(--border)",
                  background: "var(--bg-card)",
                }}
              >
                {slide.image ? (
                  <>
                    <Image
                      src={urlFor(slide.image).width(1200).height(900).url()}
                      alt={slide.alt}
                      fill
                      style={{ objectFit: "cover" }}
                      className="transition-all duration-700 group-hover:scale-110 group-hover:brightness-75"
                    />
                    
                    {/* Overlay gradient */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: "linear-gradient(to top, rgba(45, 40, 32, 0.9) 0%, transparent 60%)",
                      }}
                    />
                  </>
                ) : (
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, #f5f1eb 0%, #faf8f5 100%)",
                      border: "2px dashed var(--border)",
                    }}
                  >
                    <div
                      className="font-cinzel"
                      style={{
                        fontSize: "5rem",
                        color: "var(--accent)",
                        opacity: 0.2,
                        marginBottom: "1.5rem",
                      }}
                    >
                      φ
                    </div>
                    <p
                      className="font-serif italic"
                      style={{
                        fontSize: "1.125rem",
                        color: "var(--text-muted)",
                        textAlign: "center",
                        maxWidth: "20rem",
                        lineHeight: 1.6,
                      }}
                    >
                      {slide.caption}
                    </p>
                    <p
                      style={{
                        fontFamily: "Space Grotesk, sans-serif",
                        fontSize: "0.6875rem",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "var(--accent)",
                        marginTop: "1rem",
                        opacity: 0.7,
                      }}
                    >
                      Add via Sanity Studio
                    </p>
                  </div>
                )}

                {/* Caption overlay for real images */}
                {slide.image && slide.caption && (
                  <div
                    className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                    style={{
                      background: "linear-gradient(to top, rgba(45, 40, 32, 0.95) 0%, transparent 100%)",
                    }}
                  >
                    <p
                      className="font-serif italic"
                      style={{
                        fontSize: "1.125rem",
                        color: "#faf8f5",
                        lineHeight: 1.5,
                        textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      {slide.caption}
                    </p>
                  </div>
                )}

                {/* Accent corner element */}
                <div
                  className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    width: "3px",
                    height: "3px",
                    borderRadius: "50%",
                    background: "var(--accent)",
                    boxShadow: "0 0 12px var(--accent)",
                  }}
                />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <div
          className="swiper-button-prev-custom"
          style={{
            position: "absolute",
            left: "2rem",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            width: "3rem",
            height: "3rem",
            borderRadius: "50%",
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.3s",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <svg width="20" height="20" fill="none" stroke="var(--accent)" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </div>
        
        <div
          className="swiper-button-next-custom"
          style={{
            position: "absolute",
            right: "2rem",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            width: "3rem",
            height: "3rem",
            borderRadius: "50%",
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.3s",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <svg width="20" height="20" fill="none" stroke="var(--accent)" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>
      </motion.div>
    </section>
  );
}
