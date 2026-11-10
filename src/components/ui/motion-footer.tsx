"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Download, HardDriveDownload, Globe, Smartphone, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');

.cinematic-footer-wrapper {
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  --pill-bg-1: rgba(255, 255, 255, 0.04);
  --pill-bg-2: rgba(255, 255, 255, 0.015);
  --pill-shadow: rgba(0, 0, 0, 0.55);
  --pill-highlight: rgba(255, 255, 255, 0.12);
  --pill-inset-shadow: rgba(0, 0, 0, 0.8);
  --pill-border: rgba(255, 255, 255, 0.1);
  --pill-bg-1-hover: rgba(255, 255, 255, 0.1);
  --pill-bg-2-hover: rgba(255, 255, 255, 0.03);
  --pill-border-hover: rgba(255, 255, 255, 0.28);
  --pill-shadow-hover: rgba(0, 0, 0, 0.75);
  --pill-highlight-hover: rgba(255, 255, 255, 0.25);
}

@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
  100% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
}

@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes footer-heartbeat {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 5px rgba(239, 68, 68, 0.5)); }
  15%, 45% { transform: scale(1.2); filter: drop-shadow(0 0 10px rgba(239, 68, 68, 0.85)); }
  30% { transform: scale(1); }
}

.animate-footer-breathe {
  animation: footer-breathe 8s ease-in-out infinite alternate;
}

.animate-footer-scroll-marquee {
  animation: footer-scroll-marquee 36s linear infinite;
}

.animate-footer-heartbeat {
  animation: footer-heartbeat 2s cubic-bezier(0.25, 1, 0.5, 1) infinite;
}

.footer-bg-grid {
  background-size: 60px 60px;
  background-image: 
    linear-gradient(to right, rgba(255, 255, 255, 0.035) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
}

.footer-aurora {
  background: radial-gradient(
    circle at 50% 50%, 
    rgba(99, 102, 241, 0.18) 0%, 
    rgba(139, 92, 246, 0.12) 40%, 
    transparent 70%
  );
}

.footer-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow: 
    0 10px 30px -10px var(--pill-shadow), 
    inset 0 1px 1px var(--pill-highlight), 
    inset 0 -1px 2px var(--pill-inset-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.footer-glass-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow: 
    0 20px 40px -10px var(--pill-shadow-hover), 
    inset 0 1px 1px var(--pill-highlight-hover);
  color: #ffffff;
}

.footer-giant-bg-text {
  font-size: 24vw;
  line-height: 0.75;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.05);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.09) 0%, transparent 65%);
  -webkit-background-clip: text;
  background-clip: text;
}

