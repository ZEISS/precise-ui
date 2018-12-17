import { trackMouse, trackTouch } from './interactivity';

describe('util interactivity', () => {
  describe('trackMouse', () => {
    it('does not react to wrong buttons', () => {
      const evt = {
        button: 1,
        buttons: 1,
      };
      let called = false;
      const cb = () => {
        called = true;
      };
      const ctx = {
        addEventListener() {},
      };
      trackMouse(evt, cb, ctx);
      expect(called).toBe(false);
    });

    it('integrates all the handlers on a single touchpoint', () => {
      const evt = {
        button: 0,
        buttons: 1,
        clientX: 0,
        clientY: 0,
        currentTarget: {
          getBoundingClientRect() {
            return {
              left: 0,
              top: 0,
              width: 1,
              height: 1,
            };
          },
        },
        preventDefault() {},
      };
      let called = false;
      let added = 0;
      const cb = () => {
        called = true;
      };
      const ctx = {
        addEventListener() {
          added++;
        },
      };
      trackMouse(evt, cb, ctx);
      expect(called).toBe(true);
      expect(added).toBe(2);
    });
  });

  describe('trackTouch', () => {
    it('does not react to an empty touch list', () => {
      const evt = {
        touches: [],
      };
      let called = false;
      const cb = () => {
        called = true;
      };
      const ctx = {
        addEventListener() {},
      };
      trackTouch(evt, cb, ctx);
      expect(called).toBe(false);
    });

    it('does not react to a touch list with multiple touchpoints', () => {
      const evt = {
        touches: [{ clientX: 0, clientY: 0 }, { clientX: 0, clientY: 1 }],
      };
      let called = false;
      const cb = () => {
        called = true;
      };
      const ctx = {
        addEventListener() {},
      };
      trackTouch(evt, cb, ctx);
      expect(called).toBe(false);
    });

    it('integrates all the handlers on a single touchpoint', () => {
      const evt = {
        touches: [{ clientX: 0, clientY: 0 }],
        currentTarget: {
          getBoundingClientRect() {
            return {
              left: 0,
              top: 0,
              width: 1,
              height: 1,
            };
          },
        },
      };
      let called = false;
      let added = 0;
      const cb = () => {
        called = true;
      };
      const ctx = {
        addEventListener() {
          added++;
        },
      };
      trackTouch(evt, cb, ctx);
      expect(called).toBe(true);
      expect(added).toBe(2);
    });

    it('computes the arguments of the first callback correctly', () => {
      const evt = {
        touches: [{ clientX: 1, clientY: 0 }],
        currentTarget: {
          getBoundingClientRect() {
            return {
              left: 0,
              top: 0,
              width: 2,
              height: 2,
            };
          },
        },
      };
      let called: any = undefined;
      const cb = (h: number, v: number, active: boolean) => {
        called = {
          h,
          v,
          active,
        };
      };
      const ctx = {
        addEventListener() {},
      };
      trackTouch(evt, cb, ctx);
      expect(called).toEqual({
        h: 0.5,
        v: 0,
        active: true,
      });
    });
  });
});
