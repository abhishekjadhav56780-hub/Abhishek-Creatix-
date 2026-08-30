import * as THREE from "three";

/**
 * Procedurally generates high-resolution, pixel-perfect 1024x1024 textures
 * for all 12 3D software icons matching the exact reference images:
 * 1. Adobe After Effects (Ae)
 * 2. Adobe Illustrator (Ai)
 * 3. Adobe Lightroom (Lr)
 * 4. Adobe Photoshop (Ps)
 * 5. CapCut
 * 6. Code / Web Dev (</>)
 * 7. C++
 * 8. Canva
 * 9. Figma
 * 10. Blender
 * 11. Picsart ("P" Pink-to-Blue Gradient)
 * 12. Google Gemini (Rainbow Star)
 */

export interface ToolIconConfig {
  id: string;
  name: string;
  badge: string;
  color: string;
  glowColor: string;
}

export const TOOL_ICONS: ToolIconConfig[] = [
  {
    id: "aftereffects",
    name: "Adobe After Effects",
    badge: "Motion Graphics & VFX",
    color: "#4d4aff",
    glowColor: "#8250df",
  },
  {
    id: "illustrator",
    name: "Adobe Illustrator",
    badge: "Vector Art & Graphics",
    color: "#ff7a00",
    glowColor: "#ff9500",
  },
  {
    id: "lightroom",
    name: "Adobe Lightroom",
    badge: "Color Grading & Photo",
    color: "#00d2ff",
    glowColor: "#0084ff",
  },
  {
    id: "photoshop",
    name: "Adobe Photoshop",
    badge: "Thumbnails & Compositing",
    color: "#31a8ff",
    glowColor: "#0055ff",
  },
  {
    id: "capcut",
    name: "CapCut",
    badge: "Shorts & Viral Video",
    color: "#ffffff",
    glowColor: "#a370f7",
  },
  {
    id: "code",
    name: "Code & Development",
    badge: "Frontend & Fullstack",
    color: "#2979ff",
    glowColor: "#00b0ff",
  },
  {
    id: "cpp",
    name: "C++",
    badge: "High Performance",
    color: "#0075c9",
    glowColor: "#0091ea",
  },
  {
    id: "canva",
    name: "Canva",
    badge: "Graphic & Social Design",
    color: "#00c4cc",
    glowColor: "#7d2ae8",
  },
  {
    id: "figma",
    name: "Figma",
    badge: "UI/UX & Prototyping",
    color: "#a259ff",
    glowColor: "#f24e1e",
  },
  {
    id: "blender",
    name: "Blender 3D",
    badge: "3D Animation & CGI",
    color: "#ea7600",
    glowColor: "#ff9100",
  },
  {
    id: "picsart",
    name: "Picsart",
    badge: "Creative Photo Editing",
    color: "#ff007f",
    glowColor: "#e6007e",
  },
  {
    id: "gemini",
    name: "Google Gemini",
    badge: "AI Creative Suite",
    color: "#ffffff",
    glowColor: "#6c8cff",
  },
];

