'use client';
import React, { useState } from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'motion/react';
import {
  FacebookIcon,
  FrameIcon,
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
  ChevronDown,
  X,
  ArrowUpRight,
} from 'lucide-react';
import { useLanguage, type SupportedLang } from '@/lib/i18n';

export interface AccordionItemData {
  q: string;
  a: string;
}

export interface AccordionCategoryData {
  category: string;
  items: AccordionItemData[];
}

export interface UnifiedInfoHubTranslations {
  colApps: string;
  colCloud: string;
  colInfo: string;
  colSocial: string;
  singleInfoButton: string;
  brandTitle: string;
  copyright: string;
  officialPda4: string;
  officialBayah: string;
  appNames: {
    pda4: string;
    translator: string;
    toolsHub: string;
    bayahCv: string;
    voiceEnv: string;
    compressor: string;
    organizer: string;
  };
  hub: {
    badge: string;
    title: string;
    subtitle: string;
    closeBtn: string;
    categories: AccordionCategoryData[];
    bottomCardTitle: string;
    bottomCardSubtitle: string;
    bottomCardCta: string;
  };
}

export const FOOTER_HUB_I18N: Record<SupportedLang, UnifiedInfoHubTranslations> = {
  ar: {
    colApps: 'التطبيقات والمشاريع',
    colCloud: 'المنصات السحابية',
    colInfo: 'عن الموقع والمعلومات',
    colSocial: 'حسابات التواصل',
    singleInfoButton: 'استعراض دليل الموقع والسياسات',
    brandTitle: 'الدعم',
    copyright: 'gmail : ccvv9c@gmail.com',
    officialPda4: 'موقع PDA4 الرسمي',
    officialBayah: 'موقع Bayah CV الرسمي',
    appNames: {
      pda4: 'PDA4 محرر المستندات الذكي',
      translator: 'مترجم أوفلاين الذكي',
      toolsHub: 'بيئة الأدوات (Tools Hub)',
      bayahCv: 'بيئة السيرة الذاتية (Bayah CV)',
      voiceEnv: 'بيئة الصوت الذكية (Voice AI)',
      compressor: 'بيئة الضغط الرسمية (Compressor)',
      organizer: 'منظم التنزيلات (Download Organizer)',
    },
    hub: {
      badge: 'دليل الموقع والمعلومات',
      title: 'كل ما تود معرفته عن المنصة',
      subtitle: 'نظرة شاملة حول الموقع، الأسئلة الشائعة، سياسة الخصوصية، وشروط الاستخدام في مكان واحد.',
      closeBtn: 'إغلاق',
      categories: [
        {
          category: 'عن الموقع والمنظومة',
          items: [
            {
              q: 'ما هي فكرة هذا الموقع وما الذي يقدمه؟',
              a: 'هذا الموقع هو البوابة الرقمية الموحدة لاستعراض وتحميل مجموعة من التطبيقات والمنصات الذكية المصممة للكمبيوتر (Windows) والهواتف الذكية (Android) والويب السحابي، مع إمكانية معاينة كل تطبيق وتجربته مباشرة.',
            },
            {
              q: 'ما هي التطبيقات المتوفرة داخل المنصة؟',
              a: 'تضم المنصة 7 مشاريع متكاملة: محرر المستندات الذكي (PDA4)، مترجم أوفلاين الذكي الذي يعمل بدون إنترنت، بيئة الأدوات الشاملة للأندرويد (Tools Hub)، منصة السير الذاتية (Bayah CV)، استوديو الذكاء الصوتي (بيئة الصوت)، ضاغط الوسائط الرسمية (بيئة الضغط)، ومنظم التنزيلات الذكي (Download Organizer).',
            },
          ],
        },
        {
          category: 'الأسئلة الشائعة والتحميل',
          items: [
            {
              q: 'كيف أقوم بتحميل أي تطبيق من الموقع؟',
              a: 'اضغط على بطاقة التطبيق المطلوب في عجلة التطبيقات التفاعلية لفتح صفحته الخاصة، ثم انزل للأسفل لتجد أزرار التحميل المباشرة (نسخة التشغيل المباشر EXE، نسخة التثبيت Setup، نسخة الأندرويد APK، أو رابط الموقع الرسمي).',
            },
            {
              q: 'ما الفرق بين نسخة التشغيل المباشر (EXE) ونسخة التثبيت (Setup)؟',
              a: 'نسخة التشغيل المباشر (Portable EXE) تعمل فوراً بمجرد النقر عليها دون الحاجة لتثبيت، بينما نسخة التثبيت (Setup) تقوم بتثبيت البرنامج على نظام ويندوز وإنشاء اختصار رسمي له على سطح المكتب.',
            },
            {
              q: 'هل تعمل التطبيقات بدون اتصال بالإنترنت (أوفلاين)؟',
              a: 'نعم، تطبيقات مثل "مترجم أوفلاين الذكي" و"بيئة الأدوات" و"PDA4" تدعم العمل المحلي الكامل بدون الحاجة لاتصال دائم بالإنترنت.',
            },
          ],
        },
        {
          category: 'سياسة الخصوصية والأمان',
          items: [
            {
              q: 'كيف يتم حماية بياناتي وملفاتي داخل التطبيقات؟',
              a: 'تعتمد التطبيقات على مبدأ المعالجة المحلية الآمنة داخل جهازك (Local Processing & IndexedDB)، مما يضمن بقاء مستنداتك وصورك وتسجيلاتك الصوتية على جهازك بأعلى درجات الخصوصية والأمان.',
            },
            {
              q: 'هل روابط التحميل آمنة ومباشرة؟',
              a: 'جميع روابط التحميل مرفوعة بشكل مباشر ومفحوصة بالكامل لضمان حصولك على النسخ الأصلية النظيفة دون أي إعلانات أو وسطاء.',
            },
          ],
        },
        {
          category: 'شروط الاستخدام',
          items: [
            {
              q: 'ما هي شروط استخدام التطبيقات والمنصات؟',
              a: 'جميع التطبيقات والمنصات متاحة للاستخدام الشخصي، الدراسي، والمهني مجاناً. يُمنع إعادة بيع النسخ البرمجية أو استخدامها لأغراض تجارية غير مصرح بها.',
            },
          ],
        },
      ],
      bottomCardTitle: 'هل لديك استفسار آخر؟',
      bottomCardSubtitle: 'إذا لم تجد الإجابة التي تبحث عنها، يمكنك التواصل مباشرة عبر الحسابات الرسمية.',
      bottomCardCta: 'تواصل معنا',
    },
  },

  en: {
    colApps: 'Applications',
    colCloud: 'Cloud Platforms',
    colInfo: 'About & Information',
    colSocial: 'Social Links',
    singleInfoButton: 'About, FAQs, Privacy & Terms',
    brandTitle: 'Support',
    copyright: 'gmail : ccvv9c@gmail.com',
    officialPda4: 'PDA4 Official Website',
    officialBayah: 'Bayah CV Official Website',
    appNames: {
      pda4: 'PDA4 Smart Document Editor',
      translator: 'Smart Offline Translator',
      toolsHub: 'Tools Hub (Android Toolkit)',
      bayahCv: 'Bayah CV Smart Resume Studio',
      voiceEnv: 'Voice Environment AI Studio',
      compressor: 'Official Media Compressor',
      organizer: 'Download Organizer',
    },
    hub: {
      badge: 'ABOUT & FAQ',
      title: 'Your Questions Answered',
      subtitle: 'Everything about the platform, frequently asked questions, privacy policy, and terms of service in one place.',
      closeBtn: 'Close',
      categories: [
        {
          category: 'About the Platform',
          items: [
            {
              q: 'What is this platform and what does it offer?',
              a: 'This website is a unified digital hub showcasing 7 cross-platform applications and AI productivity tools built for Windows Desktop, Android, and the Web, with interactive previews and direct downloads.',
            },
            {
              q: 'Which applications are included in the suite?',
              a: 'The ecosystem includes 7 projects: PDA4 (AI Document Editor), Smart Offline Translator, Tools Hub (All-in-One Android Toolkit), Bayah CV (ATS Resume Studio), Voice Environment (AI Audio Studio), Official Media Compressor, and Download Organizer.',
            },
          ],
        },
        {
          category: 'Downloads & Usage',
          items: [
            {
              q: 'How do I download an application?',
              a: 'Select any application card in the 3D wheel to open its showcase page, then scroll down to access direct download buttons for Portable EXE, Setup Installer, Android APK, or the live Web App.',
            },
            {
              q: 'Does the software work offline?',
              a: 'Yes! Applications like Smart Offline Translator, Tools Hub, and PDA4 are engineered for local offline execution without requiring an active internet connection.',
            },
          ],
        },
        {
          category: 'Security & Privacy Policy',
          items: [
            {
              q: 'How is my data secured?',
              a: 'Our tools prioritize local-first on-device processing and local storage (IndexedDB). Your sensitive files, audio, and documents remain private on your own device.',
            },
            {
              q: 'Are the download links safe and verified?',
              a: 'All desktop executables and Android APK packages are hosted on verified direct cloud storage with zero third-party adware or trackers.',
            },
          ],
        },
        {
          category: 'Terms of Service',
          items: [
            {
              q: 'What are the terms of use for these applications?',
              a: 'All applications are free for personal, academic, and professional productivity use. Redistribution or unauthorized commercial resale of the binaries is prohibited.',
            },
          ],
        },
      ],
      bottomCardTitle: 'Still have questions?',
      bottomCardSubtitle: "If you can't find the answer you're looking for, please reach out through our official channels.",
      bottomCardCta: 'Get in touch',
    },
  },

  fr: {
    colApps: 'Applications',
    colCloud: 'Plateformes Cloud',
    colInfo: 'À propos & Infos',
    colSocial: 'Réseaux Sociaux',
    singleInfoButton: 'À propos, FAQ, Confidentialité & Conditions',
    brandTitle: 'Support',
    copyright: 'gmail : ccvv9c@gmail.com',
    officialPda4: 'Site officiel PDA4',
    officialBayah: 'Site officiel Bayah CV',
    appNames: {
      pda4: 'PDA4 Éditeur de Documents IA',
      translator: 'Traducteur Hors-Ligne IA',
      toolsHub: 'Tools Hub (Boîte à outils Android)',
      bayahCv: 'Bayah CV Studio de CV ATS',
      voiceEnv: 'Voice Environment Studio Audio IA',
      compressor: 'Compresseur de Médias Officiel',
      organizer: 'Download Organizer',
    },
    hub: {
      badge: 'INFOS & FAQ',
      title: 'Réponses à vos questions',
      subtitle: 'Tout savoir sur la plateforme, la FAQ, la politique de confidentialité et les conditions d’utilisation.',
      closeBtn: 'Fermer',
      categories: [
        {
          category: 'À propos de la plateforme',
          items: [
            {
              q: 'Quel est le but de ce site ?',
              a: 'Ce portail réunit 7 applications logicielles et outils IA conçus pour Windows, Android et le Web, avec aperçus interactifs et téléchargements directs.',
            },
            {
              q: 'Quelles sont les applications disponibles ?',
              a: 'PDA4, Traducteur Hors-Ligne IA, Tools Hub, Bayah CV, Voice Environment, le Compresseur de Médias Officiel et Download Organizer.',
            },
          ],
        },
        {
          category: 'Téléchargement & Fonctionnement',
          items: [
            {
              q: 'Comment télécharger une application ?',
              a: 'Cliquez sur une application dans la roue 3D pour ouvrir sa page dédiée, puis faites défiler vers le bas pour accéder aux liens EXE, Setup, APK ou Web.',
            },
            {
              q: 'Les applications fonctionnent-elles hors ligne ?',
              a: 'Oui, la plupart des outils fonctionnent localement sur votre appareil sans connexion Internet.',
            },
          ],
        },
        {
          category: 'Confidentialité & Sécurité',
          items: [
            {
              q: 'Comment mes données sont-elles protégées ?',
              a: 'Le traitement s’effectue localement sur votre machine afin de garantir une confidentialité absolue de vos fichiers et documents.',
            },
          ],
        },
        {
          category: 'Conditions d’utilisation',
          items: [
            {
              q: 'Quelles sont les conditions d’utilisation ?',
              a: 'L’utilisation est gratuite pour un usage personnel, académique et professionnel. La revente commerciale non autorisée est interdite.',
            },
          ],
        },
      ],
      bottomCardTitle: 'Vous avez encore des questions ?',
      bottomCardSubtitle: 'Si vous ne trouvez pas votre réponse, contactez-nous via nos réseaux officiels.',
      bottomCardCta: 'Nous contacter',
    },
  },

  de: {
    colApps: 'Anwendungen',
    colCloud: 'Cloud-Plattformen',
    colInfo: 'Über uns & Infos',
    colSocial: 'Soziale Netzwerke',
    singleInfoButton: 'Über uns, FAQ, Datenschutz & AGB',
    brandTitle: 'Support',
    copyright: 'gmail : ccvv9c@gmail.com',
    officialPda4: 'Offizielle PDA4-Website',
    officialBayah: 'Offizielle Bayah CV-Website',
    appNames: {
      pda4: 'PDA4 KI-Dokumenteneditor',
      translator: 'KI-Offline-Übersetzer',
      toolsHub: 'Tools Hub (Android-Toolkit)',
      bayahCv: 'Bayah CV ATS-Lebenslauf-Studio',
      voiceEnv: 'Voice Environment KI-Audio-Studio',
      compressor: 'Offizieller Medienkompressor',
      organizer: 'Download Organizer',
    },
    hub: {
      badge: 'INFO & FAQ',
      title: 'Antworten auf Ihre Fragen',
      subtitle: 'Alle Informationen über die Plattform, häufige Fragen, Datenschutz und Nutzungsbedingungen an einem Ort.',
      closeBtn: 'Schließen',
      categories: [
        {
          category: 'Über die Plattform',
          items: [
            {
              q: 'Was bietet diese Plattform?',
              a: 'Diese Website ist das zentrale Portal für 7 plattformübergreifende KI- und Produktivitätsanwendungen für Windows, Android und das Web.',
            },
            {
              q: 'Welche Anwendungen sind enthalten?',
              a: 'PDA4, KI-Offline-Übersetzer, Tools Hub, Bayah CV, Voice Environment, der Offizielle Medienkompressor und Download Organizer.',
            },
          ],
        },
        {
          category: 'Downloads & Nutzung',
          items: [
            {
              q: 'Wie lade ich eine Anwendung herunter?',
              a: 'Wählen Sie eine App im 3D-Rad aus und scrollen Sie nach unten zu den direkten Download-Buttons (Portable EXE, Setup, Android APK oder Web-App).',
            },
            {
              q: 'Funktionieren die Apps auch offline?',
              a: 'Ja, Tools wie der Offline-Übersetzer, Tools Hub und PDA4 arbeiten vollständig lokal ohne Internetverbindung.',
            },
          ],
        },
        {
          category: 'Sicherheit & Datenschutz',
          items: [
            {
              q: 'Wie werden meine Daten geschützt?',
              a: 'Durch lokale Verarbeitung direkt auf Ihrem Gerät bleiben Ihre Dokumente, Bilder und Sprachaufnahmen vollkommen privat.',
            },
          ],
        },
        {
          category: 'Nutzungsbedingungen',
          items: [
            {
              q: 'Welche Nutzungsbedingungen gelten?',
              a: 'Alle Apps sind für den persönlichen, akademischen und beruflichen Gebrauch kostenlos nutzbar.',
            },
          ],
        },
      ],
      bottomCardTitle: 'Noch Fragen offen?',
      bottomCardSubtitle: 'Kontaktieren Sie uns gerne direkt über unsere offiziellen Kanäle.',
      bottomCardCta: 'Kontakt aufnehmen',
    },
  },

  ja: {
    colApps: 'アプリケーション',
    colCloud: 'クラウドプラットフォーム',
    colInfo: 'サイト情報・規約',
    colSocial: 'ソーシャルリンク',
    singleInfoButton: 'サイト概要・FAQ・プライバシー・利用規約',
    brandTitle: 'サポート',
    copyright: 'gmail : ccvv9c@gmail.com',
    officialPda4: 'PDA4 公式サイト',
    officialBayah: 'Bayah CV 公式サイト',
    appNames: {
      pda4: 'PDA4 スマートAI文書エディタ',
      translator: 'スマートオフライン翻訳',
      toolsHub: 'Tools Hub (Android ツール)',
      bayahCv: 'Bayah CV 履歴書スタジオ',
      voiceEnv: 'Voice Environment AI 音声スタジオ',
      compressor: '公式メディア圧縮ツール',
      organizer: 'Download Organizer (ダウンロード整理)',
    },
    hub: {
      badge: 'INFO & FAQ',
      title: 'よくある質問とサイト情報',
      subtitle: 'プラットフォームの概要、よくある質問、プライバシーポリシー、利用規約を1つのページにまとめました。',
      closeBtn: '閉じる',
      categories: [
        {
          category: 'プラットフォームについて',
          items: [
            {
              q: 'このサイトは何を提供していますか？',
              a: 'Windows、Android、Web向けに設計された7つのスマートアプリケーションとAIツールのプレビューおよび直接ダウンロードを提供する統合ポータルです。',
            },
            {
              q: 'どのようなアプリが含まれていますか？',
              a: 'PDA4、スマートオフライン翻訳、Tools Hub、Bayah CV、Voice Environment、公式メディア圧縮ツール、Download Organizerの7つのプロジェクトが含まれています。',
            },
          ],
        },
        {
          category: 'ダウンロードと使い方',
          items: [
            {
              q: 'アプリのダウンロード方法は？',
              a: '3Dホイール内のアプリをクリックして詳細ページを開き、下にスクロールするとEXE、Setup、APK、Webアプリのリンクが表示されます。',
            },
            {
              q: 'オフラインで動作しますか？',
              a: 'はい、スマートオフライン翻訳、Tools Hub、PDA4などはインターネット接続なしでローカル動作します。',
            },
          ],
        },
        {
          category: 'セキュリティとプライバシーポリシー',
          items: [
            {
              q: 'データはどのように保護されますか？',
              a: 'デバイス内のローカル処理を優先しているため、個人のファイルや音声データは安全に保たれます。',
            },
          ],
        },
        {
          category: '利用規約',
          items: [
            {
              q: '利用規約について教えてください。',
              a: 'すべてのアプリケーションは個人、学習、業務用途で無料でご利用いただけます。無断での商用再販は禁止されています。',
            },
          ],
        },
      ],
      bottomCardTitle: 'まだ疑問がありますか？',
      bottomCardSubtitle: 'お探しの回答が見つからない場合は、公式SNSリンクよりお気軽にお問い合わせください。',
      bottomCardCta: 'お問い合わせ',
    },
  },
};

