"use client";

import * as React from "react";
import { LayoutGroup, MotionConfig, motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface Locale {
  code: string;
  label?: string;
  flag?: string;
  rtl?: boolean;
}

export interface LanguageSwitcherPillClassNames {
  root?: string;
  item?: string;
  activeItem?: string;
  indicator?: string;
  flag?: string;
}

export interface LanguageSwitcherPillProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "defaultValue" | "onChange"> {
  locales: Locale[];
  locale?: string;
  defaultLocale?: string;
  onLocaleChange?: (code: string) => void;
  variant?: "default" | "outline";
  size?: "sm" | "default" | "lg";
  showFlags?: boolean;
  disabled?: boolean;
  "aria-label"?: string;
  classNames?: LanguageSwitcherPillClassNames;
}

const RTL_LANGUAGES = new Set(["ar", "he", "fa", "ur", "ps", "sd", "yi"]);
const RTL_SCRIPTS = new Set(["arab", "hebr", "thaa", "nkoo", "adlm", "syrc"]);

function isRtl(code: string): boolean {
  const [lang, ...rest] = code.toLowerCase().split("-");
  const script = rest.find((subtag) => /^[a-z]{4}$/.test(subtag));
  if (script) return RTL_SCRIPTS.has(script);
  return RTL_LANGUAGES.has(lang);
}

const LANGUAGE_FLAGS: Record<string, string> = {
  en: "🇺🇸",
  fr: "🇫🇷",
  es: "🇪🇸",
  de: "🇩🇪",
  it: "🇮🇹",
  pt: "🇵🇹",
  nl: "🇳🇱",
  ja: "🇯🇵",
  ko: "🇰🇷",
  zh: "🇨🇳",
  hi: "🇮🇳",
  ar: "🇸🇦",
  he: "🇮🇱",
  ru: "🇷🇺",
  tr: "🇹🇷",
  pl: "🇵🇱",
  sv: "🇸🇪",
  uk: "🇺🇦",
  vi: "🇻🇳",
  th: "🇹🇭",
  id: "🇮🇩",
};

function getFlag(code: string): string {
  const region = code.split("-").find((subtag, i) => i > 0 && /^[a-z]{2}$/i.test(subtag));
  if (region) {
    return String.fromCodePoint(
      ...[...region.toUpperCase()].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65),
    );
  }
  return LANGUAGE_FLAGS[code.split("-")[0].toLowerCase()] ?? "🌐";
}

function useControllableState<T>(
  value: T | undefined,
  defaultValue: T,
  onChange?: (next: T) => void,
): [T, (next: T) => void] {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue);
  const onChangeRef = React.useRef(onChange);
  React.useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  const setValue = React.useCallback(
    (next: T) => {
      if (!isControlled) setInternal(next);
      onChangeRef.current?.(next);
    },
    [isControlled],
  );

  return [isControlled ? value : internal, setValue];
}

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

const TRACK_VARIANTS = {
  default: "bg-muted",
  outline: "border border-white/15 bg-black/65 backdrop-blur-xl shadow-lg",
} as const;

const INDICATOR_VARIANTS = {
  default: "bg-background shadow-sm ring-1 ring-border",
  outline: "bg-white/15 ring-1 ring-white/25",
} as const;

const TRACK_SIZES = {
  sm: "gap-0.5 p-0.5",
  default: "gap-0.5 p-1",
  lg: "gap-1 p-1",
} as const;

const ITEM_SIZES = {
  sm: "h-6 gap-1 px-2.5 text-[11px]",
  default: "h-7 gap-1.5 px-3 text-sm",
  lg: "h-9 gap-2 px-4 text-sm",
} as const;

