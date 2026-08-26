import React, { useState, useEffect } from 'react';
import { ActiveTab, PostItem, ProfileData, StoryHighlight } from './types';
import { initialProfileData } from './data/profileData';
import { initialPostsData } from './data/postsData';
import { initialProjectsData } from './data/projectsData';
import { initialAboutData } from './data/aboutData';

import { Navbar } from './components/Navbar';
import { ProfileHeader } from './components/ProfileHeader';
import { ProfileNav } from './components/ProfileNav';
import { PostsGrid } from './components/PostsGrid';
import { ProjectsTab } from './components/ProjectsTab';
import { AboutTab } from './components/AboutTab';
import { PostModal } from './components/PostModal';
import { MessageModal } from './components/MessageModal';
import { ShareModal } from './components/ShareModal';
import { EditProfileModal } from './components/EditProfileModal';
import { Toast, ToastMessage } from './components/Toast';
import { Footer } from './components/Footer';

export default function App() {
  const [profile, setProfile] = useState<ProfileData>(initialProfileData);
  const [posts, setPosts] = useState<PostItem[]>(initialPostsData);
  const [projects] = useState(initialProjectsData);
  const [about] = useState(initialAboutData);

  const [activeTab, setActiveTab] = useState<ActiveTab>('posts');
  const [selectedPost, setSelectedPost] = useState<PostItem | null>(null);

  const [isFollowing, setIsFollowing] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [shareTargetPost, setShareTargetPost] = useState<PostItem | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Follow / Unfollow Toggle
  const handleToggleFollow = () => {
    setIsFollowing((prev) => {
      const nextState = !prev;
      if (nextState) {
        addToast(`You are now following ${profile.handle}`, 'success');
      } else {
        addToast(`Unfollowed ${profile.handle}`, 'info');
      }
      return nextState;
    });
  };

  // Post Interactions: Like Toggle
  const handleToggleLike = (postId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((p) => {
        if (p.id === postId) {
          const isLiked = !p.isLiked;
          const likes = isLiked ? p.likes + 1 : Math.max(0, p.likes - 1);
          return { ...p, isLiked, likes };
        }
        return p;
      })
    );

    // Also update selectedPost if modal is open
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost((prev) => {
        if (!prev) return null;
        const isLiked = !prev.isLiked;
        const likes = isLiked ? prev.likes + 1 : Math.max(0, prev.likes - 1);
        return { ...prev, isLiked, likes };
      });
    }
  };

  // Post Interactions: Add Comment
  const handleAddComment = (postId: string, text: string) => {
    const newComment = {
      id: `c-${Date.now()}`,
      username: 'you',
      content: text,
      timestamp: 'Just now',
      likes: 0,
    };

    setPosts((prevPosts) =>
      prevPosts.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            commentsCount: p.commentsCount + 1,
            comments: [...p.comments, newComment],
          };
        }
        return p;
      })
    );

    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          commentsCount: prev.commentsCount + 1,
          comments: [...prev.comments, newComment],
        };
      });
    }

    addToast('Comment posted', 'success');
  };

  // Direct Note Handler
  const handleSendMessage = (sender: string, message: string) => {
    addToast(`Note sent to ${profile.name}!`, 'success');
  };

  // Share handlers
  const handleOpenShareProfile = () => {
    setShareTargetPost(null);
    setIsShareOpen(true);
  };

  const handleOpenSharePost = (post: PostItem) => {
    setShareTargetPost(post);
    setIsShareOpen(true);
  };

  // Update profile from edit dialog
  const handleSaveProfile = (updated: ProfileData) => {
    setProfile(updated);
    addToast('Profile updated successfully', 'success');
  };

  return (
    <div className="min-h-screen bg-[#F6F8FC] flex flex-col text-[#111827] font-sans selection:bg-[#4F46E5] selection:text-white relative overflow-x-hidden">
      {/* Subtle Background Ambience Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-[#4F46E5]/6 via-[#06B6D4]/4 to-transparent blur-3xl rounded-full" />
        <div className="absolute top-[30%] -left-32 w-96 h-96 bg-[#4F46E5]/3 blur-3xl rounded-full" />
        <div className="absolute top-[60%] -right-32 w-96 h-96 bg-[#06B6D4]/3 blur-3xl rounded-full" />
      </div>

      {/* Top Navbar */}
      <Navbar
        profile={profile}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenShare={handleOpenShareProfile}
        onOpenEdit={() => setIsEditOpen(true)}
      />

      {/* Main Container */}
      <main className="relative z-10 flex-1 w-full max-w-5xl mx-auto pb-12">
        {/* Profile Header (Photo, Details, Stats, Actions) */}
        <ProfileHeader
          profile={profile}
          isFollowing={isFollowing}
          onToggleFollow={handleToggleFollow}
          onOpenMessage={() => setIsMessageOpen(true)}
          onOpenShare={handleOpenShareProfile}
          onOpenEdit={() => setIsEditOpen(true)}
          onSelectHighlight={(title) => {
            addToast(`Viewing highlight: ${title}`, 'info');
          }}
          onToast={addToast}
        />

        {/* Profile Navigation Tabs (Posts | Projects | About) */}
        <ProfileNav
          activeTab={activeTab}
          onTabChange={setActiveTab}
          postsCount={posts.length}
          projectsCount={projects.length}
        />

        {/* Tab Content Wrappers with Harmonious Sectional Backgrounds */}
        <div className="transition-all duration-300">
          {/* Tab 1: 3-Column Content Grid */}
          {activeTab === 'posts' && (
            <div className="bg-[#F8FAFC]/70 rounded-2xl sm:rounded-3xl p-3 sm:p-6 border border-slate-200/50 shadow-xs">
              <PostsGrid posts={posts} onSelectPost={setSelectedPost} />
            </div>
          )}

          {/* Tab 2: Projects Showcase */}
          {activeTab === 'projects' && (
            <div className="bg-[#EEF3F9]/60 rounded-2xl sm:rounded-3xl p-3 sm:p-6 border border-slate-200/60 shadow-xs">
              <ProjectsTab projects={projects} onToast={addToast} />
            </div>
          )}

          {/* Tab 3: About Section */}
          {activeTab === 'about' && (
            <div className="w-full">
              <AboutTab
                about={about}
                profile={profile}
                onOpenMessage={() => setIsMessageOpen(true)}
                onToast={addToast}
              />
            </div>
          )}
        </div>
      </main>

      {/* Post Detail Modal */}
      {selectedPost && (
        <PostModal
          post={selectedPost}
          allPosts={posts}
          profile={profile}
          onClose={() => setSelectedPost(null)}
          onSelectPost={setSelectedPost}
          onToggleLike={handleToggleLike}
          onAddComment={handleAddComment}
          onShare={handleOpenSharePost}
        />
      )}

      {/* Message Modal */}
      {isMessageOpen && (
        <MessageModal
          profile={profile}
          onClose={() => setIsMessageOpen(false)}
          onSendMessage={handleSendMessage}
        />
      )}

      {/* Share Modal */}
      {isShareOpen && (
        <ShareModal
          profile={profile}
          targetPost={shareTargetPost}
          onClose={() => {
            setIsShareOpen(false);
            setShareTargetPost(null);
          }}
          onToast={addToast}
        />
      )}

      {/* Edit Profile Modal */}
      {isEditOpen && (
        <EditProfileModal
          profile={profile}
          onClose={() => setIsEditOpen(false)}
          onSave={handleSaveProfile}
        />
      )}

      {/* Toast Notifications */}
      <Toast toasts={toasts} onDismiss={removeToast} />

      {/* Footer */}
      <Footer profile={profile} />
    </div>
  );
}
