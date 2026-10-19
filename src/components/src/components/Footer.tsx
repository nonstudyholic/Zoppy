import { ArrowUp, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer shell">
      <a className="brand" href="#top">
        <span className="brand-mark"><Heart size={17} fill="currentColor" /></span>
        <span>Zoppy</span>
      </a>
      <p>an original character portfolio / made with wonder</p>
      <a href="#top" className="back-top"><ArrowUp size={16} /> back to top</a>
    </footer>
  );
}