import { useEffect, type RefObject } from 'react';

const REACH_X = 8;              // how far the eyes can slide sideways (px)
const REACH_Y = 10;             // how far they can slide up/down (px)
const FULL_TILT_DISTANCE = 240; // cursor distance (px) at which the eyes look all the way over

export function useEyeTracking(ref: RefObject<HTMLElement>): void {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const eyes = Array.from(root.querySelectorAll<HTMLElement>('.eye'));
    let pointer: { x: number; y: number } | null = null;
    let raf = 0;

    const render = (): void => {
      raf = 0;
      eyes.forEach((eye) => {
        const iris = eye.querySelector<HTMLElement>('.eye-iris');
        if (!iris) return;
        if (!pointer) {
          iris.style.transform = '';
          return;
        }
        const rect = eye.getBoundingClientRect();
        const dx = pointer.x - (rect.left + rect.width / 2);
        const dy = pointer.y - (rect.top + rect.height / 2);
        const pull = Math.min(1, Math.hypot(dx, dy) / FULL_TILT_DISTANCE);
        const angle = Math.atan2(dy, dx);
        iris.style.transform = `translate(${Math.cos(angle) * pull * REACH_X}px, ${Math.sin(angle) * pull * REACH_Y}px)`;
      });
    };

    const schedule = (): void => {
      if (!raf) raf = requestAnimationFrame(render);
    };
    const onMove = (event: PointerEvent): void => {
      pointer = { x: event.clientX, y: event.clientY };
      schedule();
    };
    const onLeave = (): void => {
      pointer = null;
      schedule();
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onMove, { passive: true });
    window.addEventListener('scroll', schedule, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onMove);
      window.removeEventListener('scroll', schedule);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, [ref]);
}
