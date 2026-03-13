"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "About",        href: "/about" },
  { label: "Services",     href: "/services" },
  { label: "The Practice", href: "/practice" },
  { label: "Gallery",      href: "/gallery" },
  { label: "Publications", href: "/publications" },
  { label: "Videos",       href: "/videos" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.nav
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500`}
      style={{
        background: scrolled ? "rgba(13,15,20,0.94)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(201,168,76,0.1)" : "none",
        backdropFilter: scrolled ? "blur(20px)" : "none",
      }}
    >
      <div
        className="flex items-center justify-between py-5 px-8"
        style={{ maxWidth: "90rem", margin: "0 auto" }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <span
            className="font-cinzel font-semibold"
            style={{ color: "white", fontSize: "1.0625rem", letterSpacing: "0.2em" }}
          >
            MICHAEL PICARD
          </span>
          <span
            className="block"
            style={{
              color: "var(--gold)",
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "0.5625rem",
              letterSpacing: "0.45em",
              textTransform: "uppercase",
              marginTop: "2px",
            }}
          >
            Philosophical Practice
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden lg:flex items-center gap-10 list-none">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                style={{
                  color: "var(--text-muted)",
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "0.6875rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Book Session */}
        <a
          href="https://chat.appa.edu/product/chat-with-michael-picard-msc-phd/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-nav hidden lg:inline-flex"
        >
          Book Session
        </a>

        {/* Mobile Burger */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block w-5 h-px transition-all duration-300"
              style={{
                background: "var(--gold)",
                transform:
                  i === 0 && menuOpen ? "rotate(45deg) translate(4px, 4px)"
                  : i === 2 && menuOpen ? "rotate(-45deg) translate(4px, -4px)"
                  : "none",
                opacity: i === 1 && menuOpen ? 0 : 1,
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden"
            style={{
              background: "#141720",
              borderTop: "1px solid rgba(201,168,76,0.1)",
            }}
          >
            <div className="px-8 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    color: "var(--text)",
                    fontFamily: "Space Grotesk, sans-serif",
                    fontSize: "0.8125rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                    textDecoration: "none",
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://chat.appa.edu/product/chat-with-michael-picard-msc-phd/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-2"
              >
                Book a Session
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
