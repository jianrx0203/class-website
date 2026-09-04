/**
 * ==========================================
 * 資二丙班級資訊站 - 動畫引擎 (animations.js)
 * 使用 Anime.js v4 + Motion 實現微交互
 * ==========================================
 */

(function() {
  'use strict';

  // Respect reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /**
   * Page Load Animation (Motion)
   */
  function initPageLoad() {
    if (prefersReducedMotion) return;
    if (typeof Motion === 'undefined') return;

    Motion.animate('.app-container', {
      opacity: [0, 1],
      y: [16, 0]
    }, {
      duration: 0.5,
      ease: 'easeOut'
    });
  }

  /**
   * Scroll Reveal (Anime.js Scroll Observer)
   */
  function initScrollReveal() {
    if (prefersReducedMotion) return;
    if (typeof anime === 'undefined') return;

    const targets = document.querySelectorAll(
      '.feature-card, .announcement-card, .guide-card, .event-item, .faq-item, .rule-link-card, .reg-card, .day-group-box, .section-title, .home-quick-info'
    );

    targets.forEach(el => {
      el.classList.add('reveal');
    });

    targets.forEach((el, i) => {
      const scope = anime.createScope({
        target: el
      });

      scope.add(() => {
        anime.onScroll({
          target: el,
          onEnter: () => {
            anime.animate(el, {
              opacity: [0, 1],
              y: [24, 0]
            }, {
              duration: 0.5,
              delay: (i % 4) * 0.08,
              ease: 'easeOut'
            });
          }
        });
      });
    });
  }

  /**
   * Card Hover Effects (Motion)
   */
  function initCardHover() {
    if (prefersReducedMotion) return;
    if (typeof Motion === 'undefined') return;

    const cards = document.querySelectorAll('.feature-card, .quick-action-card, .guide-card');

    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        Motion.animate(card, {
          y: -4,
          boxShadow: '0 12px 32px rgba(0, 0, 0, 0.08)'
        }, {
          type: 'spring',
          stiffness: 300,
          damping: 20
        });
      });

      card.addEventListener('mouseleave', () => {
        Motion.animate(card, {
          y: 0,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
        }, {
          type: 'spring',
          stiffness: 300,
          damping: 20
        });
      });

      card.addEventListener('mousedown', () => {
        Motion.animate(card, {
          scale: 0.98
        }, { duration: 0.1 });
      });

      card.addEventListener('mouseup', () => {
        Motion.animate(card, {
          scale: 1
        }, {
          type: 'spring',
          stiffness: 400,
          damping: 15
        });
      });
    });
  }

  /**
   * Icon Bounce on Hover (Motion)
   */
  function initIconBounce() {
    if (prefersReducedMotion) return;
    if (typeof Motion === 'undefined') return;

    const cards = document.querySelectorAll('.feature-card');

    cards.forEach(card => {
      const icon = card.querySelector('.feature-icon');
      if (!icon) return;

      card.addEventListener('mouseenter', () => {
        Motion.animate(icon, {
          y: [0, -6, -3, 0]
        }, {
          duration: 0.4,
          ease: 'easeOut'
        });
      });
    });
  }

  /**
   * Ripple Effect (Motion)
   */
  function initRipple() {
    if (prefersReducedMotion) return;
    if (typeof Motion === 'undefined') return;

    const targets = document.querySelectorAll('.feature-card, .quick-action-card, .guide-card, .tab-btn, .rule-link-card, .btn-reg-apply, .btn-go-leave');

    targets.forEach(el => {
      el.addEventListener('click', (e) => {
        const rect = el.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        const size = Math.max(rect.width, rect.height) * 2;
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
        ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
        el.appendChild(ripple);

        Motion.animate(ripple, {
          scale: [0, 4],
          opacity: [0.35, 0]
        }, {
          duration: 0.5,
          ease: 'easeOut',
          onComplete: () => ripple.remove()
        });
      });
    });
  }

  /**
   * Event Items Stagger (Anime.js Timeline)
   */
  function initEventStagger() {
    if (prefersReducedMotion) return;
    if (typeof anime === 'undefined') return;

    const items = document.querySelectorAll('.event-item');
    if (!items.length) return;

    const observer = new IntersectionObserver((entries) => {
      const visibleEntries = entries.filter(e => e.isIntersecting);
      if (visibleEntries.length === 0) return;

      const tl = anime.createTimeline();
      visibleEntries.forEach(({ target }, i) => {
        tl.add(target, {
          opacity: [0, 1],
          x: [-12, 0]
        }, i * 0.06);
      });

      observer.disconnect();
    }, { threshold: 0.05 });

    items.forEach(el => observer.observe(el));
  }

  /**
   * FAQ Accordion (Motion)
   */
  function initFaqAccordion() {
    if (prefersReducedMotion) return;
    if (typeof Motion === 'undefined') return;

    document.querySelectorAll('.faq-question-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const panel = item.querySelector('.faq-answer-panel');
        const isActive = item.classList.contains('active');

        if (!isActive) {
          item.classList.add('active');
          panel.style.display = 'block';
          Motion.animate(panel, {
            maxHeight: ['0px', '600px'],
            opacity: [0, 1]
          }, {
            duration: 0.3,
            ease: 'easeOut'
          });
        } else {
          Motion.animate(panel, {
            maxHeight: ['600px', '0px'],
            opacity: [1, 0]
          }, {
            duration: 0.3,
            ease: 'easeIn',
            onComplete: () => {
              item.classList.remove('active');
              panel.style.display = '';
            }
          });
        }
      });
    });
  }

  /**
   * Badge Pulse (Motion)
   */
  function initBadgePulse() {
    if (prefersReducedMotion) return;
    if (typeof Motion === 'undefined') return;

    document.querySelectorAll('.ann-date').forEach(badge => {
      badge.addEventListener('mouseenter', () => {
        Motion.animate(badge, {
          scale: [1, 1.08, 1]
        }, {
          duration: 0.6,
          ease: 'easeInOut'
        });
      });
    });
  }

  /**
   * Toast Notifications (Motion)
   */
  function initToast() {
    if (typeof Motion === 'undefined') return;

    window.showToast = function(message, type = 'info') {
      const toast = document.createElement('div');
      toast.className = `toast toast-${type}`;
      toast.textContent = message;
      document.body.appendChild(toast);

      Motion.animate(toast, {
        opacity: [0, 1],
        y: [20, 0]
      }, {
        duration: 0.35,
        ease: 'easeOut'
      });

      setTimeout(() => {
        Motion.animate(toast, {
          opacity: [1, 0],
          y: [0, 20]
        }, {
          duration: 0.3,
          ease: 'easeIn',
          onComplete: () => toast.remove()
        });
      }, 3000);
    };
  }

  /**
   * Title Shimmer (Motion)
   */
  function initTitleShimmer() {
    if (prefersReducedMotion) return;
    if (typeof Motion === 'undefined') return;

    const title = document.querySelector('.site-title');
    if (!title) return;

    title.addEventListener('mouseenter', () => {
      Motion.animate(title, {
        backgroundPosition: ['200% center', '-200% center']
      }, {
        duration: 1.5,
        ease: 'easeInOut'
      });
    });
  }

  /**
   * Skeleton Shimmer (Motion)
   */
  function initSkeletonShimmer() {
    if (typeof Motion === 'undefined') return;

    const skeletons = document.querySelectorAll('.skeleton');
    if (!skeletons.length) return;

    skeletons.forEach(el => {
      Motion.animate(el, {
        backgroundPosition: ['200% 0', '-200% 0']
      }, {
        duration: 1.5,
        repeat: Infinity,
        ease: 'linear'
      });
    });
  }

  /**
   * Back to Top Button (Motion)
   */
  function initBackToTop() {
    const btn = document.createElement('button');
    btn.className = 'back-to-top';
    btn.innerHTML = '↑';
    btn.setAttribute('aria-label', '回到頂部');
    btn.setAttribute('type', 'button');
    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /**
   * Initialize All Animations
   */
  function initAllAnimations() {
    initPageLoad();
    initScrollReveal();
    initCardHover();
    initIconBounce();
    initRipple();
    initEventStagger();
    initFaqAccordion();
    initBadgePulse();
    initToast();
    initTitleShimmer();
    initSkeletonShimmer();
    initBackToTop();
  }

  // Expose for external use
  window.initAllAnimations = initAllAnimations;

  // Auto-init when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllAnimations);
  } else {
    initAllAnimations();
  }

})();
