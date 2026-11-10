import test from "node:test";
import assert from "node:assert/strict";
import {
  clampNumber,
  normalizeHexColor,
  computeHydrodynamicTelemetry,
  generateComponentJSX,
  PALETTE_PRESETS,
  SIMULATION_PRESETS,
} from "./data-rain-config";
import {
  layoutWord,
  planTimeline,
  penAt,
  docId,
} from "../components/ui/signature-pen-footer";

test("normalizeHexColor expands 3-digit hex and validates 6-digit hex", () => {
  assert.equal(normalizeHexColor("#2ef"), "#22eeff");
  assert.equal(normalizeHexColor("FF3D9A"), "#ff3d9a");
  assert.equal(normalizeHexColor("invalid-hex", "#22e6ff"), "#22e6ff");
});

test("clampNumber constrains out-of-range values and handles NaN", () => {
  assert.equal(clampNumber(9000, 1, 7000), 7000);
  assert.equal(clampNumber(-10, 1, 7000), 1);
  assert.equal(clampNumber(Number.NaN, 100, 500), 100);
});

test("computeHydrodynamicTelemetry calculates accurate flow regime and Strouhal shedding rate", () => {
  const std = computeHydrodynamicTelemetry({
    count: 3200,
    flowSpeed: 1.0,
    obstacleRadius: 64,
  });
  assert.equal(std.meanVelocityPxPerSec, 116);
  assert.equal(std.regimeLabel, "Kármán Vortex Street");
  assert.ok(std.strouhalFrequencyHz > 0.1 && std.strouhalFrequencyHz < 1.0);

  const laminar = computeHydrodynamicTelemetry({
    count: 1500,
    flowSpeed: 0.25,
    obstacleRadius: 32,
  });
  assert.equal(laminar.regimeLabel, "Laminar");
});

test("generateComponentJSX produces clean minimal JSX for defaults and explicit props when customized", () => {
  const defaultJsx = generateComponentJSX({
    flowSpeed: 1,
    obstacleRadius: 64,
    autopilot: true,
    fullscreen: true,
    palette: { calm: "#22e6ff", mid: "#8a5cff", hot: "#ff3d9a" },
  });
  assert.ok(defaultJsx.includes("return <DataRain />;"));

  const customJsx = generateComponentJSX({
    count: 4800,
    flowSpeed: 1.75,
    obstacleRadius: 80,
    autopilot: false,
    palette: { calm: "#00f5d4", mid: "#00bbf9", hot: "#7b2cbf" },
  });
  assert.ok(customJsx.includes("count={4800}"));
  assert.ok(customJsx.includes("flowSpeed={1.75}"));
  assert.ok(customJsx.includes("obstacleRadius={80}"));
  assert.ok(customJsx.includes("autopilot={false}"));
  assert.ok(customJsx.includes('calm: "#00f5d4"'));
});

test("PALETTE_PRESETS and SIMULATION_PRESETS have valid references", () => {
  assert.ok(PALETTE_PRESETS.length >= 4);
  for (const preset of SIMULATION_PRESETS) {
    const found = PALETTE_PRESETS.some((p) => p.id === preset.paletteId);
    assert.equal(found, true, `Preset ${preset.id} references valid palette ${preset.paletteId}`);
  }
});

test("SignaturePenFooter layoutWord, planTimeline, penAt, and docId compute valid stroke plans", () => {
  const layout = layoutWord("Jaafar Al-Abadi");
  assert.ok(layout.strokes.length > 5, "Expected script strokes for Jaafar Al-Abadi");
  assert.ok(layout.box.w > 500, "Expected positive bounding box width");

  const plan = planTimeline(layout.strokes, layout.box, 2.6);
  assert.ok(plan.total > 2.6, "Expected total duration > 2.6s");

  const startPose = penAt(plan, layout.strokes, 0);
  const midPose = penAt(plan, layout.strokes, plan.writeEnd * 0.5);
  const endPose = penAt(plan, layout.strokes, plan.total + 1);

  assert.ok(startPose.lift > 0, "Expected lifted pen at start");
  assert.ok(midPose.ink.some((v) => v > 0), "Expected partial ink at midpoint");
  assert.equal(endPose.ink.every((v) => v === 1), true, "Expected all strokes inked at end");

  const id = docId("Jaafar Al-Abadi");
  assert.match(id, /^[0-9A-F]{4}-[0-9A-F]{4}$/);
});

