"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { urlFor } from "../lib/sanity";

import "swiper/css";
import "swiper/css/pagination";

type ShowcaseKind = "photo" | "book" | "moment";

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

interface Publication {
  _id: string;
  title: string;
  subtitle?: string;
  year?: number;
  coverImage?: Record<string, unknown>;
}

const baseMoments: ShowcaseItem[] = [
  {
    id: "m-1",
    kind: "moment",
    title: "Café Dialogues",
    subtitle: "Open public inquiry sessions in community spaces.",
  },
  {
    id: "m-2",
    kind: "moment",
    title: "Philosophy in Practice",
    subtitle: "One-on-one sessions focused on language and clarity.",
  },
];

const filters = [
  { key: "all", label: "All" },
  { key: "photo", label: "Photos" },
  { key: "book", label: "Book Covers" },
  { key: "moment", label: "Moments" },
] as const;

function cardLabel(kind: ShowcaseKind) {
  if (kind === "photo") return "Photo";
  if (kind === "book") return "Publication";
  return "Practice";
}

export default function AboutShowcaseCarousel({
  showcasePhotos,
  publications,
}: {
  showcasePhotos: ShowcasePhoto[];
  publications: Publication[];
}) {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]["key"]>("all");

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

    publications.forEach((book) => {
      list.push({
        id: book._id,
        kind: "book",
        title: book.title,
        subtitle: book.year ? `${book.year}${book.subtitle ? ` · ${book.subtitle}` : ""}` : book.subtitle,
        image: book.coverImage || null,
      });
    });

    return [...list, ...baseMoments];
  }, [publications, showcasePhotos]);

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
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }}
            loop={filteredItems.length > 2}
            spaceBetween={20}
            pagination={{ clickable: true }}
            breakpoints={{
              320: { slidesPerView: 1.1 },
              768: { slidesPerView: 2 },
              1200: { slidesPerView: 3 },
            }}
            style={{ paddingBottom: "3rem" }}
          >
            {filteredItems.map((item) => (
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
                      aspectRatio: item.kind === "book" ? "3 / 4" : "16 / 10",
                      background: "linear-gradient(135deg, rgba(139, 107, 74, 0.1), rgba(163, 176, 148, 0.09))",
                    }}
                  >
                    {item.image ? (
                      <Image
                        src={urlFor(item.image).width(900).height(900).url()}
                        alt={item.title}
                        fill
                        style={{ objectFit: item.kind === "book" ? "cover" : "cover" }}
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
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
}
