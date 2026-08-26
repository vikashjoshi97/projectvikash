import React from 'react';
import { AboutSectionData, ProfileData } from '../types';
import {
  ShieldCheck,
  Code2,
  TrendingUp,
  Bot,
  GraduationCap,
  Sparkles,
  HeartHandshake,
  BookOpen,
  Award,
  ExternalLink,
  Github,
  Linkedin,
  Instagram,
  MessageCircle,
  Mail,
  CheckCircle,
  FileSpreadsheet,
  Cpu,
  MonitorCheck,
  Send,
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
  return (
    <div id="about-me-page" className="w-full max-w-4xl mx-auto space-y-6 sm:space-y-8 pb-8">
      {/* ========================================================
          0. CLEAN MOBILE HEADER
          ======================================================== */}
      <div className="flex items-center justify-between px-1">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#173B57] tracking-tight">
            About Me
          </h2>
          <p className="text-xs sm:text-sm text-[#667085]">
            परिचय, तकनीकी विशेषज्ञता एवं प्रोजेक्ट्स
          </p>
        </div>
        <button
          type="button"
          onClick={onOpenMessage}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#173B57] text-white text-xs font-semibold hover:bg-[#112C42] transition-colors shadow-xs active:scale-95"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Contact</span>
        </button>
      </div>

      {/* ========================================================
          1. FULL-WIDTH PANORAMIC IMAGE BANNER (NO TEXT INSIDE)
          ======================================================== */}
      <div
        id="about-panoramic-banner"
        className="w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-[#E4E7EC] shadow-[0_8px_30px_rgba(16,24,40,0.06)] bg-white"
      >
        <div className="w-full h-44 sm:h-64 md:h-80 lg:h-96 relative">
          <img
            src="/images/about-banner.jpg"
            alt="Scenic panoramic landscape banner"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center select-none"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://picsum.photos/seed/nature-landscape/1600/600';
            }}
          />
        </div>
      </div>

      {/* ========================================================
          2. PROFILE CARD (REAL PHOTO + INTRO + SOCIALS)
          ======================================================== */}
      <section
        id="about-profile-card"
        className="bg-white rounded-2xl sm:rounded-3xl border border-[#E4E7EC] p-5 sm:p-8 md:p-10 shadow-[0_8px_30px_rgba(16,24,40,0.06)] space-y-6"
      >
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8 md:gap-10">
          {/* LEFT / TOP: Real Uploaded Photo */}
          <div className="shrink-0 flex flex-col items-center">
            <div className="relative group">
              <div className="w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-2xl p-[3px] bg-gradient-to-tr from-[#173B57] via-[#2F7D78] to-[#E4E7EC] shadow-sm transition-all duration-300 group-hover:scale-102">
                <div className="w-full h-full rounded-2xl bg-white p-[2px] overflow-hidden">
                  <img
                    src={profile.avatar || '/images/profile/profile-placeholder.jpg'}
                    alt={profile.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top rounded-xl"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        '/images/profile/profile-placeholder.jpg';
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F1F3F2] border border-[#E4E7EC] text-[11px] font-semibold text-[#173B57]">
              <span className="w-2 h-2 rounded-full bg-[#2F7D78] animate-pulse" />
              <span>Available for Work</span>
            </div>
          </div>

          {/* RIGHT / BELOW: Name, Title, Hindi Intro & Social Links */}
          <div className="flex-1 space-y-4 text-center md:text-left">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#173B57] tracking-tight">
                Vikash Joshi
              </h1>
              <p className="text-sm sm:text-base font-semibold text-[#2F7D78] mt-0.5">
                QA Tester | Developer | Digital Marketer
              </p>
            </div>

            {/* Hindi Introduction */}
            <div className="space-y-3 text-[#172033] text-sm sm:text-[15px] leading-relaxed text-justify md:text-left">
              <p>
                नमस्ते, मैं <strong className="font-semibold text-[#173B57]">विकास जोशी</strong> हूँ। मैं टेक्नोलॉजी और डिजिटल क्षेत्र में काम करने वाला एक बहुआयामी प्रोफेशनल हूँ। मुझे Software Testing, Web Development और Digital Marketing के क्षेत्र में काम करना पसंद है।
              </p>
              <p>
                मैं QA Testing में Manual Testing, Functional Testing, Regression Testing, API Testing, Bug Reporting, Test Case Design और Test Automation पर काम करता हूँ।
              </p>
              <p>
                इसके साथ ही मुझे Web Development और Digital Marketing में भी रुचि है और मैं अलग-अलग Digital Projects पर काम करता हूँ।
              </p>
            </div>

            {/* Social Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-2.5">
              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/vikashjoshi"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onToast('Opening LinkedIn profile', 'info')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-[#F1F3F2] text-[#173B57] text-xs font-semibold border border-[#E4E7EC] transition-all active:scale-95 shadow-2xs group"
              >
                <Linkedin className="w-4 h-4 text-[#173B57] transition-colors" />
                <span>LinkedIn</span>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/vikashjoshi"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onToast('Opening GitHub profile', 'info')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-[#F1F3F2] text-[#173B57] text-xs font-semibold border border-[#E4E7EC] transition-all active:scale-95 shadow-2xs group"
              >
                <Github className="w-4 h-4 text-[#173B57] transition-colors" />
                <span>GitHub</span>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com/vikashjoshi"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onToast('Opening Instagram profile', 'info')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-[#F1F3F2] text-[#173B57] text-xs font-semibold border border-[#E4E7EC] transition-all active:scale-95 shadow-2xs group"
              >
                <Instagram className="w-4 h-4 text-[#2F7D78] transition-colors" />
                <span>Instagram</span>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onToast('Opening WhatsApp chat', 'info')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-[#F1F3F2] text-[#173B57] text-xs font-semibold border border-[#E4E7EC] transition-all active:scale-95 shadow-2xs group"
              >
                <MessageCircle className="w-4 h-4 text-[#2F7D78] transition-colors" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. FEATURE HIGHLIGHTS (3 small premium cards)
          ======================================================== */}
      <section id="about-feature-highlights" className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {/* Card 1: समर्पित */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E4E7EC] shadow-[0_8px_30px_rgba(16,24,40,0.06)] flex items-start gap-3.5 hover:border-[#2F7D78]/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#2F7D78]/10 text-[#2F7D78] flex items-center justify-center shrink-0">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <h3 className="text-sm font-bold text-[#173B57]">समर्पित</h3>
              <p className="text-xs text-[#667085] leading-snug">
                क्वालिटी और परफेक्शन मेरी पहचान
              </p>
            </div>
          </div>

          {/* Card 2: निरंतर सीखना */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E4E7EC] shadow-[0_8px_30px_rgba(16,24,40,0.06)] flex items-start gap-3.5 hover:border-[#2F7D78]/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#173B57]/10 text-[#173B57] flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <h3 className="text-sm font-bold text-[#173B57]">निरंतर सीखना</h3>
              <p className="text-xs text-[#667085] leading-snug">
                हर दिन कुछ नया सीखने की कोशिश
              </p>
            </div>
          </div>

          {/* Card 3: ईमानदारी */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E4E7EC] shadow-[0_8px_30px_rgba(16,24,40,0.06)] flex items-start gap-3.5 hover:border-[#2F7D78]/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#2F7D78]/10 text-[#2F7D78] flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <h3 className="text-sm font-bold text-[#173B57]">ईमानदारी</h3>
              <p className="text-xs text-[#667085] leading-snug">
                काम के प्रति पूरी जिम्मेदारी और पारदर्शिता
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          4. MY EXPERTISE (4 responsive cards)
          ======================================================== */}
      <section id="about-expertise-section" className="space-y-4">
        <div className="flex items-center gap-2 px-1">
          <div className="w-7 h-7 rounded-lg bg-[#2F7D78]/10 flex items-center justify-center text-[#2F7D78]">
            <Sparkles className="w-4 h-4" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-[#173B57]">
            My Expertise
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Card 1: QA & Testing */}
          <div className="p-5 rounded-2xl bg-white border border-[#E4E7EC] shadow-[0_8px_30px_rgba(16,24,40,0.06)] space-y-3 hover:border-[#2F7D78]/40 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#173B57]/10 text-[#173B57] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#173B57]">
                QA &amp; Testing
              </h3>
            </div>
            <p className="text-xs text-[#667085] leading-relaxed">
              सॉफ़्टवेयर गुणवत्ता, बग डिटेक्शन और टेस्ट कवरेज का संपूर्ण प्रबंधन।
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[
                'Manual Testing',
                'API Testing',
                'Test Case Design',
                'Bug Reporting',
                'RTM & STLC',
              ].map((skill, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-md bg-[#F1F3F2] text-[#173B57] text-xs font-medium border border-[#E4E7EC]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Card 2: Development */}
          <div className="p-5 rounded-2xl bg-white border border-[#E4E7EC] shadow-[0_8px_30px_rgba(16,24,40,0.06)] space-y-3 hover:border-[#2F7D78]/40 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#2F7D78]/10 text-[#2F7D78] flex items-center justify-center shrink-0">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#173B57]">
                Development
              </h3>
            </div>
            <p className="text-xs text-[#667085] leading-relaxed">
              आधुनिक, तीव्र और रिस्पॉन्सिव वेब ऐप्लिकेशन्स का निर्माण।
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[
                'React.js',
                'JavaScript',
                'TypeScript',
                'HTML & CSS',
                'Responsive Design',
              ].map((skill, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-md bg-[#F1F3F2] text-[#173B57] text-xs font-medium border border-[#E4E7EC]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Card 3: Digital Marketing */}
          <div className="p-5 rounded-2xl bg-white border border-[#E4E7EC] shadow-[0_8px_30px_rgba(16,24,40,0.06)] space-y-3 hover:border-[#2F7D78]/40 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#2F7D78]/10 text-[#2F7D78] flex items-center justify-center shrink-0">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#173B57]">
                Digital Marketing
              </h3>
            </div>
            <p className="text-xs text-[#667085] leading-relaxed">
              डिजिटल कैंपेन, सोशल मीडिया रीच और बिज़नेस लीड जनरेशन।
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[
                'Meta Ads',
                'Social Media',
                'Instagram Marketing',
                'Facebook Marketing',
                'WhatsApp Marketing',
              ].map((skill, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-md bg-[#F1F3F2] text-[#173B57] text-xs font-medium border border-[#E4E7EC]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Card 4: Automation */}
          <div className="p-5 rounded-2xl bg-white border border-[#E4E7EC] shadow-[0_8px_30px_rgba(16,24,40,0.06)] space-y-3 hover:border-[#2F7D78]/40 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#173B57]/10 text-[#173B57] flex items-center justify-center shrink-0">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#173B57]">
                Automation
              </h3>
            </div>
            <p className="text-xs text-[#667085] leading-relaxed">
              ऑटोमेटेड टेस्ट स्क्रिप्ट्स और एंड-टू-एंड रिग्रेशन टेस्ट सूट।
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[
                'Playwright',
                'TypeScript',
                'UI Automation',
                'API Automation',
                'Regression Testing',
              ].map((skill, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-md bg-[#F1F3F2] text-[#173B57] text-xs font-medium border border-[#E4E7EC]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          5. EDUCATION (शिक्षा)
          ======================================================== */}
      <section id="about-education-section" className="space-y-4">
        <div className="flex items-center gap-2 px-1">
          <div className="w-7 h-7 rounded-lg bg-[#2F7D78]/10 flex items-center justify-center text-[#2F7D78]">
            <GraduationCap className="w-4 h-4" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-[#173B57]">
            शिक्षा (Education)
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Card 1: BCA */}
          <div className="p-5 rounded-2xl bg-white border border-[#E4E7EC] shadow-[0_8px_30px_rgba(16,24,40,0.06)] space-y-2.5 hover:border-[#2F7D78]/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-[#F1F3F2] text-[#173B57] text-xs font-bold border border-[#E4E7EC]">
                Graduation
              </span>
              <GraduationCap className="w-4 h-4 text-[#2F7D78]" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#173B57]">
              BCA
            </h3>
            <p className="text-xs sm:text-sm text-[#2F7D78] font-semibold">
              Bachelor of Computer Applications
            </p>
            <p className="text-xs text-[#667085] leading-relaxed">
              कंप्यूटर विज्ञान के बुनियादी सिद्धांत, प्रोग्रामिंग, डेटाबेस सिस्टम और वेब तकनीक।
            </p>
          </div>

          {/* Card 2: MCA */}
          <div className="p-5 rounded-2xl bg-white border border-[#E4E7EC] shadow-[0_8px_30px_rgba(16,24,40,0.06)] space-y-2.5 hover:border-[#2F7D78]/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-[#2F7D78]/10 text-[#2F7D78] text-xs font-bold border border-[#2F7D78]/20">
                Post Graduation
              </span>
              <GraduationCap className="w-4 h-4 text-[#2F7D78]" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#173B57]">
              MCA
            </h3>
            <p className="text-xs sm:text-sm text-[#2F7D78] font-semibold">
              Master of Computer Applications
            </p>
            <p className="text-xs text-[#667085] leading-relaxed">
              उन्नत सॉफ़्टवेयर इंजीनियरिंग, सॉफ़्टवेयर टेस्टिंग व क्वालिटी एश्योरेंस तथा सिस्टम आर्किटेक्चर।
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================
          6. WHAT I DO (मैं क्या करता हूँ) - 5 compact cards
          ======================================================== */}
      <section id="about-what-i-do-section" className="space-y-4">
        <div className="flex items-center gap-2 px-1">
          <div className="w-7 h-7 rounded-lg bg-[#173B57]/10 flex items-center justify-center text-[#173B57]">
            <Cpu className="w-4 h-4" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-[#173B57]">
            मैं क्या करता हूँ (What I Do)
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {/* 1. Software Testing */}
          <div className="p-4 rounded-xl bg-white border border-[#E4E7EC] shadow-[0_8px_30px_rgba(16,24,40,0.06)] flex flex-col items-center text-center space-y-2 hover:border-[#2F7D78]/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#173B57]/10 text-[#173B57] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-[#173B57] leading-tight">
              Software Testing
            </h3>
            <span className="text-[11px] text-[#667085] leading-none">
              Manual &amp; Functional
            </span>
          </div>

          {/* 2. Test Automation */}
          <div className="p-4 rounded-xl bg-white border border-[#E4E7EC] shadow-[0_8px_30px_rgba(16,24,40,0.06)] flex flex-col items-center text-center space-y-2 hover:border-[#2F7D78]/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#2F7D78]/10 text-[#2F7D78] flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-[#173B57] leading-tight">
              Test Automation
            </h3>
            <span className="text-[11px] text-[#667085] leading-none">
              Playwright &amp; Scripts
            </span>
          </div>

          {/* 3. Web Development */}
          <div className="p-4 rounded-xl bg-white border border-[#E4E7EC] shadow-[0_8px_30px_rgba(16,24,40,0.06)] flex flex-col items-center text-center space-y-2 hover:border-[#2F7D78]/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#173B57]/10 text-[#173B57] flex items-center justify-center">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-[#173B57] leading-tight">
              Web Development
            </h3>
            <span className="text-[11px] text-[#667085] leading-none">
              React &amp; TypeScript
            </span>
          </div>

          {/* 4. Digital Marketing */}
          <div className="p-4 rounded-xl bg-white border border-[#E4E7EC] shadow-[0_8px_30px_rgba(16,24,40,0.06)] flex flex-col items-center text-center space-y-2 hover:border-[#2F7D78]/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#2F7D78]/10 text-[#2F7D78] flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-[#173B57] leading-tight">
              Digital Marketing
            </h3>
            <span className="text-[11px] text-[#667085] leading-none">
              Meta Ads &amp; Growth
            </span>
          </div>

          {/* 5. Quality Assurance */}
          <div className="p-4 rounded-xl bg-white border border-[#E4E7EC] shadow-[0_8px_30px_rgba(16,24,40,0.06)] flex flex-col items-center text-center space-y-2 col-span-2 sm:col-span-1 hover:border-[#2F7D78]/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#173B57]/10 text-[#173B57] flex items-center justify-center">
              <MonitorCheck className="w-5 h-5" />
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-[#173B57] leading-tight">
              Quality Assurance
            </h3>
            <span className="text-[11px] text-[#667085] leading-none">
              Bug-Free Releases
            </span>
          </div>
        </div>
      </section>

      {/* ========================================================
          7. MY PROJECTS (मेरे प्रोजेक्ट्स) - 2 specific cards
          ======================================================== */}
      <section id="about-projects-section" className="space-y-4">
        <div className="flex items-center gap-2 px-1">
          <div className="w-7 h-7 rounded-lg bg-[#2F7D78]/10 flex items-center justify-center text-[#2F7D78]">
            <Sparkles className="w-4 h-4" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-[#173B57]">
            मेरे प्रोजेक्ट्स (My Projects)
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Project 1: Vikash Joshi QA Portfolio */}
          <div
            id="about-project-1"
            className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E4E7EC] shadow-[0_8px_30px_rgba(16,24,40,0.06)] flex flex-col justify-between space-y-4 hover:shadow-[0_12px_36px_rgba(16,24,40,0.1)] hover:border-[#2F7D78]/40 transition-all"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-[#173B57]/10 text-[#173B57] text-[11px] font-bold border border-[#173B57]/20">
                  QA Portfolio
                </span>
                <span className="text-xs text-[#2F7D78] font-semibold">Live</span>
              </div>
              <h3 className="text-lg font-bold text-[#173B57]">
                Vikash Joshi
              </h3>
              <p className="text-xs text-[#667085] leading-relaxed">
                Professional QA Tester portfolio showcasing test plans, automation test cases, bug reports, RTM, and Playwright automation suites.
              </p>
            </div>

            <div className="pt-2 border-t border-[#E4E7EC]">
              <a
                href="https://vikashjoshi.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onToast('Opening QA Portfolio', 'info')}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#173B57] hover:bg-[#112C42] text-white text-xs font-semibold transition-colors shadow-xs active:scale-98"
              >
                <span>View Live Project</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Project 2: Pandit Sarwan Ji Astrology Website */}
          <div
            id="about-project-2"
            className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E4E7EC] shadow-[0_8px_30px_rgba(16,24,40,0.06)] flex flex-col justify-between space-y-4 hover:shadow-[0_12px_36px_rgba(16,24,40,0.1)] hover:border-[#2F7D78]/40 transition-all"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-[#2F7D78]/10 text-[#2F7D78] text-[11px] font-bold border border-[#2F7D78]/20">
                  Astrology Website
                </span>
                <span className="text-xs text-[#2F7D78] font-semibold">Live</span>
              </div>
              <h3 className="text-lg font-bold text-[#173B57]">
                Pandit Sarwan Ji
              </h3>
              <p className="text-xs text-[#667085] leading-relaxed">
                Premium astrology website featuring astrology services, consultation bookings, responsive layouts, WhatsApp integration, and SEO optimization.
              </p>
            </div>

            <div className="pt-2 border-t border-[#E4E7EC]">
              <a
                href="https://vikash-joshi.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onToast('Opening Pandit Sarwan Ji Astrology Website', 'info')}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#173B57] hover:bg-[#112C42] text-white text-xs font-semibold transition-colors shadow-xs active:scale-98"
              >
                <span>View Live Project</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
