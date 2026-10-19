import { useState, type FormEvent, type KeyboardEvent } from 'react';
import { supabase } from '@/lib/supabase';
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  Check,
  Heart,
  Menu,
  Sparkles,
  Star,
  X,
} from 'lucide-react';

const traits = [
  { number: '01', title: 'What they are', text: 'A bouncy light violet slime with big, do-like eyes and a soft smile.' },
  { number: '02', title: 'What they do', text: 'A junior giggleologist who turns tiny everyday moments into joy.' },
  { number: '03', title: 'What their story is', text: 'Born beneath a moonlit reef, Zoppy is on a mission to make the world laugh.' },
];

const projects = [
  { type: '01 / identity', title: 'The Giggle Garden', description: 'A playful little world for collecting giggles, good thoughts, and tiny treasures.', accent: 'pink' },
  { type: '02 / experience', title: 'Zoppy Says Hello', description: 'A tiny interactive storybook where every click uncovers a new friendly surprise.', accent: 'orange' },
  { type: '03 / archive', title: 'Moonlight Meadow', description: 'A dreamy field guide to Zoppy’s firefly friend, favorite place, and softest memories.', accent: 'lilac' },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [nightMode, setNightMode] = useState(false);
  const [isWobbly, setIsWobbly] = useState(false);
  const [message, setMessage] = useState('');
  const [noteStatus, setNoteStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');  
  const [touchCount, setTouchCount] = useState(0);
  const [touchMessage, setTouchMessage] = useState('');

  const closeMenu = () => setMenuOpen(false);

  const playGiggle = (): void => {
    const audioContext = new AudioContext();
    const notes = [660, 880, 740, 990];
    const startTime = audioContext.currentTime;

    void audioContext.resume();
    notes.forEach((frequency, index) => {
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      const noteStart = startTime + index * 0.09;

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(frequency, noteStart);
      oscillator.frequency.exponentialRampToValueAtTime(frequency + 110, noteStart + 0.07);
      gain.gain.setValueAtTime(0.0001, noteStart);
      gain.gain.exponentialRampToValueAtTime(0.12, noteStart + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 0.1);
      oscillator.connect(gain);
      gain.connect(audioContext.destination);
      oscillator.start(noteStart);
      oscillator.stop(noteStart + 0.11);
    });

    window.setTimeout(() => void audioContext.close(), 600);
  };
  const handleSendNote = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const trimmed = message.trim();
    if (!trimmed || noteStatus === 'sending') return;

    if (!supabase) {
      setNoteStatus('error');
      return;
    }

    setNoteStatus('sending');
    const { error } = await supabase.from('guestbook_notes').insert({ message: trimmed });

    if (error) {
      setNoteStatus('error');
      return;
    }

    setMessage('');
    setNoteStatus('sent');
  };
  const handleZoppyClick = (): void => {
    const nextTouchCount = touchCount + 1;
    setTouchCount(nextTouchCount);
    setTouchMessage(nextTouchCount >= 3 ? 'Don’t do it... hehe!' : 'Hehe!');
    playGiggle();
  };

  const handleZoppyKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleZoppyClick();
    }
  };

  return (
    <main className={nightMode ? 'site night' : 'site'}>
      <nav className="nav shell">
        <a className="brand" href="#top" onClick={closeMenu}>
          <span className="brand-mark"><Heart size={17} fill="currentColor" /></span>
          <span>Zoppy</span>
        </a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <div className={menuOpen ? 'nav-links open' : 'nav-links'}>
          <a href="#story" onClick={closeMenu}>My story</a>
          <a href="#projects" onClick={closeMenu}>Little projects</a>
          <button className="theme-button" onClick={() => setNightMode(!nightMode)} aria-label="Toggle night mode">
            <span className={nightMode ? 'toggle-dot active' : 'toggle-dot'} /> {nightMode ? 'Day mode' : 'Night mode'}
          </button>
        </div>
      </nav>

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
        <div className={`hero-art reaction-${touchCount % 4}`} aria-label="A friendly light violet slime character named Zoppy">
          <div className="sunburst" />
          <div className="floating-star star-one">✦</div>
          <div className="floating-star star-two">✦</div>
          <div className="floating-heart">♥</div>
          <div className="character-shadow" />
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

      <section className="marquee"><div><span>soft-hearted</span><i>✦</i><span>curious</span><i>✦</i><span>slightly clumsy</span><i>✦</i><span>full of wonder</span><i>✦</i><span>soft-hearted</span><i>✦</i></div></section>

      <section className="story-section shell" id="story">
        <div className="section-heading">
          <h2>The Lore of,<br /><em>my universe.</em></h2>
        </div>
        <div className="story-grid">
          <div className="story-copy">
            <p className="large-copy">Zoppy is a magical light violet slime who believes every small moment is worth celebrating.</p>
            <p>She hums when she’s happy, collects shiny little things, and has never met a puddle she didn’t want to bounce in. Her greatest superpower? Making a room feel a little lighter.</p>
            <div className="signature"><span>Zoppy</span><small>junior giggleologist</small></div>
          </div>
          <div className="trait-cards">
            {traits.map((trait) => <article className="trait-card" key={trait.number}><span className="trait-number">{trait.number}</span><h3>{trait.title}</h3><p>{trait.text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="project-section shell" id="projects">
        <div className="section-heading split-heading"><div><p className="eyebrow">02 / little projects</p><h2>Things I’ve made<br /><em>with my tiny hands.</em></h2></div><p className="heading-side">Three small worlds, built with a lot of heart and a little bit of chaos.</p></div>
        <div className="project-grid">
          {projects.map((project, index) => <article className={`project-card ${project.accent}`} key={project.title}><div className="project-visual"><span className="project-index">{project.type}</span>{index === 0 && <div className="garden-icon"><Heart size={45} fill="currentColor" /></div>}{index === 1 && <div className="hello-icon">hi<span>!</span></div>}{index === 2 && <div className="meadow-icon"><Star size={40} fill="currentColor" /><i>✦</i></div>}<ArrowUpRight className="project-arrow" size={20} /></div><div className="project-info"><h3>{project.title}</h3><p>{project.description}</p><a href="#projects">View project <ArrowUpRight size={15} /></a></div></article>)}
        </div>
      </section>

      <section className="quote-section shell"><div className="quote-mark">“</div><blockquote>She keeps little “memory bubbles” where she stores the most important thoughts.</blockquote><p>— Zoppy’s very official character notes</p></section>

      <section className="guestbook shell">
        <div><p className="eyebrow">03 / leave a little love</p><h2>What would you<br /><em>tell Zoppy?</em></h2></div>
                <form className="guestbook-form" onSubmit={handleSendNote}>
          <p>Send a tiny note to the dream archive.</p>
          <div className="input-row">
            <input
              value={message}
              onChange={(event) => {
                setMessage(event.target.value);
                if (noteStatus !== 'sending') setNoteStatus('idle');
              }}
              placeholder="Write a kind thought..."
              aria-label="Your message"
              maxLength={280}
            />
            <button type="submit" disabled={!message.trim() || noteStatus === 'sending'} aria-label="Send message">
              <ArrowUpRight size={19} />
            </button>
          </div>
          {noteStatus === 'sending' && <span className="sent" role="status">Sending your note…</span>}
          {noteStatus === 'sent' && <span className="sent" role="status"><Check size={15} /> Your note is tucked safely away.</span>}
          {noteStatus === 'error' && <span className="sent sent-error" role="status">Oops, Zoppy couldn’t receive that. Please try again.</span>}
        </form>
      </section>

      <footer className="footer shell"><a className="brand" href="#top"><span className="brand-mark"><Heart size={17} fill="currentColor" /></span><span>Zoppy</span></a><p>an original character portfolio / made with wonder</p><a href="#top" className="back-top"><ArrowUp size={16} /> back to top</a></footer>
    </main>
  );
}

export default App;