import {
  JAAFAR_APPS,
  computeWheelCardTransform,
  isPointerInWheelAppsZone,
} from "../components/ui/works-wheel";

test("WorksWheel JAAFAR_APPS contains all 7 exact applications and computeWheelCardTransform computes 3D wheel & focus poses", () => {
  assert.equal(JAAFAR_APPS.length, 7);
  assert.deepEqual(
    JAAFAR_APPS.map((a) => a.title),
    [
      "بيئة الادوات",
      "PDA4",
      "بيئة الضغط",
      "بيئة الصوت",
      "بيئة CV",
      "مترجم اوفلاين الذكي",
      "منظم التنزيلات",
    ]
  );

  // Wheel mode (m = 0): card 0 at pos 0 is at top of wheel (x = 0, y = -210, scale = 0.46)
  const wheelPose = computeWheelCardTransform(0, 0, 6, 0);
  assert.ok(Math.abs(wheelPose.x) < 0.01);
  assert.ok(Math.abs(wheelPose.y - -210) < 0.01);
  assert.ok(Math.abs(wheelPose.scale - 0.46) < 0.01);
  assert.equal(wheelPose.isCenterFocused, false);

  // Helical spiral midpoint (m = 0.5): cards sweep along 3D helical ribbon
  const spiralPose = computeWheelCardTransform(1, 0, 6, 0.5);
  assert.ok(Math.abs(spiralPose.x) > 10, "Expected non-zero helical X offset at m=0.5");
  assert.ok(spiralPose.z < -50, "Expected negative Z depth during helical transition");
  assert.ok(Math.abs(spiralPose.rotY) > 15, "Expected 3D Y rotation during helical transition");

  // Focus mode (m = 1): card 0 at pos 0 is centered (x = 0, y = 0, z = 0, scale = 1)
  const focusPose = computeWheelCardTransform(0, 0, 6, 1);
  assert.ok(Math.abs(focusPose.x) < 0.01);
  assert.ok(Math.abs(focusPose.y) < 0.01);
  assert.ok(Math.abs(focusPose.z) < 0.01);
  assert.ok(Math.abs(focusPose.scale - 1) < 0.01);
  assert.equal(focusPose.isCenterFocused, true);

  // Focus mode (m = 1): top card (idx 5 -> rel = -1) tilts back (+rotX) and bottom card (idx 1 -> rel = +1) tilts down (-rotX)
  const topRollerPose = computeWheelCardTransform(5, 0, 6, 1);
  const bottomRollerPose = computeWheelCardTransform(1, 0, 6, 1);
  assert.ok(topRollerPose.y < -200 && topRollerPose.rotX > 40);
  assert.ok(bottomRollerPose.y > 200 && bottomRollerPose.rotX < -40);
});

import {
  APPS_SHOWCASE_DATA,
  resolveAppShowcaseId,
} from "../components/ui/app-showcase-view";

test("APPS_SHOWCASE_DATA.pda4 has all 4 slides and Microsoft Store download link", () => {
  const pda4 = APPS_SHOWCASE_DATA.pda4;
  assert.equal(pda4.id, "pda4");
  assert.equal(pda4.giantText, "PDA4");
  assert.deepEqual(pda4.images, [
    "/apps/pda4/slide-1.png",
    "/apps/pda4/slide-2.png",
    "/apps/pda4/slide-3.png",
    "/apps/pda4/slide-4.png",
  ]);
  assert.equal(pda4.primaryLinks.length, 1);
  assert.equal(
    pda4.primaryLinks[0].href,
    "https://apps.microsoft.com/detail/9N3W9DCPLXZV?hl=en&gl=IQ&ocid=pdpshare"
  );
  assert.equal(pda4.secondaryLinks.length, 0);

  assert.equal(resolveAppShowcaseId(JAAFAR_APPS[1]), "pda4");
});

