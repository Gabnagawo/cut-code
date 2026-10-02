import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Objeto de vidro cromado iridescente, renderizado em WebGL (raymarching).
 * Inspirado nos objetos 3D de vidro da identidade: reflexo de estúdio claro,
 * faixas escuras de cromo e película iridescente nas bordas.
 *
 * - shape "blob": gota líquida que se deforma
 * - shape "ring": anel torcido (como a fita de vidro)
 * Pausa fora da tela; com reduced motion renderiza um quadro estático.
 */

type GlassBlobProps = {
  className?: string;
  shape?: "blob" | "ring";
  /** velocidade da animação */
  speed?: number;
  /** semente para variar a forma entre instâncias */
  seed?: number;
  /** segue levemente o cursor */
  interactive?: boolean;
};

const VERT = `
attribute vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uSeed;
uniform int uShape;

mat2 rot(float a) { float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float sdBlob(vec3 p) {
  float t = uTime * 0.6 + uSeed;
  float d = length(p) - 1.0;
  d += 0.16 * sin(2.6 * p.x + t) * sin(2.2 * p.y + t * 1.3) * sin(2.4 * p.z + t * 0.7);
  d += 0.05 * sin(5.0 * p.y + t * 1.7 + p.x * 2.0);
  return d * 0.7;
}

float sdRing(vec3 p) {
  float t = uTime * 0.5 + uSeed;
  // torção ao longo do anel
  float a = atan(p.z, p.x);
  vec2 q = vec2(length(p.xz) - 1.0, p.y);
  q *= rot(a * 1.5 + t);
  // seção achatada (fita)
  vec2 s = vec2(0.36, 0.11);
  vec2 d2 = abs(q) - s;
  float box = length(max(d2, 0.0)) + min(max(d2.x, d2.y), 0.0) - 0.08;
  return box * 0.8;
}

float map(vec3 p) {
  p.xz *= rot(uTime * 0.25 + uMouse.x * 0.6);
  p.yz *= rot(0.5 + uMouse.y * 0.4 + sin(uTime * 0.3) * 0.15);
  return uShape == 1 ? sdRing(p) : sdBlob(p);
}

vec3 calcNormal(vec3 p) {
  vec2 e = vec2(0.0015, 0.0);
  return normalize(vec3(
    map(p + e.xyy) - map(p - e.xyy),
    map(p + e.yxy) - map(p - e.yxy),
    map(p + e.yyx) - map(p - e.yyx)));
}

// estúdio claro com softboxes e faixas escuras (dá o aspecto de cromo)
vec3 env(vec3 d) {
  vec3 c = mix(vec3(0.78), vec3(0.97), smoothstep(-0.6, 0.6, d.y));
  float s1 = smoothstep(0.55, 1.0, sin(d.x * 5.0 + d.y * 2.0 + 1.3));
  float s2 = smoothstep(0.72, 1.0, sin(d.y * 7.0 - d.z * 3.0 + 0.4));
  float s3 = smoothstep(0.8, 1.0, sin(d.z * 6.0 + d.x * 4.0));
  c = mix(c, vec3(0.20), s1 * 0.8);
  c = mix(c, vec3(0.33), s2 * 0.55);
  c = mix(c, vec3(0.45), s3 * 0.4);
  // softboxes
  c += smoothstep(0.86, 1.0, sin(d.x * 3.0 - d.y * 4.0 + 0.5)) * 0.4;
  c += smoothstep(0.9, 1.0, d.y) * 0.25;
  // leve tom menta do ambiente
  c *= mix(vec3(1.0), vec3(0.94, 1.0, 0.99), 0.6);
  return clamp(c, 0.0, 1.25);
}

vec3 irid(float x) {
  return 0.5 + 0.5 * cos(6.28318 * (x + vec3(0.0, 0.33, 0.67)));
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / min(uRes.x, uRes.y);
  // câmera afastada o bastante para o objeto caber inteiro no canvas
  vec3 ro = vec3(0.0, 0.0, uShape == 1 ? 5.8 : 4.4);
  vec3 rd = normalize(vec3(uv, -1.6));

  float t = 0.0;
  float minD = 1e3;
  bool hit = false;
  for (int i = 0; i < 90; i++) {
    vec3 p = ro + rd * t;
    float d = map(p);
    minD = min(minD, d);
    if (d < 0.0008) { hit = true; break; }
    t += d;
    if (t > 9.0) break;
  }

  if (!hit) {
    // borda suave (antialias)
    float a = smoothstep(0.012, 0.0, minD) * 0.6;
    gl_FragColor = vec4(vec3(0.8) * a, a);
    return;
  }

  vec3 p = ro + rd * t;
  vec3 n = calcNormal(p);
  float ndv = clamp(dot(n, -rd), 0.0, 1.0);
  float fres = pow(1.0 - ndv, 2.6);

  vec3 refl = env(reflect(rd, n));
  vec3 refr = env(refract(rd, n, 0.72));
  // dispersão: canais refratam um pouco diferente
  vec3 refrR = env(refract(rd, n, 0.70));
  vec3 refrB = env(refract(rd, n, 0.75));
  refr = vec3(refrR.r, refr.g, refrB.b);

  vec3 col = mix(refr * 0.92, refl, 0.4 + 0.55 * fres);

  // película iridescente: discreta no centro, forte nas bordas
  float film = ndv * 2.2 + dot(n, vec3(0.3, 0.6, 0.2)) * 1.2 + uTime * 0.04 + uSeed * 0.1;
  vec3 ir = irid(film);
  float irAmt = 0.10 + 0.55 * fres;
  col += (ir - 0.5) * irAmt * 0.75;
  col = mix(col, col * (0.75 + 0.5 * ir), irAmt * 0.5);

  // brilho especular
  vec3 L = normalize(vec3(-0.5, 0.8, 0.6));
  float spec = pow(max(dot(reflect(-L, n), -rd), 0.0), 60.0);
  col += spec * 0.9;

  float alpha = clamp(0.88 + 0.12 * fres, 0.0, 1.0);
  gl_FragColor = vec4(col * alpha, alpha);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.warn(gl.getShaderInfoLog(s));
    gl.deleteShader(s);
    return null;
  }
  return s;
}

export function GlassBlob({ className, shape = "blob", speed = 1, seed = 0, interactive = true }: GlassBlobProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { premultipliedAlpha: true, alpha: true, antialias: false });
    if (!gl || gl.isContextLost()) {
      setFailed(true);
      return;
    }

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) {
      if (vs) gl.deleteShader(vs);
      if (fs) gl.deleteShader(fs);
      setFailed(true);
      return;
    }
    const prog = gl.createProgram();
    if (!prog) {
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      setFailed(true);
      return;
    }
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.warn(gl.getProgramInfoLog(prog));
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      setFailed(true);
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    if (!buf) {
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      setFailed(true);
      return;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uMouse = gl.getUniformLocation(prog, "uMouse");
    const uSeed = gl.getUniformLocation(prog, "uSeed");
    const uShape = gl.getUniformLocation(prog, "uShape");
    gl.uniform1f(uSeed, seed);
    gl.uniform1i(uShape, shape === "ring" ? 1 : 0);
    gl.clearColor(0, 0, 0, 0);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    let raf = 0;
    let visible = true;
    let time = seed * 3;
    let last = performance.now();

    // O vidro é liso e desfocado: renderizar abaixo da resolução da tela não aparece,
    // e reduz bastante o custo do raymarching. No toque, também limita a 30 fps.
    const touch = window.matchMedia("(hover: none)").matches;
    const renderScale = touch ? 0.5 : 0.65;
    const minFrameMs = touch ? 1000 / 30 : 0;
    let size = { width: canvas.clientWidth, height: canvas.clientHeight };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5) * renderScale;
      canvas.width = Math.max(1, Math.round(size.width * dpr));
      canvas.height = Math.max(1, Math.round(size.height * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };

    const draw = () => {
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      gl.uniform1f(uTime, time);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const loop = (now: number) => {
      if (now - last >= minFrameMs) {
        const dt = Math.min((now - last) / 1000, 0.05);
        last = now;
        time += dt * speed;
        draw();
      }
      if (visible) raf = requestAnimationFrame(loop);
    };

    // usa o tamanho que o ResizeObserver já mediu (evita forçar layout)
    const ro = new ResizeObserver(([entry]) => {
      size = { width: entry.contentRect.width, height: entry.contentRect.height };
      resize();
      if (reduce || !visible) draw();
    });
    ro.observe(canvas);
    resize();

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible && !reduce) {
        last = performance.now();
        raf = requestAnimationFrame(loop);
      }
    });

    if (reduce) draw();
    else io.observe(canvas);

    const onMove = (e: PointerEvent) => {
      if (!interactive || e.pointerType !== "mouse") return;
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [shape, speed, seed, interactive]);

  return (
    <div aria-hidden className={cn("pointer-events-none", className)}>
      {failed ? (
        // fallback sem WebGL: esfera de vidro em CSS
        <div className="glass-orb-fallback size-full rounded-full" />
      ) : (
        <canvas ref={canvasRef} className="size-full" />
      )}
    </div>
  );
}
