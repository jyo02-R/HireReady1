// HPI 1.6-V
import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Image } from '@/components/ui/image';
import { 
  ArrowRight, 
  Target, 
  Code, 
  FileText, 
  Briefcase, 
  TrendingUp, 
  Award, 
  CheckCircle2,
  ChevronRight,
  Terminal
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// --- Canonical Data Sources ---
const FEATURES_DATA = [
  {
    icon: Target,
    title: 'Aptitude Practice',
    description: 'Master quantitative, logical, and verbal reasoning with 100+ practice questions.',
    link: '/aptitude',
    category: 'Practice'
  },
  {
    icon: Code,
    title: 'Coding Challenges',
    description: 'Sharpen your programming skills with 100+ coding problems across difficulty levels.',
    link: '/coding',
    category: 'Practice'
  },
  {
    icon: FileText,
    title: 'Resume Analyzer',
    description: 'Get instant feedback and actionable suggestions to improve your resume.',
    link: '/resume',
    category: 'Analysis'
  },
  {
    icon: Briefcase,
    title: 'Interview Preparation',
    description: 'Access structured plans and company-specific preparation materials.',
    link: '/interview',
    category: 'Preparation'
  },
  {
    icon: Award,
    title: 'Mock Tests',
    description: 'Simulate real placement tests and evaluate your readiness.',
    link: '/companies',
    category: 'Testing'
  },
  {
    icon: TrendingUp,
    title: 'Performance Tracking',
    description: 'Monitor your progress and identify areas for improvement.',
    link: '/performance',
    category: 'Analytics'
  },
];

const STATS_DATA = [
  { value: '200+', label: 'Practice Questions' },
  { value: '50+', label: 'Companies Covered' },
  { value: '100%', label: 'Free Access' },
];

// --- Utility Components ---

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right';
};

