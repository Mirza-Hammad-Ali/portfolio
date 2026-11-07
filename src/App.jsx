import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  Briefcase,
  Code2,
  Download,
  Globe,
  Layers3,
  Mail,
  MapPin,
  MonitorSmartphone,
  Sparkles,
} from 'lucide-react';

import Navbar from './components/Navbar';
import LoadingScreen from './components/LoadingScreen';
import ContactForm from './components/ContactForm';
import SectionTitle from './components/SectionTitle';
import { skills, skillCategories, categoryMap } from './data/skills';
import { projects, viewAllProjectsUrl } from './data/projects';
import { education, educationMessage } from './data/education';
import { services } from './data/services';

const rotatingTexts = [
  'Full Stack Developer',
  'React.js Developer',
  'Node.js Developer',
  'Creative Web Developer',
];

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [loading, setLoading] = useState(true);
  const [activeText, setActiveText] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const loadTimer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(loadTimer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveText((prev) => (prev + 1) % rotatingTexts.length);
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (window.innerWidth <= 768) return;
    const handlePointerMove = (event) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  useEffect(() => {
    const revealItems = gsap.utils.toArray('.reveal');
    revealItems.forEach((element) => {
      gsap.fromTo(
        element,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 82%',
          },
        },
      );
    });
  }, []);

  const skillGroups = skillCategories.map((category) => ({
    ...category,
    items: skills.filter((skill) => categoryMap[skill.name] === category.title),
  }));

  return (
    <>
      <LoadingScreen visible={loading} />

      <div className="app-shell">
        <div
          className="cursor-glow"
          style={{
            transform: `translate(${cursorPosition.x - 150}px, ${cursorPosition.y - 150}px)`,
          }}
        />

        <Navbar />

        <main>
          <section id="home" className="hero-section section-wrap">
            <div className="bg-orb orb-one" />
            <div className="bg-orb orb-two" />
            <div className="bg-orb orb-three" />

            <div className="hero-layout">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="hero-copy"
              >
                <p className="eyebrow text-left">Hi, I&apos;m Mirza Hammad Ali</p>
                <h1>
                  <span className="hero-main">Hi, I&apos;m </span>
                  <span className="gradient-text">Mirza Hammad Ali</span>
                </h1>
                <div className="typed-row">
                  <span className="typed-label">I&apos;m a</span>
                  <span className="typed-text">{rotatingTexts[activeText]}</span>
                </div>
                <p className="lead-text">
                  I build modern, responsive, and user-friendly web applications that combine clean design with
                  performance-focused engineering.
                </p>

                <div className="cta-row">
                  <a href="#contact" className="primary-button">
                    Contact Me
                    <ArrowRight size={18} />
                  </a>
                  <a href="#projects" className="secondary-button">
                    View My Projects
                  </a>
                  <a href="/resume.pdf" download className="secondary-button icon-inline">
                    <Download size={17} />
                    Download CV
                  </a>
                </div>

                <div className="social-row">
                  <a href="https://github.com/Mirza-Hammad-Ali" target="_blank" rel="noreferrer" className="social-pill" aria-label="GitHub">
                    <Globe size={18} />
                  </a>
                  <a href="https://www.linkedin.com/in/mirzahammad786/" target="_blank" rel="noreferrer" className="social-pill" aria-label="LinkedIn">
                    <Briefcase size={18} />
                  </a>
                  <a href="mailto:mirzahammadali786@gmail.com" className="social-pill" aria-label="Email">
                    <Mail size={18} />
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                className="hero-visual reveal"
              >
                <div className="visual-frame">
                  <div className="visual-glow" />
                  <div className="profile-card">
                    <div className="profile-badge">M</div>
                    <div className="profile-meta">
                      <span className="label">Available for work</span>
                      <strong>MERN Stack Developer</strong>
                    </div>
                  </div>
                  <div className="mini-card stack-one">
                    <Code2 size={18} />
                    <span>Frontend</span>
                  </div>
                  <div className="mini-card stack-two">
                    <Layers3 size={18} />
                    <span>UI Systems</span>
                  </div>
                  <div className="mini-card stack-three">
                    <Briefcase size={18} />
                    <span>Product Thinking</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          <section id="about" className="section-wrap reveal">
            <SectionTitle
              eyebrow="About Me"
              title="Building polished digital experiences with a product mindset."
              description="I enjoy crafting responsive and user-friendly web applications that balance clean design, performance, and functionality."
            />

            <div className="about-grid">
              <div className="portrait-panel">
                <div className="portrait-blob">
                  <div className="portrait-badge">MHA</div>
                </div>
              </div>

              <div className="about-content">
                <p className="lead-text muted-strong">
                  I&apos;m Mirza Hammad Ali, a passionate MERN Stack Developer from Sadiqabad, Pakistan. I enjoy
                  building modern, responsive, and user-friendly web applications. I work with React.js,
                  JavaScript, Node.js, Express.js, and MongoDB to develop complete web solutions. I love learning
                  new technologies, solving problems, and turning creative ideas into functional digital
                  experiences.
                </p>

                <div className="info-list">
                  <div className="info-row">
                    <MapPin size={18} />
                    <span>Sadiqabad, Pakistan</span>
                  </div>
                  <div className="info-row">
                    <Sparkles size={18} />
                    <span>MERN Stack Developer</span>
                  </div>
                </div>

                <div className="story-cards">
                  <div className="story-card">
                    <span className="story-icon"><MonitorSmartphone size={18} /></span>
                    <h3>Responsive Design</h3>
                    <p>Crafting interfaces that feel seamless across desktop, tablet, and mobile screens.</p>
                  </div>
                  <div className="story-card">
                    <span className="story-icon"><Code2 size={18} /></span>
                    <h3>Modern Development</h3>
                    <p>Building scalable frontends and reliable backend systems with clean architecture.</p>
                  </div>
                  <div className="story-card">
                    <span className="story-icon"><Sparkles size={18} /></span>
                    <h3>Problem Solving</h3>
                    <p>Turning ideas into functional experiences through thoughtful implementation.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="skills" className="section-wrap reveal">
            <SectionTitle
              eyebrow="Skills"
              title="Core tools and technologies I use to build digital products."
              description="Focused on modern, production-ready stacks for frontends, APIs, and data-driven experiences."
            />

            <div className="skills-grid">
              {skillGroups.map((category) => (
                <div className="skill-category" key={category.title}>
                  <div className="category-header">
                    <h3>{category.title}</h3>
                    <p>{category.subtitle}</p>
                  </div>
                  <div className="skill-list">
                    {category.items.map((skill) => {
                      const Icon = skill.icon;
                      return (
                        <div key={skill.name} className="skill-item">
                          <div className="skill-icon-wrap">
                            <Icon size={18} />
                          </div>
                          <span>{skill.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="projects" className="section-wrap reveal">
            <div className="section-header-row">
              <SectionTitle
                eyebrow="Projects"
                title="Selected work and product experiences."
                description="Project details can be added in the data file for easy updates and future portfolio expansion."
                align="left"
              />
              <a href={viewAllProjectsUrl} target="_blank" rel="noreferrer" className="secondary-button">
                View All Projects
              </a>
            </div>

            <div className="projects-grid">
              {projects.length > 0 ? (
                projects.map((project) => (
                  <article key={project.id} className="project-card">
                    <div className="project-preview" style={{ background: project.background }}>
                      <div className="project-overlay" />
                    </div>
                    <div className="project-body">
                      <h3>{project.name}</h3>
                      <p>{project.description}</p>
                      <div className="tag-list">
                        {project.technologies.map((tech) => (
                          <span key={`${project.id}-${tech}`} className="tag">{tech}</span>
                        ))}
                      </div>
                      <div className="project-actions">
                        <a href={project.githubUrl} target="_blank" rel="noreferrer" className="secondary-button small-button">
                          GitHub
                        </a>
                        <a href={project.liveUrl} target="_blank" rel="noreferrer" className="primary-button small-button">
                          Live Demo
                        </a>
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                <div className="empty-state">
                  <div className="empty-visual">Portfolio</div>
                  <h3>Project details coming soon</h3>
                  <p>Add real project names, links, and screenshots in the data file at src/data/projects.js.</p>
                </div>
              )}
            </div>
          </section>

          <section id="education" className="section-wrap reveal">
            <SectionTitle
              eyebrow="Education"
              title="Academic background and continuous learning."
              description="Education data is kept in a separate file so it stays easy to update whenever needed."
            />

            <div className="timeline-wrap">
              {education.length > 0 ? (
                education.map((item) => (
                  <div key={item.id} className="timeline-item">
                    <div className="timeline-dot" />
                    <div className="timeline-content">
                      <span className="timeline-date">{item.period}</span>
                      <h3>{item.title}</h3>
                      <p>{item.institution}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-state timeline-empty">
                  <h3>Education details pending</h3>
                  <p>{educationMessage}</p>
                </div>
              )}
            </div>
          </section>

          <section id="services" className="section-wrap reveal">
            <SectionTitle
              eyebrow="Services"
              title="Solutions designed to help brands and businesses grow online."
              description="Focused on quality, clarity, and scalable user experiences that support real business goals."
            />

            <div className="services-grid">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <div key={service.title} className="service-card">
                    <div className="service-icon">
                      <Icon size={22} />
                    </div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>
                );
              })}
            </div>
          </section>

          <section id="contact" className="section-wrap contact-section reveal">
            <SectionTitle
              eyebrow="Contact"
              title="Let&apos;s build something meaningful together."
              description="Have a project idea, collaboration request, or opportunity? Send a message and I&apos;ll get back to you soon."
            />

            <div className="contact-grid">
              <div className="contact-panel">
                <div className="contact-detail">
                  <Mail size={18} />
                  <a href="mailto:mirzahammadali786@gmail.com">mirzahammadali786@gmail.com</a>
                </div>
                <div className="contact-detail">
                  <MapPin size={18} />
                  <span>Sadiqabad, Pakistan</span>
                </div>
                <div className="contact-socials">
                  <a href="https://github.com/Mirza-Hammad-Ali" target="_blank" rel="noreferrer" className="social-pill">
                    <Globe size={18} />
                  </a>
                  <a href="https://www.linkedin.com/in/mirzahammad786/" target="_blank" rel="noreferrer" className="social-pill">
                    <Briefcase size={18} />
                  </a>
                </div>
              </div>

              <ContactForm />
            </div>
          </section>
        </main>

        <footer className="site-footer">
          <div className="footer-inner">
            <div>
              <h3>Mirza Hammad Ali</h3>
              <p>MERN Stack Developer</p>
            </div>
            <div className="footer-links">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href}>
                  {link.label}
                </a>
              ))}
            </div>
            <div className="footer-socials">
              <a href="https://github.com/Mirza-Hammad-Ali" target="_blank" rel="noreferrer">GitHub</a>
              <a href="https://www.linkedin.com/in/mirzahammad786/" target="_blank" rel="noreferrer">LinkedIn</a>
              <a href="mailto:mirzahammadali786@gmail.com">Email</a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Mirza Hammad Ali.</span>
            <a href="#home" className="back-to-top">Back to top</a>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
