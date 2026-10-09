import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { ArrowRight, Code2, Database, Layout, Smartphone, Globe, Cpu, X } from 'lucide-react';
import Cursor from './components/Cursor';
import Hero3D from './components/Hero3D';
import About3D from './components/About3D';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Navbar scroll effect
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    // Reveal animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-up').forEach((el) => {
      observer.observe(el);
    });

    return () => {
      lenis.destroy();
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const projects = [
    {
      id: "01",
      title: "Raja CMS",
      desc: "Comprehensive cash management system with robust dashboard and secure transactions.",
      url: "https://rajacms.com/",
      tag: "FINTECH"
    },
    {
      id: "02",
      title: "Cafe & Table Booking",
      desc: "Interactive cafe website with real-time table reservations and menu management.",
      url: "https://cafe-website-two-theta.vercel.app/",
      tag: "HOSPITALITY"
    },
    {
      id: "03",
      title: "Legal Firm Portal",
      desc: "Professional website for lawyer enquiry, consultations scheduling and case studies.",
      url: "https://lawyerwebsite-alpha.vercel.app/",
      tag: "LEGAL"
    },
    {
      id: "04",
      title: "Clinic Appointments",
      desc: "Medical clinic platform to view services, manage doctors and book appointments.",
      url: "https://demo-clinic-website-pearl.vercel.app/",
      tag: "HEALTHCARE"
    }
  ];

  const technologies = [
    { name: "React.js", icon: <Code2 /> },
    { name: "Three.js", icon: <Globe /> },
    { name: "TypeScript", icon: <Code2 /> },
    { name: "Node.js", icon: <Database /> },
    { name: "Next.js", icon: <Layout /> },
    { name: "React Native", icon: <Smartphone /> },
    { name: "AWS Cloud", icon: <Cpu /> },
    { name: "MongoDB", icon: <Database /> },
  ];

  return (
    <>
      <div className="noise"></div>
      <Cursor />

      {/* NAVBAR */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <a href="#" className="navbar-logo">
          <img src="/elvrix-logo.png" alt="Elvrix Logo" className="site-logo" />
        </a>

        <ul className="navbar-links">
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#projects">Projects</a></li>
        </ul>

        <a href="#contact" className="navbar-cta">Start Project</a>

        <button className="hamburger" onClick={() => setIsMenuOpen(true)}>
          <span></span><span></span><span></span>
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <button className="mobile-close" onClick={() => setIsMenuOpen(false)}><X size={40} /></button>
        <a href="#about" onClick={() => setIsMenuOpen(false)}>About</a>
        <a href="#services" onClick={() => setIsMenuOpen(false)}>Services</a>
        <a href="#projects" onClick={() => setIsMenuOpen(false)}>Projects</a>
        <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
      </div>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-text-block animate-up">
              <div className="hero-label">
                <div className="hero-label-dot"></div>
                <span className="tag">Digital Excellence</span>
              </div>
              <h1 className="hero-headline">
                WE BUILD <br />
                <span className="accent">BOLD</span> DIGITAL <br />
                EXPERIENCES
              </h1>
              <p className="hero-sub">
                Elvrix Tech Solutions delivers premium technology services, cloud infrastructure, AI and custom software development that pushes boundaries.
              </p>
              <div className="hero-buttons">
                <a href="#projects" className="btn-brutal">
                  <span>View Our Work</span>
                  <ArrowRight size={18} />
                </a>
                <a href="#contact" className="btn-outline">Contact Us</a>
              </div>
              <div className="hero-stats">
                <div>
                  <div className="hero-stat-num">50+</div>
                  <div className="hero-stat-label">Projects Delivered</div>
                </div>
                <div>
                  <div className="hero-stat-num">100%</div>
                  <div className="hero-stat-label">Client Success</div>
                </div>
              </div>
            </div>
            
            <div className="hero-visual animate-up" style={{ transitionDelay: '0.2s' }}>
              <div className="hero-3d-panel">
                <div className="hero-3d-label">Interactive 3D Web</div>
                <Hero3D />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker">
        <div className="ticker-track">
          {[...Array(6)].map((_, i) => (
            <div className="ticker-item" key={i}>
              <span>WEB DEVELOPMENT</span>
              <div className="ticker-dot"></div>
              <span>MOBILE APPS</span>
              <div className="ticker-dot"></div>
              <span>AI SOLUTIONS</span>
              <div className="ticker-dot"></div>
              <span>CLOUD ARCHITECTURE</span>
              <div className="ticker-dot"></div>
            </div>
          ))}
        </div>
      </div>

      {/* ABOUT SECTION */}
      <section id="about" className="section about">
        <div className="container">
          <div className="about-grid">
            <div className="about-visual animate-up">
              <div className="about-main-box">
                <About3D />
              </div>
              <div className="about-badge">
                <span className="about-badge-num">10+</span>
                <span className="about-badge-text">Years of <br/> Excellence</span>
              </div>
            </div>
            <div className="about-content animate-up" style={{ transitionDelay: '0.2s' }}>
              <div className="section-label">Who We Are</div>
              <h2 className="section-title">ENGINEERING <br/> THE FUTURE</h2>
              <div className="divider"></div>
              <p className="about-desc">
                We are a collective of digital craftsmen, engineers, and designers. We don't just write code; we architect solutions that drive real business growth. Our approach combines brutalist minimalism with cutting-edge technology to create experiences that are both beautiful and highly performant.
              </p>
              <div className="about-pillars">
                <div className="pillar">
                  <div className="pillar-icon"><Cpu /></div>
                  <div className="pillar-title">Modern Stack</div>
                  <div className="pillar-desc">Leveraging the latest in web technologies.</div>
                </div>
                <div className="pillar">
                  <div className="pillar-icon"><Layout /></div>
                  <div className="pillar-title">Premium Design</div>
                  <div className="pillar-desc">Aesthetics that capture attention instantly.</div>
                </div>
              </div>
              <a href="#services" className="btn-brutal">
                <span>Our Capabilities</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="section services">
        <div className="container">
          <div className="services-header animate-up">
            <div>
              <div className="section-label">Our Capabilities</div>
              <h2 className="section-title">WHAT WE DO</h2>
            </div>
            <div className="brutal-badge">Full-Stack Experts</div>
          </div>

          <div className="services-grid animate-up">
            {[
              { id: "01", icon: <Globe />, title: "Web Development", desc: "High-performance websites and web applications built with modern frameworks." },
              { id: "02", icon: <Smartphone />, title: "Mobile Apps", desc: "Cross-platform mobile applications that provide native-like experiences." },
              { id: "03", icon: <Database />, title: "Backend Systems", desc: "Scalable and secure server architectures and APIs." },
              { id: "04", icon: <Layout />, title: "UI/UX Design", desc: "Striking, brutalist, and user-centric interfaces." },
              { id: "05", icon: <Cpu />, title: "AI Integration", desc: "Smart solutions powered by the latest AI technologies." },
              { id: "06", icon: <Code2 />, title: "SaaS Platforms", desc: "End-to-end development of comprehensive software products." }
            ].map(service => (
              <div className="service-card" key={service.id}>
                <div className="service-number">{service.id}</div>
                <div className="service-icon-box">{service.icon}</div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-desc">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="section projects">
        <div className="container">
          <div className="section-label">Featured Work</div>
          <h2 className="section-title">SELECTED <br/> PROJECTS</h2>
          
          <div className="projects-grid animate-up">
            {projects.map(project => (
              <div className="project-card floating-card" key={project.id}>
                <div className="project-iframe-wrap">
                  {/* Using iframe scaled down to show a live preview */}
                  <iframe src={project.url} title={project.title} loading="lazy"></iframe>
                </div>
                <div className="project-num">{project.id}</div>
                <div className="project-overlay">
                  <span className="project-tag">{project.tag}</span>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.desc}</p>
                  <a href={project.url} target="_blank" rel="noreferrer" className="project-link">
                    Live Preview <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="section tech-stack">
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="section-label">Technologies</div>
          <h2 className="section-title" style={{ marginBottom: 0 }}>OUR STACK</h2>
        </div>
        
        <div className="tech-rows-wrapper">
          <div className="tech-row">
            {[...technologies, ...technologies, ...technologies].map((tech, i) => (
              <div className="tech-item" key={i}>
                <span className="tech-item-icon">{tech.icon}</span>
                {tech.name}
              </div>
            ))}
          </div>
          <div className="tech-row reverse">
            {[...technologies, ...technologies, ...technologies].reverse().map((tech, i) => (
              <div className="tech-item" key={i}>
                <span className="tech-item-icon">{tech.icon}</span>
                {tech.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="section contact">
        <div className="contact-bg-text">CONNECT</div>
        <div className="container">
          <div className="contact-grid">
            <div className="animate-up">
              <div className="section-label">Get In Touch</div>
              <h2 className="section-title">LET'S BUILD <br/> SOMETHING</h2>
              <div className="divider"></div>
              
              <div className="contact-info">
                <div className="contact-item">
                  <div className="contact-icon"><Globe size={20} /></div>
                  <div>
                    <div className="contact-item-label">Website</div>
                    <div className="contact-item-value">elvrixtechsolutions.com</div>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon"><ArrowRight size={20} /></div>
                  <div>
                    <div className="contact-item-label">Email</div>
                    <div className="contact-item-value">Business@elvrixtechsolutions.com</div>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon"><Smartphone size={20} /></div>
                  <div>
                    <div className="contact-item-label">Phone</div>
                    <div className="contact-item-value">+91 90962 87077</div>
                  </div>
                </div>
              </div>

              <div className="contact-socials">
                <a href="http://instagram.com/elvrix_techsolutions?igsi=MTRwZ3pkMTAyMjZycA%3D%3D" target="_blank" rel="noreferrer" className="social-link">In</a>
                <a href="https://linkedin.com/company/elvrix-techsolutions" target="_blank" rel="noreferrer" className="social-link">Li</a>
              </div>
            </div>

            <div className="animate-up" style={{ transitionDelay: '0.2s' }}>
              <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input type="text" className="form-input" placeholder="Your name" />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-input" placeholder="your@email.com" />
                </div>
                <div className="form-group">
                  <label className="form-label">Service Required</label>
                  <select className="form-select">
                    <option>Web Development</option>
                    <option>Mobile App</option>
                    <option>UI/UX Design</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea className="form-textarea" placeholder="Tell us about your project..."></textarea>
                </div>
                <button type="submit" className="form-submit">Send Inquiry</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-main">
            <div className="footer-brand">
              <a href="#" className="navbar-logo">
                <img src="/elvrix-logo.png" alt="Elvrix Logo" className="site-logo" />
              </a>
              <p>Bold digital experiences and premium technology solutions for forward-thinking brands.</p>
            </div>
            
            <div className="footer-links">
              <div className="footer-col">
                <div className="footer-col-title">Navigation</div>
                <ul>
                  <li><a href="#about">About</a></li>
                  <li><a href="#services">Services</a></li>
                  <li><a href="#projects">Projects</a></li>
                  <li><a href="#contact">Contact</a></li>
                </ul>
              </div>
              <div className="footer-col">
                <div className="footer-col-title">Socials</div>
                <ul>
                  <li><a href="https://linkedin.com/company/elvrix-techsolutions" target="_blank" rel="noreferrer">LinkedIn</a></li>
                  <li><a href="http://instagram.com/elvrix_techsolutions?igsi=MTRwZ3pkMTAyMjZycA%3D%3D" target="_blank" rel="noreferrer">Instagram</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <div>&copy; {new Date().getFullYear()} Elvrix Tech Solutions. All rights reserved.</div>
            <div>Built with brutalist precision.</div>
          </div>
        </div>
      </footer>
    </>
  );
}
