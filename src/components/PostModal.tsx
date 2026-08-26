import React, { useState, useEffect, useRef } from 'react';
import { PostItem, ProfileData } from '../types';
import {
  X,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Send,
  MoreHorizontal,
  MapPin,
  Smile,
  BadgeCheck,
  Volume2,
  VolumeX,
  Play,
  Pause,
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
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showCommentsMobile, setShowCommentsMobile] = useState(false);

  const commentsEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const touchStartY = useRef<number>(0);
  const touchEndY = useRef<number>(0);

  // Find current index & neighbors
  const currentIndex = allPosts.findIndex((p) => p.id === post.id);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  // Handle video autoplay for current post
  useEffect(() => {
    if (videoRef.current) {
      if (post.mediaType === 'video' || post.videoUrl) {
        videoRef.current.currentTime = 0;
        videoRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    }
  }, [post.id, post.mediaType, post.videoUrl]);

  // Keyboard navigation & lock scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.key === 'ArrowUp' || e.key === 'ArrowLeft') && prevPost) {
        onSelectPost(prevPost);
      }
      if ((e.key === 'ArrowDown' || e.key === 'ArrowRight') && nextPost) {
        onSelectPost(nextPost);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [prevPost, nextPost, onClose, onSelectPost]);

  // Touch Swipe Gesture for Vertical Feed (Swipe Up = Next, Swipe Down = Prev)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    const deltaY = touchStartY.current - touchEndY.current;
    const swipeThreshold = 55; // pixels
    if (deltaY > swipeThreshold && nextPost) {
      // Swiped UP -> Next Post
      onSelectPost(nextPost);
    } else if (deltaY < -swipeThreshold && prevPost) {
      // Swiped DOWN -> Previous Post
      onSelectPost(prevPost);
    }
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    onAddComment(post.id, commentInput.trim());
    setCommentInput('');
    setTimeout(() => {
      commentsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const toggleVideoPlayback = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const isVideo = post.mediaType === 'video' || !!post.videoUrl;

  return (
    <div
      id="post-detail-backdrop"
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 select-none animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Close Button */}
      <button
        type="button"
        id="btn-close-modal"
        onClick={onClose}
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors border border-white/10 shadow-lg cursor-pointer"
        aria-label="Close modal"
      >
        <X className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Vertical Navigation Bar (Desktop & Tablet) */}
      <div className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 flex-col gap-3 z-50">
        {prevPost && (
          <button
            type="button"
            onClick={() => onSelectPost(prevPost)}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all shadow-lg hover:scale-110"
            title="Previous (Swipe Down / Arrow Up)"
            aria-label="Previous post"
          >
            <ChevronUp className="w-6 h-6" />
          </button>
        )}
        {nextPost && (
          <button
            type="button"
            onClick={() => onSelectPost(nextPost)}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all shadow-lg hover:scale-110"
            title="Next (Swipe Up / Arrow Down)"
            aria-label="Next post"
          >
            <ChevronDown className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Main Modal Container */}
      <div
        id="post-modal-content"
        className="relative w-full max-w-5xl max-h-[94vh] bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in zoom-in-95 duration-200"
      >
        {/* ================= LEFT / MEDIA VIEWER ================= */}
        <div className="w-full md:w-[58%] bg-neutral-950 flex items-center justify-center relative min-h-[320px] md:min-h-[540px] overflow-hidden">
          {isVideo ? (
            <div className="relative w-full h-full flex items-center justify-center bg-black">
              <video
                ref={videoRef}
                src={post.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'}
                poster={post.image}
                loop
                playsInline
                muted={isMuted}
                autoPlay
                className="w-full h-full max-h-[50vh] md:max-h-[85vh] object-contain cursor-pointer"
                onClick={toggleVideoPlayback}
              />

              {/* Video Play/Pause Overlay Indicator */}
              {!isPlaying && (
                <button
                  type="button"
                  onClick={toggleVideoPlayback}
                  className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-black/60 text-white flex items-center justify-center pointer-events-auto backdrop-blur-xs"
                  aria-label="Play video"
                >
                  <Play className="w-7 h-7 fill-white translate-x-0.5" />
                </button>
              )}

              {/* Video Controls Pill */}
              <div className="absolute bottom-3 right-3 flex items-center gap-2 z-20">
                <button
                  type="button"
                  onClick={toggleMute}
                  className="p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-colors"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          ) : (
            <img
              src={post.image}
              alt={post.title || post.caption}
              className="w-full h-full max-h-[50vh] md:max-h-[85vh] object-contain select-none"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/posts/post-1.svg';
              }}
            />
          )}

          {/* Vertical Swipe Hint Indicator on Mobile */}
          <div className="md:hidden absolute bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-black/50 backdrop-blur-md text-[10px] text-white/80 font-medium pointer-events-none flex items-center gap-1">
            <ChevronUp className="w-3 h-3 animate-bounce" />
            <span>Swipe for next</span>
          </div>
        </div>

        {/* ================= RIGHT / DETAILS & COMMENTS ================= */}
        <div className="w-full md:w-[42%] flex flex-col justify-between bg-white h-auto md:h-full max-h-[50vh] md:max-h-[85vh]">
          {/* Header */}
          <div className="p-3.5 sm:p-4 border-b border-slate-100 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border border-slate-200"
              />
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="font-bold text-xs sm:text-sm text-neutral-900 leading-tight">
                    {profile.username}
                  </span>
                  {profile.verified && (
                    <BadgeCheck className="w-3.5 h-3.5 text-[#4F46E5] fill-[#4F46E5]/20" />
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
              title="Share post"
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
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border border-slate-200 shrink-0 mt-0.5"
              />
              <div className="flex-1 space-y-1">
                <p className="text-neutral-800 leading-relaxed text-xs sm:text-sm">
                  <span className="font-bold text-neutral-900 mr-2">
                    {profile.username}
                  </span>
                  {post.caption}
                </p>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-[#4F46E5] font-medium hover:underline cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="text-[11px] text-neutral-400 pt-0.5">
                  {post.date}
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 my-2" />

            {/* Comment List */}
            {post.comments && post.comments.length > 0 ? (
              post.comments.map((comment) => (
                <div key={comment.id} className="flex items-start gap-2.5 group">
                  <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 font-bold text-[11px] flex items-center justify-center shrink-0">
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
              <div className="py-4 text-center text-xs text-neutral-400">
                No comments yet. Be the first to start the conversation!
              </div>
            )}
            <div ref={commentsEndRef} />
          </div>

          {/* Footer Actions & Add Comment */}
          <div className="border-t border-slate-100 p-3.5 sm:p-4 space-y-2.5 shrink-0 bg-slate-50/60">
            {/* Interactive buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3.5 sm:gap-4">
                <button
                  type="button"
                  onClick={() => onToggleLike(post.id)}
                  className="group transition-transform active:scale-125 cursor-pointer"
                  aria-label="Like post"
                >
                  <Heart
                    className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors ${
                      post.isLiked
                        ? 'fill-rose-500 text-rose-500'
                        : 'text-neutral-700 hover:text-rose-500'
                    }`}
                  />
                </button>
                <button
                  type="button"
                  onClick={() => inputRef.current?.focus()}
                  className="text-neutral-700 hover:text-neutral-900 transition-colors cursor-pointer"
                  aria-label="Comment"
                >
                  <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <button
                  type="button"
                  onClick={() => onShare(post)}
                  className="text-neutral-700 hover:text-neutral-900 transition-colors cursor-pointer"
                  aria-label="Share post"
                >
                  <Share2 className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => setIsSaved(!isSaved)}
                className="text-neutral-700 hover:text-neutral-900 transition-colors cursor-pointer"
                aria-label="Save post"
              >
                <Bookmark
                  className={`w-5 h-5 sm:w-6 sm:h-6 ${
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
              className="flex items-center gap-2 pt-2 border-t border-slate-200/60"
            >
              <Smile className="w-4 h-4 text-neutral-400 shrink-0" />
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
                className="text-xs sm:text-sm font-semibold text-[#4F46E5] hover:text-[#4338CA] disabled:opacity-40 flex items-center gap-1 transition-opacity cursor-pointer"
              >
                <span>Post</span>
                <Send className="w-3 h-3" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
