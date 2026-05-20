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
    hamburger.style.display = 'none';
    navClose.focus();
  }

  function closeMenu() {
    navMenu.classList.remove('open');
    overlay.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.style.display = '';
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
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  if (currentPage === '') currentPage = 'index.html';
  navLinks.forEach(function (link) {
    var linkHref = link.getAttribute('href').split('/').pop() || 'index.html';
    if (currentPage === linkHref || currentPage.replace('.html', '') === linkHref.replace('.html', '')) {
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
    { selector: '.services-detail-header', stagger: false },
    { selector: '.difference-text', stagger: false },
    { selector: '.difference-image', stagger: false },
    { selector: '.value-item', stagger: true },
    { selector: '.values-closing', stagger: false },
    { selector: '.asset-tag', stagger: true },
    { selector: '.strength-item', stagger: true },
    { selector: '.approach-item', stagger: true },
    { selector: '.case-list-item', stagger: true },
    { selector: '.principle-item', stagger: true },
    { selector: '.solution-item', stagger: true },
    { selector: '.career-links-grid', stagger: false }
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
            parent.classList.contains('cases-list') ||
            parent.classList.contains('services-detail-grid') ||
            parent.classList.contains('locations-grid') ||
            parent.classList.contains('values-grid') ||
            parent.classList.contains('asset-classes') ||
            parent.classList.contains('strengths-grid') ||
            parent.classList.contains('approach-grid') ||
            parent.classList.contains('principles-grid') ||
            parent.classList.contains('solutions-list')
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

  // Before/After comparison toggle for case study pages
  document.querySelectorAll('.case-comparison-switcher').forEach(function (switcher) {
    var btns = switcher.querySelectorAll('.case-comparison-btn');
    var container = switcher.parentElement.querySelector('.case-comparison-content');
    var imgs = container.querySelectorAll('.case-comparison-img');
    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = btn.getAttribute('data-target');
        btns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        imgs.forEach(function (img) {
          if (img.getAttribute('data-state') === target) {
            img.classList.remove('hidden');
          } else {
            img.classList.add('hidden');
          }
        });
      });
    });
  });
})();
