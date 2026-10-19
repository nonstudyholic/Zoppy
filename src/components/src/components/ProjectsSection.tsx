import { ArrowUpRight, Heart, Star } from 'lucide-react';
import { projects } from '@/data/content';

export default function ProjectsSection() {
  return (
    <section className="project-section shell" id="projects">
      <div className="section-heading split-heading">
        <div>
          <p className="eyebrow">02 / little projects</p>
          <h2>Things I’ve made<br /><em>with my tiny hands.</em></h2>
        </div>
        <p className="heading-side">Three small worlds, built with a lot of heart and a little bit of chaos.</p>
      </div>
      <div className="project-grid">
        {projects.map((project, index) => (
          <article className={`project-card ${project.accent}`} key={project.title}>
            <div className="project-visual">
              <span className="project-index">{project.type}</span>
              {index === 0 && <div className="garden-icon"><Heart size={45} fill="currentColor" /></div>}
              {index === 1 && <div className="hello-icon">hi<span>!</span></div>}
              {index === 2 && <div className="meadow-icon"><Star size={40} fill="currentColor" /><i>✦</i></div>}
              <ArrowUpRight className="project-arrow" size={20} />
            </div>
            <div className="project-info">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <a href="#projects">View project <ArrowUpRight size={15} /></a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}