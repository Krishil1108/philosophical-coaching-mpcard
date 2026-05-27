"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { urlFor } from "../lib/sanity";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type ShowcaseKind = "photo" | "moment";

interface ShowcaseItem {
  id: string;
  title: string;
  subtitle?: string;
  kind: ShowcaseKind;
  image?: Record<string, unknown> | null;
}

interface ShowcasePhoto {
  _key?: string;
  title?: string;
  subtitle?: string;
  image?: Record<string, unknown>;
}

const filters = [
  { key: "all", label: "All" },
  { key: "photo", label: "Photos" },
] as const;

function cardLabel(kind: ShowcaseKind) {
  if (kind === "photo") return "Photo";
  return "Practice";
}

export default function AboutShowcaseCarousel({
  showcasePhotos,
}: {
  showcasePhotos: ShowcasePhoto[];
}) {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]["key"]>("all");
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  const items = useMemo(() => {
    const list: ShowcaseItem[] = [];

    showcasePhotos?.forEach((photo, index) => {
      if (!photo?.image) return;

      list.push({
        id: photo._key || `photo-${index}`,
        kind: "photo",
        title: photo.title || `Photo ${index + 1}`,
        subtitle: photo.subtitle,
        image: photo.image,
      });
    });

    return list;
  }, [showcasePhotos]);

  const filteredItems = useMemo(() => {
    if (activeFilter === "all") return items;
    return items.filter((item) => item.kind === activeFilter);
  }, [activeFilter, items]);

  return (
    <section className="section-pad" style={{ background: "var(--bg-card)", borderTop: "1px solid var(--border)" }}>
      <div className="inner-max" style={{ maxWidth: "88rem" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "2rem" }}
        >
          <div className="flex flex-wrap items-end justify-between gap-4 mb-4">
            <div>
              <span className="section-label" style={{ marginBottom: "0.75rem", display: "block" }}>
                Visual Showcase
              </span>
              <h2 className="font-serif" style={{ fontSize: "clamp(1.9rem, 3.5vw, 3rem)", color: "var(--text-heading)" }}>
                Images, Covers, and Moments
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => {
                const isActive = activeFilter === filter.key;
                return (
                  <button
                    type="button"
                    key={filter.key}
                    onClick={() => setActiveFilter(filter.key)}
                    style={{
                      border: isActive ? "1px solid var(--accent)" : "1px solid var(--border)",
                      background: isActive ? "rgba(139, 107, 74, 0.13)" : "var(--bg)",
                      color: isActive ? "var(--accent-dark)" : "var(--text-muted)",
                      borderRadius: "999px",
                      padding: "0.45rem 0.78rem",
                      fontFamily: "Space Grotesk, sans-serif",
                      fontSize: "0.68rem",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                    }}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="divider-gold-left" style={{ marginTop: 0 }} />
        </motion.div>

        {filteredItems.length === 0 ? (
          <p style={{ color: "var(--text-muted)", fontFamily: "Space Grotesk, sans-serif" }}>
            No showcase items for this filter yet.
          </p>
        ) : (
          <>
            <Swiper
              modules={[Autoplay, Navigation, Pagination]}
              onSwiper={setSwiperInstance}
              autoplay={{ delay: 3200, disableOnInteraction: false, pauseOnMouseEnter: false }}
              loop={filteredItems.length > 1}
              speed={700}
              spaceBetween={20}
              pagination={{ clickable: true }}
              breakpoints={{
                320: { slidesPerView: 1.1 },
                768: { slidesPerView: 2 },
                1200: { slidesPerView: 3 },
              }}
              style={{ paddingBottom: "3rem" }}
            >
              {filteredItems.map((item) => {
                return (
                <SwiperSlide key={item.id}>
                  <motion.article
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      borderRadius: "14px",
                      overflow: "hidden",
                      border: "1px solid var(--border)",
                      background: "var(--bg)",
                      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.06)",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        aspectRatio: "16 / 10",
                        background: "linear-gradient(135deg, rgba(139, 107, 74, 0.1), rgba(163, 176, 148, 0.09))",
                      }}
                    >
                      {item.image ? (
                        <Image
                          src={urlFor(item.image).width(1200).height(750).url()}
                          alt={item.title}
                          fill
                          style={{ objectFit: "cover", objectPosition: "center" }}
                        />
                      ) : (
                        <div
                          className="font-cinzel"
                          style={{
                            position: "absolute",
                            inset: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "4rem",
                            color: "rgba(139, 107, 74, 0.2)",
                          }}
                        >
                          φ
                        </div>
                      )}
                    </div>

                    <div style={{ padding: "1rem 1rem 1.15rem" }}>
                      <div
                        style={{
                          fontFamily: "Space Grotesk, sans-serif",
                          fontSize: "0.6rem",
                          textTransform: "uppercase",
                          letterSpacing: "0.18em",
                          color: "var(--accent)",
                          marginBottom: "0.5rem",
                        }}
                      >
                        {cardLabel(item.kind)}
                      </div>
                      <h3 className="font-serif" style={{ fontSize: "1.2rem", color: "var(--text-heading)", marginBottom: "0.4rem" }}>
                        {item.title}
                      </h3>
                      {item.subtitle && (
                        <p
                          style={{
                            fontFamily: "Space Grotesk, sans-serif",
                            fontSize: "0.85rem",
                            color: "var(--text-muted)",
                            lineHeight: 1.6,
                          }}
                        >
                          {item.subtitle}
                        </p>
                      )}
                    </div>
                  </motion.article>
                </SwiperSlide>
                );
              })}
            </Swiper>

            {filteredItems.length > 1 && (
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.6rem", marginTop: "0.6rem" }}>
                <button
                  type="button"
                  onClick={() => swiperInstance?.slidePrev()}
                  aria-label="Previous slide"
                  style={{
                    width: "2.4rem",
                    height: "2.4rem",
                    borderRadius: "999px",
                    border: "1px solid var(--border)",
                    background: "var(--bg)",
                    color: "var(--text-heading)",
                    display: "grid",
                    placeItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                    <path d="M15 6l-6 6 6 6" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => swiperInstance?.slideNext()}
                  aria-label="Next slide"
                  style={{
                    width: "2.4rem",
                    height: "2.4rem",
                    borderRadius: "999px",
                    border: "1px solid var(--border)",
                    background: "var(--bg)",
                    color: "var(--text-heading)",
                    display: "grid",
                    placeItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