export interface FooterProps {
  onSelectApp?: (appId: string) => void;
  onHubOpenChange?: (open: boolean) => void;
}

export function Footer({ onSelectApp, onHubOpenChange }: FooterProps) {
  const { lang } = useLanguage();
  const content = FOOTER_HUB_I18N[lang] ?? FOOTER_HUB_I18N.ar;
  const isRtl = lang === 'ar';

  const [hubOpen, setHubOpen] = useState(false);
  const [openKey, setOpenKey] = useState<string | null>('0-0');
  const savedScrollYRef = React.useRef<number>(0);

  const handleOpenHub = () => {
    if (typeof window !== 'undefined') {
      savedScrollYRef.current = window.scrollY;
    }
    setHubOpen(true);
    onHubOpenChange?.(true);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  };

  const handleCloseHub = () => {
    setHubOpen(false);
    onHubOpenChange?.(false);
    if (typeof window !== 'undefined') {
      const targetY = savedScrollYRef.current;
      requestAnimationFrame(() => {
        window.scrollTo({ top: targetY, behavior: 'instant' as ScrollBehavior });
      });
    }
  };

  React.useEffect(() => {
    if (!hubOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseHub();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [hubOpen]);

  const toggleItem = (key: string) => {
    setOpenKey((prev) => (prev === key ? null : key));
  };

  const handleAppClick = (e: React.MouseEvent<HTMLAnchorElement>, appId: string) => {
    if (onSelectApp) {
      e.preventDefault();
      onSelectApp(appId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800&display=swap');
        .clean-arabic-sans {
          font-family: 'Cairo', ui-sans-serif, system-ui, -apple-system, sans-serif;
        }
      `}</style>

      <footer
        dir={isRtl ? 'rtl' : 'ltr'}
        className={
          hubOpen
            ? 'hidden'
            : 'clean-arabic-sans md:rounded-t-6xl relative w-full max-w-6xl mx-auto flex flex-col items-center justify-center rounded-t-4xl border-t border-white/10 bg-[radial-gradient(35%_128px_at_50%_0%,rgba(255,255,255,0.08),transparent)] px-5 pt-10 pb-20 md:px-6 md:py-12 lg:py-16 text-white'
        }
      >
        <div className="bg-white/20 absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur" />

        <div className="grid w-full gap-6 md:gap-8 xl:grid-cols-3 xl:gap-8">
          <AnimatedContainer className="space-y-2">
            <p className="text-base font-bold tracking-tight text-white/90">
              {content.brandTitle}
            </p>
            <p
              dir="ltr"
              className="text-zinc-300 text-sm font-medium"
            >
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=ccvv9c@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Gmail Support"
                title="ccvv9c@gmail.com"
                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] p-2.5 transition-all duration-300 hover:scale-105 hover:border-white/25 hover:bg-white/10"
              >
                <svg
                  viewBox="52 42 88 66"
                  className="h-7 w-9"
                  aria-hidden="true"
                >
                  <path
                    fill="#4285f4"
                    d="M58 108h14V74L52 59v43c0 3.32 2.69 6 6 6"
                  />
                  <path
                    fill="#34a853"
                    d="M120 108h14c3.32 0 6-2.69 6-6V59l-20 15"
                  />
                  <path
                    fill="#fbbc04"
                    d="M120 48v26l20-15v-8c0-7.42-8.47-11.65-14.4-7.2"
                  />
                  <path
                    fill="#ea4335"
                    d="M72 74V48l24 18 24-18v26L96 92"
                  />
                  <path
                    fill="#c5221f"
                    d="M52 51v8l20 15V48l-5.6-4.2c-5.94-4.45-14.4-.22-14.4 7.2"
                  />
                </svg>
              </a>
            </p>
          </AnimatedContainer>

          <div className="mt-6 md:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4 xl:col-span-2 xl:mt-0">
            {/* Column 1: Apps */}
            <AnimatedContainer delay={0.1}>
              <div className="mb-2 sm:mb-6 md:mb-0">
                <h3 className="text-xs font-bold tracking-wider text-white/90 uppercase">
                  {content.colApps}
                </h3>
                <ul className="text-zinc-400 mt-3 md:mt-4 space-y-2.5 text-sm">
                  <li>
                    <a href="#pda4" onClick={(e) => handleAppClick(e, 'pda4')} className="hover:text-white inline-flex items-center transition-all duration-300">
                      {content.appNames.pda4}
                    </a>
                  </li>
                  <li>
                    <a href="#offline-translator" onClick={(e) => handleAppClick(e, 'offline-translator')} className="hover:text-white inline-flex items-center transition-all duration-300">
                      {content.appNames.translator}
                    </a>
                  </li>
                  <li>
                    <a href="#tools-hub" onClick={(e) => handleAppClick(e, 'tools-hub')} className="hover:text-white inline-flex items-center transition-all duration-300">
                      {content.appNames.toolsHub}
                    </a>
                  </li>
                  <li>
                    <a href="#bayah-cv" onClick={(e) => handleAppClick(e, 'bayah-cv')} className="hover:text-white inline-flex items-center transition-all duration-300">
                      {content.appNames.bayahCv}
                    </a>
                  </li>
                  <li>
                    <a href="#download-organizer" onClick={(e) => handleAppClick(e, 'download-organizer')} className="hover:text-white inline-flex items-center transition-all duration-300">
                      {content.appNames.organizer}
                    </a>
                  </li>
                </ul>
              </div>
            </AnimatedContainer>

            {/* Column 2: Cloud Platforms */}
            <AnimatedContainer delay={0.2}>
              <div className="mb-2 sm:mb-6 md:mb-0">
                <h3 className="text-xs font-bold tracking-wider text-white/90 uppercase">
                  {content.colCloud}
                </h3>
                <ul className="text-zinc-400 mt-3 md:mt-4 space-y-2.5 text-sm">
                  <li>
                    <a href="#voice-env" onClick={(e) => handleAppClick(e, 'voice-env')} className="hover:text-white inline-flex items-center transition-all duration-300">
                      {content.appNames.voiceEnv}
                    </a>
                  </li>
                  <li>
                    <a href="#media-compressor" onClick={(e) => handleAppClick(e, 'media-compressor')} className="hover:text-white inline-flex items-center transition-all duration-300">
                      {content.appNames.compressor}
                    </a>
                  </li>
                  <li>
                    <a href="https://pda4.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-white inline-flex items-center transition-all duration-300">
                      {content.officialPda4}
                    </a>
                  </li>
                  <li>
                    <a href="https://bayah-cv.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-white inline-flex items-center transition-all duration-300">
                      {content.officialBayah}
                    </a>
                  </li>
                </ul>
              </div>
            </AnimatedContainer>

            {/* Column 3: ONE Single Unified Info Button (Replaces the 4 separate links) */}
            <AnimatedContainer delay={0.3}>
              <div className="mb-2 sm:mb-6 md:mb-0">
                <h3 className="text-xs font-bold tracking-wider text-white/90 uppercase">
                  {content.colInfo}
                </h3>
                <div className="mt-3 md:mt-4">
                  <button
                    type="button"
                    onClick={handleOpenHub}
                    className="group inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2.5 text-xs md:text-sm font-medium text-zinc-200 transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:text-white cursor-pointer text-start"
                  >
                    <span>{content.singleInfoButton}</span>
                    <ArrowUpRight className="size-4 shrink-0 text-zinc-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
                  </button>
                </div>
              </div>
            </AnimatedContainer>

            {/* Column 4: Social Links */}
            <AnimatedContainer delay={0.4}>
              <div className="mb-2 sm:mb-6 md:mb-0">
                <h3 className="text-xs font-bold tracking-wider text-white/90 uppercase">
                  {content.colSocial}
                </h3>
                <ul className="text-zinc-400 mt-3 md:mt-4 space-y-2.5 text-sm">
                  <li>
                    <a href="https://www.facebook.com/share/1DwTLmUs8h/" target="_blank" rel="noopener noreferrer" className="hover:text-white inline-flex items-center gap-1.5 transition-all duration-300">
                      <FacebookIcon className="size-4" />
                      <span>Facebook</span>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/x4x28?cplk=MXQzcWIzd29sbmh5eg==" target="_blank" rel="noopener noreferrer" className="hover:text-white inline-flex items-center gap-1.5 transition-all duration-300">
                      <InstagramIcon className="size-4" />
                      <span>Instagram</span>
                    </a>
                  </li>
                  <li>
                    <a href="https://youtube.com/@jafar-x7h?si=PZur_KT6O54K0Qdv" target="_blank" rel="noopener noreferrer" className="hover:text-white inline-flex items-center gap-1.5 transition-all duration-300">
                      <YoutubeIcon className="size-4" />
                      <span>Youtube</span>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/in/jafar-al-sadiq-sattar-370392419?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" className="hover:text-white inline-flex items-center gap-1.5 transition-all duration-300">
                      <LinkedinIcon className="size-4" />
                      <span>LinkedIn</span>
                    </a>
                  </li>
                </ul>
              </div>
            </AnimatedContainer>
          </div>
        </div>
      </footer>

      {/* Standalone Separate Dark FAQ / Info Accordion Page */}
      {hubOpen && (
        <div
          dir={isRtl ? 'rtl' : 'ltr'}
          className="clean-arabic-sans min-h-screen w-full bg-[#070709] text-white"
        >
          <div className="relative mx-auto w-full max-w-2xl px-5 pt-20 pb-24 md:px-6 md:py-24">
            {/* Top Close Button */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleCloseHub();
              }}
              aria-label={content.hub.closeBtn}
              className="fixed top-4 right-4 md:top-6 md:right-6 z-[9999] pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/20 bg-zinc-900/90 px-4 py-2 md:px-5 md:py-2.5 text-xs md:text-sm font-semibold text-white shadow-xl backdrop-blur-md transition hover:border-white/40 hover:bg-zinc-800 active:scale-95 cursor-pointer"
            >
              <X className="size-4" />
              <span>{content.hub.closeBtn}</span>
            </button>

              {/* Header */}
              <div className="text-center mb-10 md:mb-14">
                <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                  {content.hub.badge}
                </span>
                <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
                  {content.hub.title}
                </h2>
                <p className="mt-3 text-sm md:text-base text-zinc-400">
                  {content.hub.subtitle}
                </p>
              </div>

              {/* Categorized Accordions */}
              <div className="space-y-10">
                {content.hub.categories.map((cat, cIdx) => (
                  <div key={cIdx}>
                    <h3 className="text-xs font-semibold tracking-wide text-zinc-400 mb-3">
                      {cat.category}
                    </h3>
                    <div className="divide-y divide-white/10 border-b border-white/10">
                      {cat.items.map((item, iIdx) => {
                        const key = `${cIdx}-${iIdx}`;
                        const isOpen = openKey === key;
                        return (
                          <div key={key} className="py-4">
                            <button
                              type="button"
                              onClick={() => toggleItem(key)}
                              className="flex w-full items-center justify-between gap-4 text-start text-sm md:text-[15px] font-medium text-white hover:text-zinc-200 transition cursor-pointer"
                            >
                              <span>{item.q}</span>
                              <ChevronDown
                                className={`size-4 shrink-0 text-zinc-400 transition-transform duration-300 ${
                                  isOpen ? 'rotate-180 text-white' : ''
                                }`}
                              />
                            </button>
                            <AnimatePresence initial={false}>
                              {isOpen && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                                  className="overflow-hidden"
                                >
                                  <p className="pt-3 text-xs md:text-sm leading-relaxed text-zinc-400">
                                    {item.a}
                                  </p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom "Still have questions?" Card */}
              <div className="mt-14 rounded-2xl border border-white/10 bg-white/[0.02] p-8 text-center">
                <div className="mx-auto mb-4 flex items-center justify-center -space-x-2">
                  <div className="flex size-9 items-center justify-center rounded-full border-2 border-[#070709] bg-zinc-800 text-xs font-bold text-white">
                    AI
                  </div>
                  <div className="flex size-10 items-center justify-center rounded-full border-2 border-[#070709] bg-zinc-700 text-xs font-bold text-white">
                    24/7
                  </div>
                  <div className="flex size-9 items-center justify-center rounded-full border-2 border-[#070709] bg-zinc-800 text-xs font-bold text-white">
                    PRO
                  </div>
                </div>
                <h4 className="text-lg font-bold text-white">
                  {content.hub.bottomCardTitle}
                </h4>
                <p className="mx-auto mt-1.5 max-w-md text-xs md:text-sm text-zinc-400">
                  {content.hub.bottomCardSubtitle}
                </p>
                <a
                  href="https://www.linkedin.com/in/jafar-al-sadiq-sattar-370392419?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center justify-center rounded-lg bg-white px-5 py-2 text-xs font-semibold text-black transition hover:bg-zinc-200"
                >
                  {content.hub.bottomCardCta}
                </a>
              </div>
          </div>
        </div>
      )}
    </>
  );
}

type ViewAnimationProps = {
  delay?: number;
  className?: ComponentProps<typeof motion.div>['className'];
  children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
