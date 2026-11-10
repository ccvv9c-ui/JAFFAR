"use client";

import React from "react";
import MorphGallery from "@/components/ui/morph-gallery";
import { CinematicFooter, AppDownloadLink } from "@/components/ui/motion-footer";
import { ArrowRight, ChevronDown } from "lucide-react";
import type { WorkItem } from "@/components/ui/works-wheel";
import { useLanguage } from "@/lib/i18n";

export interface AppShowcaseData {
  id: string;
  title: string;
  giantText: string;
  heading: string;
  images: string[];
  marqueeItems: string[];
  primaryLinks: AppDownloadLink[];
  secondaryLinks: AppDownloadLink[];
}

export const APPS_SHOWCASE_DATA: Record<string, AppShowcaseData> = {
  pda4: {
    id: "pda4",
    title: "PDA4 | محرر المستندات الذكي",
    giantText: "PDA4",
    heading: "Ready to begin?",
    images: [
      "/apps/pda4/slide-1.png",
      "/apps/pda4/slide-2.png",
      "/apps/pda4/slide-3.png",
      "/apps/pda4/slide-4.png",
    ],
    marqueeItems: [
      "A4 Smart Document Editor",
      "AI Writing & Summarizing",
      "Recover Locked PDFs",
      "Cloud & Local Sync",
      "Built for Desktop Productivity",
    ],
    primaryLinks: [
      {
        label: "تحميل مباشر من متجر مايكروسوفت (Microsoft Store)",
        href: "https://apps.microsoft.com/detail/9N3W9DCPLXZV?hl=en&gl=IQ&ocid=pdpshare",
        icon: "store",
      },
    ],
    secondaryLinks: [],
  },
  "tools-hub": {
    id: "tools-hub",
    title: "بيئة الأدوات | Tools Hub",
    giantText: "TOOLS HUB",
    heading: "Ready to explore?",
    images: [
      "/apps/tools-hub/slide-1.png",
      "/apps/tools-hub/slide-2.png",
      "/apps/tools-hub/slide-3.png",
      "/apps/tools-hub/slide-4.png",
    ],
    marqueeItems: [
      "All-in-One Android Toolkit",
      "Images & Media Studio",
      "Documents, PDF & QR Studio",
      "OCR Smart Text Scanner",
      "100% Local & Private Processing",
    ],
    primaryLinks: [
      {
        label: "تحميل نسخة الأندرويد (Android APK)",
        href: "https://drive.google.com/file/d/1ga7iViwSao5VOpv9P6Y_W2jChbf6XKdm/view?usp=drive_link",
        icon: "apk",
      },
    ],
    secondaryLinks: [],
  },
  "media-compressor": {
    id: "media-compressor",
    title: "بيئة الضغط | ضاغط الوسائط الرسمية (Official Media Compressor)",
    giantText: "COMPRESSOR",
    heading: "Ready to compress?",
    images: [
      "/apps/media-compressor/slide-1.png",
      "/apps/media-compressor/slide-2.png",
      "/apps/media-compressor/slide-3.png",
      "/apps/media-compressor/slide-4.png",
    ],
    marqueeItems: [
      "Official Media Compressor",
      "Government-Ready Platform Presets",
      "Smart Noise & Clarity Enhancement",
      "PDF & JPG Precision KB/DPI Control",
      "Secure Access & Bilingual Workflow",
    ],
    primaryLinks: [
      {
        label: "فتح منصة بيئة الضغط الرسمية (Web App)",
        href: "https://ais-pre-eo2yty4bcbmriqosn7q7jh-372237764138.europe-west3.run.app/",
        icon: "web",
      },
    ],
    secondaryLinks: [],
  },
  "voice-env": {
    id: "voice-env",
    title: "بيئة الصوت | Voice Environment AI Audio Studio",
    giantText: "VOICE AI",
    heading: "Ready to create audio?",
    images: [
      "/apps/voice-env/slide-1.png",
      "/apps/voice-env/slide-2.png",
      "/apps/voice-env/slide-3.png",
      "/apps/voice-env/slide-4.png",
      "/apps/voice-env/slide-5.png",
    ],
    marqueeItems: [
      "Voice Environment AI Audio Studio",
      "Live Speech to Text (16kHz WAV)",
      "Neural Text to Speech (Gemini TTS)",
      "Smart Transcript Editor & Summary",
      "OCR Media Ingest & Multi-Format Export",
    ],
    primaryLinks: [
      {
        label: "نسخة الديسكتوب المباشرة (Portable EXE)",
        href: "https://drive.google.com/file/d/1ML64v4rY0Y2Uz1Q0R2bk5lzNUgs-rB4v/view?usp=drive_link",
        icon: "exe",
      },
    ],
    secondaryLinks: [
      {
        label: "زيارة الموقع الرسمي (بيئة الصوت)",
        href: "https://applet-cyan-pi.vercel.app/",
        icon: "web",
      },
    ],
  },
  "bayah-cv": {
    id: "bayah-cv",
    title: "بيئة - Bayah CV | بيئة السيرة الذاتية الذكية",
    giantText: "BAYAH CV",
    heading: "Ready to build your CV?",
    images: [
      "/apps/bayah-cv/slide-1.png",
      "/apps/bayah-cv/slide-2.png",
      "/apps/bayah-cv/slide-3.png",
      "/apps/bayah-cv/slide-4.png",
      "/apps/bayah-cv/slide-5.png",
    ],
    marqueeItems: [
      "Bayah CV Smart Resume Studio",
      "50+ Professional Themes",
      "ATS Scan & Expert Review",
      "Full Interactive CV Builder",
      "Instant Arabic & English PDF Export",
    ],
    primaryLinks: [
      {
        label: "نسخة الديسكتوب المباشرة (Portable EXE)",
        href: "https://drive.google.com/file/d/1ncDT2PGRTuclLlIINBTBszvuzGLMOB-9/view?usp=drive_link",
        icon: "exe",
      },
      {
        label: "نسخة الأندرويد (Android APK)",
        href: "https://drive.google.com/file/d/1U_DF2FZT1LqfVktJ9oudY_ztuzHseuHI/view?usp=drive_link",
        icon: "apk",
      },
    ],
    secondaryLinks: [
      {
        label: "زيارة الموقع الرسمي (bayah-cv.vercel.app)",
        href: "https://bayah-cv.vercel.app",
        icon: "web",
      },
    ],
  },
  "offline-translator": {
    id: "offline-translator",
    title: "مترجم أوفلاين الذكي | Fast Translation Assistant",
    giantText: "OFFLINE AI",
    heading: "Ready to translate?",
    images: [
      "/apps/offline-translator/slide-1.png",
      "/apps/offline-translator/slide-2.png",
      "/apps/offline-translator/slide-3.png",
      "/apps/offline-translator/slide-4.png",
    ],
    marqueeItems: [
      "100% Offline & Local",
      "Real-Time Voice Translation",
      "Whisper + Dual ASR",
      "WebGPU Acceleration",
      "Multi-Language Offline Packs",
    ],
    primaryLinks: [
      {
        label: "نسخة الديسكتوب المباشرة (Portable EXE)",
        href: "https://drive.google.com/file/d/1NxZOCCzuqQEU8QJAvbYpPa-BOJbokbpQ/view?usp=drive_link",
        icon: "exe",
      },
      {
        label: "نسخة الديسكتوب التثبيت (Setup Installer)",
        href: "https://drive.google.com/file/d/1OqzFXAF9wdDXOCu9oBOLkIRGekN2vYUI/view?usp=drive_link",
        icon: "setup",
      },
      {
        label: "نسخة الأندرويد (Android APK)",
        href: "https://drive.google.com/file/d/1fbEM1wychNMlql6-wsQEMzxDTGO4IT7P/view?usp=drive_link",
        icon: "apk",
      },
    ],
    secondaryLinks: [
      {
        label: "زيارة الموقع الرسمي للمترجم الذكي",
        href: "https://languge-speed-ccvv9c-uis-projects.vercel.app/",
        icon: "web",
      },
    ],
  },
  "download-organizer": {
    id: "download-organizer",
    title: "منظم التنزيلات | Download Organizer",
    giantText: "ORGANIZER",
    heading: "Ready to organize?",
    images: [
      "/apps/download-organizer/slide-1.png",
      "/apps/download-organizer/slide-2.png",
      "/apps/download-organizer/slide-3.png",
      "/apps/download-organizer/slide-4.png",
    ],
    marqueeItems: [
      "Smart Downloads Dashboard",
      "One-Click Auto Organization",
      "Duplicate & Large File Detection",
      "Flexible Custom Extension Rules",
      "Safe Review & Instant Rollback",
    ],
    primaryLinks: [
      {
        label: "نسخة الديسكتوب المباشرة (Portable EXE)",
        href: "https://drive.google.com/file/d/1CstDHI0pYpYflwAoytfu507657a4M-fI/view?usp=drive_link",
        icon: "exe",
      },
    ],
    secondaryLinks: [],
  },
};

