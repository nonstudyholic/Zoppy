import { traits } from '@/data/content';

export default function StorySection() {
  return (
    <section className="story-section shell" id="story">
      <div className="section-heading">
        <p className="eyebrow">
        <h2>Your own baby,<br /><em>with a story to tell.</em></h2>
      </div>
      <div className="story-grid">
        <div className="story-copy">
          <p className="large-copy">Zoppy is a magical light violet slime who believes every small moment is worth celebrating.</p>
          <p>She hums when she’s happy, collects shiny little things, and has never met a puddle she didn’t want to bounce in. Her greatest superpower? Making a room feel a little lighter.</p>
          <div className="signature"><span>Zoppy</span><small>junior giggleologist</small></div>
        </div>
        <div className="trait-cards">
          {traits.map((trait) => (
            <article className="trait-card" key={trait.number}>
              <span className="trait-number">{trait.number}</span>
              <h3>{trait.title}</h3>
              <p>{trait.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}