import React, { useState } from 'react';
import { ActiveTab, ProfileData } from '../types';
import { Compass, FolderKanban, Grid, Search, Menu, X, Share2, Sparkles } from 'lucide-react';

interface NavbarProps {
  profile: ProfileData;
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  onOpenShare: () => void;
  onOpenEdit?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  activeTab,
  onTabChange,
  onOpenShare,
  onOpenEdit,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <header
      id="main-navbar"
      className="sticky top-0 z-40 w-full bg-white/92 backdrop-blur-md border-b border-[#E4E7EC] transition-all shadow-xs"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand / Logo */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              onTabChange('posts');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group flex items-center gap-2.5 text-left focus:outline-none"
            aria-label="Home"
          >
            <div className="w-8 h-8 rounded-lg bg-[#173B57] text-white flex items-center justify-center font-bold text-sm tracking-tighter shadow-xs group-hover:scale-105 transition-transform">
              VJ
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-[#173B57] text-base leading-tight tracking-tight group-hover:text-[#2F7D78] transition-colors">
                {profile.username}
              </span>
              <span className="text-[11px] text-[#667085] font-medium leading-none">
                profile
              </span>
            </div>
          </button>
        </div>

        {/* Center: Desktop Navigation & Quick Search */}
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-1 bg-[#F1F3F2] p-1 rounded-full border border-[#E4E7EC]">
            <button
              type="button"
              onClick={() => onTabChange('posts')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'posts'
                  ? 'bg-white text-[#2F7D78] shadow-xs'
                  : 'text-[#667085] hover:text-[#172033]'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Posts</span>
            </button>
            <button
              type="button"
              onClick={() => onTabChange('projects')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'projects'
                  ? 'bg-white text-[#2F7D78] shadow-xs'
                  : 'text-[#667085] hover:text-[#172033]'
              }`}
            >
              <FolderKanban className="w-3.5 h-3.5" />
              <span>Projects</span>
            </button>
            <button
              type="button"
              onClick={() => onTabChange('about')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'about'
                  ? 'bg-white text-[#2F7D78] shadow-xs'
                  : 'text-[#667085] hover:text-[#172033]'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>About</span>
            </button>
          </nav>

          {/* Quick Search */}
          <div className="relative">
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F1F3F2] border transition-all text-xs w-44 lg:w-56 ${
                isSearchFocused
                  ? 'border-[#2F7D78] bg-white ring-2 ring-[#2F7D78]/10'
                  : 'border-[#E4E7EC] hover:border-[#D0D5DD]'
              }`}
            >
              <Search className="w-3.5 h-3.5 text-[#667085] shrink-0" />
              <input
                type="text"
                placeholder="Search posts or works..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full bg-transparent border-none text-[#172033] placeholder-[#667085] focus:outline-none text-xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-[#667085] hover:text-[#172033]"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onOpenShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#172033] hover:text-[#173B57] bg-white hover:bg-[#F1F3F2] border border-[#E4E7EC] transition-colors"
            title="Share profile"
          >
            <Share2 className="w-3.5 h-3.5 text-[#173B57]" />
            <span className="hidden sm:inline">Share</span>
          </button>

          {onOpenEdit && (
            <button
              type="button"
              onClick={onOpenEdit}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-[#172033] hover:text-[#173B57] bg-white hover:bg-[#F1F3F2] border border-[#E4E7EC] transition-colors"
              title="Edit Profile"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#2F7D78]" />
              <span className="hidden sm:inline">Edit</span>
            </button>
          )}

          {/* Mobile hamburger menu */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#172033] hover:bg-[#F1F3F2] border border-[#E4E7EC]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E4E7EC] bg-white px-4 py-3 space-y-2 animate-in slide-in-from-top-2 duration-150 shadow-lg">
          <div className="flex flex-col gap-1">
            <button
              type="button"
              onClick={() => {
                onTabChange('posts');
                setMobileMenuOpen(false);
              }}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium ${
                activeTab === 'posts'
                  ? 'bg-[#F1F3F2] text-[#2F7D78] font-semibold'
                  : 'text-[#667085] hover:bg-[#F1F3F2]'
              }`}
            >
              <Grid className="w-4 h-4" />
              <span>Posts Grid</span>
            </button>
            <button
              type="button"
              onClick={() => {
                onTabChange('projects');
                setMobileMenuOpen(false);
              }}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium ${
                activeTab === 'projects'
                  ? 'bg-[#F1F3F2] text-[#2F7D78] font-semibold'
                  : 'text-[#667085] hover:bg-[#F1F3F2]'
              }`}
            >
              <FolderKanban className="w-4 h-4" />
              <span>Projects Showcase</span>
            </button>
            <button
              type="button"
              onClick={() => {
                onTabChange('about');
                setMobileMenuOpen(false);
              }}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium ${
                activeTab === 'about'
                  ? 'bg-[#F1F3F2] text-[#2F7D78] font-semibold'
                  : 'text-[#667085] hover:bg-[#F1F3F2]'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>About &amp; Biography</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
