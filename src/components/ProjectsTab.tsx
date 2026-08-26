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
    <div id="projects-showcase-tab" className="w-full max-w-4xl mx-auto px-4 sm:px-6">
      {/* Projects Grid: 2-column responsive layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {projects.map((project) => (
          <div
            key={project.id}
            id={`project-card-${project.id}`}
            className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
          >
            {/* Image Preview Container */}
            <div
              className="relative w-full aspect-video bg-slate-900 overflow-hidden cursor-pointer"
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
                <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-semibold text-[#111827] tracking-wide shadow-xs border border-white/40">
                  {project.category}
                </span>
              </div>
              {project.year && (
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-0.5 rounded-md bg-[#111827]/70 backdrop-blur-md text-[10px] font-medium text-slate-200 border border-white/10">
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
                    className="text-lg font-bold text-[#111827] group-hover:text-[#4F46E5] transition-colors cursor-pointer"
                  >
                    {project.title}
                  </h3>
                  {project.featured && (
                    <span className="flex items-center gap-1 text-xs font-semibold text-[#4F46E5] bg-indigo-50 border border-indigo-200/60 px-2.5 py-0.5 rounded-full">
                      <Sparkles className="w-3 h-3 fill-[#4F46E5] text-[#4F46E5]" />
                      Featured
                    </span>
                  )}
                </div>

                <p className="text-sm text-[#64748B] leading-relaxed line-clamp-2">
                  {project.description}
                </p>

                {/* Tech Tags */}
                {((project.technologies && project.technologies.length > 0) || (project.tags && project.tags.length > 0)) && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {(project.technologies || project.tags || []).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md bg-[#EEF3F9] text-[#64748B] text-[11px] font-medium border border-slate-200/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                {project.url ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToast(`Opening ${project.title}`, 'info');
                    }}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#111827] hover:bg-[#4F46E5] text-white text-xs font-semibold transition-all shadow-xs active:scale-98"
                  >
                    <span>View Live Project</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#111827] hover:bg-[#4F46E5] text-white text-xs font-semibold transition-all shadow-xs active:scale-98"
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
                    className="p-2 rounded-lg text-neutral-700 hover:bg-neutral-100 border border-neutral-200 transition-colors"
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
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedProject(null);
          }}
        >
          <div className="relative w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
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
                <span className="px-3 py-1 rounded-full bg-neutral-900/80 backdrop-blur-md text-xs font-semibold text-white">
                  {selectedProject.category}
                </span>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto space-y-5">
              <div>
                <h2 className="text-2xl font-bold text-neutral-900">
                  {selectedProject.title}
                </h2>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Released in {selectedProject.year || '2024'}
                </p>
              </div>

              <p className="text-sm text-neutral-700 leading-relaxed">
                {selectedProject.description}
              </p>

              {/* Highlights */}
              {selectedProject.highlights && selectedProject.highlights.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                    Key Features &amp; Architecture
                  </h4>
                  <ul className="space-y-1.5">
                    {selectedProject.highlights.map((highlight, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-xs sm:text-sm text-neutral-700"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
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
                      className="p-3 rounded-xl bg-neutral-50 border border-neutral-100 text-center"
                    >
                      <span className="block text-lg font-bold text-neutral-900">
                        {metric.value}
                      </span>
                      <span className="block text-[11px] font-medium text-neutral-500 uppercase tracking-wide">
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
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs sm:text-sm font-semibold transition-colors shadow-xs"
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
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs sm:text-sm font-semibold transition-colors border border-neutral-200"
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
