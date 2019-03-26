function byte(v: number) {
  return v < 0 ? 0 : v >= 1 ? 255 : ~~(v * 256);
}

export function hsvToRgb(h: number, s: number, v: number, a = 1) {
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  let r = 0;
  let g = 0;
  let b = 0;

  switch (i % 6) {
    case 0:
      (r = v), (g = t), (b = p);
      break;
    case 1:
      (r = q), (g = v), (b = p);
      break;
    case 2:
      (r = p), (g = v), (b = t);
      break;
    case 3:
      (r = p), (g = q), (b = v);
      break;
    case 4:
      (r = t), (g = p), (b = v);
      break;
    case 5:
      (r = v), (g = p), (b = q);
      break;
  }

  return {
    r: byte(r),
    g: byte(g),
    b: byte(b),
    a,
  };
}

export function rgbToHsv(r: number, g: number, b: number, a = 1) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  const s = max === 0 ? 0 : d / max;
  const v = max / 255;
  let h = 0;

  switch (max) {
    case min:
      h = 0;
      break;
    case r:
      h = (g - b + d * (g < b ? 6 : 0)) / (6 * d);
      break;
    case g:
      h = (b - r + d * 2) / (6 * d);
      break;
    case b:
      h = (r - g + d * 4) / (6 * d);
      break;
  }

  return {
    h,
    s,
    v,
    a,
  };
}

export interface RGBAColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

export function parseColor(color: string): RGBAColor {
  if (color.match(/^rgb\(/)) {
    const parts = color.substring(4, color.length - 1).split(',');
    return {
      r: +parts[0],
      g: +parts[1],
      b: +parts[2],
      a: 1,
    };
  } else if (color.match(/^rgba\(/)) {
    const parts = color.substring(5, color.length - 1).split(',');
    return {
      r: +parts[0],
      g: +parts[1],
      b: +parts[2],
      a: +parts[3],
    };
  } else if (color[0] === '#') {
    const value = parseInt(color.substr(1), 16);
    const full = color.length === 7;
    const convert = full
      ? (v: number, p: number) => (v >> (p * 8)) & 255
      : (v: number, p: number) => ((v >> (p * 4)) & 15) * 17;
    return {
      r: convert(value, 2),
      g: convert(value, 1),
      b: convert(value, 0),
      a: 1,
    };
  }

  return {
    r: 0,
    g: 0,
    b: 0,
    a: 1,
  };
}

export function serializeColor(c: RGBAColor): string {
  return `rgba(${c.r}, ${c.g}, ${c.b}, ${c.a})`;
}

export function transparentize(color: string, alpha: number): string {
  const c = parseColor(color);
  c.a = alpha;
  return serializeColor(c);
}

export function invertColor(color: string, blackWhite = false) {
  const { r, g, b } = parseColor(color);

  if (!blackWhite) {
    const newR = (255 - r).toString(16);
    const newG = (255 - g).toString(16);
    const newB = (255 - b).toString(16);
    return `rgb(${newR}, ${newG}, ${newB})`;
  }

  return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)';
}
