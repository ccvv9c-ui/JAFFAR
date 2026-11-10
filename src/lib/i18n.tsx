"use client";

import React, { createContext, useContext, useState } from "react";
import { LanguageSwitcherPill, type Locale } from "@/components/ui/language-switcher-pill";

export type SupportedLang = "ar" | "en" | "fr" | "de" | "ja";

export const SUPPORTED_LOCALES: Locale[] = [
  { code: "ar", label: "عربي" },
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
  { code: "de", label: "DE" },
  { code: "ja", label: "日本" },
];

export interface AppTranslation {
  shortTitle: string;
  fullTitle: string;
  description: string;
  heading: string;
  primaryLabels: string[];
  secondaryLabels: string[];
}

export interface ModalSection {
  heading: string;
  body: string;
}

export interface ModalTranslation {
  title: string;
  subtitle: string;
  sections: ModalSection[];
}

export interface SiteTranslation {
  dir: "rtl" | "ltr";
  heroTitle: string;
  heroDesc: string;
  signAgain: string;
  wheelCenterTitle: string;
  viewBtn: string;
  backToPortfolio: string;
  backToWheel: string;
  scrollDownHint: string;
  apps: Record<string, AppTranslation>;
  footer: {
    brandName: string;
    brandDesc: string;
    copyright: string;
    colApps: string;
    colCloud: string;
    colInfo: string;
    colSocial: string;
    officialPda4: string;
    officialBayah: string;
    wheelLink: string;
    physicsLink: string;
    aboutLink: string;
    faqsLink: string;
    privacyLink: string;
    termsLink: string;
    returnToSite: string;
    socialFacebook: string;
    socialInstagram: string;
    socialYoutube: string;
    socialLinkedin: string;
    modals: Record<"about" | "privacy" | "terms" | "faqs", ModalTranslation>;
  };
}

