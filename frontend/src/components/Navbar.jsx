import { useEffect, useState } from 'react';
import { BriefcaseBusiness, Download, Globe, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState('home');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.filter((entry) => entry.isIntersecting)[0];
        if (visibleEntry) {
          setActiveId(visibleEntry.target.id);
        }
      },
      { threshold: 0.45 },
    );

    navItems.forEach(({ href }) => {
      const target = document.querySelector(href);
      if (target) observer.observe(target);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href) => {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsOpen(false);
  };

  return (
    <header className="site-header">
      <nav className="nav-shell">
        <a href="#home" className="brand-mark" aria-label="Mirza Hammad Ali home">
          <span className="brand-dot" />
          <span>MIRZA</span>
        </a>

        <div className="nav-links desktop-only">
          {navItems.map((item) => (
            <button
              key={item.href}
              type="button"
              className={activeId === item.href.slice(1) ? 'nav-link active' : 'nav-link'}
              onClick={() => handleNavClick(item.href)}
            >
              {item.name}
            </button>
          ))}
        </div>

        <div className="nav-actions desktop-only">
          <a href="https://github.com/Mirza-Hammad-Ali" target="_blank" rel="noreferrer" className="icon-link" aria-label="GitHub profile">
            <Globe size={18} />
          </a>
          <a href="https://www.linkedin.com/in/mirzahammad786/" target="_blank" rel="noreferrer" className="icon-link" aria-label="LinkedIn profile">
            <BriefcaseBusiness size={18} />
          </a>
          <a href="/resume.pdf" download className="primary-button small-button">
            <Download size={16} />
            Resume
          </a>
        </div>

        <button type="button" className="menu-toggle mobile-only" onClick={() => setIsOpen((prev) => !prev)} aria-label="Toggle menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="mobile-menu"
          >
            {navItems.map((item) => (
              <button
                key={item.href}
                type="button"
                className={activeId === item.href.slice(1) ? 'mobile-link active' : 'mobile-link'}
                onClick={() => handleNavClick(item.href)}
              >
                {item.name}
              </button>
            ))}
            <a href="/resume.pdf" download className="primary-button mobile-download">
              <Download size={16} />
              Download Resume
            </a>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
