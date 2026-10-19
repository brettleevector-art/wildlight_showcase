/**
 * WILDLIGHT — Environmental Audio Intelligence
 * Static Showcase Interactive Client Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Scroll Progress Indicator & Header State
  const scrollProgress = document.getElementById('scroll-progress');
  const siteHeader = document.getElementById('site-header');

  const updateScrollProgress = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (scrollProgress) {
      scrollProgress.style.width = `${progress}%`;
    }

    if (siteHeader) {
      if (scrollTop > 20) {
        siteHeader.classList.add('is-scrolled');
      } else {
        siteHeader.classList.remove('is-scrolled');
      }
    }
  };

  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();

  // 2. Active Section Scroll Spy
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-desktop .nav-link');

  const updateActiveNav = () => {
    const scrollPosition = (window.scrollY || document.documentElement.scrollTop) + 120;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('is-active');
          } else {
            link.classList.remove('is-active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  // 3. Mobile Navigation Drawer
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileNav = document.getElementById('mobile-nav');

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', String(!isExpanded));
      mobileNav.hidden = isExpanded;
    });

    // Close mobile nav when clicking any nav link
    const mobileLinks = mobileNav.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileNav.hidden = true;
      });
    });
  }

  // 4. Code Snippet Copy-to-Clipboard
  const copyButtons = document.querySelectorAll('.copy-btn');
  const toast = document.getElementById('toast');
  let toastTimeout = null;

  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;

    if (toastTimeout) {
      clearTimeout(toastTimeout);
    }

    toastTimeout = setTimeout(() => {
      toast.hidden = true;
    }, 2400);
  };

  copyButtons.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const textToCopy = btn.getAttribute('data-clipboard');
      if (!textToCopy) return;

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(textToCopy);
        } else {
          // Fallback for non-https or restricted environments
          const textArea = document.createElement('textarea');
          textArea.value = textToCopy;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          textArea.style.top = '-999999px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
        }

        const originalHTML = btn.innerHTML;
        btn.innerHTML = `
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8.5L6.5 12L13 4" stroke="#529E72" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span style="color: #529E72;">Copied!</span>
        `;
        showToast(`Copied: ${textToCopy}`);

        setTimeout(() => {
          btn.innerHTML = originalHTML;
        }, 2000);
      } catch (err) {
        showToast('Failed to copy to clipboard');
      }
    });
  });

  // 5. Chart Lightbox Modal
  const modal = document.getElementById('chart-modal');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalClose = document.getElementById('modal-close');
  const modalImage = document.getElementById('modal-image');
  const modalCaption = document.getElementById('modal-caption');

  const chartInfo = {
    model_comparison_fold5: {
      src: 'assets/model_comparison_fold5.png',
      alt: 'Fold-5 Model Comparison: Baseline CNN (46.50%), CNN + SpecAugment (37.50%), ResNet18 (68.25%), ResNet18 Best (76.75% diagnostic)',
      title: 'Figure 1: Initial Single-Split Comparison (Validation Fold 5)',
    },
    resnet18_five_fold_cv: {
      src: 'assets/resnet18_five_fold_cv.png',
      alt: 'ResNet18 Five-Fold Cross-Validation: Fold 1 (71.50%), Fold 2 (78.75%), Fold 3 (73.00%), Fold 4 (80.75%), Fold 5 (74.75%), Mean (75.75%)',
      title: 'Figure 2: ResNet18 Five-Fold Cross-Validation on ESC-50',
    },
  };

  const openModal = (targetKey) => {
    const data = chartInfo[targetKey];
    if (!data || !modal || !modalImage || !modalCaption) return;

    modalImage.src = data.src;
    modalImage.alt = data.alt;
    modalCaption.textContent = data.title;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    modalClose?.focus();
  };

  const closeModal = () => {
    if (!modal) return;
    modal.hidden = true;
    document.body.style.overflow = '';
  };

  // Open modal from buttons or image click
  document.querySelectorAll('.zoom-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const target = btn.getAttribute('data-target');
      if (target) openModal(target);
    });
  });

  document.querySelectorAll('.chart-frame').forEach((frame) => {
    frame.addEventListener('click', () => {
      const img = frame.querySelector('img');
      if (img && img.src.includes('model_comparison_fold5')) {
        openModal('model_comparison_fold5');
      } else if (img && img.src.includes('resnet18_five_fold_cv')) {
        openModal('resnet18_five_fold_cv');
      }
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && !modal.hidden) {
      closeModal();
    }
  });
});
