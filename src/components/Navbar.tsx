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
      className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-slate-200/80 transition-all shadow-xs"
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
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4F46E5] to-[#06B6D4] text-white flex items-center justify-center font-bold text-sm tracking-tighter shadow-xs group-hover:scale-105 transition-transform">
              VJ
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-[#111827] text-base leading-tight tracking-tight group-hover:text-[#4F46E5] transition-colors">
                {profile.username}
              </span>
              <span className="text-[11px] text-[#64748B] font-medium leading-none">
                profile
              </span>
            </div>
          </button>
        </div>

        {/* Center: Desktop Navigation & Quick Search */}
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-1 bg-[#EEF3F9] p-1 rounded-full border border-slate-200/70">
            <button
              type="button"
              onClick={() => onTabChange('posts')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'posts'
                  ? 'bg-white text-[#111827] shadow-xs'
                  : 'text-[#64748B] hover:text-[#111827]'
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
                  ? 'bg-white text-[#111827] shadow-xs'
                  : 'text-[#64748B] hover:text-[#111827]'
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
                  ? 'bg-white text-[#111827] shadow-xs'
                  : 'text-[#64748B] hover:text-[#111827]'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>About</span>
            </button>
          </nav>

          {/* Quick Search */}
          <div className="relative">
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#EEF3F9]/80 border transition-all text-xs w-44 lg:w-56 ${
                isSearchFocused
                  ? 'border-[#4F46E5] bg-white ring-2 ring-[#4F46E5]/10'
                  : 'border-slate-200/80 hover:border-slate-300'
              }`}
            >
              <Search className="w-3.5 h-3.5 text-[#64748B] shrink-0" />
              <input
                type="text"
                placeholder="Search posts or works..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full bg-transparent border-none text-[#111827] placeholder-[#64748B] focus:outline-none text-xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-neutral-400 hover:text-neutral-600"
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
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 border border-neutral-200 transition-colors"
            title="Share profile"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Share</span>
          </button>

          {onOpenEdit && (
            <button
              type="button"
              onClick={onOpenEdit}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 border border-neutral-200 transition-colors"
              title="Edit Profile"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden sm:inline">Edit</span>
            </button>
          )}

          {/* Mobile hamburger menu */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-neutral-700 hover:bg-neutral-100 border border-neutral-200"
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
        <div className="md:hidden border-t border-neutral-200 bg-white px-4 py-3 space-y-2 animate-in slide-in-from-top-2 duration-150 shadow-lg">
          <div className="flex flex-col gap-1">
            <button
              type="button"
              onClick={() => {
                onTabChange('posts');
                setMobileMenuOpen(false);
              }}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium ${
                activeTab === 'posts'
                  ? 'bg-neutral-100 text-neutral-900 font-semibold'
                  : 'text-neutral-600 hover:bg-neutral-50'
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
                  ? 'bg-neutral-100 text-neutral-900 font-semibold'
                  : 'text-neutral-600 hover:bg-neutral-50'
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
                  ? 'bg-neutral-100 text-neutral-900 font-semibold'
                  : 'text-neutral-600 hover:bg-neutral-50'
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
