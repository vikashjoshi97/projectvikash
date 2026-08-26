import { ProfileData } from '../types';

/**
 * ========================================================
 * PROFILE CONFIGURATION
 * ========================================================
 * Edit this central data file to update profile details,
 * stats, avatar, and bio without touching UI component code.
 */
export const initialProfileData: ProfileData = {
  name: 'Vikash Joshi',
  username: 'vikashjoshi',
  handle: '@vikashjoshi',
  pronouns: 'he/him',
  avatar: '/images/profile/profile-placeholder.jpg',
  category: 'Creator & Technologist',
  bio: 'Building purposeful digital products, modern user experiences, and visual architectures. Sharing craft, process, and creative explorations.',
  location: 'San Francisco, CA',
  website: 'https://vikashjoshi.dev',
  websiteDisplay: 'vikashjoshi.dev',
  verified: true,
  badgeText: 'Verified Creator',
  joinedDate: 'Joined March 2022',
  stats: {
    posts: '1,248',
    followers: '512K',
    following: '892',
    countries: '47',
  },
  highlights: [
    {
      id: 'hl-1',
      title: 'Works',
      coverImage: '/images/posts/post-1.svg',
      itemsCount: 8,
    },
    {
      id: 'hl-2',
      title: 'Design',
      coverImage: '/images/posts/post-2.svg',
      itemsCount: 12,
    },
    {
      id: 'hl-3',
      title: 'Code',
      coverImage: '/images/posts/post-3.svg',
      itemsCount: 15,
    },
    {
      id: 'hl-4',
      title: 'Visuals',
      coverImage: '/images/posts/post-4.svg',
      itemsCount: 6,
    },
    {
      id: 'hl-5',
      title: 'Process',
      coverImage: '/images/posts/post-5.svg',
      itemsCount: 9,
    },
  ],
};
