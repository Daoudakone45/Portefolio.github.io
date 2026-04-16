// Toggle Mobile Menu
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}

// Close mobile menu when clicking a link
document.querySelectorAll('#mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    if (mobileMenu) {
      mobileMenu.classList.add('hidden');
    }
  });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (menuToggle && mobileMenu && !menuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
    mobileMenu.classList.add('hidden');
  }
});

// Contact Form Handling with EmailJS
const contactForm = document.getElementById('contact-form') || document.getElementById('contactForm');

if (contactForm) {
  const submitBtn = contactForm.querySelector('button[type="submit"]');

  if (typeof emailjs !== 'undefined' && emailjs.init) {
    emailjs.init('rGQl4zVnYipR1qDVU');
  }

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (typeof emailjs === 'undefined') {
      alert('EmailJS n\'est pas chargé. Vérifie le script de la librairie dans index.html.');
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Envoi en cours...';
    }

    emailjs.sendForm('Daoudakone45@', 'template_x3a3fdq', contactForm)
      .then(() => {
        alert('Message envoyé ✅');
        contactForm.reset();
      })
      .catch((err) => {
        console.error('EmailJS error:', err);
        alert('Erreur envoi, réessaye plus tard.');
      })
      .finally(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Envoyer Mon Message';
        }
      });
  });
}

// Intersection Observer for fade-in animations on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all article sections
document.querySelectorAll('section').forEach(section => {
  if (section.id !== 'accueil') {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.8s ease-in-out';
    observer.observe(section);
  }
});

// Smooth scroll for navigation links with offset
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        const offset = 80; // Height of fixed nav
        const elementPosition = element.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      }
    }
  });
});

// Add scroll effect to navbar
const navbar = document.querySelector('nav');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  
  // Add shadow on scroll
  if (navbar && currentScrollY > 50) {
    navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
  } else if (navbar) {
    navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
  }
  
  lastScrollY = currentScrollY;
});

// Progress bar animation on skills section (if visible)
const animateProgressBars = () => {
  const progressBars = document.querySelectorAll('.progress-bar');
  const skillsSection = document.querySelector('#skills');
  
  if (!skillsSection) return;
  
  const observerSkills = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        progressBars.forEach(bar => {
          const width = bar.style.width;
          bar.style.width = '0';
          setTimeout(() => {
            bar.style.transition = 'width 1.5s ease-in-out';
            bar.style.width = width;
          }, 100);
        });
        observerSkills.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  observerSkills.observe(skillsSection);
};

animateProgressBars();

// Portfolio filter and modal
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const projectModal = document.getElementById('project-modal');
const projectModalTitle = document.getElementById('project-modal-title');
const projectModalContent = document.getElementById('project-modal-content');
const projectModalClose = document.getElementById('project-modal-close');
const projectModalBackdrop = document.getElementById('project-modal-backdrop');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;

    filterButtons.forEach(btn => {
      btn.classList.remove('active', 'bg-purple-600', 'text-white');
      btn.classList.add('bg-slate-100', 'text-slate-700');
    });

    button.classList.add('active', 'bg-purple-600', 'text-white');
    button.classList.remove('bg-slate-100', 'text-slate-700');

    projectCards.forEach(card => {
      const category = card.dataset.category;
      if (filter === 'all' || category === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

document.querySelectorAll('.open-project-popup').forEach(button => {
  button.addEventListener('click', () => {
    const card = button.closest('.project-card');
    if (!card || !projectModal || !projectModalTitle || !projectModalContent) {
      return;
    }

    const title = card.querySelector('h3')?.textContent || 'Projet';
    const details = card.querySelector('.project-details')?.innerHTML || '<p>Aucun detail disponible.</p>';

    projectModalTitle.textContent = title;
    projectModalContent.innerHTML = details;
    projectModal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  });
});

const closeProjectModal = () => {
  if (!projectModal) {
    return;
  }
  projectModal.classList.add('hidden');
  document.body.classList.remove('overflow-hidden');
};

if (projectModalClose) {
  projectModalClose.addEventListener('click', closeProjectModal);
}

if (projectModalBackdrop) {
  projectModalBackdrop.addEventListener('click', closeProjectModal);
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeProjectModal();
  }
});

// Console message
console.log('%cBienvenue sur mon portfolio!', 'color: #667eea; font-size: 16px; font-weight: bold;');
console.log('%cCode avec Tailwind CSS', 'color: #764ba2; font-size: 14px;');
