export function colorCycle(colorCycle: Array<string>, initials?: string, defaultColor = 'rgba(0,139,208,1)') {
  const len = colorCycle && colorCycle.length;

  if (initials && len) {
    let hashCode = 0;

    for (let iLen = initials.length - 1; iLen >= 0; iLen--) {
      const ch = initials.charCodeAt(iLen);
      const shift = iLen % 8;
      hashCode ^= (ch << shift) + (ch >> (8 - shift));
    }

    return colorCycle[hashCode % len];
  }

  return defaultColor;
}
