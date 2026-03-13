"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface Testimonial {
  _id: string;
  quote: string;
  author?: string;
  role?: string;
}

const defaultTestimonials: Testimonial[] = [
  {
    _id: "t1",
    quote:
      "Michael helped me see that many of my convictions weren't truly mine — they were inherited, unexamined. The session changed how I approach every decision.",
    author: "Session Participant",
    role: "Philosophy Coaching Client",
  },
  {
    _id: "t2",
    quote:
      "Café Philosophy was the first place I felt safe saying 'I don't know' out loud. Michael creates a space where uncertainty is the beginning of real thinking.",
    author: "Regular Attendee",
    role: "Café Philosophy, Victoria BC",
  },
  {
    _id: "t3",
    quote:
      "He doesn't give you answers. He gives you something more valuable: the tools to find your own. That's rare.",
    author: "Graduate Student",
    role: "Philosophy Coaching Client",
  },
  {
    _id: "t4",
    quote:
      "Philosophy Sports brought my entire class to life. Students who had never engaged suddenly couldn't stop arguing — in the best possible way.",
    author: "High School Educator",
    role: "Philosophy Sports Workshop",
  },
];

export default function Testimonials({ data }: { data?: Testimonial[] }) {
  const testimonials = data?.length ? data : defaultTestimonials;

  return (
    <section className="py-32 overflow-hidden" style={{ background: "#141720" }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span
            className="text-xs tracking-[0.3em] uppercase font-medium"
            style={{ color: "#c9a84c" }}
          >
            Voices from the Practice
          </span>
          <h2
            className="text-5xl md:text-6xl font-bold mt-3"
            style={{ fontFamily: "DM Serif Display, serif", color: "white" }}
          >
            Testimonials
          </h2>
          <div className="divider-gold" />
        </motion.div>

        {/* Testimonial carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            loop
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-14"
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t._id}>
                <div
                  className="h-full p-8 rounded-2xl flex flex-col"
                  style={{
                    background: "#1c2030",
                    border: "1px solid rgba(201,168,76,0.1)",
                    minHeight: "260px",
                  }}
                >
                  {/* Quote mark */}
                  <div
                    className="text-5xl leading-none mb-4 font-bold"
                    style={{
                      color: "rgba(201,168,76,0.3)",
                      fontFamily: "DM Serif Display, serif",
                    }}
                  >
                    &ldquo;
                  </div>

                  {/* Quote text */}
                  <blockquote
                    className="flex-1 text-base leading-relaxed mb-6 italic"
                    style={{
                      color: "#e8e6e1",
                      fontFamily: "Cormorant Garamond, Georgia, serif",
                      fontSize: "1.1rem",
                    }}
                  >
                    {t.quote}
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{ background: "rgba(201,168,76,0.15)", color: "#c9a84c" }}
                    >
                      {t.author?.charAt(0) || "P"}
                    </div>
                    <div>
                      <p
                        className="text-sm font-medium"
                        style={{ color: "white", fontFamily: "Space Grotesk, sans-serif" }}
                      >
                        {t.author || "Anonymous"}
                      </p>
                      {t.role && (
                        <p
                          className="text-xs"
                          style={{ color: "#9a97a0", fontFamily: "Space Grotesk, sans-serif" }}
                        >
                          {t.role}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
