import { ProjectItem } from '../types';

/**
 * ========================================================
 * PROJECTS CONFIGURATION
 * ========================================================
 * Edit this central data file to add, modify, or remove projects.
 * Images point to local assets in /images/projects/
 */
export const initialProjectsData: ProjectItem[] = [
  {
    id: 'vikash-qa-portfolio',
    title: 'Vikash Joshi — QA Tester Portfolio',
    image: '/images/projects/project-1.svg',
    description: 'Professional QA Tester portfolio showcasing QA skills, testing projects, test cases, bug reports, RTM, test scenarios, API testing and Playwright automation.',
    category: 'QA / Software Testing',
    url: 'https://vikashjoshi.vercel.app/',
    githubUrl: 'https://github.com/vikashjoshi',
    year: '2025',
    featured: true,
    tags: ['QA Testing', 'Playwright', 'API Testing', 'Bug Reports', 'RTM', 'Test Scenarios'],
    technologies: ['QA Testing', 'Playwright', 'API Testing', 'Bug Reports', 'RTM'],
    highlights: [
      'Comprehensive Test Cases, Test Scenarios & Traceability Matrix (RTM)',
      'Automated End-to-End browser test suites with Playwright',
      'RESTful API testing, performance metrics & defect reporting',
    ],
    metrics: [
      { label: 'Test Suites', value: '100+' },
      { label: 'Pass Rate', value: '99.4%' },
      { label: 'Automation', value: 'Playwright' },
    ],
  },
  {
    id: 'pandit-sarwan-ji',
    title: 'Pandit Sarwan Ji — Astrology Website',
    image: '/images/projects/project-2.svg',
    description: 'Premium astrology website with astrology services, consultation features, responsive design, WhatsApp integration and SEO implementation.',
    category: 'Astrology / Web Project',
    url: 'https://vikash-joshi.vercel.app/',
    githubUrl: 'https://github.com/vikashjoshi',
    year: '2025',
    featured: true,
    tags: ['React', 'Responsive Design', 'SEO', 'WhatsApp Integration', 'UI/UX'],
    technologies: ['React', 'Responsive Design', 'SEO', 'WhatsApp Integration'],
    highlights: [
      'Astrology consultation booking & direct WhatsApp live chat integration',
      'Custom horoscope calculation components with high-speed performance',
      'Search engine optimization (SEO) and fully responsive mobile layouts',
    ],
    metrics: [
      { label: 'SEO Score', value: '98/100' },
      { label: 'Uptime', value: '99.9%' },
      { label: 'Mobile-First', value: '100%' },
    ],
  },
];
