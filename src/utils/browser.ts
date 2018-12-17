const ua = (navigator && navigator.userAgent) || '';

function detectIE() {
  const msie = ua.indexOf('MSIE ');

  if (msie < 0) {
    const trident = ua.indexOf('Trident/');

    if (trident < 0) {
      const edge = ua.indexOf('Edge/');

      if (edge < 0) {
        return false;
      }

      return 'Edge';
    }

    return 'IE11';
  }

  return 'IE10';
}

export const isIE = detectIE();