export function createToolTexture(id: string): THREE.CanvasTexture {
  const size = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const cx = size / 2;
  const cy = size / 2;
  const half = size * 0.44;
  const corner = half * 0.42;

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  switch (id) {
    case "aftereffects":
      renderAfterEffectsSquare(ctx, cx, cy, half, corner, size);
      break;
    case "illustrator":
      renderIllustratorSquare(ctx, cx, cy, half, corner, size);
      break;
    case "lightroom":
      renderLightroomSquare(ctx, cx, cy, half, corner, size);
      break;
    case "photoshop":
      renderPhotoshopSquare(ctx, cx, cy, half, corner, size);
      break;
    case "capcut":
      renderCapCutSquare(ctx, cx, cy, half, corner, size);
      break;
    case "code":
      renderCodeWindow(ctx, cx, cy, half, corner, size);
      break;
    case "cpp":
      renderCppBadge(ctx, cx, cy, half, corner, size);
      break;
    case "canva":
      renderCanvaSquare(ctx, cx, cy, half, corner, size);
      break;
    case "figma":
      renderFigmaSquare(ctx, cx, cy, half, corner, size);
      break;
    case "blender":
      renderBlenderBadge(ctx, cx, cy, half, corner, size);
      break;
    case "picsart":
      renderPicsartSquare(ctx, cx, cy, half, corner, size);
      break;
    case "gemini":
      renderGeminiSquare(ctx, cx, cy, half, corner, size);
      break;
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}

// 1. Adobe After Effects ("Ae")
function renderAfterEffectsSquare(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  half: number,
  corner: number,
  size: number
) {
  ctx.clearRect(0, 0, size, size);
  const bgGrad = ctx.createRadialGradient(
    cx - half * 0.35,
    cy - half * 0.4,
    half * 0.1,
    cx,
    cy,
    half * 1.4
  );
  bgGrad.addColorStop(0, "#191566");
  bgGrad.addColorStop(0.4, "#0e0c45");
  bgGrad.addColorStop(0.85, "#070529");
  bgGrad.addColorStop(1, "#030214");

  ctx.beginPath();
  ctx.roundRect(cx - half, cy - half, half * 2, half * 2, corner);
  ctx.fillStyle = bgGrad;
  ctx.fill();

  const rimGrad = ctx.createLinearGradient(0, cy - half, 0, cy + half);
  rimGrad.addColorStop(0, "rgba(130, 130, 255, 0.45)");
  rimGrad.addColorStop(0.5, "rgba(40, 30, 140, 0.2)");
  rimGrad.addColorStop(1, "rgba(10, 5, 40, 0.7)");
  ctx.lineWidth = 14;
  ctx.strokeStyle = rimGrad;
  ctx.stroke();

  // Gloss
  const glossGrad = ctx.createRadialGradient(
    cx - half * 0.45,
    cy - half * 0.5,
    5,
    cx - half * 0.35,
    cy - half * 0.4,
    half * 0.75
  );
  glossGrad.addColorStop(0, "rgba(255, 255, 255, 0.45)");
  glossGrad.addColorStop(0.4, "rgba(180, 180, 255, 0.12)");
  glossGrad.addColorStop(1, "rgba(255, 255, 255, 0)");

  ctx.save();
  ctx.beginPath();
  ctx.ellipse(
    cx - half * 0.35,
    cy - half * 0.45,
    half * 0.55,
    half * 0.32,
    -Math.PI / 4.5,
    0,
    Math.PI * 2
  );
  ctx.fillStyle = glossGrad;
  ctx.fill();
  ctx.restore();

  const text = "Ae";
  const fontSize = Math.round(size * 0.46);
  ctx.font = `900 ${fontSize}px "SF Pro Display", "Inter", "Helvetica Neue", "Segoe UI", Arial, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const textY = cy + fontSize * 0.05;

  for (let i = 18; i >= 1; i--) {
    ctx.fillStyle = `rgba(2, 1, 15, ${0.05 + (18 - i) * 0.04})`;
    ctx.fillText(text, cx + i * 0.9, textY + i * 1.3);
  }

  ctx.fillStyle = "#6963c4";
  ctx.fillText(text, cx + 2, textY + 4);

  const textGrad = ctx.createLinearGradient(
    cx,
    textY - fontSize * 0.4,
    cx,
    textY + fontSize * 0.4
  );
  textGrad.addColorStop(0, "#ffffff");
  textGrad.addColorStop(0.5, "#f0efff");
  textGrad.addColorStop(1, "#d4d0f7");

  ctx.fillStyle = textGrad;
  ctx.fillText(text, cx, textY);

  ctx.save();
  ctx.lineWidth = 4;
  ctx.strokeStyle = "rgba(255, 255, 255, 0.85)";
  ctx.strokeText(text, cx, textY);
  ctx.restore();
}

// 2. Adobe Illustrator ("Ai")
function renderIllustratorSquare(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  half: number,
  corner: number,
  size: number
) {
  ctx.clearRect(0, 0, size, size);
  const bgGrad = ctx.createRadialGradient(
    cx - half * 0.35,
    cy - half * 0.4,
    half * 0.1,
    cx,
    cy,
    half * 1.4
  );
  bgGrad.addColorStop(0, "#3d261e");
  bgGrad.addColorStop(0.4, "#291812");
  bgGrad.addColorStop(0.85, "#170c08");
  bgGrad.addColorStop(1, "#0a0402");

  ctx.beginPath();
  ctx.roundRect(cx - half, cy - half, half * 2, half * 2, corner);
  ctx.fillStyle = bgGrad;
  ctx.fill();

  const rimGrad = ctx.createLinearGradient(0, cy - half, 0, cy + half);
  rimGrad.addColorStop(0, "rgba(255, 160, 80, 0.4)");
  rimGrad.addColorStop(0.5, "rgba(100, 50, 20, 0.2)");
  rimGrad.addColorStop(1, "rgba(30, 10, 5, 0.7)");
  ctx.lineWidth = 14;
  ctx.strokeStyle = rimGrad;
  ctx.stroke();

  // Gloss
  const glossGrad = ctx.createRadialGradient(
    cx - half * 0.45,
    cy - half * 0.5,
    5,
    cx - half * 0.35,
    cy - half * 0.4,
    half * 0.75
  );
  glossGrad.addColorStop(0, "rgba(255, 255, 255, 0.4)");
  glossGrad.addColorStop(0.4, "rgba(255, 200, 150, 0.12)");
  glossGrad.addColorStop(1, "rgba(255, 255, 255, 0)");

  ctx.save();
  ctx.beginPath();
  ctx.ellipse(
    cx - half * 0.35,
    cy - half * 0.45,
    half * 0.55,
    half * 0.32,
    -Math.PI / 4.5,
    0,
    Math.PI * 2
  );
  ctx.fillStyle = glossGrad;
  ctx.fill();
  ctx.restore();

  const text = "Ai";
  const fontSize = Math.round(size * 0.46);
  ctx.font = `900 ${fontSize}px "SF Pro Display", "Inter", "Helvetica Neue", "Segoe UI", Arial, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const textY = cy + fontSize * 0.05;

  for (let i = 18; i >= 1; i--) {
    ctx.fillStyle = `rgba(15, 4, 1, ${0.05 + (18 - i) * 0.04})`;
    ctx.fillText(text, cx + i * 0.9, textY + i * 1.3);
  }

  ctx.fillStyle = "#b84f00";
  ctx.fillText(text, cx + 2, textY + 4);

  const textGrad = ctx.createLinearGradient(
    cx,
    textY - fontSize * 0.4,
    cx,
    textY + fontSize * 0.4
  );
  textGrad.addColorStop(0, "#ffa033");
  textGrad.addColorStop(0.4, "#ff7c00");
  textGrad.addColorStop(1, "#e65c00");

  ctx.fillStyle = textGrad;
  ctx.fillText(text, cx, textY);

  ctx.save();
  ctx.lineWidth = 4;
  ctx.strokeStyle = "rgba(255, 220, 180, 0.75)";
  ctx.strokeText(text, cx, textY);
  ctx.restore();
}

// 3. Adobe Lightroom ("Lr")
function renderLightroomSquare(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  half: number,
  corner: number,
  size: number
) {
  ctx.clearRect(0, 0, size, size);
  const bgGrad = ctx.createRadialGradient(
    cx,
    cy,
    half * 0.1,
    cx,
    cy,
    half * 1.35
  );
  bgGrad.addColorStop(0, "#083a7a");
  bgGrad.addColorStop(0.45, "#04214f");
  bgGrad.addColorStop(0.85, "#010e28");
  bgGrad.addColorStop(1, "#000614");

  ctx.beginPath();
  ctx.roundRect(cx - half, cy - half, half * 2, half * 2, corner);
  ctx.fillStyle = bgGrad;
  ctx.fill();

  const rimGrad = ctx.createLinearGradient(0, cy - half, 0, cy + half);
  rimGrad.addColorStop(0, "rgba(0, 210, 255, 0.5)");
  rimGrad.addColorStop(0.5, "rgba(0, 80, 180, 0.2)");
  rimGrad.addColorStop(1, "rgba(0, 20, 60, 0.7)");
  ctx.lineWidth = 14;
  ctx.strokeStyle = rimGrad;
  ctx.stroke();

  // Gloss
  const glossGrad = ctx.createRadialGradient(
    cx - half * 0.45,
    cy - half * 0.5,
    5,
    cx - half * 0.35,
    cy - half * 0.4,
    half * 0.75
  );
  glossGrad.addColorStop(0, "rgba(255, 255, 255, 0.45)");
  glossGrad.addColorStop(0.4, "rgba(100, 220, 255, 0.15)");
  glossGrad.addColorStop(1, "rgba(255, 255, 255, 0)");

  ctx.save();
  ctx.beginPath();
  ctx.ellipse(
    cx - half * 0.35,
    cy - half * 0.45,
    half * 0.55,
    half * 0.32,
    -Math.PI / 4.5,
    0,
    Math.PI * 2
  );
  ctx.fillStyle = glossGrad;
  ctx.fill();
  ctx.restore();

  const text = "Lr";
  const fontSize = Math.round(size * 0.46);
  ctx.font = `900 ${fontSize}px "SF Pro Display", "Inter", "Helvetica Neue", "Segoe UI", Arial, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const textY = cy + fontSize * 0.05;

  for (let i = 18; i >= 1; i--) {
    ctx.fillStyle = `rgba(0, 4, 20, ${0.05 + (18 - i) * 0.04})`;
    ctx.fillText(text, cx + i * 0.9, textY + i * 1.3);
  }

  ctx.fillStyle = "#0088cc";
  ctx.fillText(text, cx + 2, textY + 4);

  const textGrad = ctx.createLinearGradient(
    cx,
    textY - fontSize * 0.4,
    cx,
    textY + fontSize * 0.4
  );
  textGrad.addColorStop(0, "#73f1ff");
  textGrad.addColorStop(0.35, "#00d2ff");
  textGrad.addColorStop(1, "#0099e6");

  ctx.fillStyle = textGrad;
  ctx.fillText(text, cx, textY);

  ctx.save();
  ctx.lineWidth = 4;
  ctx.strokeStyle = "rgba(220, 250, 255, 0.85)";
  ctx.strokeText(text, cx, textY);
  ctx.restore();
}

// 4. Adobe Photoshop ("Ps")
function renderPhotoshopSquare(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  half: number,
  corner: number,
  size: number
) {
  ctx.clearRect(0, 0, size, size);
  const bezelGrad = ctx.createLinearGradient(0, cy - half, 0, cy + half);
  bezelGrad.addColorStop(0, "#33455c");
  bezelGrad.addColorStop(0.5, "#1f2a3a");
  bezelGrad.addColorStop(1, "#0d141e");

  ctx.beginPath();
  ctx.roundRect(cx - half, cy - half, half * 2, half * 2, corner);
  ctx.fillStyle = bezelGrad;
  ctx.fill();

  const innerMargin = 22;
  const innerHalf = half - innerMargin;
  const innerCorner = corner * 0.82;

  const plateGrad = ctx.createRadialGradient(
    cx - innerHalf * 0.35,
    cy - innerHalf * 0.4,
    innerHalf * 0.1,
    cx,
    cy,
    innerHalf * 1.35
  );
  plateGrad.addColorStop(0, "#232f42");
  plateGrad.addColorStop(0.45, "#161f2e");
  plateGrad.addColorStop(0.85, "#0b1018");
  plateGrad.addColorStop(1, "#05080e");

  ctx.beginPath();
  ctx.roundRect(
    cx - innerHalf,
    cy - innerHalf,
    innerHalf * 2,
    innerHalf * 2,
    innerCorner
  );
  ctx.fillStyle = plateGrad;
  ctx.fill();

  const text = "Ps";
  const fontSize = Math.round(size * 0.46);
  ctx.font = `900 ${fontSize}px "SF Pro Display", "Inter", "Helvetica Neue", "Segoe UI", Arial, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const textY = cy + fontSize * 0.05;

  for (let i = 18; i >= 1; i--) {
    ctx.fillStyle = `rgba(2, 6, 15, ${0.05 + (18 - i) * 0.04})`;
    ctx.fillText(text, cx + i * 0.9, textY + i * 1.3);
  }

  ctx.fillStyle = "#0c5ca8";
  ctx.fillText(text, cx + 2, textY + 4);

  const textGrad = ctx.createLinearGradient(
    cx,
    textY - fontSize * 0.4,
    cx,
    textY + fontSize * 0.4
  );
  textGrad.addColorStop(0, "#73cbff");
  textGrad.addColorStop(0.35, "#31a8ff");
  textGrad.addColorStop(1, "#0088eb");

  ctx.fillStyle = textGrad;
  ctx.fillText(text, cx, textY);

  ctx.save();
  ctx.lineWidth = 4;
  ctx.strokeStyle = "rgba(215, 242, 255, 0.85)";
  ctx.strokeText(text, cx, textY);
  ctx.restore();
}

// 5. CapCut
function renderCapCutSquare(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  half: number,
  corner: number,
  size: number
) {
  ctx.clearRect(0, 0, size, size);
  const bgGrad = ctx.createRadialGradient(
    cx - half * 0.35,
    cy - half * 0.4,
    half * 0.1,
    cx,
    cy,
    half * 1.4
  );
  bgGrad.addColorStop(0, "#ffffff");
  bgGrad.addColorStop(0.5, "#fbfcfe");
  bgGrad.addColorStop(0.85, "#eaedf3");
  bgGrad.addColorStop(1, "#d6dbe6");

  ctx.beginPath();
  ctx.roundRect(cx - half, cy - half, half * 2, half * 2, corner);
  ctx.fillStyle = bgGrad;
  ctx.fill();

  const lw = half * 1.05;
  const lh = half * 0.82;
  const barThick = lh * 0.32;

  ctx.save();
  ctx.translate(cx, cy);

  const drawCapCutShape = (offsetX = 0, offsetY = 0) => {
    ctx.beginPath();
    ctx.moveTo(-lw * 0.45 + offsetX, -lh * 0.48 + offsetY);
    ctx.lineTo(lw * 0.22 + offsetX, -lh * 0.48 + offsetY);
    ctx.lineTo(lw * 0.48 + offsetX, -lh * 0.08 + offsetY);
    ctx.lineTo(lw * 0.48 + offsetX, -lh * 0.08 + barThick * 0.7 + offsetY);
    ctx.lineTo(lw * 0.24 + offsetX, -lh * 0.48 + barThick + offsetY);
    ctx.lineTo(-lw * 0.45 + barThick * 0.8 + offsetX, -lh * 0.48 + barThick + offsetY);
    ctx.lineTo(0 + offsetX, -lh * 0.04 + offsetY);
    ctx.lineTo(-lw * 0.45 + offsetX, -lh * 0.48 + offsetY);
    ctx.closePath();

    ctx.moveTo(-lw * 0.45 + offsetX, lh * 0.48 + offsetY);
    ctx.lineTo(lw * 0.22 + offsetX, lh * 0.48 + offsetY);
    ctx.lineTo(lw * 0.48 + offsetX, lh * 0.08 + offsetY);
    ctx.lineTo(lw * 0.48 + offsetX, lh * 0.08 - barThick * 0.7 + offsetY);
    ctx.lineTo(lw * 0.24 + offsetX, lh * 0.48 - barThick + offsetY);
    ctx.lineTo(-lw * 0.45 + barThick * 0.8 + offsetX, lh * 0.48 - barThick + offsetY);
    ctx.lineTo(0 + offsetX, lh * 0.04 + offsetY);
    ctx.lineTo(-lw * 0.45 + offsetX, lh * 0.48 + offsetY);
    ctx.closePath();
  };

  ctx.save();
  ctx.shadowColor = "rgba(10, 15, 30, 0.35)";
  ctx.shadowBlur = 22;
  ctx.shadowOffsetX = 5;
  ctx.shadowOffsetY = 12;
  drawCapCutShape();
  ctx.fillStyle = "#111111";
  ctx.fill();
  ctx.restore();

  for (let i = 12; i >= 1; i--) {
    ctx.fillStyle = `rgba(15, 15, 15, ${0.1 + (12 - i) * 0.06})`;
    drawCapCutShape(i * 0.7, i * 1.0);
    ctx.fill();
  }

  drawCapCutShape(0, 0);
  const capGrad = ctx.createLinearGradient(0, -lh * 0.5, 0, lh * 0.5);
  capGrad.addColorStop(0, "#2a2a2a");
  capGrad.addColorStop(0.5, "#181818");
  capGrad.addColorStop(1, "#0d0d0d");
  ctx.fillStyle = capGrad;
  ctx.fill();
  ctx.restore();
}

// 6. Code / Web Dev Window ("</>")
function renderCodeWindow(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  half: number,
  corner: number,
  size: number
) {
  ctx.clearRect(0, 0, size, size);

  const bgGrad = ctx.createLinearGradient(0, cy - half, 0, cy + half);
  bgGrad.addColorStop(0, "#ffffff");
  bgGrad.addColorStop(0.4, "#f6f8fb");
  bgGrad.addColorStop(1, "#e5e9f2");

  ctx.beginPath();
  ctx.roundRect(cx - half, cy - half, half * 2, half * 2, corner);
  ctx.fillStyle = bgGrad;
  ctx.fill();

  const headerH = half * 0.55;
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(cx - half, cy - half, half * 2, half * 2, corner);
  ctx.clip();

  const headGrad = ctx.createLinearGradient(
    0,
    cy - half,
    0,
    cy - half + headerH
  );
  headGrad.addColorStop(0, "#298dff");
  headGrad.addColorStop(1, "#1870e8");
  ctx.fillStyle = headGrad;
  ctx.fillRect(cx - half, cy - half, half * 2, headerH);

  const dotR = half * 0.1;
  const dotY = cy - half + headerH * 0.5;
  const dotSpacing = dotR * 2.8;
  const startX = cx - half + half * 0.35;

  ctx.beginPath();
  ctx.arc(startX, dotY, dotR, 0, Math.PI * 2);
  ctx.fillStyle = "#ff5f56";
  ctx.fill();

  ctx.beginPath();
  ctx.arc(startX + dotSpacing, dotY, dotR, 0, Math.PI * 2);
  ctx.fillStyle = "#ffbd2e";
  ctx.fill();

  ctx.beginPath();
  ctx.arc(startX + dotSpacing * 2, dotY, dotR, 0, Math.PI * 2);
  ctx.fillStyle = "#ffffff";
  ctx.fill();
  ctx.restore();

  const codeY = cy + headerH * 0.3;
  const codeH = half * 0.85;
  const codeW = half * 1.25;

  ctx.save();
  ctx.translate(cx, codeY);

  ctx.save();
  ctx.shadowColor = "rgba(15, 20, 35, 0.35)";
  ctx.shadowBlur = 18;
  ctx.shadowOffsetX = 4;
  ctx.shadowOffsetY = 10;

  const drawBracket = (dir = -1, ox = 0, oy = 0) => {
    ctx.beginPath();
    const bx = dir * codeW * 0.38 + ox;
    const by = oy;
    const bw = codeW * 0.22;
    const bh = codeH * 0.45;
    const thick = codeW * 0.085;

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = thick;
    ctx.moveTo(bx + dir * (bw * 0.4), by - bh);
    ctx.lineTo(bx - dir * (bw * 0.4), by);
    ctx.lineTo(bx + dir * (bw * 0.4), by + bh);
    ctx.stroke();
  };

  const drawSlash = (ox = 0, oy = 0) => {
    ctx.beginPath();
    const thick = codeW * 0.085;
    ctx.lineCap = "round";
    ctx.lineWidth = thick;
    ctx.moveTo(ox + codeW * 0.08, oy - codeH * 0.52);
    ctx.lineTo(ox - codeW * 0.08, oy + codeH * 0.52);
    ctx.stroke();
  };

  ctx.strokeStyle = "#1b1e24";
  drawBracket(-1);
  drawSlash();
  drawBracket(1);
  ctx.restore();

  ctx.strokeStyle = "#2e333d";
  drawBracket(-1, 0, 0);
  drawSlash(0, 0);
  drawBracket(1, 0, 0);

  ctx.restore();
}

// 7. C++
function renderCppBadge(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  half: number,
  corner: number,
  size: number
) {
  ctx.clearRect(0, 0, size, size);

  const bgGrad = ctx.createRadialGradient(
    cx - half * 0.35,
    cy - half * 0.4,
    half * 0.1,
    cx,
    cy,
    half * 1.4
  );
  bgGrad.addColorStop(0, "#ffffff");
  bgGrad.addColorStop(0.5, "#f7f9fc");
  bgGrad.addColorStop(1, "#e2e6f0");

  ctx.beginPath();
  ctx.roundRect(cx - half, cy - half, half * 2, half * 2, corner);
  ctx.fillStyle = bgGrad;
  ctx.fill();

  const hexR = half * 0.72;
  ctx.save();
  ctx.translate(cx, cy);

  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3 - Math.PI / 6;
    const hx = hexR * Math.cos(angle);
    const hy = hexR * Math.sin(angle);
    if (i === 0) ctx.moveTo(hx, hy);
    else ctx.lineTo(hx, hy);
  }
  ctx.closePath();

  ctx.shadowColor = "rgba(0, 40, 100, 0.4)";
  ctx.shadowBlur = 20;
  ctx.shadowOffsetX = 4;
  ctx.shadowOffsetY = 12;

  const hexGrad = ctx.createLinearGradient(0, -hexR, 0, hexR);
  hexGrad.addColorStop(0, "#1e88e5");
  hexGrad.addColorStop(0.5, "#0062b8");
  hexGrad.addColorStop(1, "#004785");
  ctx.fillStyle = hexGrad;
  ctx.fill();

  ctx.shadowColor = "transparent";

  ctx.font = `900 ${Math.round(size * 0.38)}px "SF Pro Display", "Inter", "Helvetica Neue", Arial, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.fillStyle = "#002855";
  ctx.fillText("C++", 3, 5);

  ctx.fillStyle = "#ffffff";
  ctx.fillText("C++", 0, 0);

  ctx.restore();
}

// 8. Canva
function renderCanvaSquare(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  half: number,
  corner: number,
  size: number
) {
  ctx.clearRect(0, 0, size, size);

  const bgGrad = ctx.createLinearGradient(
    cx - half,
    cy - half,
    cx + half,
    cy + half
  );
  bgGrad.addColorStop(0, "#00d4df");
  bgGrad.addColorStop(0.4, "#0099ff");
  bgGrad.addColorStop(0.75, "#6b21a8");
  bgGrad.addColorStop(1, "#581c87");

  ctx.beginPath();
  ctx.roundRect(cx - half, cy - half, half * 2, half * 2, corner);
  ctx.fillStyle = bgGrad;
  ctx.fill();

  const glossGrad = ctx.createRadialGradient(
    cx - half * 0.45,
    cy - half * 0.5,
    5,
    cx - half * 0.35,
    cy - half * 0.4,
    half * 0.75
  );
  glossGrad.addColorStop(0, "rgba(255, 255, 255, 0.45)");
  glossGrad.addColorStop(0.4, "rgba(255, 255, 255, 0.1)");
  glossGrad.addColorStop(1, "rgba(255, 255, 255, 0)");

  ctx.save();
  ctx.beginPath();
  ctx.ellipse(
    cx - half * 0.35,
    cy - half * 0.45,
    half * 0.55,
    half * 0.32,
    -Math.PI / 4.5,
    0,
    Math.PI * 2
  );
  ctx.fillStyle = glossGrad;
  ctx.fill();
  ctx.restore();

  const fontSize = Math.round(size * 0.3);
  ctx.font = `italic 800 ${fontSize}px "Caveat", "Brush Script MT", "Segoe Script", "Dancing Script", cursive`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  for (let i = 14; i >= 1; i--) {
    ctx.fillStyle = `rgba(30, 0, 60, ${0.05 + (14 - i) * 0.05})`;
    ctx.fillText("Canva", cx + i * 0.8, cy + i * 1.1 + 4);
  }

  ctx.fillStyle = "#ffffff";
  ctx.fillText("Canva", cx, cy + 4);

  ctx.lineWidth = 3;
  ctx.strokeStyle = "rgba(255, 255, 255, 0.85)";
  ctx.strokeText("Canva", cx, cy + 4);
}

// 9. Figma
function renderFigmaSquare(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  half: number,
  corner: number,
  size: number
) {
  ctx.clearRect(0, 0, size, size);

  const bgGrad = ctx.createRadialGradient(
    cx - half * 0.35,
    cy - half * 0.4,
    half * 0.1,
    cx,
    cy,
    half * 1.4
  );
  bgGrad.addColorStop(0, "#2c2c30");
  bgGrad.addColorStop(0.5, "#1e1e22");
  bgGrad.addColorStop(1, "#121214");

  ctx.beginPath();
  ctx.roundRect(cx - half, cy - half, half * 2, half * 2, corner);
  ctx.fillStyle = bgGrad;
  ctx.fill();

  ctx.lineWidth = 12;
  ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
  ctx.stroke();

  const shapeW = half * 0.52;
  const shapeH = half * 0.52;
  const rad = shapeW * 0.5;

  ctx.save();
  ctx.translate(cx, cy);

  const drawFigmaPiece = (
    x: number,
    y: number,
    color: string,
    corners: [number, number, number, number]
  ) => {
    ctx.save();
    ctx.translate(x, y);

    ctx.shadowColor = "rgba(0, 0, 0, 0.45)";
    ctx.shadowBlur = 14;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 6;

    ctx.beginPath();
    ctx.roundRect(
      -shapeW / 2,
      -shapeH / 2,
      shapeW,
      shapeH,
      corners.map((c) => (c ? rad : 0))
    );
    ctx.fillStyle = color;
    ctx.fill();

    ctx.shadowColor = "transparent";
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.45)";
    ctx.stroke();

    ctx.restore();
  };

  const offX = shapeW * 0.52;
  const offY = shapeH * 0.98;

  drawFigmaPiece(-offX, -offY, "#f24e1e", [1, 0, 0, 1]);
  drawFigmaPiece(offX, -offY, "#ff7262", [0, 1, 1, 0]);
  drawFigmaPiece(-offX, 0, "#a259ff", [1, 0, 0, 1]);
  drawFigmaPiece(offX, 0, "#1abcfe", [1, 1, 1, 1]);
  drawFigmaPiece(-offX, offY, "#0acf83", [1, 0, 1, 1]);

  ctx.restore();
}

// 10. Blender
function renderBlenderBadge(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  half: number,
  corner: number,
  size: number
) {
  ctx.clearRect(0, 0, size, size);

  const bgGrad = ctx.createRadialGradient(
    cx - half * 0.35,
    cy - half * 0.4,
    half * 0.1,
    cx,
    cy,
    half * 1.4
  );
  bgGrad.addColorStop(0, "#ffffff");
  bgGrad.addColorStop(0.5, "#f6f8fb");
  bgGrad.addColorStop(1, "#dfe4ee");

  ctx.beginPath();
  ctx.roundRect(cx - half, cy - half, half * 2, half * 2, corner);
  ctx.fillStyle = bgGrad;
  ctx.fill();

  const br = half * 0.75;
  ctx.save();
  ctx.translate(cx, cy + br * 0.05);

  ctx.shadowColor = "rgba(180, 80, 0, 0.45)";
  ctx.shadowBlur = 20;
  ctx.shadowOffsetX = 4;
  ctx.shadowOffsetY = 10;

  ctx.beginPath();
  const ringR = br * 0.58;
  ctx.arc(0, 0, ringR, 0, Math.PI * 2);
  ctx.fillStyle = "#ea7600";
  ctx.fill();

  ctx.lineWidth = br * 0.22;
  ctx.lineCap = "round";
  ctx.strokeStyle = "#ea7600";

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(br * 0.65, -br * 0.65);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(-br * 0.75, -br * 0.25);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(-br * 0.85, br * 0.35);
  ctx.stroke();

  ctx.shadowColor = "transparent";

  ctx.beginPath();
  ctx.arc(0, 0, ringR * 0.65, 0, Math.PI * 2);
  ctx.fillStyle = "#ffffff";
  ctx.fill();

  ctx.beginPath();
  ctx.arc(0, 0, ringR * 0.4, 0, Math.PI * 2);
  ctx.fillStyle = "#22578e";
  ctx.fill();

  ctx.restore();
}

// 11. Picsart ("P" on Pink-to-Blue Vibrant Gradient)
function renderPicsartSquare(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  half: number,
  corner: number,
  size: number
) {
  ctx.clearRect(0, 0, size, size);

  // Diagonal gradient: Hot Magenta -> Neon Violet -> Electric Sky Blue
  const bgGrad = ctx.createLinearGradient(
    cx - half,
    cy + half * 0.6,
    cx + half,
    cy - half * 0.6
  );
  bgGrad.addColorStop(0, "#ff0055");
  bgGrad.addColorStop(0.28, "#e6007e");
  bgGrad.addColorStop(0.55, "#8420c2");
  bgGrad.addColorStop(0.82, "#1976d2");
  bgGrad.addColorStop(1, "#00a2ff");

  ctx.beginPath();
  ctx.roundRect(cx - half, cy - half, half * 2, half * 2, corner);
  ctx.fillStyle = bgGrad;
  ctx.fill();

  // Glossy rim highlight
  ctx.lineWidth = 14;
  ctx.strokeStyle = "rgba(255, 255, 255, 0.45)";
  ctx.stroke();

  // Top-left glossy reflection
  const glossGrad = ctx.createRadialGradient(
    cx - half * 0.45,
    cy - half * 0.5,
    5,
    cx - half * 0.35,
    cy - half * 0.4,
    half * 0.75
  );
  glossGrad.addColorStop(0, "rgba(255, 255, 255, 0.55)");
  glossGrad.addColorStop(0.4, "rgba(255, 255, 255, 0.15)");
  glossGrad.addColorStop(1, "rgba(255, 255, 255, 0)");

  ctx.save();
  ctx.beginPath();
  ctx.ellipse(
    cx - half * 0.35,
    cy - half * 0.45,
    half * 0.55,
    half * 0.32,
    -Math.PI / 4.5,
    0,
    Math.PI * 2
  );
  ctx.fillStyle = glossGrad;
  ctx.fill();
  ctx.restore();

  // Render 3D Bold White "P"
  const text = "P";
  const fontSize = Math.round(size * 0.58);
  ctx.font = `900 ${fontSize}px "SF Pro Rounded", "Fredoka", "Arial Rounded MT Bold", "Inter", sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const textY = cy + fontSize * 0.04;

  for (let i = 18; i >= 1; i--) {
    ctx.fillStyle = `rgba(20, 0, 40, ${0.05 + (18 - i) * 0.04})`;
    ctx.fillText(text, cx + i * 0.8, textY + i * 1.3);
  }

  ctx.fillStyle = "#e0e0ff";
  ctx.fillText(text, cx + 2, textY + 4);

  ctx.fillStyle = "#ffffff";
  ctx.fillText(text, cx, textY);

  ctx.lineWidth = 4;
  ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
  ctx.strokeText(text, cx, textY);
}

