"use client"

import React, { useEffect, useRef, useState, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export interface MorphGalleryProps {
  images?: string[]
  height?: string
  duration?: number
  className?: string
}

const VERTEX_SHADER = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = a_position * 0.5 + 0.5;
    v_uv.y = 1.0 - v_uv.y;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`

// Authentic 21st.dev Morph Gallery Fragment Shader:
// Uses multi-octave FBM + cross-texture luminance displacement + chromatic liquid warp
const FRAGMENT_SHADER = `
  precision highp float;
  varying vec2 v_uv;
  uniform sampler2D u_tex0;
  uniform sampler2D u_tex1;
  uniform float u_progress;
  uniform float u_direction;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p = rot * p * 2.05 + vec2(100.0);
      a *= 0.5;
    }
    return v;
  }

  void main() {
    float p = smoothstep(0.0, 1.0, u_progress);
    float intensity = sin(p * 3.14159265);

    // Organic FBM swirl + image luminance displacement
    float n1 = fbm(v_uv * 3.8 + vec2(p * 1.4 * u_direction, p * 0.6));
    float n2 = fbm(v_uv * 5.2 - vec2(p * 1.1, p * 1.3 * u_direction));

    vec4 base0 = texture2D(u_tex0, v_uv);
    vec4 base1 = texture2D(u_tex1, v_uv);
    float lumDiff = dot(base1.rgb - base0.rgb, vec3(0.299, 0.587, 0.114));

    vec2 disp = vec2(n1 - 0.5, n2 - 0.5) * 0.52 * intensity;
    disp += vec2(lumDiff * 0.22 * u_direction, lumDiff * 0.18) * intensity;
    disp.x += u_direction * 0.14 * intensity * (n1 - 0.25);

    // Distorted UVs for current and next image
    vec2 uv0 = clamp(v_uv + disp * p, 0.0, 1.0);
    vec2 uv1 = clamp(v_uv - disp * (1.0 - p), 0.0, 1.0);

    // Subtle RGB chromatic split during peak morph
    float rgbShift = 0.012 * intensity * n1;
    vec4 col0 = vec4(
      texture2D(u_tex0, clamp(uv0 + vec2(rgbShift, 0.0), 0.0, 1.0)).r,
      texture2D(u_tex0, uv0).g,
      texture2D(u_tex0, clamp(uv0 - vec2(rgbShift, 0.0), 0.0, 1.0)).b,
      1.0
    );
    vec4 col1 = vec4(
      texture2D(u_tex1, clamp(uv1 + vec2(rgbShift, 0.0), 0.0, 1.0)).r,
      texture2D(u_tex1, uv1).g,
      texture2D(u_tex1, clamp(uv1 - vec2(rgbShift, 0.0), 0.0, 1.0)).b,
      1.0
    );

    float organicMask = smoothstep(0.0, 1.0, (p * 1.55 - (1.0 - n1) * 0.55));
    gl_FragColor = mix(col0, col1, organicMask);
  }
