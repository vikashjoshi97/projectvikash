import React from 'react';
import { ProfileData } from '../types';
import { Heart, Globe } from 'lucide-react';

interface FooterProps {
  profile: ProfileData;
}

export const Footer: React.FC<FooterProps> = ({ profile }) => {
  return (
    <footer className="w-full border-t border-[#E4E7EC] mt-16 py-10 px-4 text-center text-xs text-[#667085]">
      <div className="max-w-4xl mx-auto space-y-3">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-medium text-[#667085]">
          <a
            href={profile.website}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#173B57] transition-colors"
          >
            Portfolio
          </a>
          <a
            href="https://github.com/vikashjoshi"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#173B57] transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://x.com/vikashjoshi"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#173B57] transition-colors"
          >
            Twitter / X
          </a>
          <a
            href="https://linkedin.com/in/vikashjoshi"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#173B57] transition-colors"
          >
            LinkedIn
          </a>
        </div>

        <p className="text-[#667085]/80">
          &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
