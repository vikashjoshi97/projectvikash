import React from 'react';
import { ActiveTab } from '../types';
import { Grid, FolderKanban, User } from 'lucide-react';

interface ProfileNavProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  postsCount: number;
  projectsCount: number;
}

export const ProfileNav: React.FC<ProfileNavProps> = ({
  activeTab,
  onTabChange,
  postsCount,
  projectsCount,
}) => {
  return (
    <div
      id="profile-navigation-tabs"
      className="w-full max-w-4xl mx-auto my-6 px-4"
    >
      <div className="flex items-center justify-center gap-6 sm:gap-14 border-t border-[#E4E7EC] pt-1">
        {/* Posts Tab */}
        <button
          type="button"
          id="tab-posts"
          onClick={() => onTabChange('posts')}
          className={`flex items-center gap-2 py-3 text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all relative ${
            activeTab === 'posts'
              ? 'text-[#173B57] border-t-2 border-[#2F7D78] -mt-[5px]'
              : 'text-[#667085] hover:text-[#173B57]'
          }`}
        >
          <Grid className={`w-4 h-4 ${activeTab === 'posts' ? 'text-[#2F7D78]' : 'text-[#667085]'}`} />
          <span>Posts</span>
          <span className="text-[11px] font-medium text-[#667085]">
            ({postsCount})
          </span>
        </button>

        {/* Projects Tab */}
        <button
          type="button"
          id="tab-projects"
          onClick={() => onTabChange('projects')}
          className={`flex items-center gap-2 py-3 text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all relative ${
            activeTab === 'projects'
              ? 'text-[#173B57] border-t-2 border-[#2F7D78] -mt-[5px]'
              : 'text-[#667085] hover:text-[#173B57]'
          }`}
        >
          <FolderKanban className={`w-4 h-4 ${activeTab === 'projects' ? 'text-[#2F7D78]' : 'text-[#667085]'}`} />
          <span>Projects</span>
          <span className="text-[11px] font-medium text-[#667085]">
            ({projectsCount})
          </span>
        </button>

        {/* About Tab */}
        <button
          type="button"
          id="tab-about"
          onClick={() => onTabChange('about')}
          className={`flex items-center gap-2 py-3 text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all relative ${
            activeTab === 'about'
              ? 'text-[#173B57] border-t-2 border-[#2F7D78] -mt-[5px]'
              : 'text-[#667085] hover:text-[#173B57]'
          }`}
        >
          <User className={`w-4 h-4 ${activeTab === 'about' ? 'text-[#2F7D78]' : 'text-[#667085]'}`} />
          <span>About</span>
        </button>
      </div>
    </div>
  );
};
