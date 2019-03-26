function clamp(n: number) {
  return n > 1 ? 1 : n < 0 ? 0 : n;
}

export interface UpdatePositionHandler {
  (h: number, v: number, active: boolean, rect: ClientRect, moved: boolean): Boolean;
}

interface SimpleTouchEvent {
  touches: TouchList;
  changedTouches: TouchList;
}

interface SimpleMouseEvent {
  clientX: number;
  clientY: number;
  preventDefault(): void;
}

export function trackTouch<T extends HTMLElement>(
  e: React.TouchEvent<T>,
  changed: UpdatePositionHandler,
  context = window,
) {
  if (e.touches.length === 1) {
    const f = e.currentTarget.getBoundingClientRect();
    const updatePosition = (e: SimpleTouchEvent | React.TouchEvent<T>, active: boolean, moved: boolean) => {
      const t = e.touches[0] || e.changedTouches[0];
      const x = t.clientX - f.left;
      const y = t.clientY - f.top;
      const h = clamp(x / f.width);
      const v = clamp(y / f.height);
      changed(h, v, active, f, moved);
    };
    const updateHandler = (e: TouchEvent) => updatePosition(e, true, true);
    const removeHandler = (e: TouchEvent) => {
      context.removeEventListener('touchmove', updateHandler, true);
      context.removeEventListener('touchend', removeHandler, true);
      updatePosition(e, false, false);
    };
    context.addEventListener('touchmove', updateHandler, true);
    context.addEventListener('touchend', removeHandler, true);
    updatePosition(e, true, false);
  }
}

export function trackMouse<T extends HTMLElement>(
  e: React.MouseEvent<T>,
  changed: UpdatePositionHandler,
  context = window,
) {
  if (e.button === 0 && e.buttons === 1) {
    const f = e.currentTarget.getBoundingClientRect();
    const updatePosition = (e: SimpleMouseEvent, active: boolean, moved: boolean) => {
      const x = e.clientX - f.left;
      const y = e.clientY - f.top;
      const h = clamp(x / f.width);
      const v = clamp(y / f.height);

      if (changed(h, v, active, f, moved)) {
        e.preventDefault();
      }
    };
    const updateHandler = (e: MouseEvent) => updatePosition(e, true, true);
    const removeHandler = (e: MouseEvent) => {
      context.removeEventListener('mousemove', updateHandler, true);
      context.removeEventListener('mouseup', removeHandler, true);
      updatePosition(e, false, false);
    };
    context.addEventListener('mousemove', updateHandler, true);
    context.addEventListener('mouseup', removeHandler, true);
    updatePosition(e, true, false);
  }
}