test("APPS_SHOWCASE_DATA['offline-translator'] has all 4 slides, EXE/Setup/APK download links, and official website", () => {
  const ot = APPS_SHOWCASE_DATA["offline-translator"];
  assert.equal(ot.id, "offline-translator");
  assert.equal(ot.giantText, "OFFLINE AI");
  assert.equal(ot.heading, "Ready to translate?");
  assert.deepEqual(ot.images, [
    "/apps/offline-translator/slide-1.png",
    "/apps/offline-translator/slide-2.png",
    "/apps/offline-translator/slide-3.png",
    "/apps/offline-translator/slide-4.png",
  ]);
  assert.equal(ot.primaryLinks.length, 3);
  assert.deepEqual(
    ot.primaryLinks.map((l) => l.icon),
    ["exe", "setup", "apk"]
  );
  assert.equal(ot.secondaryLinks.length, 1);
  assert.equal(
    ot.secondaryLinks[0].href,
    "https://languge-speed-ccvv9c-uis-projects.vercel.app/"
  );

  assert.equal(resolveAppShowcaseId(JAAFAR_APPS[5]), "offline-translator");
});

test("APPS_SHOWCASE_DATA['tools-hub'] has all 4 slides, Android APK download link, and resolves from JAAFAR_APPS[0]", () => {
  const th = APPS_SHOWCASE_DATA["tools-hub"];
  assert.equal(th.id, "tools-hub");
  assert.equal(th.giantText, "TOOLS HUB");
  assert.equal(th.heading, "Ready to explore?");
  assert.deepEqual(th.images, [
    "/apps/tools-hub/slide-1.png",
    "/apps/tools-hub/slide-2.png",
    "/apps/tools-hub/slide-3.png",
    "/apps/tools-hub/slide-4.png",
  ]);
  assert.equal(th.primaryLinks.length, 1);
  assert.equal(th.primaryLinks[0].icon, "apk");
  assert.equal(
    th.primaryLinks[0].href,
    "https://drive.google.com/file/d/1ga7iViwSao5VOpv9P6Y_W2jChbf6XKdm/view?usp=drive_link"
  );
  assert.equal(th.secondaryLinks.length, 0);

  assert.equal(resolveAppShowcaseId(JAAFAR_APPS[0]), "tools-hub");
});

test("APPS_SHOWCASE_DATA['bayah-cv'] has all 5 slides, EXE & APK download links, official website, and resolves from JAAFAR_APPS[4]", () => {
  const bc = APPS_SHOWCASE_DATA["bayah-cv"];
  assert.equal(bc.id, "bayah-cv");
  assert.equal(bc.giantText, "BAYAH CV");
  assert.equal(bc.heading, "Ready to build your CV?");
  assert.deepEqual(bc.images, [
    "/apps/bayah-cv/slide-1.png",
    "/apps/bayah-cv/slide-2.png",
    "/apps/bayah-cv/slide-3.png",
    "/apps/bayah-cv/slide-4.png",
    "/apps/bayah-cv/slide-5.png",
  ]);
  assert.equal(bc.primaryLinks.length, 2);
  assert.deepEqual(
    bc.primaryLinks.map((l) => l.icon),
    ["exe", "apk"]
  );
  assert.equal(bc.secondaryLinks.length, 1);
  assert.equal(bc.secondaryLinks[0].href, "https://bayah-cv.vercel.app");

  assert.equal(resolveAppShowcaseId(JAAFAR_APPS[4]), "bayah-cv");
});

test("APPS_SHOWCASE_DATA['voice-env'] has all 5 slides, EXE download link, official website, and resolves from JAAFAR_APPS[3]", () => {
  const ve = APPS_SHOWCASE_DATA["voice-env"];
  assert.equal(ve.id, "voice-env");
  assert.equal(ve.giantText, "VOICE AI");
  assert.equal(ve.heading, "Ready to create audio?");
  assert.deepEqual(ve.images, [
    "/apps/voice-env/slide-1.png",
    "/apps/voice-env/slide-2.png",
    "/apps/voice-env/slide-3.png",
    "/apps/voice-env/slide-4.png",
    "/apps/voice-env/slide-5.png",
  ]);
  assert.equal(ve.primaryLinks.length, 1);
  assert.equal(ve.primaryLinks[0].icon, "exe");
  assert.equal(
    ve.primaryLinks[0].href,
    "https://drive.google.com/file/d/1ML64v4rY0Y2Uz1Q0R2bk5lzNUgs-rB4v/view?usp=drive_link"
  );
  assert.equal(ve.secondaryLinks.length, 1);
  assert.equal(ve.secondaryLinks[0].href, "https://applet-cyan-pi.vercel.app/");

  assert.equal(resolveAppShowcaseId(JAAFAR_APPS[3]), "voice-env");
});

