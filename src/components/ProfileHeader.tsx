import React, { useState, useRef, useEffect } from 'react';
import { ProfileData } from '../types';
import {
  BadgeCheck,
  MapPin,
  Link as LinkIcon,
  MoreHorizontal,
  UserPlus,
  UserCheck,
  MessageCircle,
  Share2,
  Copy,
  ExternalLink,
  QrCode,
  Sparkles,
} from 'lucide-react';

interface ProfileHeaderProps {
  profile: ProfileData;
  isFollowing: boolean;
  onToggleFollow: () => void;
  onOpenMessage: () => void;
  onOpenShare: () => void;
  onOpenEdit?: () => void;
  onSelectHighlight?: (title: string) => void;
  onToast: (text: string, type?: 'success' | 'info') => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profile,
  isFollowing,
  onToggleFollow,
  onOpenMessage,
  onOpenShare,
  onOpenEdit,
  onSelectHighlight,
  onToast,
}) => {
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const moreMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        moreMenuRef.current &&
        !moreMenuRef.current.contains(event.target as Node)
      ) {
        setMoreMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    onToast('Profile link copied to clipboard!', 'success');
    setMoreMenuOpen(false);
  };

  return (
    <div id="profile-header-container" className="w-full max-w-4xl mx-auto pt-6 sm:pt-10 pb-6 px-4 sm:px-8">
      {/* Premium Translucent / Glass Profile Card with subtle glow background */}
      <div className="relative rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 bg-white/80 backdrop-blur-md border border-slate-200/70 shadow-xs overflow-hidden">
        {/* Soft Background Layer within the Card */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/90 via-slate-50/50 to-indigo-50/20 z-0" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-radial from-[#4F46E5]/5 via-[#06B6D4]/3 to-transparent blur-2xl pointer-events-none z-0" />

        {/* Desktop & Tablet: 2 Column Layout (Left: Photo, Right: Details) */}
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6 sm:gap-10 md:gap-14 pb-8 border-b border-slate-200/60">
          {/* ================= LEFT: Profile Photo ================= */}
          <div className="w-full md:w-auto flex justify-center md:justify-start shrink-0">
            <div className="relative group">
              {/* Gradient / Accent Ring */}
              <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full p-[3px] bg-gradient-to-tr from-[#4F46E5]/40 via-slate-200 to-[#06B6D4]/40 shadow-sm transition-all duration-300 group-hover:scale-102">
                <div className="w-full h-full rounded-full bg-white p-[3px]">
                  <img
                    src={profile.avatar}
                    alt={`${profile.name} profile`}
                    className="w-full h-full rounded-full object-cover bg-neutral-900 shadow-inner"
                    onError={(e) => {
                      // Fallback to default svg if missing
                      (e.target as HTMLImageElement).src = '/images/profile/avatar.svg';
                    }}
                  />
                </div>
              </div>

              {/* Verified Floating Badge */}
              {profile.verified && (
                <div
                  className="absolute bottom-2 right-2 md:bottom-3 md:right-3 bg-[#4F46E5] text-white rounded-full p-1 shadow-md ring-2 ring-white"
                  title={profile.badgeText || 'Verified profile'}
                >
                  <BadgeCheck className="w-4 h-4 sm:w-5 sm:h-5 fill-[#4F46E5] text-white" />
                </div>
              )}
            </div>
          </div>

          {/* ================= RIGHT: Profile Details ================= */}
          <div className="w-full flex-1 space-y-4 sm:space-y-5">
            {/* Row 1: Username & Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-1.5">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111827]">
                  {profile.handle || `@${profile.username}`}
                </h1>
                {profile.verified && (
                  <span title="Verified Account">
                    <BadgeCheck className="w-5 h-5 text-[#4F46E5] fill-[#4F46E5]/15 shrink-0" />
                  </span>
                )}
              </div>

              {/* Action Buttons Group */}
              <div className="flex items-center flex-wrap gap-2 pt-1 sm:pt-0">
                {/* Follow Button */}
                <button
                  type="button"
                  id="btn-follow"
                  onClick={onToggleFollow}
                  className={`inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all active:scale-95 shadow-xs ${
                    isFollowing
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300/80'
                      : 'bg-[#111827] hover:bg-[#1E293B] text-white'
                  }`}
                >
                  {isFollowing ? (
                    <>
                      <UserCheck className="w-4 h-4" />
                      <span>Following</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4" />
                      <span>Follow</span>
                    </>
                  )}
                </button>

                {/* Message Button */}
                <button
                  type="button"
                  id="btn-message"
                  onClick={onOpenMessage}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200/80 transition-all active:scale-95 shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Message</span>
                </button>

                {/* Share Button */}
                <button
                  type="button"
                  id="btn-share"
                  onClick={onOpenShare}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/80 transition-all active:scale-95"
                  title="Share profile"
                >
                  <Share2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Share</span>
                </button>

                {/* More (...) Button with Dropdown */}
                <div className="relative" ref={moreMenuRef}>
                  <button
                    type="button"
                    id="btn-more-options"
                    onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                    className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 border border-slate-200/80 transition-colors"
                    aria-label="More options"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>

                  {moreMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-30 animate-in fade-in zoom-in-95 duration-150">
                      <button
                        type="button"
                        onClick={handleCopyLink}
                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 text-left"
                      >
                        <Copy className="w-3.5 h-3.5 text-slate-500" />
                        <span>Copy profile link</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          onOpenShare();
                          setMoreMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 text-left"
                      >
                        <QrCode className="w-3.5 h-3.5 text-slate-500" />
                        <span>Show QR Code</span>
                      </button>
                      {onOpenEdit && (
                        <button
                          type="button"
                          onClick={() => {
                            onOpenEdit();
                            setMoreMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 text-left"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                          <span>Edit Profile Data</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Row 2: Profile Statistics */}
            <div
              id="profile-stats-row"
              className="flex items-center justify-between sm:justify-start gap-4 sm:gap-8 md:gap-10 text-slate-800"
            >
              <div className="flex flex-col items-start">
                <span className="font-bold text-[#111827] text-base sm:text-lg leading-tight">
                  {profile.stats.posts}
                </span>
                <span className="text-xs sm:text-sm text-[#64748B] font-medium">
                  Posts
                </span>
              </div>

              <div className="flex flex-col items-start">
                <span className="font-bold text-[#111827] text-base sm:text-lg leading-tight">
                  {profile.stats.followers}
                </span>
                <span className="text-xs sm:text-sm text-[#64748B] font-medium">
                  Followers
                </span>
              </div>

              <div className="flex flex-col items-start">
                <span className="font-bold text-[#111827] text-base sm:text-lg leading-tight">
                  {profile.stats.following}
                </span>
                <span className="text-xs sm:text-sm text-[#64748B] font-medium">
                  Following
                </span>
              </div>

              <div className="flex flex-col items-start">
                <span className="font-bold text-[#111827] text-base sm:text-lg leading-tight">
                  {profile.stats.countries}
                </span>
                <span className="text-xs sm:text-sm text-[#64748B] font-medium">
                  Countries
                </span>
              </div>
            </div>

            {/* Row 3: Display Name, Category & Bio */}
            <div className="space-y-2 text-sm">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#111827] text-base">
                    {profile.name}
                  </span>
                  {profile.pronouns && (
                    <span className="text-xs text-slate-400 font-normal">
                      ({profile.pronouns})
                    </span>
                  )}
                </div>
                {profile.category && (
                  <p className="text-xs font-semibold text-[#4F46E5] tracking-wide uppercase mt-0.5">
                    {profile.category}
                  </p>
                )}
              </div>

              {/* Editable Bio Description */}
              <p className="text-slate-700 leading-relaxed max-w-xl whitespace-pre-line text-sm sm:text-base font-normal">
                {profile.bio}
              </p>

              {/* Location & Website links */}
              <div className="flex flex-wrap items-center gap-y-1.5 gap-x-4 pt-1 text-xs sm:text-sm text-slate-600">
                {profile.location && (
                  <div className="flex items-center gap-1 text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{profile.location}</span>
                  </div>
                )}

                {profile.website && (
                  <a
                    href={profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[#4F46E5] hover:text-[#4338CA] font-medium group transition-colors"
                  >
                    <LinkIcon className="w-3.5 h-3.5 text-[#4F46E5] shrink-0" />
                    <span className="underline underline-offset-2">
                      {profile.websiteDisplay || profile.website}
                    </span>
                    <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Story Highlights Circles */}
        {profile.highlights && profile.highlights.length > 0 && (
          <div id="story-highlights-bar" className="pt-6 overflow-x-auto no-scrollbar flex items-center gap-5 sm:gap-8 relative z-10">
            {profile.highlights.map((highlight) => (
              <button
                key={highlight.id}
                type="button"
                onClick={() => onSelectHighlight?.(highlight.title)}
                className="flex flex-col items-center gap-1.5 shrink-0 group focus:outline-none"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-[2px] bg-gradient-to-tr from-slate-200 to-indigo-100 group-hover:from-[#4F46E5]/40 group-hover:to-[#06B6D4]/40 transition-all">
                  <div className="w-full h-full rounded-full bg-white p-[2px] overflow-hidden">
                    <img
                      src={highlight.coverImage}
                      alt={highlight.title}
                      className="w-full h-full rounded-full object-cover group-hover:scale-105 transition-transform"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/posts/post-1.svg';
                      }}
                    />
                  </div>
                </div>
                <span className="text-xs font-medium text-slate-700 group-hover:text-[#111827]">
                  {highlight.title}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
