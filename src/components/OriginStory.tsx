import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { RotateCcw } from 'lucide-react';
import { originChapters } from '@/data/content';

const stars = [
  { left: '6%', top: '12%', delay: '0s' },
  { left: '17%', top: '26%', delay: '.8s' },
  { left: '31%', top: '9%', delay: '1.6s' },
  { left: '44%', top: '22%', delay: '.4s' },
  { left: '56%', top: '8%', delay: '2.1s' },
  { left: '67%', top: '24%', delay: '1.2s' },
  { left: '79%', top: '10%', delay: '.2s' },
  { left: '91%', top: '30%', delay: '1.8s' },
];

const sparks = [
  { dx: '-58px', dy: '-52px' },
  { dx: '52px', dy: '-62px' },
  { dx: '-26px', dy: '-86px' },
  { dx: '72px', dy: '-26px' },
  { dx: '-80px', dy: '-14px' },
];

export default function OriginStory() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [run, setRun] = useState(0);

  // Only play while the section is on screen, so the story starts when you get there
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setPlaying(entry.isIntersecting), { threshold: 0.35 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef} className={playing ? 'origin playing' : 'origin'}>
      <div className="origin-head">
        <div>
          <p className="eyebrow">the origin story</p>
          <h3>Before Zoppy,<br /><em>there was a hiccup.</em></h3>
        </div>
        <button type="button" className="origin-replay" onClick={() => setRun(run + 1)}>
          <RotateCcw size={14} /> replay
        </button>
      </div>

      <div className="origin-stage" key={run}>
        <div className="origin-scene" aria-hidden="true">
          <div className="origin-moon" />
          {stars.map((star, index) => (
            <span key={index} className="origin-star" style={{ left: star.left, top: star.top, animationDelay: star.delay }}>✦</span>
          ))}

          <div className="origin-sea" />
          <div className="origin-coral coral-1" />
          <div className="origin-coral coral-2" />
          <div className="origin-coral coral-3" />
          <div className="origin-shore" />
          <div className="origin-pool" />

          <div className="origin-jelly">
            <div className="origin-jelly-body">
              <div className="origin-jelly-eyes"><i /><i /></div>
            </div>
            <div className="origin-jelly-legs"><i /><i /><i /></div>
            <span className="origin-hic">hic!</span>
          </div>

          <div className="origin-bubble"><span>ha!</span></div>
          <div className="origin-pop" />
          {sparks.map((spark, index) => (
            <span key={index} className="origin-spark" style={{ '--dx': spark.dx, '--dy': spark.dy } as CSSProperties}>✦</span>
          ))}

          <div className="origin-zoppy">
            <span className="origin-giggle">hehe!</span>
            <div className="mini-bow" />
            <div className="mini-eyes"><i /><i /></div>
            <div className="mini-mouth" />
          </div>
        </div>

        <ol className="origin-steps">
          {originChapters.map((chapter, index) => (
            <li key={chapter.number} className="origin-step" style={{ animationDelay: `${index * 3}s` }}>
              <span className="origin-step-number">{chapter.number}</span>
              <h4>{chapter.title}</h4>
              <p>{chapter.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}