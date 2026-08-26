export interface ProfileStats {
  posts: string | number;
  followers: string | number;
  following: string | number;
  countries: string | number;
}

export interface SocialLink {
  platform: string;
  url: string;
  label: string;
  icon?: string;
}

export interface ProfileData {
  name: string;
  username: string;
  handle: string;
  pronouns?: string;
  avatar: string;
  category: string;
  bio: string;
  location: string;
  website: string;
  websiteDisplay: string;
  verified: boolean;
  badgeText?: string;
  stats: ProfileStats;
  joinedDate?: string;
  highlights?: StoryHighlight[];
}

export interface StoryHighlight {
  id: string;
  title: string;
  coverImage: string;
  itemsCount: number;
}

export interface PostComment {
  id: string;
  username: string;
  userAvatar?: string;
  content: string;
  timestamp: string;
  likes: number;
  isLiked?: boolean;
}

export interface PostItem {
  id: string;
  image: string;
  title?: string;
  caption: string;
  likes: number;
  commentsCount: number;
  comments: PostComment[];
  date: string;
  location?: string;
  category?: string;
  tags: string[];
  aspectRatio?: 'square' | 'portrait' | 'landscape';
  isLiked?: boolean;
  isSaved?: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  image: string;
  description: string;
  category: string;
  url?: string;
  githubUrl?: string;
  featured?: boolean;
  year: string;
  tags?: string[];
  technologies?: string[];
  highlights?: string[];
  metrics?: { label: string; value: string }[];
}

export interface AboutSectionData {
  headline: string;
  bioParagraphs: string[];
  profession: string;
  experienceYears?: string;
  location: string;
  timezone?: string;
  interests: string[];
  skills: {
    category: string;
    items: string[];
  }[];
  website: string;
  email: string;
  socials: SocialLink[];
  philosophy: string;
  milestones: {
    year: string;
    title: string;
    description: string;
  }[];
}

export type ActiveTab = 'posts' | 'projects' | 'about';
