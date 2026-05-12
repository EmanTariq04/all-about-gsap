import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Drives the three progress-bar fill segments relative to .stage scroll progress.
 */
export function initProgressBar() {
  const progressFills = gsap.utils.toArray<HTMLElement>('.progress-bar .fill');

  ScrollTrigger.create({
    trigger: '.stage',
    start: 'top top',
    end: 'bottom bottom',
    scrub: 0.3,
    onUpdate: (self) => {
      const progress = self.progress;
      const totalSteps = progressFills.length;
      progressFills.forEach((fill, i) => {
        let p = (progress - i / totalSteps) * totalSteps;
        p = Math.max(0, Math.min(1, p));
        fill.style.width = `${p * 100}%`;
      });
    },
  });
}

