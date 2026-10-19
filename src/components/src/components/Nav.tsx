import { useState } from 'react';
import { Heart, Menu, X } from 'lucide-react';

type NavProps = {
  nightMode: boolean;
  onToggleNight: () => void;
};

export default function Nav({ nightMode, onToggleNight }: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
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
        <button className="theme-button" onClick={onToggleNight} aria-label="Toggle night mode">
          <span className={nightMode ? 'toggle-dot active' : 'toggle-dot'} /> {nightMode ? 'Day mode' : 'Night mode'}
        </button>
      </div>
    </nav>
  );
}