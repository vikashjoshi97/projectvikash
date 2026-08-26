import React from 'react';
import { ActiveTab } from '../types';
import { Home, Grid, FolderKanban, User, MessageCircle } from 'lucide-react';

interface BottomNavProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  onOpenContact: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  onOpenContact,
}) => {
  return (
    <nav
      id="mobile-bottom-nav"
      aria-label="Mobile Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-lg border-t border-[#E4E7EC] shadow-[0_-4px_20px_rgba(16,24,40,0.06)] px-3 py-1.5 safe-area-pb"
    >
      <div className="max-w-md mx-auto flex items-center justify-around">
        {/* 1. Home */}
        <button
          type="button"
          id="mobile-nav-home"
          onClick={() => {
            onTabChange('posts');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-150 min-w-[56px] ${
            activeTab === 'posts'
              ? 'text-[#173B57]'
              : 'text-[#667085] hover:text-[#173B57]'
          }`}
          aria-label="Home"
        >
          <Home className={`w-5 h-5 mb-0.5 transition-transform active:scale-90 ${activeTab === 'posts' ? 'text-[#2F7D78]' : 'text-[#667085]'}`} />
          <span className="text-[10px] font-semibold tracking-tight">Home</span>
        </button>

        {/* 2. Posts */}
        <button
          type="button"
          id="mobile-nav-posts"
          onClick={() => {
            onTabChange('posts');
            const target = document.getElementById('posts-3col-grid') || document.getElementById('profile-navigation-tabs');
            if (target) {
              target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-150 min-w-[56px] ${
            activeTab === 'posts'
              ? 'text-[#173B57]'
              : 'text-[#667085] hover:text-[#173B57]'
          }`}
          aria-label="Posts"
        >
          <Grid className={`w-5 h-5 mb-0.5 transition-transform active:scale-90 ${activeTab === 'posts' ? 'text-[#2F7D78]' : 'text-[#667085]'}`} />
          <span className="text-[10px] font-semibold tracking-tight">Posts</span>
        </button>

        {/* 3. Projects */}
        <button
          type="button"
          id="mobile-nav-projects"
          onClick={() => {
            onTabChange('projects');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-150 min-w-[56px] ${
            activeTab === 'projects'
              ? 'text-[#173B57]'
              : 'text-[#667085] hover:text-[#173B57]'
          }`}
          aria-label="Projects"
        >
          <FolderKanban className={`w-5 h-5 mb-0.5 transition-transform active:scale-90 ${activeTab === 'projects' ? 'text-[#2F7D78]' : 'text-[#667085]'}`} />
          <span className="text-[10px] font-semibold tracking-tight">Projects</span>
        </button>

        {/* 4. About */}
        <button
          type="button"
          id="mobile-nav-about"
          onClick={() => {
            onTabChange('about');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-150 min-w-[56px] ${
            activeTab === 'about'
              ? 'text-[#173B57]'
              : 'text-[#667085] hover:text-[#173B57]'
          }`}
          aria-label="About"
        >
          <User className={`w-5 h-5 mb-0.5 transition-transform active:scale-90 ${activeTab === 'about' ? 'text-[#2F7D78]' : 'text-[#667085]'}`} />
          <span className="text-[10px] font-semibold tracking-tight">About</span>
        </button>

        {/* 5. Contact */}
        <button
          type="button"
          id="mobile-nav-contact"
          onClick={onOpenContact}
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-150 text-[#667085] hover:text-[#173B57] min-w-[56px]"
          aria-label="Contact"
        >
          <MessageCircle className="w-5 h-5 mb-0.5 transition-transform active:scale-90" />
          <span className="text-[10px] font-semibold tracking-tight">Contact</span>
        </button>
      </div>
    </nav>
  );
};