test("APPS_SHOWCASE_DATA['media-compressor'] has all 4 slides, official Web App link, and all 6 JAAFAR_APPS map to valid showcases", () => {
  const mc = APPS_SHOWCASE_DATA["media-compressor"];
  assert.equal(mc.id, "media-compressor");
  assert.equal(mc.giantText, "COMPRESSOR");
  assert.equal(mc.heading, "Ready to compress?");
  assert.deepEqual(mc.images, [
    "/apps/media-compressor/slide-1.png",
    "/apps/media-compressor/slide-2.png",
    "/apps/media-compressor/slide-3.png",
    "/apps/media-compressor/slide-4.png",
  ]);
  assert.equal(mc.primaryLinks.length, 1);
  assert.equal(mc.primaryLinks[0].icon, "web");
  assert.equal(
    mc.primaryLinks[0].href,
    "https://ais-pre-eo2yty4bcbmriqosn7q7jh-372237764138.europe-west3.run.app/"
  );
  assert.equal(mc.secondaryLinks.length, 0);

  assert.equal(resolveAppShowcaseId(JAAFAR_APPS[2]), "media-compressor");
  assert.equal(resolveAppShowcaseId(JAAFAR_APPS[6]), "download-organizer");

  const doApp = APPS_SHOWCASE_DATA["download-organizer"];
  assert.equal(doApp.id, "download-organizer");
  assert.equal(doApp.giantText, "ORGANIZER");
  assert.equal(doApp.heading, "Ready to organize?");
  assert.deepEqual(doApp.images, [
    "/apps/download-organizer/slide-1.png",
    "/apps/download-organizer/slide-2.png",
    "/apps/download-organizer/slide-3.png",
    "/apps/download-organizer/slide-4.png",
  ]);
  assert.equal(doApp.primaryLinks.length, 1);
  assert.equal(doApp.primaryLinks[0].icon, "exe");
  assert.equal(
    doApp.primaryLinks[0].href,
    "https://drive.google.com/file/d/1CstDHI0pYpYflwAoytfu507657a4M-fI/view?usp=drive_link"
  );
  assert.equal(doApp.secondaryLinks.length, 0);

  assert.deepEqual(
    JAAFAR_APPS.map((item) => resolveAppShowcaseId(item)),
    [
      "tools-hub",
      "pda4",
      "media-compressor",
      "voice-env",
      "bayah-cv",
      "offline-translator",
      "download-organizer",
    ]
  );
});

test("isPointerInWheelAppsZone locks wheel scroll in the middle apps zone and allows page scroll on the right/far-right", () => {
  // Middle of a 1440px viewport (clientX = 720) in both wheel (0) and focus (1) modes -> true
  assert.equal(isPointerInWheelAppsZone(720, 0, 1440, 0, false, false), true);
  assert.equal(isPointerInWheelAppsZone(720, 0, 1440, 1, false, false), true);
  assert.equal(isPointerInWheelAppsZone(600, 0, 1440, 1, false, false), true);

  // Directly hovering a card element -> true
  assert.equal(isPointerInWheelAppsZone(500, 0, 1440, 0, true, false), true);

  // Right / far-right side (clientX = 1200 or 1380) -> false (page scrolls naturally)
  assert.equal(isPointerInWheelAppsZone(1200, 0, 1440, 1, false, false), false);
  assert.equal(isPointerInWheelAppsZone(1380, 0, 1440, 0, false, false), false);

  // Over side navigation -> false (page scrolls naturally)
  assert.equal(isPointerInWheelAppsZone(1350, 0, 1440, 1, false, true), false);
});

import { FOOTER_HUB_I18N } from "../components/ui/footer-section";

test("FOOTER_HUB_I18N contains all 5 languages, single info button, 4 accordion categories, and zero developer name references", () => {
  const langs = ["ar", "en", "fr", "de", "ja"] as const;
  for (const lang of langs) {
    const entry = FOOTER_HUB_I18N[lang];
    assert.ok(entry.singleInfoButton.length > 0);
    assert.equal(entry.hub.categories.length, 4);
    const serialized = JSON.stringify(entry);
    assert.equal(serialized.includes("جعفر العبادي"), false);
    assert.equal(serialized.includes("Jaafar Al-Abadi"), false);
    assert.equal(serialized.includes("المطور"), false);
  }
});



