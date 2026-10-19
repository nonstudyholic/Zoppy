import { useState, type KeyboardEvent } from 'react';
import { ArrowDown, ArrowUpRight, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { useGiggle } from '@/hooks/useGiggle';

export default function Hero() {
  const [touchCount, setTouchCount] = useState(0);
  const [touchMessage, setTouchMessage] = useState('');
  const playGiggle = useGiggle();
  const [soundOn, setSoundOn] = useState(true);

  const handleZoppyClick = (): void => {
    const nextTouchCount = touchCount + 1;
    setTouchCount(nextTouchCount);
    setTouchMessage(nextTouchCount >= 3 ? 'Don’t do it... hehe!' : 'Hehe!');
    if (soundOn) playGiggle();
  };

  const handleZoppyKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleZoppyClick();
    }
  };

  return (
    <section className="hero shell" id="top">
      <div className="hero-copy">
        <p className="eyebrow"><Sparkles size={15} /> original character portfolio</p>
        <h1>Hi, I’m <span>Zoppy.</span><br />Tiny friend,<br /><em>big wonder.</em></h1>
        <p className="hero-intro">A curious little slime with a talent for making babies, toddlers, and grown-ups laugh. Come see the world through my squishy eyes.</p>
        <div className="hero-actions">
          <a href="#story" className="button primary">Meet Zoppy <ArrowDown size={17} /></a>
          <a href="#projects" className="text-link">Explore my world <ArrowUpRight size={16} /></a>
        </div>
        <div className="hero-note"><span className="note-line" /> Made with wonder, mischief & 100% original ideas</div>
      </div>
      <div className={`hero-art reaction-${touchCount % 4}`} role="group" aria-label="A friendly light violet slime character named Zoppy">
        <div className="sunburst" aria-hidden="true" />
        <div className="floating-star star-one" aria-hidden="true">✦</div>
        <div className="floating-star star-two" aria-hidden="true">✦</div>
        <div className="floating-heart" aria-hidden="true">♥</div>
        <div className="character-shadow" aria-hidden="true" />
        <div className={`zoppy wiggle-${touchCount % 4}`} role="button" tabIndex={0} aria-label="Click Zoppy for a giggle" onClick={handleZoppyClick} onKeyDown={handleZoppyKeyDown}>
          <div className="bow bow-left" /><div className="bow bow-right" /><div className="bow-center" />
          <div className="face">
            <div className="eye eye-left"><span className="eye-shine" /><span className="eye-heart">♥</span></div>
            <div className="eye eye-right"><span className="eye-shine" /><span className="eye-heart">♥</span></div>
            <div className="cheek cheek-left" /><div className="cheek cheek-right" />
            <div className="mouth"><span /></div>
          </div>
        </div>
        {touchMessage && <div className="touch-bubble">{touchMessage} <span>♥</span></div>}
        <div className="art-caption"><span>01</span> tap Zoppy for a giggle</div>
      </div>
    </section>
  );
}