`

const DEFAULT_IMAGES = [
  "/apps/pda4/slide-1.png",
  "/apps/pda4/slide-2.png",
  "/apps/pda4/slide-3.png",
  "/apps/pda4/slide-4.png",
]

export default function MorphGallery({
  images = DEFAULT_IMAGES,
  height = "100svh",
  duration = 950,
  className = "",
}: MorphGalleryProps) {
  const safeImages = images && images.length > 0 ? images : DEFAULT_IMAGES
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const glRef = useRef<WebGLRenderingContext | null>(null)
  const progRef = useRef<WebGLProgram | null>(null)
  const texturesRef = useRef<WebGLTexture[]>([])
  const rafRef = useRef<number>(0)

  const [current, setCurrent] = useState(0)
  const stateRef = useRef({
    current: 0,
    next: 0,
    progress: 0,
    direction: 1,
    animating: false,
    startTime: 0,
  })

  // Reset gallery index when switching between the 6 apps
  useEffect(() => {
    setCurrent(0)
    stateRef.current = {
      current: 0,
      next: 0,
      progress: 0,
      direction: 1,
      animating: false,
      startTime: 0,
    }
  }, [images])

  const drawFrame = useCallback(() => {
    const gl = glRef.current
    const prog = progRef.current
    const texs = texturesRef.current
    if (!gl || !prog || texs.length === 0) return

    const st = stateRef.current
    gl.useProgram(prog)

    const uTex0 = gl.getUniformLocation(prog, "u_tex0")
    const uTex1 = gl.getUniformLocation(prog, "u_tex1")
    const uProg = gl.getUniformLocation(prog, "u_progress")
    const uDir = gl.getUniformLocation(prog, "u_direction")

    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, texs[st.current] || texs[0])
    gl.uniform1i(uTex0, 0)

    gl.activeTexture(gl.TEXTURE1)
    gl.bindTexture(gl.TEXTURE_2D, texs[st.next] || texs[0])
    gl.uniform1i(uTex1, 1)

    gl.uniform1f(uProg, st.progress)
    gl.uniform1f(uDir, st.direction)

    gl.drawArrays(gl.TRIANGLES, 0, 6)
  }, [])

  // Initialize WebGL Shader & Load Textures
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl =
      canvas.getContext("webgl", { alpha: false, antialias: true }) ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null)
    if (!gl) return
    glRef.current = gl

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!
      gl.shaderSource(sh, src)
      gl.compileShader(sh)
      return sh
    }

    const vs = compile(gl.VERTEX_SHADER, VERTEX_SHADER)
    const fs = compile(gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
    const prog = gl.createProgram()!
    gl.attachShader(prog, vs)
    gl.attachShader(prog, fs)
    gl.linkProgram(prog)
    gl.useProgram(prog)
    progRef.current = prog

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    )

    const aPos = gl.getAttribLocation(prog, "a_position")
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    let disposed = false
    const texList: WebGLTexture[] = []
    texturesRef.current = texList

    safeImages.forEach((src, i) => {
      const tex = gl.createTexture()!
      texList[i] = tex
      gl.bindTexture(gl.TEXTURE_2D, tex)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        1,
        1,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        new Uint8Array([12, 12, 16, 255])
      )

      const img = new Image()
      img.crossOrigin = "anonymous"
      img.onload = () => {
        if (disposed) return
        gl.bindTexture(gl.TEXTURE_2D, tex)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img)
        drawFrame()
      }
      img.src = src
    })

    const onResize = () => {
      if (!canvas) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.max(1, Math.floor(canvas.clientWidth * dpr))
      canvas.height = Math.max(1, Math.floor(canvas.clientHeight * dpr))
      gl.viewport(0, 0, canvas.width, canvas.height)
      drawFrame()
    }

    onResize()
    window.addEventListener("resize", onResize)

    return () => {
      disposed = true
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener("resize", onResize)
    }
  }, [safeImages, drawFrame])

  const goTo = useCallback(
    (targetIdx: number, explicitDir?: number) => {
      const st = stateRef.current
      const total = safeImages.length
      if (total <= 1) return
      const normalized = ((targetIdx % total) + total) % total

      if (st.animating) {
        cancelAnimationFrame(rafRef.current)
        st.current = st.next
        st.progress = 0
        st.animating = false
      }

      if (normalized === st.current) return

      const dir =
        explicitDir !== undefined
          ? explicitDir
          : normalized > st.current
          ? 1
          : -1

      st.next = normalized
      st.direction = dir
      st.progress = 0
      st.animating = true
      st.startTime = performance.now()
      setCurrent(normalized)

      const tick = (now: number) => {
        const t = Math.min(1, (now - st.startTime) / duration)
        st.progress = t
        drawFrame()

        if (t < 1) {
          rafRef.current = requestAnimationFrame(tick)
        } else {
          st.current = normalized
          st.progress = 0
          st.animating = false
          drawFrame()
        }
      }

      rafRef.current = requestAnimationFrame(tick)
    },
    [safeImages.length, duration, drawFrame]
  )

  const prev = useCallback(() => {
    goTo(stateRef.current.current - 1, -1)
  }, [goTo])

  const next = useCallback(() => {
    goTo(stateRef.current.current + 1, 1)
  }, [goTo])

  // Keyboard arrow navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [prev, next])

  return (
    <section
      dir="ltr"
      style={{ height }}
      className={`relative w-full overflow-hidden bg-zinc-950 select-none ${className}`}
    >
      {/* Full-bleed WebGL Morphing Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full block"
      />

      {/* Left Arrow Button */}
      <button
        type="button"
        onClick={prev}
        aria-label="Previous image"
        className="absolute left-5 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white/85 backdrop-blur-md transition-all hover:bg-black/60 hover:text-white hover:scale-105 cursor-pointer"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* Right Arrow Button */}
      <button
        type="button"
        onClick={next}
        aria-label="Next image"
        className="absolute right-5 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white/85 backdrop-blur-md transition-all hover:bg-black/60 hover:text-white hover:scale-105 cursor-pointer"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Bottom Floating Rectangular Image Thumbnail Bar (NO dots) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5 rounded-xl bg-black/25 px-3.5 py-2 backdrop-blur-sm">
        {safeImages.map((src, i) => {
          const isActive = i === current
          return (
            <button
              key={`${src}-${i}`}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`View slide ${i + 1}`}
              className={`relative h-12 w-20 shrink-0 overflow-hidden rounded-md transition-all duration-300 cursor-pointer ${
                isActive
                  ? "ring-2 ring-white opacity-100 scale-105 shadow-[0_8px_25px_rgba(0,0,0,0.65)]"
                  : "opacity-50 hover:opacity-85 scale-100"
              }`}
            >
              <img
                src={src}
                alt={`Thumbnail ${i + 1}`}
                draggable={false}
                className="h-full w-full object-cover"
              />
            </button>
          )
        })}
      </div>
    </section>
  )
}
