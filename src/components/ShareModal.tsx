import React, { useState } from 'react';
import { ProfileData, PostItem } from '../types';
import { X, Copy, Check, QrCode, Twitter, Linkedin, MessageSquare, Send } from 'lucide-react';

interface ShareModalProps {
  profile: ProfileData;
  targetPost?: PostItem | null;
  onClose: () => void;
  onToast: (text: string, type?: 'success' | 'info') => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  profile,
  targetPost,
  onClose,
  onToast,
}) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = window.location.href;
  const shareTitle = targetPost
    ? `Check out this post by ${profile.name} (${profile.handle})`
    : `Visit ${profile.name}'s profile (${profile.handle})`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    onToast('Link copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          url: shareUrl,
        });
        onToast('Shared successfully', 'success');
      } catch {
        // Ignored if cancelled
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div
      id="share-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-md bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgba(16,24,40,0.06)] animate-in zoom-in-95 duration-150 border border-[#E4E7EC] space-y-5">
        <div className="flex items-center justify-between border-b border-[#E4E7EC] pb-3">
          <h3 className="text-base font-bold text-[#173B57]">
            {targetPost ? 'Share Post' : 'Share Profile'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#667085] hover:text-[#173B57] rounded-full hover:bg-[#F1F3F2] transition-colors"
            aria-label="Close share dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preview Card */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-[#F7F7F5] border border-[#E4E7EC]">
          <img
            src={targetPost ? targetPost.image : profile.avatar}
            alt={profile.name}
            className="w-12 h-12 rounded-lg object-cover border border-[#E4E7EC]"
          />
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold text-[#173B57] truncate">
              {profile.name}
            </h4>
            <p className="text-xs text-[#667085] truncate">
              {targetPost ? targetPost.caption : profile.handle}
            </p>
          </div>
        </div>

        {/* Copy Link Input */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-[#667085]">
            Share Link
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 px-3 py-2 rounded-xl bg-[#F7F7F5] border border-[#E4E7EC] text-xs text-[#172033] font-mono truncate focus:outline-none"
            />
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#173B57] hover:bg-[#173B57]/90 text-white text-xs font-semibold transition-colors shrink-0"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#2F7D78]" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Social Share Buttons */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              shareTitle
            )}&url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-[#F7F7F5] hover:bg-[#F1F3F2] border border-[#E4E7EC] text-[#173B57] transition-colors"
          >
            <Twitter className="w-5 h-5 text-sky-500" />
            <span className="text-[11px] font-medium">Twitter / X</span>
          </a>

          <a
            href={`https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
              shareUrl
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-[#F7F7F5] hover:bg-[#F1F3F2] border border-[#E4E7EC] text-[#173B57] transition-colors"
          >
            <Linkedin className="w-5 h-5 text-blue-600" />
            <span className="text-[11px] font-medium">LinkedIn</span>
          </a>

          <button
            type="button"
            onClick={handleNativeShare}
            className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-[#F7F7F5] hover:bg-[#F1F3F2] border border-[#E4E7EC] text-[#173B57] transition-colors"
          >
            <Send className="w-5 h-5 text-[#173B57]" />
            <span className="text-[11px] font-medium">More / Device</span>
          </button>
        </div>
      </div>
    </div>
  );
};