.footer-text-glow {
  background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0.45) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 20px rgba(255, 255, 255, 0.14));
}
`;

export type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: React.ElementType;
  };

const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (typeof window === "undefined") return;
      const element = localRef.current;
      if (!element) return;

      const ctx = gsap.context(() => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = element.getBoundingClientRect();
          const h = rect.width / 2;
          const w = rect.height / 2;
          const x = e.clientX - rect.left - h;
          const y = e.clientY - rect.top - w;

          gsap.to(element, {
            x: x * 0.4,
            y: y * 0.4,
            rotationX: -y * 0.15,
            rotationY: x * 0.15,
            scale: 1.05,
            ease: "power2.out",
            duration: 0.4,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(element, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            ease: "elastic.out(1, 0.3)",
            duration: 1.2,
          });
        };

        element.addEventListener("mousemove", handleMouseMove as EventListener);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          element.removeEventListener("mousemove", handleMouseMove as EventListener);
          element.removeEventListener("mouseleave", handleMouseLeave);
        };
      }, element);

      return () => ctx.revert();
    }, []);

    return (
      <Component
        ref={(node: HTMLElement | null) => {
          localRef.current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef)
            (forwardedRef as React.MutableRefObject<HTMLElement | null>).current = node;
        }}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

export interface AppDownloadLink {
  label: string;
  href: string;
  icon?: "exe" | "setup" | "apk" | "web" | "store";
}

export interface CinematicFooterProps {
  giantText?: string;
  heading?: string;
  marqueeItems?: string[];
  primaryLinks?: AppDownloadLink[];
  secondaryLinks?: AppDownloadLink[];
  onBack?: () => void;
  backLabel?: string;
  copyrightText?: string;
  dir?: "rtl" | "ltr";
}

export function CinematicFooter({
  giantText = "PDA4",
  heading = "Ready to begin?",
  marqueeItems = [
    "A4 Smart Document Editor",
    "AI Writing & Summarizing",
    "Recover Locked PDFs",
    "Cloud & Local Sync",
    "Built for Desktop Productivity",
  ],
  primaryLinks = [
    {
      label: "تحميل مباشر من متجر مايكروسوفت (Microsoft Store)",
      href: "https://apps.microsoft.com/detail/9N3W9DCPLXZV?hl=en&gl=IQ&ocid=pdpshare",
      icon: "store",
    },
  ],
  secondaryLinks = [],
  onBack,
  backLabel = "العودة إلى عجلة التطبيقات",
  copyrightText = "© Jaafar Al-Abadi. All rights reserved.",
  dir = "rtl",
}: CinematicFooterProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!wrapperRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        giantTextRef.current,
        { y: "10vh", scale: 0.8, opacity: 0 },
        {
          y: "0vh",
          scale: 1,
          opacity: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 80%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        [headingRef.current, linksRef.current],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 40%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderIcon = (type?: "exe" | "setup" | "apk" | "web" | "store") => {
    if (type === "exe")
      return (
        <Download className="w-5 h-5 text-emerald-400 group-hover:text-white transition-colors" />
      );
    if (type === "setup")
      return (
        <HardDriveDownload className="w-5 h-5 text-teal-400 group-hover:text-white transition-colors" />
      );
    if (type === "apk")
      return (
        <Smartphone className="w-5 h-5 text-green-400 group-hover:text-white transition-colors" />
      );
    if (type === "store")
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          className="w-5 h-5 text-sky-400 group-hover:text-white transition-colors"
        >
          <path d="M3 3h8.5v8.5H3V3zm9.5 0H21v8.5h-8.5V3zM3 12.5h8.5V21H3v-8.5zm9.5 0H21V21h-8.5v-8.5z" />
        </svg>
      );
    return (
      <Globe className="w-4 h-4 text-cyan-400 group-hover:text-white transition-colors" />
    );
  };

  const MarqueeBlock = () => (
    <div className="flex items-center space-x-12 px-6">
      {marqueeItems.map((item, i) => (
        <React.Fragment key={i}>
          <span>{item}</span>
          <span className="text-indigo-400/70">✦</span>
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <div
        ref={wrapperRef}
        className="relative h-screen w-full"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        <footer className="fixed bottom-0 left-0 flex h-screen w-full flex-col justify-between overflow-hidden bg-[#09090b] text-white cinematic-footer-wrapper">
          <div className="footer-aurora absolute left-1/2 top-1/2 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[80px] pointer-events-none z-0" />
          <div className="footer-bg-grid absolute inset-0 z-0 pointer-events-none" />

          {/* Giant background text */}
          <div
            ref={giantTextRef}
            className="footer-giant-bg-text absolute -bottom-[5vh] left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none"
          >
            {giantText}
          </div>

          {/* 1. Diagonal Sleek Marquee */}
          <div className="absolute top-8 md:top-12 left-0 w-full overflow-hidden border-y border-white/10 bg-black/60 backdrop-blur-md py-3 md:py-4 z-10 -rotate-2 scale-110 shadow-2xl">
            <div className="flex w-max animate-footer-scroll-marquee text-[11px] md:text-sm font-bold tracking-[0.2em] md:tracking-[0.25em] text-zinc-400 uppercase">
              <MarqueeBlock />
              <MarqueeBlock />
            </div>
          </div>

          {/* 2. Main Center Content */}
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 sm:px-6 mt-14 md:mt-20 w-full max-w-5xl mx-auto">
            <h2
              ref={headingRef}
              className="text-3xl sm:text-5xl md:text-8xl font-black footer-text-glow tracking-tighter mb-7 sm:mb-9 md:mb-12 text-center leading-tight"
            >
              {heading}
            </h2>

            {/* Interactive Magnetic Pills Layout */}
            <div ref={linksRef} className="flex flex-col items-center gap-4 md:gap-6 w-full">
              {/* Primary Download Links (EXE & Setup) */}
              <div className="flex flex-wrap justify-center gap-3 md:gap-4 w-full" dir={dir}>
                {primaryLinks.map((link, idx) => (
                  <MagneticButton
                    as="a"
                    className="footer-glass-pill max-w-full px-5 py-3.5 sm:px-7 sm:py-4 md:px-9 md:py-5 rounded-full text-white font-bold text-xs sm:text-sm md:text-base flex items-center justify-center gap-2.5 md:gap-3 text-center group"
                    href={link.href}
                    key={idx}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {renderIcon(link.icon)}
                    <span>{link.label}</span>
                  </MagneticButton>
                ))}
              </div>

              {/* Secondary Links (Official Website & Back to Portfolio) */}
              <div
                className="flex flex-wrap justify-center gap-2.5 sm:gap-3 md:gap-5 w-full mt-1 md:mt-2"
                dir={dir}
              >
                {secondaryLinks.map((link, idx) => (
                  <MagneticButton
                    as="a"
                    className="footer-glass-pill max-w-full px-5 py-3 md:px-7 md:py-3.5 rounded-full text-zinc-300 font-semibold text-xs md:text-sm hover:text-white flex items-center justify-center gap-2 md:gap-2.5 text-center group"
                    href={link.href}
                    key={idx}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {renderIcon(link.icon)}
                    <span>{link.label}</span>
                  </MagneticButton>
                ))}

                {onBack && (
                  <MagneticButton
                    as="button"
                    className="footer-glass-pill max-w-full px-5 py-3 md:px-7 md:py-3.5 rounded-full text-zinc-400 font-medium text-xs md:text-sm hover:text-white flex items-center justify-center gap-2 text-center"
                    onClick={onBack}
                  >
                    <ArrowLeft className="w-4 h-4 shrink-0" />
                    <span>{backLabel}</span>
                  </MagneticButton>
                )}
              </div>
            </div>
          </div>

          {/* 3. Bottom Bar / Credits */}
          <div className="relative z-20 w-full pb-16 md:pb-8 px-4 sm:px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-3.5 md:gap-6">
            <div className="text-zinc-500 text-[10px] md:text-xs font-semibold tracking-widest uppercase order-2 md:order-1 text-center">
              {copyrightText}
            </div>

            <div className="footer-glass-pill px-5 py-2.5 md:px-6 md:py-3 rounded-full flex items-center gap-2 order-1 md:order-2 cursor-default border-white/10">
              <span className="text-zinc-400 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                Crafted with
              </span>
              <span className="animate-footer-heartbeat text-sm md:text-base text-red-500">
                ❤
              </span>
              <span className="text-zinc-400 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                by
              </span>
              <span className="text-white font-black text-xs md:text-sm tracking-normal ml-1">
                Jaafar Al-Abadi
              </span>
            </div>

            <MagneticButton
              as="button"
              className="w-10 h-10 md:w-12 md:h-12 rounded-full footer-glass-pill flex items-center justify-center text-zinc-400 hover:text-white group order-3"
              onClick={scrollToTop}
            >
              <svg
                className="w-5 h-5 transform group-hover:-translate-y-1.5 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                ></path>
              </svg>
            </MagneticButton>
          </div>
        </footer>
      </div>
    </>
  );
}
export default CinematicFooter;
