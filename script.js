/* ============================================================
   offline.translator landing page — script.js
   Pure vanilla JS, no dependencies. Handles:
   - FAQ accordion
   - Scroll-reveal animations
   - Smooth nav active state
============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     FAQ Accordion
  ---------------------------------------------------------- */
  function initFAQ() {
    var buttons = document.querySelectorAll('.faq-q');

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var expanded = btn.getAttribute('aria-expanded') === 'true';
        var targetId = btn.getAttribute('aria-controls');
        var answer = document.getElementById(targetId);

        if (!answer) return;

        if (expanded) {
          btn.setAttribute('aria-expanded', 'false');
          answer.hidden = true;
        } else {
          // Close all others
          buttons.forEach(function (other) {
            if (other !== btn) {
              other.setAttribute('aria-expanded', 'false');
              var otherId = other.getAttribute('aria-controls');
              var otherAnswer = document.getElementById(otherId);
              if (otherAnswer) otherAnswer.hidden = true;
            }
          });

          btn.setAttribute('aria-expanded', 'true');
          answer.hidden = false;
        }
      });
    });
  }

  /* ----------------------------------------------------------
     Scroll Reveal
  ---------------------------------------------------------- */
  function initReveal() {
    // Respect reduced-motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var targets = document.querySelectorAll(
      '.feature-card, .step, .demo-item, .usecase-card, .faq-item, .section-header'
    );

    targets.forEach(function (el, i) {
      el.classList.add('reveal');
      // Stagger siblings inside the same parent grid/list
      var siblings = el.parentElement ? el.parentElement.children : [];
      var index = Array.prototype.indexOf.call(siblings, el);
      if (index > 0 && index <= 4) {
        el.classList.add('reveal-delay-' + index);
      }
    });

    if (!('IntersectionObserver' in window)) {
      // Fallback: make everything visible immediately
      targets.forEach(function (el) { el.classList.add('visible'); });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    targets.forEach(function (el) { observer.observe(el); });
  }

  /* ----------------------------------------------------------
     Active nav link on scroll
  ---------------------------------------------------------- */
  function initNavHighlight() {
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    if (!sections.length || !navLinks.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            navLinks.forEach(function (link) {
              link.removeAttribute('aria-current');
              link.style.color = '';
            });
            var active = document.querySelector(
              '.nav-links a[href="#' + entry.target.id + '"]'
            );
            if (active) {
              active.setAttribute('aria-current', 'true');
              active.style.color = 'var(--text)';
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach(function (section) { observer.observe(section); });
  }

  /* ----------------------------------------------------------
     Init
  ---------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    initFAQ();
    initReveal();
    initNavHighlight();
  });

})();