const Reveal: React.FC<RevealProps> = ({ children, className = '', delay = 0, direction = 'up' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(element);
      }
    }, { threshold: 0.15 });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const getTransform = () => {
    if (direction === 'left') return 'translateX(-30px)';
    if (direction === 'right') return 'translateX(30px)';
    return 'translateY(30px)';
  };

  return (
    <div 
      ref={ref} 
      className={`transition-all duration-1000 ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate(0,0)' : getTransform(),
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

const ParallaxImage: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const scrolled = window.scrollY;
      const rate = scrolled * 0.15;
      ref.current.style.transform = `translateY(${rate}px)`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`overflow-hidden ${className}`}>
      <div ref={ref} className="w-full h-[120%] -mt-[10%]">
        <Image src={src} alt={alt} width={1200} className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

// --- Main Page Component ---

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-background text-secondary font-paragraph overflow-clip selection:bg-primary selection:text-white">
      <Header />
      
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50"
        style={{ scaleX }}
      />

      {/* HERO SECTION */}
      <section className="relative w-full max-w-[120rem] mx-auto min-h-[90vh] flex flex-col lg:flex-row border-b border-gray-100">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 lg:px-20 py-20 lg:py-0 relative z-10 bg-background">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent opacity-20" />
          
          <Reveal delay={100}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 border border-gray-200 mb-8 w-fit">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-bold tracking-wider uppercase text-gray-600">Version 2.0 Live</span>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <h1 className="font-heading text-6xl lg:text-8xl font-black text-secondary mb-6 leading-[0.9] tracking-tight">
              Jay Reed <br />
              <span className="text-primary">Digital</span>
            </h1>
          </Reveal>

          <Reveal delay={300}>
            <p className="font-paragraph text-xl text-gray-500 mb-10 max-w-lg leading-relaxed">
              Amplify your digital resonance with data-driven marketing solutions. Elevate your campus placement readiness with comprehensive practice modules.
            </p>
          </Reveal>

          <Reveal delay={400}>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/aptitude"
                className="group relative overflow-hidden inline-flex items-center gap-3 bg-primary text-white font-semibold px-8 py-4 rounded-none transition-all hover:bg-primary/90"
              >
                <span className="relative z-10">START GROWING</span>
                <ArrowRight className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-black transform translate-y-full transition-transform duration-300 group-hover:translate-y-0 opacity-10" />
              </Link>
              
              <Link
                to="/coding"
                className="group inline-flex items-center gap-3 px-8 py-4 border border-gray-200 hover:border-primary transition-colors"
              >
                <span className="font-semibold">VIEW MODULES</span>
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Right Image - Full Bleed */}
        <div className="w-full lg:w-1/2 relative min-h-[50vh] lg:min-h-full bg-gray-50 overflow-hidden">
          <ParallaxImage 
            src="https://static.wixstatic.com/media/088934_b8d90683cb4a42729f305343ddc07c7f~mv2.png?originWidth=1152&originHeight=896" 
            alt="Professional student focused on digital growth" 
            className="absolute inset-0 w-full h-full"
          />
          
          {/* Decorative Overlay Elements */}
          <div className="absolute bottom-0 left-0 bg-white p-8 max-w-xs hidden lg:block border-t border-r border-gray-100">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Terminal size={20} />
              </div>
              <div>
                <div className="text-sm font-bold">Daily Challenge</div>
                <div className="text-xs text-gray-500">Coding & Aptitude</div>
              </div>
            </div>
            <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden mt-2">
              <div className="bg-primary h-full w-[75%]" />
            </div>
          </div>
        </div>
      </section>

      {/* TICKER SECTION */}
      <div className="w-full bg-secondary text-white py-4 overflow-hidden border-y border-gray-800">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 mx-6">
              <span className="text-sm font-bold tracking-[0.2em] uppercase opacity-70">Aptitude</span>
              <span className="w-1 h-1 bg-primary rounded-full" />
              <span className="text-sm font-bold tracking-[0.2em] uppercase opacity-70">Coding</span>
              <span className="w-1 h-1 bg-primary rounded-full" />
              <span className="text-sm font-bold tracking-[0.2em] uppercase opacity-70">Resume Analysis</span>
              <span className="w-1 h-1 bg-primary rounded-full" />
              <span className="text-sm font-bold tracking-[0.2em] uppercase opacity-70">Mock Tests</span>
              <span className="w-1 h-1 bg-primary rounded-full" />
            </div>
          ))}
        </div>
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 30s linear infinite;
          }
        `}</style>
      </div>

      {/* FEATURES GRID SECTION */}
      <section className="max-w-[120rem] mx-auto px-6 lg:px-20 py-32 bg-background relative">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
             style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
        />

        <div className="flex flex-col lg:flex-row justify-between items-end mb-20 relative z-10">
          <Reveal>
            <h2 className="font-heading text-4xl lg:text-6xl font-bold text-secondary max-w-2xl leading-tight">
              Comprehensive <br />
              <span className="text-primary">Preparation Suite</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="font-paragraph text-lg text-gray-500 max-w-md mt-6 lg:mt-0">
              Everything you need to ace your campus placements in one unified, intelligent platform.
            </p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200 border border-gray-200">
          {FEATURES_DATA.map((feature, index) => (
            <Reveal key={feature.title} delay={index * 100} className="h-full">
              <Link 
                to={feature.link}
                className="group block bg-white p-10 h-full hover:bg-gray-50 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight className="text-primary -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                </div>
                
                <div className="w-12 h-12 bg-primary/5 rounded-lg flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="text-primary" size={24} />
                </div>
                
                <div className="text-xs font-bold text-primary uppercase tracking-wider mb-3">
                  {feature.category}
                </div>
                
                <h3 className="font-heading text-2xl font-bold text-secondary mb-4 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                
                <p className="font-paragraph text-gray-500 leading-relaxed mb-8">
                  {feature.description}
                </p>

                <div className="absolute bottom-0 left-0 w-full h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* STICKY PROCESS SECTION */}
      <section className="bg-backgrounddark text-white py-32 relative overflow-hidden">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-20">
          <div className="flex flex-col lg:flex-row gap-20">
            
            {/* Sticky Left Side */}
            <div className="lg:w-1/3">
              <div className="sticky top-32">
                <Reveal>
                  <div className="text-primary font-bold tracking-widest uppercase mb-4">The Pathway</div>
                  <h2 className="font-heading text-4xl lg:text-5xl font-bold mb-8">
                    Engineered for <br /> Success
                  </h2>
                  <p className="text-gray-400 text-lg leading-relaxed mb-12">
                    Our platform guides you through a scientifically designed progression to maximize your placement potential.
                  </p>
                  <Link to="/aptitude" className="inline-flex items-center gap-2 text-white border-b border-primary pb-1 hover:text-primary transition-colors">
                    Start Your Journey <ChevronRight size={16} />
                  </Link>
                </Reveal>
              </div>
            </div>

            {/* Scrolling Right Side */}
            <div className="lg:w-2/3 flex flex-col gap-32">
              {[
                {
                  step: '01',
                  title: 'Assess & Practice',
                  desc: 'Begin with our extensive question bank covering aptitude and coding. Identify your baseline and start building core competencies.',
                  image: 'https://static.wixstatic.com/media/088934_25c1e205936d4d5596b524d30144dcf6~mv2.png?originWidth=576&originHeight=448'
                },
                {
                  step: '02',
                  title: 'Analyze & Refine',
                  desc: 'Upload your resume for AI-driven analysis. Get actionable feedback to ensure your profile stands out to recruiters.',
                  image: 'https://static.wixstatic.com/media/088934_b26ae96dcbc943c1bc1646c252c7c1b6~mv2.png?originWidth=576&originHeight=448'
                },
                {
                  step: '03',
                  title: 'Simulate & Conquer',
                  desc: 'Take full-length mock tests and company-specific preparation modules to simulate the real interview environment.',
                  image: 'https://static.wixstatic.com/media/088934_74017cb8889246cababce0cc7bb466ce~mv2.png?originWidth=576&originHeight=448'
                }
              ].map((item, idx) => (
                <Reveal key={idx} direction="up" className="group">
                  <div className="flex flex-col md:flex-row gap-10 items-center border-b border-gray-800 pb-20">
                    <div className="w-full md:w-1/2">
                      <div className="text-6xl font-black text-gray-800 mb-6 font-heading">{item.step}</div>
                      <h3 className="text-3xl font-bold mb-4">{item.title}</h3>
                      <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                    </div>
                    <div className="w-full md:w-1/2 relative aspect-[4/3] overflow-hidden rounded-sm">
                      <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-500" />
                      <Image 
                        src={item.image} 
                        alt={item.title} 
                        width={600} 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                      />
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-24 bg-primary text-white">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 divide-y md:divide-y-0 md:divide-x divide-white/20">
            {STATS_DATA.map((stat, index) => (
              <Reveal key={index} delay={index * 100} className="text-center px-4 pt-8 md:pt-0">
                <div className="font-heading text-6xl lg:text-7xl font-black mb-2 tracking-tight">
                  {stat.value}
                </div>
                <div className="font-paragraph text-lg font-medium opacity-90 uppercase tracking-widest">
                  {stat.label}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* LARGE CTA SECTION */}
      <section className="py-32 px-6 lg:px-20 max-w-[120rem] mx-auto">
        <div className="bg-gray-50 rounded-3xl p-12 lg:p-24 text-center relative overflow-hidden">
          {/* Decorative Circles */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full translate-x-1/3 translate-y-1/3" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <Reveal>
              <h2 className="font-heading text-4xl lg:text-6xl font-bold text-secondary mb-8">
                Ready to Launch Your Career?
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="font-paragraph text-xl text-gray-500 mb-12">
                Join thousands of students who are preparing smarter, not harder. Access all premium features for free today.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/aptitude"
                  className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-secondary text-white font-semibold px-10 py-5 rounded hover:bg-primary transition-colors duration-300"
                >
                  START PREPARING NOW
                  <ArrowRight size={20} />
                </Link>
                <Link
                  to="/companies"
                  className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-white border border-gray-200 text-secondary font-semibold px-10 py-5 rounded hover:border-secondary transition-colors duration-300"
                >
                  EXPLORE COMPANIES
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}