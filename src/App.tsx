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
import { BottomNav } from './components/BottomNav';

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
    <div className="min-h-screen bg-[#F7F7F5] flex flex-col text-[#172033] font-sans selection:bg-[#173B57] selection:text-white relative overflow-x-hidden">
      {/* Subtle Professional Hero Area Glow (Navy & Teal) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Top Navy & Teal subtle hero glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[750px] h-[500px] bg-gradient-to-b from-[#173B57]/5 via-[#2F7D78]/3 to-transparent blur-3xl rounded-full" />
        {/* Mid subtle accent */}
        <div className="absolute top-[35%] -right-36 w-[400px] h-[400px] bg-[#2F7D78]/2 blur-3xl rounded-full" />
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
      <main className="relative z-10 flex-1 w-full max-w-5xl mx-auto pb-24 md:pb-12">
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

        {/* Tab Content Wrappers */}
        <div className="transition-all duration-300">
          {/* Tab 1: Content Grid */}
          {activeTab === 'posts' && (
            <div className="bg-[#F7F7F5] rounded-2xl sm:rounded-3xl p-2 sm:p-4">
              <PostsGrid posts={posts} onSelectPost={setSelectedPost} />
            </div>
          )}

          {/* Tab 2: Projects Showcase */}
          {activeTab === 'projects' && (
            <div className="bg-[#F1F3F2]/60 rounded-2xl sm:rounded-3xl p-3 sm:p-6 border border-[#E4E7EC] shadow-xs">
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

      {/* Mobile Bottom Navigation Bar (Fixed on mobile, hidden on desktop) */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenContact={() => setIsMessageOpen(true)}
      />

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
