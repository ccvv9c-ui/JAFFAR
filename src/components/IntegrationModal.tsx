import { Check, Copy, Terminal, X } from "lucide-react";
import { useState } from "react";

interface IntegrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  jsxSnippet: string;
}

export function IntegrationModal({ isOpen, onClose, jsxSnippet }: IntegrationModalProps) {
  const [copiedBlock, setCopiedBlock] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyText = (key: string, text: string) => {
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopiedBlock(key);
    setTimeout(() => setCopiedBlock(null), 1800);
  };

  const cliSetupText = `npx shadcn@latest init --defaults
npm install tw-animate-css lucide-react clsx tailwind-merge`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="integration-modal-title"
    >
      <div className="relative flex max-h-[88vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-slate-800 bg-[#07090e] text-slate-100 shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
          <div className="space-y-0.5">
            <h2 id="integration-modal-title" className="text-base font-semibold text-white">
              shadcn/ui Integration &amp; Live JSX Specification
            </h2>
            <p className="text-xs text-slate-400">
              Component path: <code className="font-mono text-cyan-400">@/components/ui/data-rain</code>
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Integration Specification"
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Live JSX Snippet */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-300">
                01. Live Configured JSX (<code className="font-mono text-cyan-400">demo.tsx</code>)
              </span>
              <button
                type="button"
                onClick={() => copyText("jsx", jsxSnippet)}
                className="flex items-center gap-1.5 rounded-md border border-slate-700 bg-slate-900 px-2.5 py-1 text-xs font-medium text-slate-200 hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0"
              >
                {copiedBlock === "jsx" ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Copied JSX</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy JSX</span>
                  </>
                )}
              </button>
            </div>
            <pre className="overflow-x-auto rounded-lg border border-slate-800 bg-[#020308] p-4 font-mono text-xs leading-relaxed text-cyan-300">
              <code>{jsxSnippet}</code>
            </pre>
          </div>

          {/* CLI & Architecture Guide */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-300">
                02. Project Setup via shadcn CLI &amp; Tailwind v4
              </span>
              <button
                type="button"
                onClick={() => copyText("cli", cliSetupText)}
                className="flex items-center gap-1.5 rounded-md border border-slate-700 bg-slate-900 px-2.5 py-1 text-xs font-medium text-slate-200 hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0"
              >
                {copiedBlock === "cli" ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Copied CLI</span>
                  </>
                ) : (
                  <>
                    <Terminal className="h-3.5 w-3.5" />
                    <span>Copy CLI Commands</span>
                  </>
                )}
              </button>
            </div>
            <pre className="overflow-x-auto rounded-lg border border-slate-800 bg-[#020308] p-4 font-mono text-xs leading-relaxed text-slate-300">
              <code>{cliSetupText}</code>
            </pre>
            <p className="text-xs leading-relaxed text-slate-400">
              Placing reusable visual primitives in{" "}
              <code className="font-mono text-slate-200">/components/ui</code> (mapped via{" "}
              <code className="font-mono text-slate-200">@/components/ui/*</code> in{" "}
              <code className="font-mono text-slate-200">tsconfig.json</code> and{" "}
              <code className="font-mono text-slate-200">components.json</code>) ensures deterministic
              imports across pages and compatibility with standard shadcn CLI tooling.
            </p>
          </div>

          {/* Props Reference Table */}
          <div className="space-y-2">
            <span className="text-xs font-medium text-slate-300">
              03. Component Props &amp; Physics Parameters
            </span>
            <div className="overflow-x-auto rounded-lg border border-slate-800">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-slate-800 bg-slate-900/70 font-mono text-slate-400">
                  <tr>
                    <th className="px-3.5 py-2.5">Prop</th>
                    <th className="px-3.5 py-2.5">Type</th>
                    <th className="px-3.5 py-2.5">Default</th>
                    <th className="px-3.5 py-2.5">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/70 bg-[#020308] text-slate-300">
                  <tr>
                    <td className="px-3.5 py-2 font-mono text-cyan-400">count</td>
                    <td className="px-3.5 py-2 font-mono text-slate-400">number</td>
                    <td className="px-3.5 py-2 font-mono tabular-nums">Auto (1200–5200)</td>
                    <td className="px-3.5 py-2">Active particle count (up to 7,000 max capacity)</td>
                  </tr>
                  <tr>
                    <td className="px-3.5 py-2 font-mono text-cyan-400">flowSpeed</td>
                    <td className="px-3.5 py-2 font-mono text-slate-400">number</td>
                    <td className="px-3.5 py-2 font-mono tabular-nums">1.0</td>
                    <td className="px-3.5 py-2">Vertical advection velocity multiplier (0.05 – 5.0)</td>
                  </tr>
                  <tr>
                    <td className="px-3.5 py-2 font-mono text-cyan-400">obstacleRadius</td>
                    <td className="px-3.5 py-2 font-mono text-slate-400">number</td>
                    <td className="px-3.5 py-2 font-mono tabular-nums">64</td>
                    <td className="px-3.5 py-2">Potential-flow cylinder radius in CSS pixels</td>
                  </tr>
                  <tr>
                    <td className="px-3.5 py-2 font-mono text-cyan-400">autopilot</td>
                    <td className="px-3.5 py-2 font-mono text-slate-400">boolean</td>
                    <td className="px-3.5 py-2 font-mono">true</td>
                    <td className="px-3.5 py-2">Lissajous ghost attractor when pointer is idle</td>
                  </tr>
                  <tr>
                    <td className="px-3.5 py-2 font-mono text-cyan-400">fullscreen</td>
                    <td className="px-3.5 py-2 font-mono text-slate-400">boolean</td>
                    <td className="px-3.5 py-2 font-mono">true</td>
                    <td className="px-3.5 py-2">Fixed full-viewport mode vs contained parent layout</td>
                  </tr>
                  <tr>
                    <td className="px-3.5 py-2 font-mono text-cyan-400">palette</td>
                    <td className="px-3.5 py-2 font-mono text-slate-400">DataRainPalette</td>
                    <td className="px-3.5 py-2 font-mono">CSS vars</td>
                    <td className="px-3.5 py-2">Hex colors for calm, mid, and hot velocity buckets</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end border-t border-slate-800 bg-slate-950/60 px-6 py-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-slate-800 px-4 py-2 text-xs font-medium text-white hover:bg-slate-700 transition-colors whitespace-nowrap shrink-0"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
