import React from 'react';
import { PostItem } from '../types';
import { Heart, MessageCircle, Eye, Layers, Video } from 'lucide-react';

interface PostsGridProps {
  posts: PostItem[];
  onSelectPost: (post: PostItem) => void;
}

export const PostsGrid: React.FC<PostsGridProps> = ({ posts, onSelectPost }) => {
  if (posts.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto py-16 text-center text-neutral-400">
        <Layers className="w-12 h-12 mx-auto mb-3 opacity-40" />
        <p className="text-sm font-medium">No posts available</p>
      </div>
    );
  }

  return (
    <div id="posts-3col-grid" className="w-full max-w-4xl mx-auto px-1 sm:px-2">
      {/* 3-column responsive grid */}
      <div className="grid grid-cols-3 gap-1.5 sm:gap-4 md:gap-6">
        {posts.map((post) => (
          <button
            key={post.id}
            id={`post-card-${post.id}`}
            type="button"
            onClick={() => onSelectPost(post)}
            className="group relative w-full aspect-square bg-white overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#173B57] rounded-xl sm:rounded-2xl border border-[#E4E7EC] shadow-[0_4px_16px_rgba(16,24,40,0.04)] hover:shadow-[0_8px_30px_rgba(16,24,40,0.08)] hover:-translate-y-0.5 transition-all duration-200"
            aria-label={`View post: ${post.title || post.caption.slice(0, 30)}`}
          >
            {/* Post Image */}
            <img
              src={post.image}
              alt={post.title || post.caption}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-103"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/posts/post-1.svg';
              }}
            />

            {/* Video icon on top right if video */}
            {(post.mediaType === 'video' || post.videoUrl) && (
              <div className="absolute top-2 right-2 z-10 p-1 rounded-md bg-[#173B57]/80 backdrop-blur-xs text-white">
                <Video className="w-3.5 h-3.5" />
              </div>
            )}

            {/* Category / Badge pill top-left if present */}
            {post.category && (
              <div className="absolute top-2 left-2 hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                <span className="px-2 py-0.5 rounded-full bg-[#173B57]/85 backdrop-blur-md text-[10px] font-semibold text-white tracking-wide uppercase border border-white/20">
                  {post.category}
                </span>
              </div>
            )}

            {/* Hover Overlay with Likes, Comments & View */}
            <div className="absolute inset-0 bg-[#173B57]/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-4 sm:gap-7 text-white select-none">
              {/* Likes */}
              <div className="flex items-center gap-1.5 font-bold text-xs sm:text-base drop-shadow-sm">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-white text-white" />
                <span>{post.likes}</span>
              </div>

              {/* Comments */}
              <div className="flex items-center gap-1.5 font-bold text-xs sm:text-base drop-shadow-sm">
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 fill-white text-white" />
                <span>{post.commentsCount || post.comments.length}</span>
              </div>

              {/* Quick View hint */}
              <div className="hidden md:flex items-center gap-1 font-medium text-xs text-slate-200">
                <Eye className="w-4 h-4" />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

