(function () {
  'use strict';

  var header = document.querySelector('.site-header');
  var hamburger = document.querySelector('.hamburger');
  var drawer = document.querySelector('.mobile-drawer');
  var overlay = document.querySelector('.mobile-drawer-overlay');
  var drawerClose = document.querySelector('.drawer-close');
  var drawerLinks = document.querySelectorAll('.mobile-nav a');

  var scrollThreshold = 80;

  window.addEventListener('scroll', function () {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  function openDrawer() {
    drawer.classList.add('open');
    overlay.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    drawerClose.focus();
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    hamburger.focus();
  }

  hamburger.addEventListener('click', function () {
    var isOpen = hamburger.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  drawerClose.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);

  for (var i = 0; i < drawerLinks.length; i++) {
    drawerLinks[i].addEventListener('click', closeDrawer);
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  // Scroll-triggered reveal animations
  var revealTargets = [
    { selector: '.hero h1', stagger: false },
    { selector: '.hero .lead', stagger: false },
    { selector: '.hero-ctas', stagger: false },
    { selector: '.section h2', stagger: false },
    { selector: '.section .section-lead', stagger: false },
    { selector: '.offering-card', stagger: true },
    { selector: '.stat', stagger: true },
    { selector: '.case-card', stagger: true },
    { selector: '.team-copy', stagger: false },
    { selector: '.map-container', stagger: false },
    { selector: '.flags-grid', stagger: false },
    { selector: '.careers p', stagger: false },
    { selector: '.careers .cta-secondary', stagger: false },
    { selector: '.final-cta h2', stagger: false },
    { selector: '.final-cta p', stagger: false },
    { selector: '.final-cta .cta-primary--inverse', stagger: false }
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

          // For staggered items, find siblings and stagger
          var parent = el.parentElement;
          var siblings = parent ? parent.querySelectorAll(':scope > .reveal:not(.visible)') : [];
          var isGridChild = parent && (
            parent.classList.contains('offerings-grid') ||
            parent.classList.contains('team-stats') ||
            parent.classList.contains('cases-grid')
          );

          if (isGridChild && siblings.length > 0) {
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
