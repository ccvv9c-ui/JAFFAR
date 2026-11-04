import DataRain, { type DataRainPalette } from "@/components/ui/data-rain";
import { ArrowUpRight, Sliders, Sparkles, Waves } from "lucide-react";

interface ContainedShowcaseProps {
  flowSpeed: number;
  obstacleRadius: number;
  autopilot: boolean;
  palette: DataRainPalette;
  onReturnToStage: () => void;
  onOpenSpec: () => void;
}

export function ContainedShowcase({
  flowSpeed,
  obstacleRadius,
  autopilot,
  palette,
  onReturnToStage,
  onOpenSpec,
}: ContainedShowcaseProps) {
  return (
    <div className="relative z-10 min-h-screen bg-[#05070d] px-6 py-10 md:px-12">
      <div className="mx-auto max-w-6xl space-y-10">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-4 border-b border-slate-800/80 pb-6 md:flex-row md:items-end">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <span>CONTAINED CONTAINER MODE</span>
              <span aria-hidden="true">·</span>
              <span>fullscreen=&#123;false&#125;</span>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-100 md:text-3xl">
              Bounded Viewport &amp; Card Integration
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-slate-400">
              When <code className="font-mono text-slate-200">fullscreen=&#123;false&#125;</code> is passed,{" "}
              <code className="font-mono text-slate-200">DataRain</code> applies{" "}
              <code className="font-mono text-slate-200">.dr-root--contained</code> and tracks its parent
              container dimensions automatically via <code className="font-mono text-slate-200">ResizeObserver</code>.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenSpec}
              className="px-4 py-2 text-xs font-medium text-slate-200 bg-slate-900 border border-slate-700/80 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0"
            >
              View Code Snippet
            </button>
            <button
              type="button"
              onClick={onReturnToStage}
              className="px-4 py-2 text-xs font-medium text-slate-950 bg-cyan-400 rounded-lg hover:bg-cyan-300 transition-colors whitespace-nowrap shrink-0"
            >
              Return to Fullscreen Stage
            </button>
          </div>
        </div>

        {/* Primary Contained Hero Card */}
        <div className="relative h-[380px] w-full overflow-hidden rounded-xl border border-slate-800 bg-[#020308]">
          <DataRain
            fullscreen={false}
            count={2400}
            flowSpeed={flowSpeed}
            obstacleRadius={obstacleRadius}
            autopilot={autopilot}
            palette={palette}
          />
          <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between bg-gradient-to-t from-[#020308]/90 via-[#020308]/25 to-transparent p-8">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span>01. HERO SURFACE EMBED</span>
              <span>2,400 PARTICLES · QUARTER-RES BLOOM</span>
            </div>
            <div className="max-w-xl space-y-3">
              <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
                Divergence-Free Potential Flow &amp; Vortex Street
              </h2>
              <p className="text-sm leading-relaxed text-slate-300">
                Move your cursor inside this card container to deflect the local stream and shed
                alternating Lamb–Oseen vortices without affecting sibling cards on the page.
              </p>
            </div>
          </div>
        </div>

        {/* Secondary 2-Column Contained Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 items-stretch">
          <div className="relative flex h-[280px] flex-col justify-between overflow-hidden rounded-xl border border-slate-800 bg-[#020308]">
            <DataRain
              fullscreen={false}
              count={1400}
              flowSpeed={0.65}
              obstacleRadius={48}
              autopilot={true}
              palette={{ calm: "#00f5d4", mid: "#00bbf9", hot: "#7b2cbf" }}
            />
            <div className="pointer-events-none relative z-10 flex h-full flex-col justify-between bg-gradient-to-t from-[#020308]/90 via-transparent to-transparent p-6">
              <div className="flex items-center gap-2 text-xs font-mono text-teal-300">
                <Waves className="h-3.5 w-3.5" />
                <span>02. LAMINAR SUB-FIELD</span>
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-semibold text-white">Pelagic Bioluminescence</h3>
                <p className="text-xs leading-relaxed text-slate-300">
                  Independent instance running at 0.65x velocity with 1,400 particles and custom
                  cyan-violet spectral overrides.
                </p>
              </div>
            </div>
          </div>

          <div className="relative flex h-[280px] flex-col justify-between overflow-hidden rounded-xl border border-slate-800 bg-[#020308]">
            <DataRain
              fullscreen={false}
              count={1800}
              flowSpeed={1.85}
              obstacleRadius={72}
              autopilot={true}
              palette={{ calm: "#38bdf8", mid: "#f59e0b", hot: "#ef4444" }}
            />
            <div className="pointer-events-none relative z-10 flex h-full flex-col justify-between bg-gradient-to-t from-[#020308]/90 via-transparent to-transparent p-6">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-300">
                <Sparkles className="h-3.5 w-3.5" />
                <span>03. HIGH-SHEAR PLASMA WAKE</span>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">Coronal Mass Ejection</h3>
                  <ArrowUpRight className="h-4 w-4 text-slate-400" />
                </div>
                <p className="text-xs leading-relaxed text-slate-300">
                  High-velocity 1.85x stream demonstrating accelerated synaptic firing and white-hot
                  leading edge sparks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
