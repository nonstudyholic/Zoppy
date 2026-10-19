import { useCallback, useEffect, useMemo, useRef, type PointerEvent, type RefObject } from 'react';

type Spring = { x: number; v: number };

const newSpring = (): Spring => ({ x: 0, v: 0 });
const clamp = (n: number, min: number, max: number): number => Math.min(max, Math.max(min, n));

// Zoppy's resting border-radius (same numbers as .zoppy in index.css)
const BASE_RADIUS = [48, 52, 44, 56, 48, 47, 53, 52];
const PATTERN_A = [1, -1, 1, -1, -1, 1, -1, 1];
const PATTERN_B = [-1, 1, 1, -1, 1, -1, -1, 1];

const reducedMotion = (): boolean => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function useJelly(ref: RefObject<HTMLElement>) {
  const store = useRef({
    squash: newSpring(),
    x: newSpring(),
    y: newSpring(),
    rot: newSpring(),
    wobbleA: newSpring(),
    wobbleB: newSpring(),
    target: { squash: 0, x: 0, y: 0, rot: 0 },
    pressing: false,
    startX: 0,
    startY: 0,
    raf: 0,
    last: 0,
  });

  const run = useCallback((): void => {
    const st = store.current;
    if (st.raf) return;
    st.last = performance.now();

    const tick = (now: number): void => {
      const el = ref.current;
      if (!el) {
        st.raf = 0;
        return;
      }

      const dt = Math.min((now - st.last) / 1000, 1 / 30);
      st.last = now;

      // k = stiffness, c = damping. Low damping = more wobble.
      const move = (sp: Spring, target: number, k: number, c: number): void => {
        sp.v += (-k * (sp.x - target) - c * sp.v) * dt;
        sp.x += sp.v * dt;
      };
      move(st.squash, st.target.squash, 190, 8);
      move(st.x, st.target.x, 150, 10);
      move(st.y, st.target.y, 150, 10);
      move(st.rot, st.target.rot, 140, 8);
      move(st.wobbleA, 0, 120, 5);
      move(st.wobbleB, 0, 90, 4);

      const q = clamp(st.squash.x, -0.35, 0.4);
      const radii = BASE_RADIUS.map((base, i) =>
        clamp(base + PATTERN_A[i] * st.wobbleA.x * 9 + PATTERN_B[i] * st.wobbleB.x * 7, 28, 72)
      );

      el.style.setProperty('scale', `${1 + q * 0.75} ${1 - q}`);
      el.style.setProperty('translate', `${st.x.x}px ${st.y.x}px`);
      el.style.setProperty('rotate', `${st.rot.x}deg`);
      el.style.borderRadius =
        `${radii[0]}% ${radii[1]}% ${radii[2]}% ${radii[3]}% / ${radii[4]}% ${radii[5]}% ${radii[6]}% ${radii[7]}%`;

      const checks: Array<[Spring, number, number]> = [
        [st.squash, st.target.squash, 0.002],
        [st.x, st.target.x, 0.05],
        [st.y, st.target.y, 0.05],
        [st.rot, st.target.rot, 0.05],
        [st.wobbleA, 0, 0.005],
        [st.wobbleB, 0, 0.005],
      ];
      const settled =
        !st.pressing && checks.every(([sp, target, eps]) => Math.abs(sp.x - target) < eps && Math.abs(sp.v) < eps * 5);

      if (settled) {
        el.style.removeProperty('scale');
        el.style.removeProperty('translate');
        el.style.removeProperty('rotate');
        el.style.borderRadius = '';
        st.raf = 0;
        return;
      }
      st.raf = requestAnimationFrame(tick);
    };

    st.raf = requestAnimationFrame(tick);
  }, [ref]);

  // The "boing": a stretch up, a little hop, and wobbly edges
  const pop = useCallback((): void => {
    if (reducedMotion()) return;
    const st = store.current;
    st.squash.x = Math.max(st.squash.x, 0.2);
    st.squash.v -= 6;
    st.y.v -= 220;
    st.wobbleA.v += 16;
    st.wobbleB.v -= 12;
    run();
  }, [run]);

  const release = useCallback((): void => {
    const st = store.current;
    if (!st.pressing) return;
    st.pressing = false;
    st.target = { squash: 0, x: 0, y: 0, rot: 0 };
    pop();
  }, [pop]);

  const onPointerDown = useCallback(
    (event: PointerEvent<HTMLElement>): void => {
      if (reducedMotion()) return;
      const st = store.current;
      event.currentTarget.setPointerCapture(event.pointerId);
      st.pressing = true;
      st.startX = event.clientX;
      st.startY = event.clientY;
      st.target = { squash: 0.24, x: 0, y: 0, rot: 0 };
      st.wobbleA.v += 6;
      run();
    },
    [run]
  );

  const onPointerMove = useCallback((event: PointerEvent<HTMLElement>): void => {
    const st = store.current;
    if (!st.pressing) return;
    const dx = event.clientX - st.startX;
    const dy = event.clientY - st.startY;
    st.target.x = clamp(dx * 0.5, -50, 50);
    st.target.y = clamp(dy * 0.4, -25, 35);
    st.target.rot = clamp(dx * 0.07, -12, 12);
    st.wobbleB.v += clamp(event.movementX * 0.25, -3, 3);
  }, []);

  useEffect(() => {
    const st = store.current;
    return () => cancelAnimationFrame(st.raf);
  }, []);

  return useMemo(
    () => ({ onPointerDown, onPointerMove, onPointerUp: release, onPointerCancel: release, tap: pop }),
    [onPointerDown, onPointerMove, release, pop]
  );
                   }