export function resolveAppShowcaseId(item: WorkItem): string {
  const title = (item.title || "").toLowerCase();
  if (title.includes("pda4") || item.id === 2 || item.id === "pda4") return "pda4";
  if (
    title.includes("مترجم") ||
    title.includes("اوفلاين") ||
    title.includes("أوفلاين") ||
    item.id === 6 ||
    item.id === "offline-translator"
  ) {
    return "offline-translator";
  }
  if (
    title.includes("الادوات") ||
    title.includes("الأدوات") ||
    title.includes("tools") ||
    item.id === 1 ||
    item.id === "tools-hub"
  ) {
    return "tools-hub";
  }
  if (
    title.includes("الضغط") ||
    title.includes("compressor") ||
    item.id === 3 ||
    item.id === "media-compressor"
  ) {
    return "media-compressor";
  }
  if (
    title.includes("الصوت") ||
    title.includes("voice") ||
    item.id === 4 ||
    item.id === "voice-env"
  ) {
    return "voice-env";
  }
  if (
    title.includes("cv") ||
    title.includes("bayah") ||
    item.id === 5 ||
    item.id === "bayah-cv"
  ) {
    return "bayah-cv";
  }
  if (
    title.includes("منظم") ||
    title.includes("التنزيلات") ||
    title.includes("organizer") ||
    item.id === 7 ||
    item.id === "download-organizer"
  ) {
    return "download-organizer";
  }
  return "pda4";
}