export const LanguageSwitcherPill = React.forwardRef<HTMLDivElement, LanguageSwitcherPillProps>(
  function LanguageSwitcherPill(
    {
      locales,
      locale: localeProp,
      defaultLocale,
      onLocaleChange,
      variant = "outline",
      size = "sm",
      showFlags = false,
      disabled = false,
      classNames,
      className,
      dir: dirProp,
      "aria-label": ariaLabel = "Select language",
      ...rest
    },
    forwardedRef,
  ) {
    const [locale, setLocale] = useControllableState(
      localeProp,
      defaultLocale ?? locales[0]?.code ?? "",
      onLocaleChange,
    );

    const rootRef = React.useRef<HTMLDivElement>(null);
    const buttonRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
    const layoutId = React.useId();

    React.useImperativeHandle(forwardedRef, () => rootRef.current as HTMLDivElement);

    const selected = locales.some((item) => item.code === locale)
      ? locale
      : (locales[0]?.code ?? "");

    const [inheritedDir, setInheritedDir] = React.useState<"ltr" | "rtl">("ltr");
    useIsomorphicLayoutEffect(() => {
      if (dirProp || !rootRef.current) return;
      const computed = window.getComputedStyle(rootRef.current).direction;
      if (computed === "rtl" || computed === "ltr") setInheritedDir(computed);
    }, [dirProp]);
    const direction = dirProp === "rtl" || dirProp === "ltr" ? dirProp : inheritedDir;

    const select = (code: string) => {
      if (!disabled) setLocale(code);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
      const count = locales.length;
      const forward = direction === "rtl" ? "ArrowLeft" : "ArrowRight";
      const backward = direction === "rtl" ? "ArrowRight" : "ArrowLeft";

      let next: number;
      if (event.key === "Home") next = 0;
      else if (event.key === "End") next = count - 1;
      else if (event.key === forward || event.key === "ArrowDown") next = (index + 1) % count;
      else if (event.key === backward || event.key === "ArrowUp") next = (index - 1 + count) % count;
      else return;

      event.preventDefault();
      const target = locales[next];
      if (!target) return;
      select(target.code);
      buttonRefs.current[next]?.focus();
    };

    return (
      <MotionConfig reducedMotion="user">
        <LayoutGroup id={layoutId}>
          <div
            ref={rootRef}
            dir={dirProp}
            role="radiogroup"
            aria-label={ariaLabel}
            aria-disabled={disabled || undefined}
            data-disabled={disabled ? "" : undefined}
            className={cn(
              "relative inline-flex max-w-full flex-row items-center overflow-x-auto rounded-full",
              TRACK_VARIANTS[variant],
              TRACK_SIZES[size],
              disabled && "opacity-50",
              classNames?.root,
              className,
            )}
            {...rest}
          >
            {locales.map((item, index) => {
              const isActive = item.code === selected;
              const rtl = item.rtl ?? isRtl(item.code);

              return (
                <button
                  key={item.code}
                  ref={(element) => {
                    buttonRefs.current[index] = element;
                  }}
                  type="button"
                  role="radio"
                  aria-checked={isActive}
                  data-state={isActive ? "checked" : "unchecked"}
                  tabIndex={isActive ? 0 : -1}
                  disabled={disabled}
                  lang={item.code}
                  dir={rtl ? "rtl" : "ltr"}
                  onClick={() => select(item.code)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                  className={cn(
                    "relative inline-flex shrink-0 select-none items-center justify-center whitespace-nowrap rounded-full font-medium outline-none transition-colors duration-200 cursor-pointer",
                    "focus-visible:ring-2 focus-visible:ring-white/40",
                    "disabled:pointer-events-none",
                    ITEM_SIZES[size],
                    isActive
                      ? "text-white font-semibold"
                      : "text-zinc-400 hover:bg-white/5 hover:text-white/90",
                    classNames?.item,
                    isActive && classNames?.activeItem,
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="indicator"
                      aria-hidden="true"
                      className={cn(
                        "pointer-events-none absolute inset-0 rounded-full",
                        INDICATOR_VARIANTS[variant],
                        classNames?.indicator,
                      )}
                      transition={{ type: "spring", bounce: 0.18, duration: 0.45 }}
                    />
                  )}
                  {showFlags && (
                    <span aria-hidden="true" className={cn("relative leading-none", classNames?.flag)}>
                      {item.flag ?? getFlag(item.code)}
                    </span>
                  )}
                  <span className="relative">{item.label ?? item.code}</span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>
      </MotionConfig>
    );
  },
);

export default LanguageSwitcherPill;
