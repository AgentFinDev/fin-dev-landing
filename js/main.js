(function () {
  'use strict';

  var header = document.querySelector('.site-header');
  var hamburger = document.querySelector('.hamburger');
  var navMenu = document.querySelector('.nav-menu');
  var overlay = document.querySelector('.nav-menu-overlay');
  var navClose = document.querySelector('.nav-menu-close');
  var navLinks = document.querySelectorAll('.nav-menu-links a');

  var scrollThreshold = 80;

  window.addEventListener('scroll', function () {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  function openMenu() {
    navMenu.classList.add('open');
    overlay.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    navClose.focus();
  }

  function closeMenu() {
    navMenu.classList.remove('open');
    overlay.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    hamburger.focus();
  }

  hamburger.addEventListener('click', function () {
    var isOpen = hamburger.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  navClose.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      closeMenu();
    }
  });

  // Highlight active nav link based on current page
  var currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  navLinks.forEach(function (link) {
    var linkPath = link.getAttribute('href').replace(/\/$/, '') || '/';
    if (currentPath === linkPath || (currentPath.indexOf('.html') > -1 && currentPath.replace('.html', '') === linkPath)) {
      link.classList.add('active');
    }
  });

  // Scroll-triggered reveal animations
  var revealTargets = [
    { selector: '.hero h1', stagger: false },
    { selector: '.page-hero h1', stagger: false },
    { selector: '.section h2', stagger: false },
    { selector: '.section .section-lead', stagger: false },
    { selector: '.intro-text h2', stagger: false },
    { selector: '.intro-text p', stagger: false },
    { selector: '.intro-cta', stagger: false },
    { selector: '.stats-header', stagger: false },
    { selector: '.stats-text', stagger: false },
    { selector: '.stat-box', stagger: true },
    { selector: '.case-card', stagger: true },
    { selector: '.about-text', stagger: false },
    { selector: '.service-detail-item', stagger: true },
    { selector: '.location-item', stagger: true },
    { selector: '.world-map', stagger: false },
    { selector: '.contact-section h2', stagger: false },
    { selector: '.contact-section p', stagger: false },
    { selector: '.contact-section .cta-primary', stagger: false },
    { selector: '.careers-section h2', stagger: false },
    { selector: '.careers-section p', stagger: false },
    { selector: '.services-detail-header', stagger: false }
  ];

  revealTargets.forEach(function (target) {
    var elements = document.querySelectorAll(target.selector);
    elements.forEach(function (el) {
      el.classList.add('reveal');
    });
  });

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;

          var parent = el.parentElement;
          var isGridChild = parent && (
            parent.classList.contains('stats-numbers') ||
            parent.classList.contains('cases-grid') ||
            parent.classList.contains('services-detail-grid') ||
            parent.classList.contains('locations-grid')
          );

          if (isGridChild) {
            var siblings = parent.querySelectorAll(':scope > .reveal:not(.visible)');
            var visibleSiblings = [];
            siblings.forEach(function (sib) {
              if (!sib.classList.contains('visible')) {
                visibleSiblings.push(sib);
              }
            });
            visibleSiblings.forEach(function (sib, idx) {
              sib.style.transitionDelay = (idx * 0.1) + 's';
              sib.classList.add('visible');
            });
          } else {
            el.classList.add('visible');
          }
          observer.unobserve(el);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.reveal').forEach(function (el) {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('visible');
    });
  }
})();
