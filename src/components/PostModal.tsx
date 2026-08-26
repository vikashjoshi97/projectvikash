import React, { useState, useEffect, useRef } from 'react';
import { PostItem, ProfileData } from '../types';
import {
  X,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Send,
  MoreHorizontal,
  MapPin,
  Smile,
  BadgeCheck,
} from 'lucide-react';

interface PostModalProps {
  post: PostItem;
  allPosts: PostItem[];
  profile: ProfileData;
  onClose: () => void;
  onSelectPost: (post: PostItem) => void;
  onToggleLike: (postId: string) => void;
  onAddComment: (postId: string, text: string) => void;
  onShare: (post: PostItem) => void;
}

export const PostModal: React.FC<PostModalProps> = ({
  post,
  allPosts,
  profile,
  onClose,
  onSelectPost,
  onToggleLike,
  onAddComment,
  onShare,
}) => {
  const [commentInput, setCommentInput] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const commentsEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Find index for prev/next
  const currentIndex = allPosts.findIndex((p) => p.id === post.id);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  // Keyboard navigation & lock scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && prevPost) onSelectPost(prevPost);
      if (e.key === 'ArrowRight' && nextPost) onSelectPost(nextPost);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [prevPost, nextPost, onClose, onSelectPost]);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    onAddComment(post.id, commentInput.trim());
    setCommentInput('');
    setTimeout(() => {
      commentsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div
      id="post-detail-backdrop"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Top Close Button (Desktop & Mobile) */}
      <button
        type="button"
        id="btn-close-modal"
        onClick={onClose}
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
        aria-label="Close modal"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev Navigation Arrow */}
      {prevPost && (
        <button
          type="button"
          onClick={() => onSelectPost(prevPost)}
          className="hidden md:flex fixed left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white transition-all shadow-lg"
          aria-label="Previous post"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Next Navigation Arrow */}
      {nextPost && (
        <button
          type="button"
          onClick={() => onSelectPost(nextPost)}
          className="hidden md:flex fixed right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white transition-all shadow-lg"
          aria-label="Next post"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Main Modal Container */}
      <div
        id="post-modal-content"
        className="relative w-full max-w-5xl max-h-[92vh] bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in zoom-in-95 duration-200"
      >
        {/* ================= LEFT: Post Image ================= */}
        <div className="w-full md:w-[58%] bg-neutral-950 flex items-center justify-center relative min-h-[300px] md:min-h-[520px]">
          <img
            src={post.image}
            alt={post.title || post.caption}
            className="w-full h-full max-h-[50vh] md:max-h-[85vh] object-contain select-none"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/posts/post-1.svg';
            }}
          />
        </div>

        {/* ================= RIGHT: Post Details & Comments ================= */}
        <div className="w-full md:w-[42%] flex flex-col justify-between bg-white h-auto md:h-full max-h-[50vh] md:max-h-[85vh]">
          {/* Header */}
          <div className="p-4 border-b border-neutral-100 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-9 h-9 rounded-full object-cover border border-neutral-200"
              />
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="font-bold text-sm text-neutral-900 leading-tight">
                    {profile.username}
                  </span>
                  {profile.verified && (
                    <BadgeCheck className="w-3.5 h-3.5 text-blue-500 fill-blue-500/20" />
                  )}
                </div>
                {post.location && (
                  <span className="text-[11px] text-neutral-500 flex items-center gap-0.5">
                    <MapPin className="w-2.5 h-2.5" />
                    {post.location}
                  </span>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={() => onShare(post)}
              className="p-1.5 text-neutral-400 hover:text-neutral-700 transition-colors"
              title="Post actions"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>

          {/* Comments & Caption Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm no-scrollbar">
            {/* Main Author Caption */}
            <div className="flex items-start gap-3">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-8 h-8 rounded-full object-cover border border-neutral-200 shrink-0 mt-0.5"
              />
              <div className="flex-1 space-y-1">
                <p className="text-neutral-800 leading-relaxed text-sm">
                  <span className="font-bold text-neutral-900 mr-2">
                    {profile.username}
                  </span>
                  {post.caption}
                </p>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-blue-600 font-medium hover:underline cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="text-[11px] text-neutral-400 pt-1">
                  {post.date}
                </div>
              </div>
            </div>

            <div className="border-t border-neutral-100 my-2" />

            {/* Comment List */}
            {post.comments && post.comments.length > 0 ? (
              post.comments.map((comment) => (
                <div key={comment.id} className="flex items-start gap-3 group">
                  <div className="w-7 h-7 rounded-full bg-neutral-200 text-neutral-700 font-bold text-xs flex items-center justify-center shrink-0">
                    {comment.username.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <p className="text-neutral-800 text-xs sm:text-sm">
                      <span className="font-bold text-neutral-900 mr-1.5">
                        {comment.username}
                      </span>
                      {comment.content}
                    </p>
                    <div className="flex items-center gap-3 text-[11px] text-neutral-400 mt-1">
                      <span>{comment.timestamp}</span>
                      <span>{comment.likes || 0} likes</span>
                      <button
                        type="button"
                        onClick={() => {
                          setCommentInput(`@${comment.username} `);
                          inputRef.current?.focus();
                        }}
                        className="font-semibold text-neutral-500 hover:text-neutral-800"
                      >
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-6 text-center text-xs text-neutral-400">
                No comments yet. Be the first to start the conversation!
              </div>
            )}
            <div ref={commentsEndRef} />
          </div>

          {/* Footer Actions & Add Comment */}
          <div className="border-t border-neutral-100 p-4 space-y-3 shrink-0 bg-neutral-50/50">
            {/* Interactive buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => onToggleLike(post.id)}
                  className="group transition-transform active:scale-125"
                  aria-label="Like post"
                >
                  <Heart
                    className={`w-6 h-6 transition-colors ${
                      post.isLiked
                        ? 'fill-rose-500 text-rose-500'
                        : 'text-neutral-700 hover:text-rose-500'
                    }`}
                  />
                </button>
                <button
                  type="button"
                  onClick={() => inputRef.current?.focus()}
                  className="text-neutral-700 hover:text-neutral-900 transition-colors"
                  aria-label="Comment"
                >
                  <MessageCircle className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={() => onShare(post)}
                  className="text-neutral-700 hover:text-neutral-900 transition-colors"
                  aria-label="Share post"
                >
                  <Share2 className="w-6 h-6" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => setIsSaved(!isSaved)}
                className="text-neutral-700 hover:text-neutral-900 transition-colors"
                aria-label="Save post"
              >
                <Bookmark
                  className={`w-6 h-6 ${
                    isSaved ? 'fill-neutral-900 text-neutral-900' : ''
                  }`}
                />
              </button>
            </div>

            {/* Likes count & Date */}
            <div>
              <p className="font-bold text-xs sm:text-sm text-neutral-900">
                {post.likes} {post.likes === 1 ? 'like' : 'likes'}
              </p>
              <p className="text-[10px] sm:text-xs text-neutral-400 uppercase tracking-wide mt-0.5">
                {post.date}
              </p>
            </div>

            {/* Comment Input Box */}
            <form
              onSubmit={handleSubmitComment}
              className="flex items-center gap-2 pt-2 border-t border-neutral-200/60"
            >
              <Smile className="w-5 h-5 text-neutral-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Add a comment..."
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                className="w-full bg-transparent border-none text-xs sm:text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!commentInput.trim()}
                className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 disabled:opacity-40 disabled:hover:text-blue-600 flex items-center gap-1 transition-opacity"
              >
                <span>Post</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