export default function AppShowcaseView({
  app,
  onBack,
}: {
  app: AppShowcaseData;
  onBack: () => void;
}) {
  const { t } = useLanguage();
  const appTrans = t.apps[app.id];

  const localizedPrimaryLinks = app.primaryLinks.map((link, i) => ({
    ...link,
    label: appTrans?.primaryLabels[i] ?? link.label,
  }));

  const localizedSecondaryLinks = app.secondaryLinks.map((link, i) => ({
    ...link,
    label: appTrans?.secondaryLabels[i] ?? link.label,
  }));

  return (
    <div className="relative w-full min-h-screen bg-[#09090b] text-white selection:bg-white/20 overflow-x-hidden">
      {/* TOP SECTION: Fullscreen MorphGallery + Floating Back Bar */}
      <main className="relative z-10 w-full min-h-screen bg-[#09090b] border-b border-white/10 shadow-2xl rounded-b-3xl overflow-hidden">
        {/* Top Floating Navigation Bar */}
        <div
          dir={t.dir}
          className="absolute top-4 left-3.5 right-3.5 md:top-6 md:left-6 md:right-6 z-30 flex items-center justify-between gap-2 pointer-events-none"
        >
          <button
            type="button"
            onClick={onBack}
            className="pointer-events-auto shrink-0 inline-flex items-center gap-1.5 md:gap-2.5 rounded-full bg-black/55 md:bg-black/45 px-3.5 py-2 md:px-5 md:py-2.5 text-[11px] sm:text-xs md:text-sm font-semibold text-white backdrop-blur-md border border-white/15 transition hover:bg-black/70 hover:scale-105 cursor-pointer"
          >
            <ArrowRight className={`w-3.5 h-3.5 md:w-4 md:h-4 shrink-0 ${t.dir === "ltr" ? "rotate-180" : ""}`} />
            <span className="whitespace-nowrap">{t.backToPortfolio}</span>
          </button>

          <div className="pointer-events-auto min-w-0 max-w-[54vw] sm:max-w-[60vw] md:max-w-none truncate rounded-full bg-black/55 md:bg-black/45 px-3.5 py-1.5 md:px-5 md:py-2 text-[11px] sm:text-xs md:text-sm font-medium text-white/90 backdrop-blur-md border border-white/15">
            {appTrans?.fullTitle ?? app.title}
          </div>
        </div>

        {/* WebGL Liquid Morph Gallery for the App's Screenshots */}
        <MorphGallery height="100svh" images={app.images} />

        {/* Subtle Scroll Down Indicator */}
        <div className="pointer-events-none absolute bottom-20 md:bottom-24 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 px-4 text-center text-[10px] md:text-[11px] tracking-widest uppercase text-white/60 animate-bounce whitespace-nowrap">
          <span>{t.scrollDownHint}</span>
          <ChevronDown className="w-4 h-4" />
        </div>
      </main>

      {/* BOTTOM SECTION: GSAP Curtain-Reveal Cinematic Footer with Download Links */}
      <CinematicFooter
        giantText={app.giantText}
        heading={appTrans?.heading ?? app.heading}
        marqueeItems={app.marqueeItems}
        onBack={onBack}
        backLabel={t.backToWheel}
        copyrightText={t.footer.copyright}
        dir={t.dir}
        primaryLinks={localizedPrimaryLinks}
        secondaryLinks={localizedSecondaryLinks}
      />
    </div>
  );
}
