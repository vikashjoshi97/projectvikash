import React from 'react';
import { ProfileData } from '../types';
import { Heart, Globe } from 'lucide-react';

interface FooterProps {
  profile: ProfileData;
}

export const Footer: React.FC<FooterProps> = ({ profile }) => {
  return (
    <footer className="w-full border-t border-slate-200/80 mt-16 py-10 px-4 text-center text-xs text-[#64748B]">
      <div className="max-w-4xl mx-auto space-y-3">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-medium text-[#64748B]">
          <a
            href={profile.website}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#4F46E5] transition-colors"
          >
            Portfolio
          </a>
          <a
            href="https://github.com/vikashjoshi"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#4F46E5] transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://x.com/vikashjoshi"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#4F46E5] transition-colors"
          >
            Twitter / X
          </a>
          <a
            href="https://linkedin.com/in/vikashjoshi"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#4F46E5] transition-colors"
          >
            LinkedIn
          </a>
        </div>

        <p className="text-[#64748B]/80">
          &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