// 12. Google Gemini (Rainbow Star)
function renderGeminiSquare(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  half: number,
  corner: number,
  size: number
) {
  ctx.clearRect(0, 0, size, size);

  const bgGrad = ctx.createRadialGradient(
    cx - half * 0.35,
    cy - half * 0.4,
    half * 0.1,
    cx,
    cy,
    half * 1.4
  );
  bgGrad.addColorStop(0, "#ffffff");
  bgGrad.addColorStop(0.5, "#fbfcfe");
  bgGrad.addColorStop(0.85, "#eaedf3");
  bgGrad.addColorStop(1, "#d6dbe6");

  ctx.beginPath();
  ctx.roundRect(cx - half, cy - half, half * 2, half * 2, corner);
  ctx.fillStyle = bgGrad;
  ctx.fill();

  const glossGrad = ctx.createRadialGradient(
    cx - half * 0.45,
    cy - half * 0.5,
    5,
    cx - half * 0.35,
    cy - half * 0.4,
    half * 0.75
  );
  glossGrad.addColorStop(0, "rgba(255, 255, 255, 0.85)");
  glossGrad.addColorStop(0.4, "rgba(255, 255, 255, 0.2)");
  glossGrad.addColorStop(1, "rgba(255, 255, 255, 0)");

  ctx.save();
  ctx.beginPath();
  ctx.ellipse(
    cx - half * 0.35,
    cy - half * 0.45,
    half * 0.55,
    half * 0.32,
    -Math.PI / 4.5,
    0,
    Math.PI * 2
  );
  ctx.fillStyle = glossGrad;
  ctx.fill();
  ctx.restore();

  const starRadius = half * 0.75;
  const drawStarPath = () => {
    ctx.beginPath();
    ctx.moveTo(cx, cy - starRadius);
    ctx.quadraticCurveTo(cx + starRadius * 0.16, cy - starRadius * 0.16, cx + starRadius, cy);
    ctx.quadraticCurveTo(cx + starRadius * 0.16, cy + starRadius * 0.16, cx, cy + starRadius);
    ctx.quadraticCurveTo(cx - starRadius * 0.16, cy + starRadius * 0.16, cx - starRadius, cy);
    ctx.quadraticCurveTo(cx - starRadius * 0.16, cy - starRadius * 0.16, cx, cy - starRadius);
    ctx.closePath();
  };

  ctx.save();
  ctx.shadowColor = "rgba(10, 20, 50, 0.3)";
  ctx.shadowBlur = 24;
  ctx.shadowOffsetX = 4;
  ctx.shadowOffsetY = 14;
  drawStarPath();
  ctx.fillStyle = "#1e88e5";
  ctx.fill();
  ctx.restore();

  ctx.save();
  drawStarPath();
  ctx.clip();

  const topGrad = ctx.createRadialGradient(cx, cy - starRadius * 0.75, starRadius * 0.05, cx, cy, starRadius * 1.1);
  topGrad.addColorStop(0, "#ff3366");
  topGrad.addColorStop(0.5, "#ea1e50");
  topGrad.addColorStop(1, "rgba(234, 30, 80, 0)");
  ctx.fillStyle = topGrad;
  ctx.fillRect(cx - starRadius, cy - starRadius, starRadius * 2, starRadius * 2);

  const leftGrad = ctx.createRadialGradient(cx - starRadius * 0.75, cy, starRadius * 0.05, cx, cy, starRadius * 1.1);
  leftGrad.addColorStop(0, "#ffcc00");
  leftGrad.addColorStop(0.55, "#ff9500");
  leftGrad.addColorStop(1, "rgba(255, 149, 0, 0)");
  ctx.fillStyle = leftGrad;
  ctx.fillRect(cx - starRadius, cy - starRadius, starRadius * 2, starRadius * 2);

  const bottomGrad = ctx.createRadialGradient(cx, cy + starRadius * 0.75, starRadius * 0.05, cx, cy, starRadius * 1.1);
  bottomGrad.addColorStop(0, "#00e676");
  bottomGrad.addColorStop(0.55, "#00a844");
  bottomGrad.addColorStop(1, "rgba(0, 168, 68, 0)");
  ctx.fillStyle = bottomGrad;
  ctx.fillRect(cx - starRadius, cy - starRadius, starRadius * 2, starRadius * 2);

  const rightGrad = ctx.createRadialGradient(cx + starRadius * 0.75, cy, starRadius * 0.05, cx, cy, starRadius * 1.1);
  rightGrad.addColorStop(0, "#2979ff");
  rightGrad.addColorStop(0.55, "#0d47a1");
  rightGrad.addColorStop(1, "rgba(13, 71, 161, 0)");
  ctx.fillStyle = rightGrad;
  ctx.fillRect(cx - starRadius, cy - starRadius, starRadius * 2, starRadius * 2);

  const centerGrad = ctx.createRadialGradient(cx, cy - starRadius * 0.08, 2, cx, cy, starRadius * 0.42);
  centerGrad.addColorStop(0, "rgba(255, 255, 255, 0.95)");
  centerGrad.addColorStop(0.35, "rgba(255, 255, 255, 0.6)");
  centerGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
  ctx.fillStyle = centerGrad;
  ctx.fillRect(cx - starRadius, cy - starRadius, starRadius * 2, starRadius * 2);

  ctx.restore();

  ctx.save();
  drawStarPath();
  ctx.lineWidth = 3;
  ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
  ctx.stroke();
  ctx.restore();
}
