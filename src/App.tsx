/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useMemo, useState } from "react";
import DataRain, { type DataRainPalette } from "@/components/ui/data-rain";
import SignaturePenFooter from "@/components/ui/signature-pen-footer";
import WorksWheel, { JAAFAR_APPS, type WorkItem } from "@/components/ui/works-wheel";
import AppShowcaseView, {
  APPS_SHOWCASE_DATA,
  resolveAppShowcaseId,
} from "@/components/ui/app-showcase-view";
import { Footer } from "@/components/ui/footer-section";
import { LanguageProvider, useLanguage } from "@/lib/i18n";
import {
  generateComponentJSX,
  PALETTE_PRESETS,
  SIMULATION_PRESETS,
} from "@/lib/data-rain-config";
import {
  Check,
  Copy,
  RotateCcw,
  Settings,
  X,
} from "lucide-react";

function AppContent() {
  const { t } = useLanguage();
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
  const [infoHubOpen, setInfoHubOpen] = useState<boolean>(false);
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [copiedToast, setCopiedToast] = useState<boolean>(false);

  // Simulation parameters
  const [autoCount, setAutoCount] = useState<boolean>(false);
  const [count, setCount] = useState<number>(3200);
  const [flowSpeed, setFlowSpeed] = useState<number>(1.0);
  const [obstacleRadius, setObstacleRadius] = useState<number>(64);
  const [autopilot, setAutopilot] = useState<boolean>(true);
  const [activePresetId, setActivePresetId] = useState<string>("default-vortex");
  const [palette, setPalette] = useState<DataRainPalette>({
    calm: "#22e6ff",
    mid: "#8a5cff",
    hot: "#ff3d9a",
  });

  const localizedApps = useMemo(
    () =>
      JAAFAR_APPS.map((item) => {
        const key = String(item.id ?? "");
        const trans = t.apps[key];
        return {
          ...item,
          title: trans?.shortTitle ?? item.title,
          subtitle: trans?.description ?? item.subtitle,
        };
      }),
    [t]
  );

  const jsxSnippet = useMemo(
    () =>
      generateComponentJSX({
        count: autoCount ? undefined : count,
        flowSpeed,
        obstacleRadius,
        autopilot,
        fullscreen: true,
        palette,
      }),
    [autoCount, count, flowSpeed, obstacleRadius, autopilot, palette]
  );

  const handleApplySimulationPreset = (presetId: string) => {
    const preset = SIMULATION_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    setActivePresetId(preset.id);
    setAutoCount(false);
    setCount(preset.count);
    setFlowSpeed(preset.flowSpeed);
    setObstacleRadius(preset.obstacleRadius);
    setAutopilot(preset.autopilot);
    const matchingPalette = PALETTE_PRESETS.find((pal) => pal.id === preset.paletteId);
    if (matchingPalette) {
      setPalette({ ...matchingPalette.palette });
    }
  };

  const handleResetDefaults = () => {
    handleApplySimulationPreset("default-vortex");
  };

  const handleCopyJsx = () => {
    navigator.clipboard?.writeText(jsxSnippet).catch(() => {});
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 1800);
  };

  const handleSelectWheelApp = (item: WorkItem) => {
    const appId = resolveAppShowcaseId(item);
    if (APPS_SHOWCASE_DATA[appId]) {
      setSelectedAppId(appId);
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }
  };

  if (selectedAppId && APPS_SHOWCASE_DATA[selectedAppId]) {
    return (
      <AppShowcaseView
        app={APPS_SHOWCASE_DATA[selectedAppId]}
        onBack={() => {
          setSelectedAppId(null);
          window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
        }}
      />
    );
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#050507]">
      {!infoHubOpen && (
        <>
          {/* Page 1: SignaturePenFooter at the beginning of the site */}
          <SignaturePenFooter
            actions={[]}
            brand=""
            description={t.heroDesc}
            dir={t.dir}
            height="100svh"
            legal=""
            links={[]}
            signAgainLabel={t.signAgain}
            stamp=""
            title={t.heroTitle}
            word="Jaafar Al-Abadi"
          />

          {/* Page 2: 3D Interactive Applications Showcase ("WorksWheel") immediately below */}
          <WorksWheel
            centerTitle={t.wheelCenterTitle}
            dir={t.dir}
            items={localizedApps}
            height="100svh"
            initialMode="wheel"
            onItemClick={handleSelectWheelApp}
            viewLabel={t.viewBtn}
          />
        </>
      )}

      {/* Page 3: Unobstructed DataRain Canvas immediately below with Floating Glass Gear */}
      <section className={infoHubOpen ? "hidden" : "relative h-screen w-full overflow-hidden bg-[#050507] text-slate-100 select-none"}>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-40 bg-gradient-to-b from-[#050507] via-[#050507]/80 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-t from-[#050507] via-[#050507]/80 to-transparent"
        />
        <DataRain
          count={autoCount ? undefined : count}
          flowSpeed={flowSpeed}
          obstacleRadius={obstacleRadius}
          autopilot={autopilot}
          fullscreen={false}
          palette={palette}
        />

        {/* Floating Glass Gear & Animated Customization Popover */}
        <div className="absolute bottom-5 right-5 z-30 flex flex-col items-end">
        <aside
          aria-label="Simulation Customization"
          aria-hidden={!settingsOpen}
          className={`mb-3 w-[310px] origin-bottom-right rounded-2xl border border-white/15 bg-[#070a14]/75 p-4 text-slate-100 shadow-2xl backdrop-blur-xl space-y-4 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            settingsOpen
              ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
              : "pointer-events-none translate-y-3 scale-90 opacity-0"
          }`}
        >
          {/* Popover Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
            <span className="text-xs font-medium tracking-wide text-white/90">
              Customization
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                tabIndex={settingsOpen ? 0 : -1}
                onClick={handleCopyJsx}
                aria-label="Copy JSX Snippet"
                title="Copy JSX Snippet"
                className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-[11px] font-medium text-slate-200 hover:bg-white/10 hover:text-white transition-colors"
              >
                {copiedToast ? (
                  <>
                    <Check className="h-3 w-3 text-emerald-400" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3 text-cyan-300" />
                    <span>JSX</span>
                  </>
                )}
              </button>
              <button
                type="button"
                tabIndex={settingsOpen ? 0 : -1}
                onClick={handleResetDefaults}
                aria-label="Reset Defaults"
                title="Reset Defaults"
                className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                tabIndex={settingsOpen ? 0 : -1}
                onClick={() => setSettingsOpen(false)}
                aria-label="Close Customization"
                title="Close"
                className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Presets */}
          <div className="grid grid-cols-2 gap-1.5">
            {SIMULATION_PRESETS.map((preset) => {
              const isSelected = activePresetId === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  tabIndex={settingsOpen ? 0 : -1}
                  onClick={() => handleApplySimulationPreset(preset.id)}
                  className={`rounded-lg border px-2.5 py-1.5 text-left text-[11px] font-medium transition-colors truncate ${
                    isSelected
                      ? "border-cyan-400/60 bg-cyan-500/20 text-cyan-200"
                      : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>

          {/* Sliders */}
          <div className="space-y-3">
            {/* Particle Count */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <label htmlFor="particle-count-slider" className="text-slate-300">
                  Particles
                </label>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    tabIndex={settingsOpen ? 0 : -1}
                    onClick={() => setAutoCount(!autoCount)}
                    className={`rounded px-1.5 py-0.5 font-mono text-[10px] transition-colors ${
                      autoCount
                        ? "bg-cyan-400/25 text-cyan-200 border border-cyan-400/40"
                        : "bg-white/10 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    Auto
                  </button>
                  <span className="font-mono tabular-nums text-white/90">
                    {autoCount ? "Auto" : count.toLocaleString()}
                  </span>
                </div>
              </div>
              <input
                id="particle-count-slider"
                type="range"
                tabIndex={settingsOpen ? 0 : -1}
                min={600}
                max={7000}
                step={200}
                disabled={autoCount}
                value={count}
                onChange={(e) => {
                  setAutoCount(false);
                  setActivePresetId("custom");
                  setCount(Number(e.target.value));
                }}
                className="h-1 w-full cursor-pointer appearance-none rounded-lg bg-white/15 accent-cyan-400 disabled:opacity-40"
              />
            </div>

            {/* Flow Speed */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <label htmlFor="flow-speed-slider" className="text-slate-300">
                  Flow Speed
                </label>
                <span className="font-mono tabular-nums text-white/90">
                  {flowSpeed.toFixed(2)}x
                </span>
              </div>
              <input
                id="flow-speed-slider"
                type="range"
                tabIndex={settingsOpen ? 0 : -1}
                min={0.2}
                max={3.5}
                step={0.05}
                value={flowSpeed}
                onChange={(e) => {
                  setActivePresetId("custom");
                  setFlowSpeed(Number(e.target.value));
                }}
                className="h-1 w-full cursor-pointer appearance-none rounded-lg bg-white/15 accent-cyan-400"
              />
            </div>

            {/* Obstacle Radius */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <label htmlFor="obstacle-radius-slider" className="text-slate-300">
                  Vortex Radius
                </label>
                <span className="font-mono tabular-nums text-white/90">
                  {obstacleRadius} px
                </span>
              </div>
              <input
                id="obstacle-radius-slider"
                type="range"
                tabIndex={settingsOpen ? 0 : -1}
                min={24}
                max={140}
                step={4}
                value={obstacleRadius}
                onChange={(e) => {
                  setActivePresetId("custom");
                  setObstacleRadius(Number(e.target.value));
                }}
                className="h-1 w-full cursor-pointer appearance-none rounded-lg bg-white/15 accent-cyan-400"
              />
            </div>
          </div>

          {/* Palette & Autopilot */}
          <div className="space-y-2.5 border-t border-white/10 pt-3">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-300">Palette</span>
              <div className="flex items-center gap-1.5">
                {PALETTE_PRESETS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    tabIndex={settingsOpen ? 0 : -1}
                    onClick={() => setPalette({ ...p.palette })}
                    aria-label={`Apply ${p.name} palette`}
                    title={p.name}
                    className="h-3.5 w-3.5 rounded-full border border-white/30 transition-transform hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg, ${p.palette.calm}, ${p.palette.hot})`,
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-1.5">
              <label className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-black/30 px-2 py-1 text-[11px] cursor-pointer">
                <input
                  type="color"
                  tabIndex={settingsOpen ? 0 : -1}
                  aria-label="Calm velocity color"
                  value={palette.calm}
                  onChange={(e) => setPalette({ ...palette, calm: e.target.value })}
                  className="h-3.5 w-3.5 cursor-pointer border-0 bg-transparent p-0"
                />
                <span className="font-mono text-slate-300">Calm</span>
              </label>
              <label className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-black/30 px-2 py-1 text-[11px] cursor-pointer">
                <input
                  type="color"
                  tabIndex={settingsOpen ? 0 : -1}
                  aria-label="Mid shear color"
                  value={palette.mid}
                  onChange={(e) => setPalette({ ...palette, mid: e.target.value })}
                  className="h-3.5 w-3.5 cursor-pointer border-0 bg-transparent p-0"
                />
                <span className="font-mono text-slate-300">Mid</span>
              </label>
              <label className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-black/30 px-2 py-1 text-[11px] cursor-pointer">
                <input
                  type="color"
                  tabIndex={settingsOpen ? 0 : -1}
                  aria-label="Hot vortex color"
                  value={palette.hot}
                  onChange={(e) => setPalette({ ...palette, hot: e.target.value })}
                  className="h-3.5 w-3.5 cursor-pointer border-0 bg-transparent p-0"
                />
                <span className="font-mono text-slate-300">Hot</span>
              </label>
            </div>

            <button
              type="button"
              role="switch"
              tabIndex={settingsOpen ? 0 : -1}
              aria-checked={autopilot}
              onClick={() => setAutopilot(!autopilot)}
              className={`flex w-full items-center justify-between rounded-lg border px-2.5 py-1.5 text-[11px] font-medium transition-colors ${
                autopilot
                  ? "border-cyan-400/40 bg-cyan-500/15 text-cyan-200"
                  : "border-white/10 bg-white/5 text-slate-400"
              }`}
            >
              <span>Ghost Autopilot</span>
              <span className="font-mono text-[10px]">{autopilot ? "ON" : "OFF"}</span>
            </button>
          </div>
        </aside>

        {/* Small Floating Transparent Glass Gear Button */}
        <button
          type="button"
          onClick={() => setSettingsOpen((prev) => !prev)}
          aria-label="Toggle Customization Settings"
          aria-expanded={settingsOpen}
          className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:text-white active:scale-95"
        >
          <Settings
            className={`h-4 w-4 transition-transform duration-500 ease-out ${
              settingsOpen ? "rotate-90 text-cyan-300" : "group-hover:rotate-45"
            }`}
          />
        </button>
        </div>
      </section>

      <div className={infoHubOpen ? "relative z-[100]" : "relative z-20 -mt-12"}>
        <Footer
          onSelectApp={(appId) => setSelectedAppId(appId)}
          onHubOpenChange={(open) => {
            setInfoHubOpen(open);
            if (open) setSettingsOpen(false);
          }}
        />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

