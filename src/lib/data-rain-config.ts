import type { DataRainPalette, DataRainProps } from "../components/ui/data-rain";

export interface PalettePreset {
  id: string;
  name: string;
  subtitle: string;
  palette: DataRainPalette;
}

export interface SimulationPreset {
  id: string;
  label: string;
  description: string;
  count: number;
  flowSpeed: number;
  obstacleRadius: number;
  autopilot: boolean;
  paletteId: string;
}

export interface HydrodynamicTelemetry {
  reynoldsEstimate: number;
  strouhalFrequencyHz: number;
  meanVelocityPxPerSec: number;
  vortexPoolCapacity: number;
  trailSegmentsPerParticle: number;
  regimeLabel: "Laminar" | "Transitional Wake" | "Kármán Vortex Street" | "Turbulent Shear";
}

export const PALETTE_PRESETS: readonly PalettePreset[] = [
  {
    id: "cyber-telemetry",
    name: "Abyssal Cyan & Magenta",
    subtitle: "Default CSS Custom Property Spectrum",
    palette: {
      calm: "#22e6ff",
      mid: "#8a5cff",
      hot: "#ff3d9a",
    },
  },
  {
    id: "biolume-trench",
    name: "Pelagic Bioluminescence",
    subtitle: "Deep-Sea Ctenophore & Cherenkov Glow",
    palette: {
      calm: "#00f5d4",
      mid: "#00bbf9",
      hot: "#7b2cbf",
    },
  },
  {
    id: "solar-magnetosphere",
    name: "Coronal Mass Ejection",
    subtitle: "Heliospheric Plasma & Amber Flux",
    palette: {
      calm: "#38bdf8",
      mid: "#f59e0b",
      hot: "#ef4444",
    },
  },
  {
    id: "cryo-phosphor",
    name: "Cryogenic Oscilloscope",
    subtitle: "P31 Emerald & Ice Cyan Telemetry",
    palette: {
      calm: "#10b981",
      mid: "#06b6d4",
      hot: "#a855f7",
    },
  },
];

export const SIMULATION_PRESETS: readonly SimulationPreset[] = [
  {
    id: "default-vortex",
    label: "Standard Kármán Wake",
    description: "Balanced 3,200-particle stream with 64px potential-flow cylinder obstacle",
    count: 3200,
    flowSpeed: 1.0,
    obstacleRadius: 64,
    autopilot: true,
    paletteId: "cyber-telemetry",
  },
  {
    id: "high-density-shear",
    label: "High-Density Shear",
    description: "5,400 particles at 1.65x velocity for intense Lamb–Oseen vortex shedding",
    count: 5400,
    flowSpeed: 1.65,
    obstacleRadius: 84,
    autopilot: true,
    paletteId: "cyber-telemetry",
  },
  {
    id: "laminar-drift",
    label: "Slow Laminar Drift",
    description: "Low-velocity divergence-free wave field with gentle wake deflection",
    count: 2200,
    flowSpeed: 0.55,
    obstacleRadius: 48,
    autopilot: true,
    paletteId: "biolume-trench",
  },
  {
    id: "coronal-storm",
    label: "Magnetospheric Surge",
    description: "Rapid 2.4x plasma cascade around a wide 96px magnetic boundary",
    count: 4600,
    flowSpeed: 2.4,
    obstacleRadius: 96,
    autopilot: true,
    paletteId: "solar-magnetosphere",
  },
];

export function clampNumber(value: number, min: number, max: number): number {
  if (Number.isNaN(value)) return min;
  return value < min ? min : value > max ? max : value;
}