export const SITE_TRANSLATIONS: Record<SupportedLang, SiteTranslation> = {
  ar: {
    dir: "rtl",
    heroTitle: "أهلاً بكم، أنا جعفر العبادي",
    heroDesc:
      "مطور ومبتكر تطبيقات برمجية وأدوات ذكية. أقدم لكم هنا مجموعة من تطبيقاتي ومشاريعي المصممة بأحدث التقنيات لتقديم تجربة استخدام استثنائية ومتكاملة.",
    signAgain: "إعادة التوقيع",
    wheelCenterTitle: "تطبيقاتي",
    viewBtn: "فتح التطبيق",
    backToPortfolio: "العودة إلى معرض التطبيقات",
    backToWheel: "العودة إلى عجلة التطبيقات",
    scrollDownHint: "انزل للأسفل للتحميل والروابط",
    apps: {
      "tools-hub": {
        shortTitle: "بيئة الأدوات",
        fullTitle: "بيئة الأدوات | Tools Hub",
        description: "بيئة متكاملة لأجهزة الأندرويد: صور، PDF، فيديو، QR، وضغط",
        heading: "هل أنت مستعد للتجربة؟",
        primaryLabels: ["تحميل نسخة الأندرويد (Android APK)"],
        secondaryLabels: [],
      },
      pda4: {
        shortTitle: "PDA4",
        fullTitle: "PDA4 | محرر المستندات الذكي",
        description: "أول محرر مستندات مدعوم بالذكاء الاصطناعي وقوالب A4 احترافية",
        heading: "هل أنت مستعد للبدء؟",
        primaryLabels: ["تحميل مباشر من متجر مايكروسوفت (Microsoft Store)"],
        secondaryLabels: [],
      },
      "media-compressor": {
        shortTitle: "بيئة الضغط",
        fullTitle: "بيئة الضغط | ضاغط الوسائط الرسمية",
        description: "ضاغط ذكي لضغط وتحويل الوثائق والصور إلى صيغ حكومية معتمدة",
        heading: "هل أنت مستعد لضغط ملفاتك؟",
        primaryLabels: ["فتح منصة بيئة الضغط الرسمية (Web App)"],
        secondaryLabels: [],
      },
      "voice-env": {
        shortTitle: "بيئة الصوت",
        fullTitle: "بيئة الصوت | Voice Environment AI Studio",
        description: "أنشئ الصوت، فرّغ التسجيلات، وحوّل النصوص باحترافية بالذكاء الاصطناعي",
        heading: "هل أنت مستعد للإنتاج الصوتي؟",
        primaryLabels: ["نسخة الديسكتوب المباشرة (Portable EXE)"],
        secondaryLabels: ["زيارة الموقع الرسمي (بيئة الصوت)"],
      },
      "bayah-cv": {
        shortTitle: "بيئة - Bayah CV",
        fullTitle: "بيئة - Bayah CV | بيئة السيرة الذاتية الذكية",
        description: "أنشئ سيرة ذاتية احترافية تتجاوز أنظمة ATS العالمية مع +50 قالب",
        heading: "هل أنت مستعد لبناء سيرتك الذاتية؟",
        primaryLabels: [
          "نسخة الديسكتوب المباشرة (Portable EXE)",
          "نسخة الأندرويد (Android APK)",
        ],
        secondaryLabels: ["زيارة الموقع الرسمي (bayah-cv.vercel.app)"],
      },
      "offline-translator": {
        shortTitle: "مترجم أوفلاين الذكي",
        fullTitle: "مترجم أوفلاين الذكي | Fast Translation Assistant",
        description: "أول أداة مدمجة لترجمة الصوت والنصوص محلياً بدون إنترنت",
        heading: "هل أنت مستعد للترجمة الفورية؟",
        primaryLabels: [
          "نسخة الديسكتوب المباشرة (Portable EXE)",
          "نسخة الديسكتوب التثبيت (Setup Installer)",
          "نسخة الأندرويد (Android APK)",
        ],
        secondaryLabels: ["زيارة الموقع الرسمي للمترجم الذكي"],
      },
      "download-organizer": {
        shortTitle: "منظم التنزيلات",
        fullTitle: "منظم التنزيلات | Download Organizer",
        description: "تنظيم تلقائي ذكي للملفات والتنزيلات بضغطة واحدة مع كشف المكررات وتراجع آمن",
        heading: "هل أنت مستعد لتنظيم ملفاتك؟",
        primaryLabels: ["تحميل نسخة الديسكتوب المباشرة (Portable EXE)"],
        secondaryLabels: [],
      },
    },
    footer: {
      brandName: "المنصة الرقمية للتطبيقات",
      brandDesc:
        "منصة رقمية متكاملة تجمع أحدث التطبيقات البرمجية، أدوات الذكاء الاصطناعي، وحلول معالجة الوثائق والصوت والترجمة الفورية بتصميم عصري وأداء فائق.",
      copyright: "© جميع الحقوق محفوظة للمنصة الرقمية.",
      colApps: "التطبيقات والمشاريع",
      colCloud: "المنصات السحابية",
      colInfo: "عن الموقع والمعلومات",
      colSocial: "حسابات التواصل",
      officialPda4: "موقع PDA4 الرسمي",
      officialBayah: "موقع Bayah CV الرسمي",
      wheelLink: "تصفح عجلة الأعمال ثلاثية الأبعاد",
      physicsLink: "مختبر الفيزياء البصرية التفاعلي",
      aboutLink: "استعراض دليل الموقع والسياسات",
      faqsLink: "الأسئلة الشائعة",
      privacyLink: "سياسة الخصوصية",
      termsLink: "شروط الاستخدام",
      returnToSite: "العودة للموقع",
      socialFacebook: "فيسبوك (Facebook)",
      socialInstagram: "إنستغرام (Instagram)",
      socialYoutube: "يوتيوب (YouTube)",
      socialLinkedin: "لينكدإن (LinkedIn)",
      modals: {
        about: {
          title: "عن الموقع والمنظومة",
          subtitle:
            "منصة رقمية متكاملة تجمع بين الابتكار البرمجي، تطبيقات الذكاء الاصطناعي، والأدوات الإنتاجية الحديثة.",
          sections: [
            {
              heading: "رؤية الموقع",
              body: "هذا الموقع هو البوابة الرقمية الموحدة لاستعراض وتحميل مجموعة من التطبيقات والمنصات الذكية للكمبيوتر والأندرويد والويب.",
            },
            {
              heading: "منظومة التطبيقات",
              body: "تضم المنصة 6 مشاريع متكاملة للكمبيوتر والأندرويد والويب: PDA4، مترجم أوفلاين الذكي، بيئة الأدوات، Bayah CV، بيئة الصوت، وبيئة الضغط.",
            },
            {
              heading: "هندسة برمجية وذكاء اصطناعي",
              body: "تطبيقات مبنية بأحدث التقنيات المعمارية وتوظف نماذج الذكاء الاصطناعي العصبية لتحرير المستندات، توليد الصوت الطبيعي، والترجمة الفورية مع دعم كامل للغة العربية.",
            },
          ],
        },
        privacy: {
          title: "سياسة الخصوصية والأمان",
          subtitle:
            "التزام تام بحماية بيانات المستخدمين والاعتماد على المعالجة المحلية الآمنة.",
          sections: [
            {
              heading: "1. التزامنا بخصوصية المستخدم",
              body: "تضع المنصة الرقمية لتطبيقات الذكاء الاصطناعي والأدوات الرقمية خصوصية المستخدم وأمان بياناته في مقدمة أولوياتها بأعلى معايير الأمان.",
            },
            {
              heading: "2. المعالجة المحلية الآمنة",
              body: "تعتمد تطبيقاتنا على المعالجة المحلية الآمنة داخل جهازك للحفاظ على خصوصية ملفاتك ووثائقك بالكامل دون رفعها لخوادم خارجية.",
            },
            {
              heading: "3. التخزين المحلي والروابط الرسمية",
              body: "تستخدم التطبيقات التخزين المحلي فقط لحفظ تفضيلاتك الشخصية مثل اللغة المختارة، وتوجه روابط التحميل مباشرة إلى المتاجر والمنصات الرسمية الموثوقة.",
            },
          ],
        },
        terms: {
          title: "شروط الاستخدام",
          subtitle:
            "القواعد المنظمة لاستخدام التطبيقات والمنصات البرمجية.",
          sections: [
            {
              heading: "1. قبول الشروط",
              body: "باستخدامك لهذه المنصة أو تحميل أي من التطبيقات والأدوات البرمجية المتوفرة فيها، فإنك توافق على الالتزام بشروط الاستخدام الموضحة في هذه الوثيقة.",
            },
            {
              heading: "2. شروط الاستخدام",
              body: "جميع التطبيقات والمنصات متاحة للاستخدام الشخصي، الدراسي، والمهني مجاناً. يُمنع إعادة بيع النسخ البرمجية أو استخدامها لأغراض تجارية غير مصرح بها.",
            },
            {
              heading: "3. الاستخدام المسؤول والتحديثات",
              body: "صُممت جميع الأدوات لمساعدة المستخدمين في إدارة أعمالهم وملفاتهم بشكل قانوني وآمن، ويتم تحديثها دورياً لدعم أحدث أنظمة التشغيل.",
            },
          ],
        },
        faqs: {
          title: "الأسئلة الشائعة",
          subtitle: "إجابات سريعة حول طريقة تحميل وتشغيل التطبيقات.",
          sections: [
            {
              heading: "كيف أقوم بتحميل التطبيقات؟",
              body: "اضغط على أي تطبيق في عجلة التطبيقات لفتح صفحته، ثم انزل للأسفل للوصول إلى أزرار التحميل المباشرة أو المتجر الرسمي.",
            },
            {
              heading: "هل تعمل التطبيقات بدون اتصال بالإنترنت (Offline)؟",
              body: "العديد من تطبيقاتنا مثل المترجم الفوري الاحترافي وأدوات معالجة الملفات المحلية تدعم العمل بدون إنترنت بعد تحميل الحزم الأساسية.",
            },
            {
              heading: "هل ملفاتي ووثائقي الرسمية آمنة؟",
              body: "بكل تأكيد. تتم معالجة وضغط الوثائق والصور محلياً داخل متصفحك أو جهازك مباشرة لضمان خصوصية وأمان تام.",
            },
            {
              heading: "كيف يمكنني التواصل؟",
              body: "يمكنك التواصل مباشرة عبر الحسابات الرسمية الموثقة في قسم حسابات التواصل الاجتماعي أسفل الموقع.",
            },
          ],
        },
      },
    },
  },

  en: {
    dir: "ltr",
    heroTitle: "Welcome, I am Jaafar Al-Abadi",
    heroDesc:
      "Software developer and creator of smart applications & AI tools. Explore my suite of applications engineered with cutting-edge technologies for a seamless user experience.",
    signAgain: "Sign again",
    wheelCenterTitle: "My Apps",
    viewBtn: "View",
    backToPortfolio: "Back to Applications Gallery",
    backToWheel: "Back to Apps Wheel",
    scrollDownHint: "Scroll down for downloads & links",
    apps: {
      "tools-hub": {
        shortTitle: "Tools Hub",
        fullTitle: "Tools Hub | All-in-One Android Toolkit",
        description: "Complete Android studio for images, PDF, video, QR & compression",
        heading: "Ready to explore?",
        primaryLabels: ["Download Android APK"],
        secondaryLabels: [],
      },
      pda4: {
        shortTitle: "PDA4",
        fullTitle: "PDA4 | Smart AI Document Editor",
        description: "World's first AI-powered A4 document editor with professional templates",
        heading: "Ready to begin?",
        primaryLabels: ["Download from Microsoft Store"],
        secondaryLabels: [],
      },
      "media-compressor": {
        shortTitle: "Media Compressor",
        fullTitle: "Official Media Compressor",
        description: "Smart compressor & converter for official government document formats",
        heading: "Ready to compress?",
        primaryLabels: ["Launch Official Web Platform"],
        secondaryLabels: [],
      },
      "voice-env": {
        shortTitle: "Voice Environment",
        fullTitle: "Voice Environment | AI Audio Studio",
        description: "Create audio, transcribe speech live, and generate neural voices with AI",
        heading: "Ready to create audio?",
        primaryLabels: ["Download Desktop Portable EXE"],
        secondaryLabels: ["Visit Official Website"],
      },
      "bayah-cv": {
        shortTitle: "Bayah CV",
        fullTitle: "Bayah CV | Smart ATS Resume Studio",
        description: "Build ATS-ready resumes with expert guidance and 50+ modern themes",
        heading: "Ready to build your CV?",
        primaryLabels: [
          "Download Desktop Portable EXE",
          "Download Android APK",
        ],
        secondaryLabels: ["Visit Official Website (bayah-cv.vercel.app)"],
      },
      "offline-translator": {
        shortTitle: "Smart Offline Translator",
        fullTitle: "Fast Translation Assistant (100% Offline)",
        description: "Real-time local voice and text translation powered by GPU & offline AI",
        heading: "Ready to translate?",
        primaryLabels: [
          "Download Desktop Portable EXE",
          "Download Desktop Setup Installer",
          "Download Android APK",
        ],
        secondaryLabels: ["Visit Official Translator Website"],
      },
      "download-organizer": {
        shortTitle: "Download Organizer",
        fullTitle: "Download Organizer | Smart File Manager",
        description: "One-click automatic folder organization, duplicate detection, custom rules, and safe rollback",
        heading: "Ready to organize your files?",
        primaryLabels: ["Download Desktop Portable EXE"],
        secondaryLabels: [],
      },
    },
    footer: {
      brandName: "Digital Applications Hub",
      brandDesc:
        "A unified digital platform bringing together cutting-edge software applications, AI tools, and document, audio, and real-time translation suites with modern design and peak performance.",
      copyright: "© All rights reserved.",
      colApps: "Applications",
      colCloud: "Cloud Platforms",
      colInfo: "About & Information",
      colSocial: "Social Links",
      officialPda4: "PDA4 Official Website",
      officialBayah: "Bayah CV Official Website",
      wheelLink: "Explore 3D Works Wheel",
      physicsLink: "Interactive Visual Physics Lab",
      aboutLink: "About, FAQs, Privacy & Terms",
      faqsLink: "FAQs",
      privacyLink: "Privacy Policy",
      termsLink: "Terms of Service",
      returnToSite: "Back to Website",
      socialFacebook: "Facebook",
      socialInstagram: "Instagram",
      socialYoutube: "YouTube",
      socialLinkedin: "LinkedIn",
      modals: {
        about: {
          title: "About the Platform",
          subtitle:
            "A unified digital hub combining software innovation, AI tools, and modern productivity suites.",
          sections: [
            {
              heading: "Platform Vision",
              body: "Designed as the unified digital portal for cross-platform applications and AI tools.",
            },
            {
              heading: "Application Ecosystem",
              body: "Features 6 cross-platform apps across Windows, Android, and Web: PDA4, Smart Offline Translator, Tools Hub, Bayah CV, Voice Environment, and Media Compressor.",
            },
            {
              heading: "Advanced Software & AI Engineering",
              body: "Built with modern software architectures and neural AI models for smart document editing, natural voice generation, and offline real-time translation.",
            },
          ],
        },
        privacy: {
          title: "Privacy Policy & Security",
          subtitle: "Full commitment to user data protection and local-first processing.",
          sections: [
            {
              heading: "1. Commitment to User Privacy",
              body: "This digital software platform places user privacy and data security first, processing files with the highest security standards.",
            },
            {
              heading: "2. Local On-Device Processing",
              body: "Our applications prioritize on-device local processing to keep your personal files and documents completely private without uploading to external servers.",
            },
            {
              heading: "3. Local Storage & Official Links",
              body: "Local storage is used strictly for saving your preferences such as language selection, and all links point directly to verified official stores and cloud platforms.",
            },
          ],
        },
        terms: {
          title: "Terms of Service",
          subtitle:
            "Guidelines governing the use of platform applications.",
          sections: [
            {
              heading: "1. Acceptance of Terms",
              body: "By accessing this platform or downloading any of its software tools, you agree to abide by these terms of service and applicable laws.",
            },
            {
              heading: "2. Usage Rights",
              body: "All applications are free for personal, academic, and professional productivity use. Unauthorized commercial resale is prohibited.",
            },
            {
              heading: "3. Responsible Use & Updates",
              body: "All tools are engineered to assist users in managing their own documents and media responsibly, with regular updates for modern operating systems.",
            },
          ],
        },
        faqs: {
          title: "Frequently Asked Questions",
          subtitle: "Quick answers on downloading and running the applications.",
          sections: [
            {
              heading: "How do I download an app?",
              body: "Click any application in the 3D wheel to open its showcase page, then scroll down to access direct download links or official store pages.",
            },
            {
              heading: "Do the applications work offline?",
              body: "Many of our tools, including the Smart Offline Translator and local media utilities, work completely offline once core packages are installed.",
            },
            {
              heading: "Are my personal and official documents secure?",
              body: "Yes. Document editing and media compression happen locally on your device or browser to guarantee full privacy.",
            },
            {
              heading: "How can I get in touch?",
              body: "You can reach out directly via the official social media links listed in the footer (Facebook, Instagram, YouTube, and LinkedIn).",
            },
          ],
        },
      },
    },
  },

  fr: {
    dir: "ltr",
    heroTitle: "Bienvenue, je suis Jaafar Al-Abadi",
    heroDesc:
      "Développeur de logiciels et créateur d'applications intelligentes et d'outils IA. Découvrez ma collection de projets conçus avec les technologies les plus avancées.",
    signAgain: "Signer à nouveau",
    wheelCenterTitle: "Mes Apps",
    viewBtn: "Voir",
    backToPortfolio: "Retour à la galerie d'applications",
    backToWheel: "Retour à la roue des applications",
    scrollDownHint: "Faites défiler pour télécharger",
    apps: {
      "tools-hub": {
        shortTitle: "Tools Hub",
        fullTitle: "Tools Hub | Boîte à outils Android",
        description: "Studio Android complet : images, PDF, vidéo, QR et compression",
        heading: "Prêt à explorer ?",
        primaryLabels: ["Télécharger l'APK Android"],
        secondaryLabels: [],
      },
      pda4: {
        shortTitle: "PDA4",
        fullTitle: "PDA4 | Éditeur de Documents IA",
        description:
          "Le premier éditeur de documents A4 propulsé par l'IA avec modèles professionnels",
        heading: "Prêt à commencer ?",
        primaryLabels: ["Télécharger sur le Microsoft Store"],
        secondaryLabels: [],
      },
      "media-compressor": {
        shortTitle: "Compresseur Média",
        fullTitle: "Compresseur de Médias Officiel",
        description: "Compression et conversion intelligentes aux formats officiels",
        heading: "Prêt à compresser ?",
        primaryLabels: ["Ouvrir la plateforme Web officielle"],
        secondaryLabels: [],
      },
      "voice-env": {
        shortTitle: "Environnement Vocal",
        fullTitle: "Voice Environment | Studio Audio IA",
        description: "Créez de l'audio, transcrivez la parole et générez des voix neuronales",
        heading: "Prêt à créer de l'audio ?",
        primaryLabels: ["Télécharger EXE Portable (Windows)"],
        secondaryLabels: ["Visiter le site officiel"],
      },
      "bayah-cv": {
        shortTitle: "Bayah CV",
        fullTitle: "Bayah CV | Studio de CV Intelligent ATS",
        description: "Créez des CV optimisés ATS avec plus de 50 modèles professionnels",
        heading: "Prêt à créer votre CV ?",
        primaryLabels: ["Télécharger EXE Portable", "Télécharger l'APK Android"],
        secondaryLabels: ["Visiter le site officiel (bayah-cv.vercel.app)"],
      },
      "offline-translator": {
        shortTitle: "Traducteur Hors-Ligne IA",
        fullTitle: "Assistant de Traduction Rapide (100% Hors-Ligne)",
        description: "Traduction vocale et textuelle locale en temps réel sans internet",
        heading: "Prêt à traduire ?",
        primaryLabels: [
          "Télécharger EXE Portable",
          "Télécharger l'installateur Setup",
          "Télécharger l'APK Android",
        ],
        secondaryLabels: ["Visiter le site officiel du traducteur"],
      },
      "download-organizer": {
        shortTitle: "Download Organizer",
        fullTitle: "Download Organizer | Organiseur Intelligent",
        description: "Organisation automatique en un clic, détection des doublons, règles personnalisées et annulation sûre",
        heading: "Prêt à organiser vos fichiers ?",
        primaryLabels: ["Télécharger EXE Portable (Windows)"],
        secondaryLabels: [],
      },
    },
    footer: {
      brandName: "Portail Numérique des Applications",
      brandDesc:
        "Une plateforme numérique complète réunissant des applications logicielles de pointe, des outils d'IA et des solutions de traitement de documents, d'audio et de traduction instantanée.",
      copyright: "© Tous droits réservés.",
      colApps: "Applications",
      colCloud: "Plateformes Cloud",
      colInfo: "À propos & Infos",
      colSocial: "Réseaux Sociaux",
      officialPda4: "Site officiel PDA4",
      officialBayah: "Site officiel Bayah CV",
      wheelLink: "Explorer la roue 3D des projets",
      physicsLink: "Laboratoire de physique visuelle interactif",
      aboutLink: "À propos, FAQ, Confidentialité & Conditions",
      faqsLink: "FAQ",
      privacyLink: "Politique de confidentialité",
      termsLink: "Conditions d'utilisation",
      returnToSite: "Retour au site",
      socialFacebook: "Facebook",
      socialInstagram: "Instagram",
      socialYoutube: "YouTube",
      socialLinkedin: "LinkedIn",
      modals: {
        about: {
          title: "À propos de la plateforme",
          subtitle:
            "Une plateforme numérique réunissant innovation logicielle, intelligence artificielle et outils de productivité.",
          sections: [
            {
              heading: "Vision du site",
              body: "Portail numérique unifié regroupant 6 applications multiplateformes et outils IA.",
            },
            {
              heading: "Écosystème d'applications",
              body: "Comprend 6 projets complets sur Windows, Android et Web : PDA4, Traducteur Hors-Ligne, Tools Hub, Bayah CV, Voice Environment et Media Compressor.",
            },
            {
              heading: "Ingénierie logicielle et IA",
              body: "Conçu avec des architectures modernes et des modèles neuronaux pour l'édition de documents, la synthèse vocale et la traduction hors-ligne.",
            },
          ],
        },
        privacy: {
          title: "Politique de confidentialité",
          subtitle: "Protection totale des données et traitement local sécurisé.",
          sections: [
            {
              heading: "1. Engagement envers la confidentialité",
              body: "La plateforme place la sécurité et la confidentialité des données des utilisateurs au premier plan.",
            },
            {
              heading: "2. Traitement local",
              body: "Nos applications privilégient le traitement local sur votre appareil pour garantir la confidentialité totale de vos fichiers.",
            },
            {
              heading: "3. Stockage local et liens officiels",
              body: "Le stockage local est utilisé uniquement pour sauvegarder vos préférences comme la langue choisie.",
            },
          ],
        },
        terms: {
          title: "Conditions d'utilisation",
          subtitle: "Règles d'utilisation des applications de la plateforme.",
          sections: [
            {
              heading: "1. Acceptation des conditions",
              body: "En utilisant cette plateforme ou en téléchargeant ses applications, vous acceptez les présentes conditions d'utilisation.",
            },
            {
              heading: "2. Droits d'utilisation",
              body: "L’utilisation est gratuite pour un usage personnel, académique et professionnel. La revente commerciale non autorisée est interdite.",
            },
            {
              heading: "3. Utilisation responsable et mises à jour",
              body: "Les outils sont conçus pour gérer vos fichiers en toute sécurité et bénéficient de mises à jour régulières.",
            },
          ],
        },
        faqs: {
          title: "Questions Fréquentes (FAQ)",
          subtitle: "Réponses rapides sur le téléchargement et l'utilisation.",
          sections: [
            {
              heading: "Comment télécharger une application ?",
              body: "Cliquez sur une application dans la roue 3D puis faites défiler vers le bas pour accéder aux liens directs ou au Microsoft Store.",
            },
            {
              heading: "Les applications fonctionnent-elles hors-ligne ?",
              body: "Plusieurs applications comme le Traducteur Hors-Ligne IA et les outils de traitement fonctionnent sans connexion Internet.",
            },
            {
              heading: "Mes documents officiels sont-ils sécurisés ?",
              body: "Absolument. Le traitement et la compression des documents s'effectuent localement sur votre appareil.",
            },
            {
              heading: "Comment nous contacter ?",
              body: "Vous pouvez nous contacter directement via les réseaux sociaux officiels figurant dans le pied de page.",
            },
          ],
        },
      },
    },
  },

  de: {
    dir: "ltr",
    heroTitle: "Willkommen, ich bin Jaafar Al-Abadi",
    heroDesc:
      "Softwareentwickler und Entwickler intelligenter Anwendungen & KI-Tools. Entdecken Sie meine Projekte, die mit modernsten Technologien für höchste Produktivität entwickelt wurden.",
    signAgain: "Erneut unterschreiben",
    wheelCenterTitle: "Meine Apps",
    viewBtn: "Ansehen",
    backToPortfolio: "Zurück zur App-Galerie",
    backToWheel: "Zurück zum App-Rad",
    scrollDownHint: "Nach unten scrollen für Downloads & Links",
    apps: {
      "tools-hub": {
        shortTitle: "Tools Hub",
        fullTitle: "Tools Hub | All-in-One Android-Toolkit",
        description: "Komplettes Android-Studio für Bilder, PDF, Video, QR & Komprimierung",
        heading: "Bereit zum Entdecken?",
        primaryLabels: ["Android APK herunterladen"],
        secondaryLabels: [],
      },
      pda4: {
        shortTitle: "PDA4",
        fullTitle: "PDA4 | Intelligenter KI-Dokumenteneditor",
        description: "Der weltweit erste KI-gestützte A4-Dokumenteneditor mit Profi-Vorlagen",
        heading: "Bereit loszulegen?",
        primaryLabels: ["Im Microsoft Store herunterladen"],
        secondaryLabels: [],
      },
      "media-compressor": {
        shortTitle: "Medienkompressor",
        fullTitle: "Offizieller Medienkompressor",
        description:
          "Intelligente Komprimierung und Konvertierung für offizielle Dokumentformate",
        heading: "Bereit zum Komprimieren?",
        primaryLabels: ["Offizielle Web-Plattform öffnen"],
        secondaryLabels: [],
      },
      "voice-env": {
        shortTitle: "Sprachumgebung",
        fullTitle: "Voice Environment | KI-Audio-Studio",
        description:
          "Audio erstellen, Sprache live transkribieren und neuronale Stimmen generieren",
        heading: "Bereit für KI-Audio?",
        primaryLabels: ["Portable Desktop-EXE herunterladen"],
        secondaryLabels: ["Offizielle Website besuchen"],
      },
      "bayah-cv": {
        shortTitle: "Bayah CV",
        fullTitle: "Bayah CV | Intelligentes ATS-Lebenslauf-Studio",
        description: "Erstellen Sie ATS-optimierte Lebensläufe mit über 50 modernen Vorlagen",
        heading: "Bereit für Ihren Lebenslauf?",
        primaryLabels: ["Portable Desktop-EXE herunterladen", "Android APK herunterladen"],
        secondaryLabels: ["Offizielle Website besuchen (bayah-cv.vercel.app)"],
      },
      "offline-translator": {
        shortTitle: "KI-Offline-Übersetzer",
        fullTitle: "Schneller Übersetzungsassistent (100% Offline)",
        description: "Lokale Echtzeit-Sprach- und Textübersetzung ohne Internetverbindung",
        heading: "Bereit zum Übersetzen?",
        primaryLabels: [
          "Portable Desktop-EXE herunterladen",
          "Desktop Setup-Installer herunterladen",
          "Android APK herunterladen",
        ],
        secondaryLabels: ["Offizielle Übersetzer-Website besuchen"],
      },
      "download-organizer": {
        shortTitle: "Download Organizer",
        fullTitle: "Download Organizer | Intelligenter Dateimanager",
        description: "Automatische Ein-Klick-Ordnerorganisation, Duplikaterkennung, eigene Regeln und sicheres Zurücksetzen",
        heading: "Bereit, Ihre Dateien zu ordnen?",
        primaryLabels: ["Portable Desktop-EXE herunterladen"],
        secondaryLabels: [],
      },
    },
    footer: {
      brandName: "Digitale Anwendungsplattform",
      brandDesc:
        "Eine umfassende digitale Plattform, die modernste Softwareanwendungen, KI-Werkzeuge sowie Lösungen für Dokumenten-, Audio- und Echtzeit-Übersetzung vereint.",
      copyright: "© Alle Rechte vorbehalten.",
      colApps: "Anwendungen",
      colCloud: "Cloud-Plattformen",
      colInfo: "Über uns & Infos",
      colSocial: "Soziale Netzwerke",
      officialPda4: "Offizielle PDA4-Website",
      officialBayah: "Offizielle Bayah CV-Website",
      wheelLink: "3D-App-Rad erkunden",
      physicsLink: "Interaktives Physik-Labor",
      aboutLink: "Über uns, FAQ, Datenschutz & AGB",
      faqsLink: "Häufige Fragen (FAQ)",
      privacyLink: "Datenschutz",
      termsLink: "Nutzungsbedingungen",
      returnToSite: "Zurück zur Website",
      socialFacebook: "Facebook",
      socialInstagram: "Instagram",
      socialYoutube: "YouTube",
      socialLinkedin: "LinkedIn",
      modals: {
        about: {
          title: "Über die Plattform",
          subtitle:
            "Eine digitale Plattform für Software-Innovation, KI-Anwendungen und moderne Produktivitätswerkzeuge.",
          sections: [
            {
              heading: "Plattform-Vision",
              body: "Das zentrale interaktive Portal für plattformübergreifende KI- und Produktivitätsanwendungen.",
            },
            {
              heading: "Anwendungs-Ökosystem",
              body: "Umfasst 6 Anwendungen für Windows, Android und Web: PDA4, Offline-Übersetzer, Tools Hub, Bayah CV, Voice Environment und Media Compressor.",
            },
            {
              heading: "Moderne Software- & KI-Technik",
              body: "Entwickelt mit modernster Architektur und neuronalen KI-Modellen für Dokumentenbearbeitung, Sprachsynthese und Offline-Übersetzung.",
            },
          ],
        },
        privacy: {
          title: "Datenschutz & Sicherheit",
          subtitle: "Voller Schutz Ihrer Daten durch sichere lokale Verarbeitung.",
          sections: [
            {
              heading: "1. Datenschutz-Verpflichtung",
              body: "Unsere Plattform stellt den Schutz Ihrer persönlichen Daten und Dateien an erste Stelle.",
            },
            {
              heading: "2. Lokale Verarbeitung",
              body: "Unsere Apps verarbeiten Daten primär lokal auf Ihrem Gerät, um maximale Privatsphäre zu gewährleisten.",
            },
            {
              heading: "3. Lokaler Speicher & Offizielle Links",
              body: "Lokaler Speicher wird nur für Benutzereinstellungen wie die Sprachauswahl verwendet.",
            },
          ],
        },
        terms: {
          title: "Nutzungsbedingungen",
          subtitle: "Richtlinien für die Nutzung der Anwendungen auf dieser Plattform.",
          sections: [
            {
              heading: "1. Geltungsbereich",
              body: "Durch die Nutzung dieser Plattform erklären Sie sich mit diesen Nutzungsbedingungen einverstanden.",
            },
            {
              heading: "2. Nutzungsrechte",
              body: "Alle Apps sind für den persönlichen, akademischen und beruflichen Gebrauch kostenlos nutzbar.",
            },
            {
              heading: "3. Verantwortungsvolle Nutzung & Updates",
              body: "Alle Werkzeuge werden regelmäßig aktualisiert, um höchste Leistung und Kompatibilität zu bieten.",
            },
          ],
        },
        faqs: {
          title: "Häufig gestellte Fragen",
          subtitle: "Schnelle Antworten zum Herunterladen und Starten der Apps.",
          sections: [
            {
              heading: "Wie lade ich eine App herunter?",
              body: "Klicken Sie im 3D-Rad auf eine App und scrollen Sie nach unten zu den direkten Download-Links oder dem Microsoft Store.",
            },
            {
              heading: "Funktionieren die Apps auch offline?",
              body: "Viele unserer Tools wie der KI-Offline-Übersetzer arbeiten nach der Installation komplett ohne Internetverbindung.",
            },
            {
              heading: "Sind meine offiziellen Dokumente sicher?",
              body: "Ja, die Dokumenten- und Bildverarbeitung erfolgt lokal auf Ihrem Gerät für höchste Datensicherheit.",
            },
            {
              heading: "Wie kann ich Kontakt aufnehmen?",
              body: "Über die offiziellen Social-Media-Kanäle im unteren Bereich der Website.",
            },
          ],
        },
      },
    },
  },

  ja: {
    dir: "ltr",
    heroTitle: "ようこそ、Jaafar Al-Abadi です",
    heroDesc:
      "ソフトウェア開発者であり、スマートアプリやAIツールのクリエイターです。最新技術を駆使して設計されたアプリケーション群をご覧ください。",
    signAgain: "もう一度署名する",
    wheelCenterTitle: "アプリ一覧",
    viewBtn: "表示",
    backToPortfolio: "アプリギャラリーに戻る",
    backToWheel: "アプリホイールに戻る",
    scrollDownHint: "下にスクロールしてダウンロード",
    apps: {
      "tools-hub": {
        shortTitle: "Tools Hub",
        fullTitle: "Tools Hub | オールインワン Android ツール",
        description: "画像・PDF・動画・QR・圧縮を1つに統合したAndroidスタジオ",
        heading: "体験してみませんか？",
        primaryLabels: ["Android APK をダウンロード"],
        secondaryLabels: [],
      },
      pda4: {
        shortTitle: "PDA4",
        fullTitle: "PDA4 | スマート AI ドキュメントエディタ",
        description: "プロ仕様のテンプレートを備えた世界初のAI搭載A4文書エディタ",
        heading: "始める準備はできましたか？",
        primaryLabels: ["Microsoft Store からダウンロード"],
        secondaryLabels: [],
      },
      "media-compressor": {
        shortTitle: "メディア圧縮ツール",
        fullTitle: "公式メディア・ドキュメント圧縮スタジオ",
        description: "公的書類フォーマットに対応したスマート圧縮・変換プラットフォーム",
        heading: "ファイルを圧縮しますか？",
        primaryLabels: ["公式 Web プラットフォームを開く"],
        secondaryLabels: [],
      },
      "voice-env": {
        shortTitle: "Voice Environment",
        fullTitle: "Voice Environment | AI オーディオスタジオ",
        description: "AIによる音声生成、リアルタイム文字起こし、ニューラル音声合成",
        heading: "音声制作を始めますか？",
        primaryLabels: ["デスクトップ EXE をダウンロード"],
        secondaryLabels: ["公式サイトを開く"],
      },
      "bayah-cv": {
        shortTitle: "Bayah CV",
        fullTitle: "Bayah CV | スマート履歴書スタジオ",
        description: "ATS対応の履歴書を50種類以上のプロテンプレートで作成",
        heading: "履歴書を作成しますか？",
        primaryLabels: ["デスクトップ EXE をダウンロード", "Android APK をダウンロード"],
        secondaryLabels: ["公式サイトを開く (bayah-cv.vercel.app)"],
      },
      "offline-translator": {
        shortTitle: "スマートオフライン翻訳",
        fullTitle: "高速オフラインAI翻訳アシスタント",
        description: "インターネット不要・GPU高速化によるリアルタイム音声＆テキスト翻訳",
        heading: "翻訳を始めますか？",
        primaryLabels: [
          "ポータブル EXE をダウンロード",
          "インストーラー (Setup) をダウンロード",
          "Android APK をダウンロード",
        ],
        secondaryLabels: ["公式翻訳サイトを開く"],
      },
      "download-organizer": {
        shortTitle: "Download Organizer",
        fullTitle: "Download Organizer | スマートダウンロード整理",
        description: "ワンクリック自動整理、重複ファイル検出、カスタムルール設定、安全なロールバック機能",
        heading: "ファイルを整理しますか？",
        primaryLabels: ["デスクトップ ポータブル EXE をダウンロード"],
        secondaryLabels: [],
      },
    },
    footer: {
      brandName: "デジタルアプリケーションハブ",
      brandDesc:
        "最新のソフトウェアアプリケーション、AIツール、文書処理・音声生成・リアルタイム翻訳ソリューションを統合した次世代デジタルプラットフォーム。",
      copyright: "© All rights reserved.",
      colApps: "アプリケーション",
      colCloud: "クラウドプラットフォーム",
      colInfo: "サイト情報・規約",
      colSocial: "ソーシャルリンク",
      officialPda4: "PDA4 公式サイト",
      officialBayah: "Bayah CV 公式サイト",
      wheelLink: "3D アプリホイールを見る",
      physicsLink: "インタラクティブ物理ラボ",
      aboutLink: "サイト概要・FAQ・プライバシー・利用規約",
      faqsLink: "よくある質問 (FAQ)",
      privacyLink: "プライバシーポリシー",
      termsLink: "利用規約",
      returnToSite: "サイトに戻る",
      socialFacebook: "Facebook",
      socialInstagram: "Instagram",
      socialYoutube: "YouTube",
      socialLinkedin: "LinkedIn",
      modals: {
        about: {
          title: "プラットフォームについて",
          subtitle:
            "ソフトウェア革新、AIツール、最新の生産性アプリを統合したデジタルプラットフォーム。",
          sections: [
            {
              heading: "サイトのビジョン",
              body: "Windows、Android、Web向けに設計された6つのスマートアプリケーションとAIツールの統合ポータルです。",
            },
            {
              heading: "提供アプリケーション",
              body: "Windows・Android・Web向けの6つのプロジェクト（PDA4、スマートオフライン翻訳、Tools Hub、Bayah CV、Voice Environment、Media Compressor）を提供しています。",
            },
            {
              heading: "高度なソフトウェア＆AI設計",
              body: "最新のアーキテクチャとニューラルAIモデルを採用し、文書編集、音声合成、オフラインリアルタイム翻訳を実現しています。",
            },
          ],
        },
        privacy: {
          title: "プライバシーポリシーとセキュリティ",
          subtitle: "ローカル処理を重視し、ユーザーのプライバシーを徹底保護します。",
          sections: [
            {
              heading: "1. プライバシー保護への取り組み",
              body: "当プラットフォームは、ユーザーデータの安全性とプライバシーを最優先に設計されています。",
            },
            {
              heading: "2. ローカル処理",
              body: "多くのアプリはデバイス内のローカル処理を採用しており、個人のファイルやデータを安全に保ちます。",
            },
            {
              heading: "3. ローカルストレージと公式リンク",
              body: "ローカルストレージは言語設定などの保存にのみ使用され、すべてのリンクは公式ストアおよび検証済みプラットフォームへ接続されます。",
            },
          ],
        },
        terms: {
          title: "利用規約",
          subtitle: "当プラットフォームのアプリケーション利用に関する規約。",
          sections: [
            {
              heading: "1. 規約への同意",
              body: "当プラットフォームの利用またはアプリのダウンロードにより、本利用規約に同意したものとみなされます。",
            },
            {
              heading: "2. 利用条件",
              body: "すべてのアプリケーションは個人、学習、業務用途で無料でご利用いただけます。無断での商用再販は禁止されています。",
            },
            {
              heading: "3. 適切な利用とアップデート",
              body: "各ツールは安全かつ適法なファイル管理のために設計されており、最新OS向けに随時アップデートされます。",
            },
          ],
        },
        faqs: {
          title: "よくある質問",
          subtitle: "ダウンロードと使用方法に関するガイド。",
          sections: [
            {
              heading: "アプリのダウンロード方法は？",
              body: "3Dホイール内のアプリをクリックして詳細ページを開き、下にスクロールするとダウンロードリンクやMicrosoft Storeへのリンクが表示されます。",
            },
            {
              heading: "オフラインでも動作しますか？",
              body: "スマートオフライン翻訳やローカルファイル処理ツールなど、多くの機能がインターネット接続なしで動作します。",
            },
            {
              heading: "公的書類や個人ファイルは安全ですか？",
              body: "はい。書類の編集や圧縮処理はお使いのデバイスまたはブラウザ内でローカルに実行されるため安全です。",
            },
            {
              heading: "お問い合わせ方法は？",
              body: "フッターに記載されている公式ソーシャルメディア（Facebook、Instagram、YouTube、LinkedIn）から直接ご連絡いただけます。",
            },
          ],
        },
      },
    },
  },
};

interface LanguageContextValue {
  lang: SupportedLang;
  setLang: (lang: SupportedLang) => void;
  t: SiteTranslation;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "ar",
  setLang: () => {},
  t: SITE_TRANSLATIONS.ar,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<SupportedLang>("ar");
  const t = SITE_TRANSLATIONS[lang] ?? SITE_TRANSLATIONS.ar;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
      {/* Compact Floating Corner Language Switcher Pill */}
      <div
        dir="ltr"
        className="fixed bottom-3.5 left-3.5 md:bottom-5 md:left-5 z-50 max-w-[calc(100vw-4.5rem)] pointer-events-auto transition-transform duration-300 hover:scale-105"
      >
        <LanguageSwitcherPill
          aria-label="Select Website Language"
          defaultLocale="ar"
          locale={lang}
          locales={SUPPORTED_LOCALES}
          onLocaleChange={(code) => setLang(code as SupportedLang)}
          size="sm"
          variant="outline"
        />
      </div>
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
