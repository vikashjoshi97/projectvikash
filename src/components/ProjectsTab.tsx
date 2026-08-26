import React, { useState } from 'react';
import { ProjectItem } from '../types';
import { ExternalLink, Github, Sparkles, X, Layers, CheckCircle2 } from 'lucide-react';

interface ProjectsTabProps {
  projects: ProjectItem[];
  onToast: (text: string, type?: 'success' | 'info') => void;
}

export const ProjectsTab: React.FC<ProjectsTabProps> = ({ projects, onToast }) => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <div id="projects-showcase-tab" className="w-full max-w-4xl mx-auto px-2 sm:px-4">
      {/* Projects Grid: 2-column responsive layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {projects.map((project) => (
          <div
            key={project.id}
            id={`project-card-${project.id}`}
            className="group bg-white rounded-2xl border border-[#E4E7EC] overflow-hidden shadow-[0_8px_30px_rgba(16,24,40,0.06)] hover:shadow-[0_12px_36px_rgba(16,24,40,0.1)] transition-all duration-200 flex flex-col justify-between"
          >
            {/* Image Preview Container */}
            <div
              className="relative w-full aspect-video bg-neutral-900 overflow-hidden cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-103"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/projects/project-1.svg';
                }}
              />
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-semibold text-[#173B57] tracking-wide shadow-xs border border-[#E4E7EC]">
                  {project.category}
                </span>
              </div>
              {project.year && (
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-0.5 rounded-md bg-[#173B57]/80 backdrop-blur-md text-[10px] font-medium text-white border border-white/10">
                    {project.year}
                  </span>
                </div>
              )}
            </div>

            {/* Content Container */}
            <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3
                    onClick={() => setSelectedProject(project)}
                    className="text-lg font-bold text-[#173B57] group-hover:text-[#2F7D78] transition-colors cursor-pointer"
                  >
                    {project.title}
                  </h3>
                  {project.featured && (
                    <span className="flex items-center gap-1 text-xs font-semibold text-[#2F7D78] bg-[#2F7D78]/10 border border-[#2F7D78]/20 px-2.5 py-0.5 rounded-full">
                      <Sparkles className="w-3 h-3 fill-[#2F7D78] text-[#2F7D78]" />
                      Featured
                    </span>
                  )}
                </div>

                <p className="text-sm text-[#667085] leading-relaxed line-clamp-2">
                  {project.description}
                </p>

                {/* Tech Tags */}
                {((project.technologies && project.technologies.length > 0) || (project.tags && project.tags.length > 0)) && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {(project.technologies || project.tags || []).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md bg-[#F1F3F2] text-[#172033] text-[11px] font-medium border border-[#E4E7EC]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-[#E4E7EC] flex items-center justify-between gap-3">
                {project.url ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToast(`Opening ${project.title}`, 'info');
                    }}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#173B57] hover:bg-[#112C42] text-white text-xs font-semibold transition-all shadow-xs active:scale-98"
                  >
                    <span>View Live Project</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#173B57] hover:bg-[#112C42] text-white text-xs font-semibold transition-all shadow-xs active:scale-98"
                  >
                    <span>View Live Project</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToast('Opening project repository', 'info');
                    }}
                    className="p-2 rounded-lg text-[#172033] hover:bg-[#F1F3F2] border border-[#E4E7EC] transition-colors"
                    title="View Source Code"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div
          id="project-detail-modal"
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedProject(null);
          }}
        >
          <div className="relative w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-2xl border border-[#E4E7EC] animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
              aria-label="Close project modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image Banner */}
            <div className="w-full aspect-video bg-neutral-950 relative">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4">
                <span className="px-3 py-1 rounded-full bg-[#173B57]/90 backdrop-blur-md text-xs font-semibold text-white">
                  {selectedProject.category}
                </span>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto space-y-5">
              <div>
                <h2 className="text-2xl font-bold text-[#173B57]">
                  {selectedProject.title}
                </h2>
                <p className="text-xs text-[#667085] mt-0.5">
                  Released in {selectedProject.year || '2024'}
                </p>
              </div>

              <p className="text-sm text-[#172033] leading-relaxed">
                {selectedProject.description}
              </p>

              {/* Highlights */}
              {selectedProject.highlights && selectedProject.highlights.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#667085]">
                    Key Features &amp; Architecture
                  </h4>
                  <ul className="space-y-1.5">
                    {selectedProject.highlights.map((highlight, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-xs sm:text-sm text-[#172033]"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#2F7D78] shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Metrics */}
              {selectedProject.metrics && selectedProject.metrics.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  {selectedProject.metrics.map((metric, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-[#F1F3F2] border border-[#E4E7EC] text-center"
                    >
                      <span className="block text-lg font-bold text-[#173B57]">
                        {metric.value}
                      </span>
                      <span className="block text-[11px] font-medium text-[#667085] uppercase tracking-wide">
                        {metric.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="pt-4 flex items-center gap-3">
                {selectedProject.url && (
                  <a
                    href={selectedProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#173B57] hover:bg-[#112C42] text-white text-xs sm:text-sm font-semibold transition-colors shadow-xs"
                  >
                    <span>View Live Project</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-[#F1F3F2] text-[#173B57] text-xs sm:text-sm font-semibold transition-colors border border-[#E4E7EC]"
                  >
                    <Github className="w-4 h-4" />
                    <span>Source</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