export function normalizeHexColor(input: string, fallback = "#22e6ff"): string {
  const cleaned = input.trim().replace(/^#/, "");
  if (/^[0-9a-fA-F]{3}$/.test(cleaned)) {
    const expanded =
      cleaned[0] + cleaned[0] + cleaned[1] + cleaned[1] + cleaned[2] + cleaned[2];
    return `#${expanded.toLowerCase()}`;
  }
  if (/^[0-9a-fA-F]{6}$/.test(cleaned)) {
    return `#${cleaned.toLowerCase()}`;
  }
  return fallback.toLowerCase();
}

export function computeHydrodynamicTelemetry(params: {
  count: number;
  flowSpeed: number;
  obstacleRadius: number;
}): HydrodynamicTelemetry {
  const count = clampNumber(Math.round(params.count), 1, 7000);
  const flowSpeed = clampNumber(params.flowSpeed, 0.05, 5);
  const radius = clampNumber(params.obstacleRadius, 16, 160);

  // Nominal mean velocity across depth z in [0.35, 1.0]: v0 = 70 + 90 * z^2 ≈ 116 px/s at flowSpeed = 1
  const meanVelocityPxPerSec = Math.round(116 * flowSpeed);
  const diameter = radius * 2;
  // Effective kinematic viscosity proxy for visual simulation scale
  const reynoldsEstimate = Math.round((meanVelocityPxPerSec * diameter) / 58);
  // Strouhal St ≈ 0.198 * (1 - 19.7 / Re) for cylinder wake
  const st = reynoldsEstimate > 40 ? 0.198 * Math.max(0.2, 1 - 19.7 / reynoldsEstimate) : 0.08;
  const strouhalFrequencyHz = Number(((st * meanVelocityPxPerSec) / diameter).toFixed(2));

  let regimeLabel: HydrodynamicTelemetry["regimeLabel"] = "Kármán Vortex Street";
  if (reynoldsEstimate < 90) {
    regimeLabel = "Laminar";
  } else if (reynoldsEstimate < 180) {
    regimeLabel = "Transitional Wake";
  } else if (reynoldsEstimate > 520) {
    regimeLabel = "Turbulent Shear";
  }

  return {
    reynoldsEstimate,
    strouhalFrequencyHz,
    meanVelocityPxPerSec,
    vortexPoolCapacity: 32,
    trailSegmentsPerParticle: 18,
    regimeLabel,
  };
}

export function generateComponentJSX(props: DataRainProps): string {
  const lines: string[] = [
    `import DataRain from "@/components/ui/data-rain";`,
    ``,
    `export default function DemoOne() {`,
    `  return (`,
    `    <DataRain`,
  ];

  if (props.count !== undefined) {
    lines.push(`      count={${Math.round(props.count)}}`);
  }
  if (props.flowSpeed !== undefined && props.flowSpeed !== 1) {
    lines.push(`      flowSpeed={${Number(props.flowSpeed.toFixed(2))}}`);
  }
  if (props.obstacleRadius !== undefined && props.obstacleRadius !== 64) {
    lines.push(`      obstacleRadius={${Math.round(props.obstacleRadius)}}`);
  }
  if (props.autopilot !== undefined && props.autopilot !== true) {
    lines.push(`      autopilot={false}`);
  }
  if (props.fullscreen !== undefined && props.fullscreen !== true) {
    lines.push(`      fullscreen={false}`);
  }
  if (props.palette) {
    const isDefault =
      normalizeHexColor(props.palette.calm) === "#22e6ff" &&
      normalizeHexColor(props.palette.mid) === "#8a5cff" &&
      normalizeHexColor(props.palette.hot) === "#ff3d9a";
    if (!isDefault) {
      lines.push(
        `      palette={{ calm: "${normalizeHexColor(props.palette.calm)}", mid: "${normalizeHexColor(props.palette.mid)}", hot: "${normalizeHexColor(props.palette.hot)}" }}`
      );
    }
  }

  if (lines.length === 5) {
    return [
      `import DataRain from "@/components/ui/data-rain";`,
      ``,
      `export default function DemoOne() {`,
      `  return <DataRain />;`,
      `}`,
    ].join("\n");
  }

  lines.push(`    />`, `  );`, `}`);
  return lines.join("\n");
}
