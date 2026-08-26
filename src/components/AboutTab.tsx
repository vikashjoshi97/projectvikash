import React from 'react';
import { AboutSectionData, ProfileData } from '../types';
import {
  ShieldCheck,
  Code2,
  TrendingUp,
  GraduationCap,
  CheckCircle2,
  Layers,
  Sparkles,
  Mail,
  Github,
  Linkedin,
  Twitter,
  MapPin,
  Clock,
  Globe,
  ArrowUpRight,
  FileCheck,
  Bug,
  Smartphone,
  Send,
  Target,
  Search,
  ListChecks,
  MonitorCheck,
  Activity,
  MessageSquare,
} from 'lucide-react';

interface AboutTabProps {
  about: AboutSectionData;
  profile: ProfileData;
  onOpenMessage: () => void;
  onToast: (text: string, type?: 'success' | 'info') => void;
}

export const AboutTab: React.FC<AboutTabProps> = ({
  about,
  profile,
  onOpenMessage,
  onToast,
}) => {
  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github':
        return <Github className="w-4 h-4" />;
      case 'twitter / x':
      case 'twitter':
        return <Twitter className="w-4 h-4" />;
      case 'linkedin':
        return <Linkedin className="w-4 h-4" />;
      default:
        return <Mail className="w-4 h-4" />;
    }
  };

  return (
    <div id="about-me-page" className="w-full space-y-8 sm:space-y-10">
      {/* ========================================================
          1. FULL-WIDTH HERO IMAGE BANNER (NO TEXT OVER IMAGE)
          ======================================================== */}
      <section
        id="about-hero-banner-section"
        aria-label="Panoramic Header Banner"
        className="w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xs bg-slate-100"
      >
        <div className="w-full h-[180px] sm:h-[260px] md:h-[320px] lg:h-[360px] relative">
          <img
            src="/images/about-banner.jpg"
            alt="Scenic panoramic landscape banner"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center select-none pointer-events-none"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://picsum.photos/seed/himalayan-vista/1920/600';
            }}
          />
        </div>
      </section>

      {/* ========================================================
          2. ABOUT ME: REAL PHOTO + PERSONAL INTRODUCTION
          ======================================================== */}
      <section
        id="about-intro-section"
        className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-6 sm:p-8 md:p-10 shadow-xs space-y-6"
      >
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8 md:gap-10">
          {/* LEFT: Real Uploaded Photo */}
          <div className="shrink-0 flex flex-col items-center">
            <div className="relative group">
              <div className="w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-2xl p-[3px] bg-gradient-to-tr from-[#4F46E5] via-slate-200 to-[#06B6D4] shadow-sm transition-all duration-300 group-hover:scale-102">
                <div className="w-full h-full rounded-2xl bg-white p-[2px] overflow-hidden">
                  <img
                    src="/Media.PNG"
                    alt="Vikash Joshi - QA Tester & Developer"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top rounded-xl"
                    onError={(e) => {
                      // Fallback to profile avatar or SVG if needed
                      (e.target as HTMLImageElement).src =
                        profile.avatar || '/images/profile/avatar.svg';
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Quick Status Tag */}
            <div className="mt-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF3F9] border border-slate-200/70 text-[11px] font-semibold text-[#4F46E5]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for QA & Dev</span>
            </div>
          </div>

          {/* RIGHT: Name, Title & Hindi Introduction */}
          <div className="flex-1 space-y-4 text-center md:text-left">
            <div>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#111827] tracking-tight">
                  Vikash Joshi
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200/60 text-xs font-semibold text-[#4F46E5]">
                  MCA &amp; BCA
                </span>
              </div>
              <p className="text-base sm:text-lg font-bold text-[#4F46E5] mt-1 tracking-tight">
                QA Tester | Developer | Digital Marketing
              </p>
            </div>

            {/* Quick Domain Pills */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 pt-0.5">
              <span className="px-2.5 py-1 rounded-lg bg-[#EEF3F9] text-[#111827] text-xs font-medium border border-slate-200/60">
                Software QA &amp; Testing
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-[#EEF3F9] text-[#111827] text-xs font-medium border border-slate-200/60">
                Playwright Automation
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-[#EEF3F9] text-[#111827] text-xs font-medium border border-slate-200/60">
                React &amp; TypeScript
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-[#EEF3F9] text-[#111827] text-xs font-medium border border-slate-200/60">
                Meta Ads &amp; Marketing
              </span>
            </div>

            {/* Hindi Bio Content */}
            <div className="space-y-3 pt-2 text-slate-700 text-sm sm:text-base leading-relaxed text-justify md:text-left">
              <p>
                नमस्ते! मैं <strong className="font-semibold text-[#111827]">विकाश जोशी (Vikash Joshi)</strong> हूँ – एक परिणाम-उन्मुख और समर्पित QA Tester, Web Developer और Digital Marketing Specialist.
              </p>
              <p>
                सॉफ़्टवेयर टेस्टिंग (Software Testing) में मेरा मुख्य फ़ोकस उच्च-गुणवत्ता वाले, बग-मुक्त और सुरक्षित डिजिटल समाधान डिलीवर करना है। मैं Manual Testing, Functional Testing, Regression Testing, Smoke &amp; Sanity Testing, UI &amp; Responsive Testing, API Testing और Bug Reporting में पूरी दक्षता के साथ काम करता हूँ। Test Case Design, Requirements Traceability Matrix (RTM) और व्यापक Test Scenarios के माध्यम से मैं हर रिलीज़ की विश्वसनीयता सुनिश्चित करता हूँ।
              </p>
              <p>
                वेब डेवलपमेंट में मैं React, TypeScript, JavaScript, HTML5 और CSS3 के साथ आधुनिक, तेज़ और स्केलेबल वेब ऐप्लिकेशन विकसित करता हूँ और Playwright के साथ ऑटोमेशन टेस्टिंग भी करता हूँ। डिजिटल मार्केटिंग में Meta Ads (Facebook &amp; Instagram) और WhatsApp Marketing के माध्यम से बिज़नेस ग्रोथ और कन्वर्ज़न बढ़ाने का कार्य करता हूँ।
              </p>
            </div>

            {/* Direct Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <button
                type="button"
                onClick={onOpenMessage}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs sm:text-sm font-semibold transition-all shadow-xs active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>Get In Touch / Contact</span>
              </button>
              <a
                href={`mailto:${about.email}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#EEF3F9] hover:bg-slate-200 text-[#111827] text-xs sm:text-sm font-semibold border border-slate-200/80 transition-all active:scale-95"
              >
                <Mail className="w-4 h-4 text-[#4F46E5]" />
                <span>{about.email}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. PROFESSIONAL AREAS
          ======================================================== */}
      <section id="professional-areas-section" className="space-y-4">
        <div className="flex items-center gap-2.5 px-1">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-[#4F46E5]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#111827]">
              Professional Expertise &amp; Core Domains
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B]">
              व्यावसायिक विशेषज्ञता के मुख्य क्षेत्र
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: QA & Software Testing */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col justify-between hover:border-indigo-200 transition-all">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#111827]">
                QA &amp; Software Testing
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                सॉफ़्टवेयर गुणवत्ता सुनिश्चित करने के लिए संपूर्ण मैन्युअल और ऑटोमेशन टेस्टिंग। बग फ्री रिलीज़, टेस्ट केस डिज़ाइन और आरटीएम (RTM) प्रबंधन।
              </p>
              <div className="pt-2 flex flex-wrap gap-1.5">
                <span className="px-2 py-0.5 rounded bg-[#EEF3F9] text-xs font-medium text-[#111827]">Manual Testing</span>
                <span className="px-2 py-0.5 rounded bg-[#EEF3F9] text-xs font-medium text-[#111827]">Functional &amp; Regression</span>
                <span className="px-2 py-0.5 rounded bg-[#EEF3F9] text-xs font-medium text-[#111827]">Smoke &amp; Sanity</span>
                <span className="px-2 py-0.5 rounded bg-[#EEF3F9] text-xs font-medium text-[#111827]">API &amp; UI Testing</span>
                <span className="px-2 py-0.5 rounded bg-[#EEF3F9] text-xs font-medium text-[#111827]">Playwright &amp; TS</span>
              </div>
            </div>
          </div>

          {/* Card 2: Web Development */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col justify-between hover:border-indigo-200 transition-all">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-[#4F46E5]">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#111827]">
                Web Development
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                आधुनिक और तीव्र वेब ऐप्लिकेशन निर्माण। स्वच्छ कोड, उत्तरदायी इंटरफ़ेस (Responsive UI) और सर्वोत्तम फ्रंटएंड आर्किटेक्चर।
              </p>
              <div className="pt-2 flex flex-wrap gap-1.5">
                <span className="px-2 py-0.5 rounded bg-[#EEF3F9] text-xs font-medium text-[#111827]">React</span>
                <span className="px-2 py-0.5 rounded bg-[#EEF3F9] text-xs font-medium text-[#111827]">TypeScript</span>
                <span className="px-2 py-0.5 rounded bg-[#EEF3F9] text-xs font-medium text-[#111827]">JavaScript</span>
                <span className="px-2 py-0.5 rounded bg-[#EEF3F9] text-xs font-medium text-[#111827]">HTML5 &amp; CSS3</span>
                <span className="px-2 py-0.5 rounded bg-[#EEF3F9] text-xs font-medium text-[#111827]">Tailwind CSS</span>
              </div>
            </div>
          </div>

          {/* Card 3: Digital Marketing */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col justify-between hover:border-indigo-200 transition-all">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#111827]">
                Digital Marketing
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                मेटा ऐड्स और व्हाट्सएप मार्केटिंग के ज़रिए लक्षित ऑडियंस तक पहुंच, लीड जनरेशन और ब्रांड उपस्थिति में वृद्धि।
              </p>
              <div className="pt-2 flex flex-wrap gap-1.5">
                <span className="px-2 py-0.5 rounded bg-[#EEF3F9] text-xs font-medium text-[#111827]">Meta Ads</span>
                <span className="px-2 py-0.5 rounded bg-[#EEF3F9] text-xs font-medium text-[#111827]">Instagram Marketing</span>
                <span className="px-2 py-0.5 rounded bg-[#EEF3F9] text-xs font-medium text-[#111827]">Facebook Ads</span>
                <span className="px-2 py-0.5 rounded bg-[#EEF3F9] text-xs font-medium text-[#111827]">WhatsApp Marketing</span>
                <span className="px-2 py-0.5 rounded bg-[#EEF3F9] text-xs font-medium text-[#111827]">Lead Generation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          4. SKILLS & TECHNOLOGIES
          ======================================================== */}
      <section
        id="skills-technologies-section"
        className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center text-[#4F46E5]">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#111827]">
              Skills &amp; Technologies
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B]">
              तकनीकी कौशल और कार्यप्रणाली
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Group 1: QA & Software Testing */}
          <div className="bg-[#F8FAFC] rounded-xl p-5 border border-slate-200/70 space-y-3">
            <div className="flex items-center gap-2 text-[#4F46E5] font-bold text-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>Software QA &amp; Testing Stack</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                'QA Tester',
                'Software Testing',
                'Manual Testing',
                'Functional Testing',
                'Regression Testing',
                'Smoke Testing',
                'Sanity Testing',
                'UI Testing',
                'Responsive Testing',
                'API Testing',
                'Bug Reporting',
                'Test Case Design',
                'RTM (Traceability Matrix)',
                'Test Scenarios',
                'Playwright',
                'Defect Lifecycle',
              ].map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-xs font-semibold text-[#111827] shadow-2xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Group 2: Web Development */}
          <div className="bg-[#F8FAFC] rounded-xl p-5 border border-slate-200/70 space-y-3">
            <div className="flex items-center gap-2 text-[#4F46E5] font-bold text-sm">
              <Code2 className="w-4 h-4" />
              <span>Web Development Technologies</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                'React',
                'TypeScript',
                'JavaScript (ES6+)',
                'HTML5',
                'CSS3',
                'Tailwind CSS',
                'Responsive Web Design',
                'Vite',
                'Git & GitHub',
                'State Management',
                'DOM & Web APIs',
                'Cross-Browser Support',
              ].map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-xs font-semibold text-[#111827] shadow-2xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Group 3: Digital Marketing */}
          <div className="bg-[#F8FAFC] rounded-xl p-5 border border-slate-200/70 space-y-3">
            <div className="flex items-center gap-2 text-[#4F46E5] font-bold text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>Digital Marketing &amp; Growth</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                'Digital Marketing',
                'Meta Ads',
                'Instagram Marketing',
                'Facebook Marketing',
                'WhatsApp Marketing',
                'Campaign Strategy',
                'Lead Generation',
                'Audience Targeting',
                'Ad Copy & Creatives',
                'Performance Analytics',
              ].map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-xs font-semibold text-[#111827] shadow-2xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Group 4: Tools & Testing Environments */}
          <div className="bg-[#F8FAFC] rounded-xl p-5 border border-slate-200/70 space-y-3">
            <div className="flex items-center gap-2 text-[#4F46E5] font-bold text-sm">
              <FileCheck className="w-4 h-4" />
              <span>Tools &amp; Environments</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                'Postman (API)',
                'JIRA / Bugzilla',
                'Playwright Runner',
                'Chrome DevTools',
                'VS Code',
                'Meta Business Manager',
                'WhatsApp Business API',
                'Test Documentations',
              ].map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-xs font-semibold text-[#111827] shadow-2xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          5. EDUCATION (BCA & MCA)
          ======================================================== */}
      <section
        id="education-section"
        className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center text-[#4F46E5]">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#111827]">
              Education &amp; Academic Qualifications
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B]">
              शैक्षणिक योग्यता एवं डिग्रियाँ
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Degree 1: MCA */}
          <div className="p-5 rounded-2xl bg-[#EEF3F9]/70 border border-slate-200/80 space-y-2 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-[#4F46E5] text-white text-xs font-bold">
                Post Graduation
              </span>
              <span className="text-xs font-semibold text-[#64748B]">
                Master's Degree
              </span>
            </div>
            <h3 className="text-lg font-bold text-[#111827]">
              MCA (Master of Computer Applications)
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              सॉफ़्टवेयर इंजीनियरिंग, डेटाबेस मैनेजमेंट, एडवांस्ड प्रोग्रामिंग, और सॉफ़्टवेयर क्वालिटी एश्योरेंस एवं टेस्टिंग पद्धतियों में विशेषज्ञता।
            </p>
            <div className="pt-1 text-xs text-[#4F46E5] font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Advanced Computer Applications &amp; QA</span>
            </div>
          </div>

          {/* Degree 2: BCA */}
          <div className="p-5 rounded-2xl bg-[#EEF3F9]/70 border border-slate-200/80 space-y-2 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-white text-xs font-bold">
                Graduation
              </span>
              <span className="text-xs font-semibold text-[#64748B]">
                Bachelor's Degree
              </span>
            </div>
            <h3 className="text-lg font-bold text-[#111827]">
              BCA (Bachelor of Computer Applications)
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              कंप्यूटर साइंस के बुनियादी सिद्धांत, प्रोग्रामिंग फंडामेंटल्स (C/C++/Java), डेटा संरचनाएं, वेब तकनीक और डेटाबेस सिस्टम्स।
            </p>
            <div className="pt-1 text-xs text-[#4F46E5] font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Computer Science Fundamentals &amp; Web</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          6. WHAT I DO (Services & Capabilities)
          ======================================================== */}
      <section
        id="what-i-do-section"
        className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center text-[#4F46E5]">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#111827]">
              What I Do
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B]">
              मुख्य सेवाएं और कार्य क्षमताएं
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4.5 rounded-xl bg-[#F8FAFC] border border-slate-200/70 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Bug className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-[#111827]">
              Comprehensive QA &amp; Defect Management
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              व्यवस्थित टेस्ट केस निष्पादन, बग रिपोर्टिंग और पुन: परीक्षण (re-testing) ताकि सॉफ़्टवेयर बिना किसी तकनीकी त्रुटि के रिलीज़ हो।
            </p>
          </div>

          <div className="p-4.5 rounded-xl bg-[#F8FAFC] border border-slate-200/70 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-[#4F46E5] flex items-center justify-center">
              <Code2 className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-[#111827]">
              Modern Frontend Web Development
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              React और TypeScript के साथ तेज़ और पूरी तरह से रिस्पॉन्सिव वेब ऐप्लिकेशन का निर्माण, जो सभी डिवाइसेस पर सुचारू रूप से कार्य करें।
            </p>
          </div>

          <div className="p-4.5 rounded-xl bg-[#F8FAFC] border border-slate-200/70 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-[#111827]">
              Meta Ads &amp; WhatsApp Marketing
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              फेसबुक, इंस्टाग्राम और व्हाट्सएप अभियानों के माध्यम से सही दर्शकों को लक्षित कर उच्च आरओआई (ROI) और क्वालिटी लीड्स प्राप्त करना।
            </p>
          </div>

          <div className="p-4.5 rounded-xl bg-[#F8FAFC] border border-slate-200/70 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Smartphone className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-[#111827]">
              Cross-Browser &amp; Responsive Audits
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              मोबाइल, टैबलेट और डेस्कटॉप स्क्रीन पर संपूर्ण UI/UX और परफ़ॉर्मेंस ऑडिटिंग ताकि बेहतरीन यूज़र एक्सपीरियंस मिले।
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================
          7. MY APPROACH (Testing & Development Workflow)
          ======================================================== */}
      <section
        id="my-approach-section"
        className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center text-[#4F46E5]">
            <ListChecks className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#111827]">
              My Testing &amp; Development Approach
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B]">
              गुणवत्ता नियंत्रण और विकास की कार्यप्रणाली
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-[#EEF3F9]/60 border border-slate-200/70 space-y-2">
            <div className="flex items-center justify-between">
              <span className="w-6 h-6 rounded-full bg-[#4F46E5] text-white text-xs font-bold flex items-center justify-center">
                1
              </span>
              <Search className="w-4 h-4 text-[#64748B]" />
            </div>
            <h4 className="text-sm font-bold text-[#111827]">
              Requirement &amp; RTM Analysis
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              आवश्यकताओं का गहन विश्लेषण और RTM मैपिंग तैयार करना ताकि कोई फीचर छूटे नहीं।
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#EEF3F9]/60 border border-slate-200/70 space-y-2">
            <div className="flex items-center justify-between">
              <span className="w-6 h-6 rounded-full bg-[#4F46E5] text-white text-xs font-bold flex items-center justify-center">
                2
              </span>
              <FileCheck className="w-4 h-4 text-[#64748B]" />
            </div>
            <h4 className="text-sm font-bold text-[#111827]">
              Test Scenarios &amp; Case Design
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              पॉज़िटिव, नेगेटिव और बाउंड्री वैल्यूज़ के साथ व्यापक टेस्ट केस तैयार करना।
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#EEF3F9]/60 border border-slate-200/70 space-y-2">
            <div className="flex items-center justify-between">
              <span className="w-6 h-6 rounded-full bg-[#4F46E5] text-white text-xs font-bold flex items-center justify-center">
                3
              </span>
              <Bug className="w-4 h-4 text-[#64748B]" />
            </div>
            <h4 className="text-sm font-bold text-[#111827]">
              Execution &amp; Defect Logging
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              सटीक टेस्ट निष्पादन, स्पष्ट री-प्रोडक्शन स्टेप्स के साथ बग रिपोर्टिंग और ट्रैकिंग।
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#EEF3F9]/60 border border-slate-200/70 space-y-2">
            <div className="flex items-center justify-between">
              <span className="w-6 h-6 rounded-full bg-[#4F46E5] text-white text-xs font-bold flex items-center justify-center">
                4
              </span>
              <MonitorCheck className="w-4 h-4 text-[#64748B]" />
            </div>
            <h4 className="text-sm font-bold text-[#111827]">
              Regression &amp; Release Sign-Off
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              कम्प्लीट रिग्रेशन टेस्टिंग, क्रॉस-ब्राउज़र जांच और अंतिम क्वालिटी सर्टिफ़िकेशन।
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================
          8. MY PROJECTS & HIGHLIGHTS
          ======================================================== */}
      <section
        id="my-projects-highlights-section"
        className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center text-[#4F46E5]">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#111827]">
              Projects &amp; Deliverables
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B]">
              सॉफ़्टवेयर टेस्टिंग, वेब डेवलपमेंट और डिजिटल मार्केटिंग प्रोजेक्ट्स
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Project 1 */}
          <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 space-y-3 hover:border-slate-300 transition-colors">
            <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-[11px] font-bold border border-blue-200/60">
              QA &amp; API Testing
            </span>
            <h3 className="text-base font-bold text-[#111827]">
              E-Commerce &amp; Web Platform QA
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              200+ मैन्युअल और फ़ंक्शनल टेस्ट केसेस का निष्पादन, Postman द्वारा API सत्यापन, और कार्ट व चेकआउट फ़्लो की पूर्ण रिग्रेशन टेस्टिंग।
            </p>
            <div className="flex flex-wrap gap-1 pt-1">
              <span className="px-2 py-0.5 rounded bg-white text-[10px] font-semibold text-slate-700 border border-slate-200">Test Cases</span>
              <span className="px-2 py-0.5 rounded bg-white text-[10px] font-semibold text-slate-700 border border-slate-200">Postman</span>
              <span className="px-2 py-0.5 rounded bg-white text-[10px] font-semibold text-slate-700 border border-slate-200">RTM</span>
            </div>
          </div>

          {/* Project 2 */}
          <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 space-y-3 hover:border-slate-300 transition-colors">
            <span className="px-2.5 py-1 rounded-full bg-indigo-50 text-[#4F46E5] text-[11px] font-bold border border-indigo-200/60">
              Web Development
            </span>
            <h3 className="text-base font-bold text-[#111827]">
              Modern React &amp; TypeScript Web Apps
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              सुव्यवस्थित कॉम्पोनेंट आर्किटेक्चर, स्टेट मैनेजमेंट और Tailwind CSS के साथ निर्मित हाई-परफ़ॉर्मेंस रिस्पॉन्सिव वेब ऐप्लिकेशन्स।
            </p>
            <div className="flex flex-wrap gap-1 pt-1">
              <span className="px-2 py-0.5 rounded bg-white text-[10px] font-semibold text-slate-700 border border-slate-200">React</span>
              <span className="px-2 py-0.5 rounded bg-white text-[10px] font-semibold text-slate-700 border border-slate-200">TypeScript</span>
              <span className="px-2 py-0.5 rounded bg-white text-[10px] font-semibold text-slate-700 border border-slate-200">Tailwind</span>
            </div>
          </div>

          {/* Project 3 */}
          <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 space-y-3 hover:border-slate-300 transition-colors">
            <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200/60">
              Digital Marketing
            </span>
            <h3 className="text-base font-bold text-[#111827]">
              Meta Ads &amp; WhatsApp Growth Campaigns
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              इंस्टाग्राम और फेसबुक विज्ञापनों का सफल संचालन, ऑडियंस टारगेटिंग और व्हाट्सएप मार्केटिंग फनल द्वारा कन्वर्ज़न दर में वृद्धि।
            </p>
            <div className="flex flex-wrap gap-1 pt-1">
              <span className="px-2 py-0.5 rounded bg-white text-[10px] font-semibold text-slate-700 border border-slate-200">Meta Ads</span>
              <span className="px-2 py-0.5 rounded bg-white text-[10px] font-semibold text-slate-700 border border-slate-200">WhatsApp</span>
              <span className="px-2 py-0.5 rounded bg-white text-[10px] font-semibold text-slate-700 border border-slate-200">Leads</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          9. SOCIAL LINKS / DIRECT CONTACT
          ======================================================== */}
      <section
        id="contact-section"
        className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-6 sm:p-8 md:p-10 shadow-xs space-y-6"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200/70 pb-6">
          <div className="text-center sm:text-left space-y-1">
            <h3 className="text-xl font-bold text-[#111827]">
              Connect with Vikash Joshi
            </h3>
            <p className="text-xs sm:text-sm text-[#64748B]">
              सॉफ़्टवेयर टेस्टिंग, वेब डेवलपमेंट या डिजिटल मार्केटिंग के लिए संपर्क करें।
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenMessage}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs sm:text-sm font-semibold transition-all shadow-xs active:scale-95 shrink-0"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Send Direct Note</span>
          </button>
        </div>

        {/* Contact Specs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <a
            href={`mailto:${about.email}`}
            onClick={() => onToast('Opening email client', 'info')}
            className="p-4 rounded-xl bg-[#EEF3F9] hover:bg-indigo-50 border border-slate-200/70 flex items-center gap-3 transition-colors group"
          >
            <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-[#4F46E5] shadow-2xs group-hover:scale-105 transition-transform">
              <Mail className="w-5 h-5" />
            </div>
            <div className="overflow-hidden">
              <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider block">
                Email
              </span>
              <span className="text-xs font-bold text-[#111827] truncate block">
                {about.email}
              </span>
            </div>
          </a>

          <a
            href="https://github.com/vikashjoshi"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onToast('Opening GitHub profile', 'info')}
            className="p-4 rounded-xl bg-[#EEF3F9] hover:bg-indigo-50 border border-slate-200/70 flex items-center gap-3 transition-colors group"
          >
            <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-[#111827] shadow-2xs group-hover:scale-105 transition-transform">
              <Github className="w-5 h-5" />
            </div>
            <div className="overflow-hidden">
              <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider block">
                GitHub
              </span>
              <span className="text-xs font-bold text-[#111827] truncate block">
                github.com/vikashjoshi
              </span>
            </div>
          </a>

          <a
            href="https://linkedin.com/in/vikashjoshi"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onToast('Opening LinkedIn profile', 'info')}
            className="p-4 rounded-xl bg-[#EEF3F9] hover:bg-indigo-50 border border-slate-200/70 flex items-center gap-3 transition-colors group"
          >
            <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-blue-600 shadow-2xs group-hover:scale-105 transition-transform">
              <Linkedin className="w-5 h-5" />
            </div>
            <div className="overflow-hidden">
              <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider block">
                LinkedIn
              </span>
              <span className="text-xs font-bold text-[#111827] truncate block">
                linkedin.com/in/vikashjoshi
              </span>
            </div>
          </a>

          <a
            href="https://x.com/vikashjoshi"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onToast('Opening Twitter/X profile', 'info')}
            className="p-4 rounded-xl bg-[#EEF3F9] hover:bg-indigo-50 border border-slate-200/70 flex items-center gap-3 transition-colors group"
          >
            <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-slate-800 shadow-2xs group-hover:scale-105 transition-transform">
              <Twitter className="w-5 h-5" />
            </div>
            <div className="overflow-hidden">
              <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider block">
                Twitter / X
              </span>
              <span className="text-xs font-bold text-[#111827] truncate block">
                @vikashjoshi
              </span>
            </div>
          </a>
        </div>
      </section>
    </div>
  );
};
