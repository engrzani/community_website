/* ============================================================
   main.js — Shared JavaScript for HelpingHands Network
   Custom-written JS for interactivity across all pages.
   ============================================================ */

// ---- Mobile Hamburger Menu Toggle ----
document.addEventListener('DOMContentLoaded', function () {

  var hamburger = document.querySelector('.hamburger');
  var navLinks  = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      navLinks.classList.toggle('open');
      // Toggle aria-expanded for accessibility
      var expanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', String(!expanded));
    });
  }

  // ---- Active Nav Link Highlight ----
  // Highlights the nav link that matches the current page filename.
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  var links = document.querySelectorAll('.nav-links a');
  links.forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

  // ---- Scroll-to-Top Button ----
  var scrollBtn = document.querySelector('.scroll-top');
  if (scrollBtn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        scrollBtn.classList.add('visible');
      } else {
        scrollBtn.classList.remove('visible');
      }
    });
    scrollBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---- Fade-in on Scroll (Intersection Observer) ----
  // Intersection Observer approach adapted from MDN Web Docs.
  // Source: https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver
  var fadeEls = document.querySelectorAll('.fade-in');
  if ('IntersectionObserver' in window && fadeEls.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    fadeEls.forEach(function (el) {
      observer.observe(el);
    });
  }

  // ---- Gallery Lightbox Modal ----
  var galleryItems = document.querySelectorAll('.gallery-item img');
  var modal        = document.querySelector('.modal-overlay');
  var modalImg     = modal ? modal.querySelector('img') : null;
  var modalClose   = modal ? modal.querySelector('.modal-close') : null;

  if (galleryItems.length && modal && modalImg) {
    galleryItems.forEach(function (img) {
      img.addEventListener('click', function () {
        modalImg.src = this.src;
        modalImg.alt = this.alt;
        modal.classList.add('active');
      });
    });

    // Close modal
    if (modalClose) {
      modalClose.addEventListener('click', function () {
        modal.classList.remove('active');
      });
    }
    modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
      }
    });
  }

  // ---- Skill Request Form Handler ----
  var requestForm = document.querySelector('.request-form');
  if (requestForm) {
    requestForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = requestForm.querySelector('input[type="text"]');
      if (input && input.value.trim() !== '') {
        alert('Thank you! We have received your request for: ' + input.value.trim());
        input.value = '';
      } else {
        alert('Please enter a skill you would like to learn.');
      }
    });
  }

  // ---- Join / Contact Form Validation ----
  var joinForm = document.getElementById('join-form');
  if (joinForm) {
    joinForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var name    = document.getElementById('name');
      var email   = document.getElementById('email');
      var message = document.getElementById('message');
      var valid   = true;

      // Simple validation
      if (!name || name.value.trim() === '') {
        valid = false;
        highlightField(name);
      }
      if (!email || !isValidEmail(email.value)) {
        valid = false;
        highlightField(email);
      }

      if (valid) {
        alert('Thank you for joining HelpingHands Network, ' + name.value.trim() + '! We will be in touch soon.');
        joinForm.reset();
        // Remove any remaining highlights
        removeHighlights();
      }
    });
  }

  // ---- Book Session Button Handler ----
  var bookButtons = document.querySelectorAll('.btn-book');
  bookButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var skillName = this.closest('.skill-card-body') ?
                      this.closest('.skill-card-body').querySelector('h3').textContent :
                      'this skill';
      alert('Great choice! You have expressed interest in booking a session for: ' + skillName + '. We will connect you with a neighbor soon!');
    });
  });

  // ---- Smooth Scroll for Anchor Links ----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});

/* Helper: validate email format.
   Regex pattern adapted from Stack Overflow answer by Squirtle.
   Source: https://stackoverflow.com/a/9204568 */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* Helper: highlight invalid field */
function highlightField(field) {
  if (field) {
    field.style.borderColor = '#c0392b';
    field.addEventListener('input', function handler() {
      field.style.borderColor = '';
      field.removeEventListener('input', handler);
    });
  }
}

/* Helper: remove all highlights */
function removeHighlights() {
  document.querySelectorAll('.form-group input, .form-group textarea, .form-group select').forEach(function (el) {
    el.style.borderColor = '';
  });
}
