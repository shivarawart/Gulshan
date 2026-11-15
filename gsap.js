/* =====================================
   ARTIST PORTFOLIO — GSAP ANIMATIONS
   ===================================== */

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const preloader = document.querySelector("#preloader");
  const navbar = document.querySelector(".nav-wrapper");
  const menuToggle = document.querySelector("#menu-toggle");
  const mobileMenu = document.querySelector("#mobile-menu");

  // FOOTER YEAR
  document.querySelector("#year").textContent = new Date().getFullYear();

  // =====================================
  // MOBILE NAVIGATION
  // =====================================

  function closeMobileMenu() {
    mobileMenu.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.innerHTML = '<i data-lucide="menu"></i>';
    lucide.createIcons();
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", String(isOpen));

    menuToggle.innerHTML = isOpen
      ? '<i data-lucide="x"></i>'
      : '<i data-lucide="menu"></i>';

    lucide.createIcons();
  });

  document.querySelectorAll("#mobile-menu a").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024) {
      closeMobileMenu();
    }
  });

  // =====================================
  // NAVBAR SCROLL EFFECT
  // =====================================

  function updateNavbar() {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", updateNavbar, {
    passive: true,
  });

  updateNavbar();

  // =====================================
  // SMOOTH ANCHOR SCROLLING
  // =====================================

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      closeMobileMenu();

      if (prefersReducedMotion) {
        target.scrollIntoView({
          behavior: "auto",
        });
        return;
      }

      gsap.to(window, {
        duration: 1.1,
        scrollTo: {
          y: target,
          offsetY: 75,
        },
        ease: "power3.inOut",
      });
    });
  });

  // =====================================
  // REDUCED MOTION FALLBACK
  // =====================================

  if (prefersReducedMotion) {
    gsap.set(
      ".hero-title, .hero-eyebrow, .hero-visual, .reveal-text, .about-card, .experience-item, .music-card, .teaching-row",
      {
        clearProps: "all",
      },
    );

    preloader.style.display = "none";

    return;
  }

  // =====================================
  // PRELOADER ANIMATION
  // =====================================

  const preloaderTimeline = gsap.timeline({
    onComplete: () => {
      preloader.style.display = "none";
      ScrollTrigger.refresh();
    },
  });

  preloaderTimeline
    .to("#preloader .font-display", {
      opacity: 0,
      y: -35,
      duration: 0.6,
      ease: "power3.in",
    })
    .to("#preloader", {
      yPercent: -100,
      duration: 0.9,
      ease: "power4.inOut",
    });

  // =====================================
  // HERO INTRODUCTION
  // =====================================

  const heroTimeline = gsap.timeline({
    delay: 1.3,
  });

  heroTimeline

    .from(".hero-eyebrow", {
      opacity: 0,
      y: 25,
      duration: 0.8,
      ease: "power3.out",
    })

    .from(
      ".hero-title span",
      {
        opacity: 0,
        y: 110,
        rotateX: -35,
        stagger: 0.17,
        duration: 1.1,
        ease: "power4.out",
      },
      "-=0.4",
    )

    .from(
      ".hero-title + div",
      {
        opacity: 0,
        y: 35,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.5",
    )

    .from(
      ".hero-visual",
      {
        opacity: 0,
        x: 70,
        scale: 0.9,
        duration: 1.3,
        ease: "power3.out",
      },
      "-=1",
    );

  // =====================================
  // HERO IMAGE PARALLAX
  // =====================================

  gsap.to(".hero-image", {
    yPercent: 10,
    ease: "none",
    scrollTrigger: {
      trigger: "#home",
      start: "top top",
      end: "bottom top",
      scrub: 1,
    },
  });

  // =====================================
  // MARQUEE
  // =====================================

  gsap.to(".marquee-track", {
    xPercent: -50,
    duration: 25,
    ease: "none",
    repeat: -1,
  });

  // =====================================
  // ABOUT SECTION
  // =====================================

  gsap.from(".reveal-text", {
    opacity: 0,
    y: 100,
    duration: 1.2,
    ease: "power4.out",
    scrollTrigger: {
      trigger: "#about",
      start: "top 75%",
    },
  });

  gsap.from(".about-card", {
    opacity: 0,
    y: 70,
    stagger: 0.2,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".about-card",
      start: "top 85%",
    },
  });

  // =====================================
  // EXPERIENCE SECTION
  // =====================================

  gsap.from(".experience-item", {
    opacity: 0,
    x: -80,
    stagger: 0.15,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".experience-list",
      start: "top 80%",
    },
  });

  // =====================================
  // MUSIC SECTION
  // =====================================

  gsap.from(".music-card", {
    opacity: 0,
    y: 90,
    scale: 0.95,
    stagger: 0.2,
    duration: 1.1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#music",
      start: "top 70%",
    },
  });

  // =====================================
  // TEACHING SECTION
  // =====================================

  gsap.from(".teaching-row", {
    opacity: 0,
    x: 70,
    stagger: 0.15,
    duration: 0.9,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#teaching",
      start: "top 70%",
    },
  });

  // =====================================
  // TESTIMONIAL SECTION
  // =====================================

  gsap.from("#testimonials blockquote", {
    opacity: 0,
    y: 80,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#testimonials",
      start: "top 75%",
    },
  });

  // =====================================
  // CONTACT SECTION
  // =====================================

  gsap.from("#contact h2", {
    opacity: 0,
    y: 100,
    duration: 1.3,
    ease: "power4.out",
    scrollTrigger: {
      trigger: "#contact",
      start: "top 75%",
    },
  });

  gsap.from("#contact .rounded-full", {
    opacity: 0,
    scale: 0.5,
    rotation: -35,
    duration: 1,
    ease: "back.out(1.7)",
    scrollTrigger: {
      trigger: "#contact",
      start: "top 70%",
    },
  });

  // =====================================
  // CUSTOM CURSOR
  // =====================================

  const cursor = document.querySelector(".custom-cursor");

  if (
    cursor &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches
  ) {
    const moveX = gsap.quickTo(cursor, "x", {
      duration: 0.25,
      ease: "power3",
    });

    const moveY = gsap.quickTo(cursor, "y", {
      duration: 0.25,
      ease: "power3",
    });

    window.addEventListener("mousemove", (event) => {
      moveX(event.clientX);
      moveY(event.clientY);
    });

    document.querySelectorAll("a, button").forEach((element) => {
      element.addEventListener("mouseenter", () => {
        gsap.to(cursor, {
          scale: 2.8,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      element.addEventListener("mouseleave", () => {
        gsap.to(cursor, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });
  }

  // =====================================
  // FINAL SCROLL REFRESH
  // =====================================

  window.addEventListener("load", () => {
    ScrollTrigger.refresh();
  });
});
