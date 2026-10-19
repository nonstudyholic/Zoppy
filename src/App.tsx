import { useState } from 'react';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import StorySection from '@/components/StorySection';
import ProjectsSection from '@/components/ProjectsSection';
import QuoteSection from '@/components/QuoteSection';
import Guestbook from '@/components/Guestbook';
import Footer from '@/components/Footer';

function App() {
  const [nightMode, setNightMode] = useState(false);

  return (
    <main className={nightMode ? 'site night' : 'site'}>
      <Nav nightMode={nightMode} onToggleNight={() => setNightMode(!nightMode)} />
      <Hero />
      <Marquee />
      <StorySection />
      <ProjectsSection />
      <QuoteSection />
      <Guestbook />
      <Footer />
    </main>
  );
}

export default App;