/* ============================================================
   PORTFOLIO SCRIPT
   Emmanuel Yeboah — mannyyebz-portfolio
   ============================================================ */

/* ---- 1. NAVBAR: add 'scrolled' class on scroll ---- */
(function () {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = () => {
    if (window.scrollY > 24) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
})();

/* ---- 2. MOBILE NAV: toggle open/close ---- */
(function () {
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile nav when a link is clicked
  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

/* ---- 3. SKILL BARS: animate in when section scrolls into view ---- */
(function () {
  const skillFills = document.querySelectorAll('.skill-fill');
  if (!skillFills.length) return;

  // Store the target widths set in HTML, reset to 0 initially
  const targets = Array.from(skillFills).map(el => el.style.width);
  skillFills.forEach(el => { el.style.width = '0'; });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animate all bars when the skills section enters the viewport
        skillFills.forEach((el, i) => {
          // Small stagger per bar
          setTimeout(() => {
            el.style.width = targets[i];
          }, i * 60);
        });
        observer.disconnect(); // only animate once
      }
    });
  }, { threshold: 0.2 });

  const skillsSection = document.getElementById('skills');
  if (skillsSection) observer.observe(skillsSection);
})();

/* ---- 4. FADE-IN SECTIONS: subtle entrance animation ---- */
(function () {
  // Inject keyframe animation into the document
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .fade-in-section {
      opacity: 0;
    }
    .fade-in-section.visible {
      animation: fadeUp 0.55s ease forwards;
    }
  `;
  document.head.appendChild(style);

  // Add class to target elements
  const targets = document.querySelectorAll(
    '.about-card, .project-card, .media-card, .skill-group, .contact-link'
  );

  targets.forEach(el => el.classList.add('fade-in-section'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => observer.observe(el));
})();

/* ---- 5. ACTIVE NAV LINK: highlight current section ---- */
(function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  if (!sections.length || !navLinks.length) return;

  const setActive = () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 90;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.style.fontWeight = link.getAttribute('href') === `#${current}` ? '700' : '500';
      link.style.color = link.getAttribute('href') === `#${current}` ? '#0a0a0a' : '';
    });
  };

  window.addEventListener('scroll', setActive, { passive: true });
})();
