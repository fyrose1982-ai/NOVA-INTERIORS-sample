import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function ProjectCard({ project, badge = true }) {
  const img = project.images[0];
  return (
    <Link to={`/projects/${project.slug}`} className="project-card" aria-label={`${project.title} – view project`}>
      <figure>
        <div className="media">
          <img src={img.src} alt={img.alt} loading="lazy" decoding="async" width="1600" height="1067" />
          {badge && <span className="badge">{project.category}</span>}
          <span className="view" aria-hidden="true">
            <ArrowUpRight size={20} />
          </span>
        </div>
        <figcaption>
          <h3>{project.title}</h3>
          <p>
            {project.type} · {project.location.split(',')[1]?.trim() || project.location}
          </p>
        </figcaption>
      </figure>
    </Link>
  );
}
