
document.addEventListener("DOMContentLoaded", () => {

  // MOBILE NAVIGATION
  const menuToggle = document.getElementById("menuToggle");
  const nav = document.getElementById("nav");

  function closeMenu() {
    nav.classList.remove("open");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    document.body.classList.remove("no-scroll");
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");

    menuToggle.classList.toggle("active", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );

    document.body.classList.toggle("no-scroll", isOpen);
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  document.addEventListener("click", event => {
    if (
      nav.classList.contains("open") &&
      !nav.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1000) {
      closeMenu();
    }
  });

  // HEADER BACKGROUND ON SCROLL
  const header = document.getElementById("header");

  function updateHeader() {
    header.classList.toggle("scrolled", window.scrollY > 30);
  }

  window.addEventListener("scroll", updateHeader, {
    passive: true
  });

  updateHeader();

  // SCROLL REVEAL ANIMATIONS
  const elements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08
    });

    elements.forEach(element => observer.observe(element));
  } else {
    elements.forEach(element => {
      element.classList.add("visible");
    });
  }

  // ACTIVE NAVIGATION LINK
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const id = entry.target.id;

        navLinks.forEach(link => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + id
          );
        });
      });
    }, {
      rootMargin: "-35% 0px -55% 0px"
    });

    sections.forEach(section => {
      sectionObserver.observe(section);
    });
  }

  // PAUSE OTHER VIDEOS WHEN ONE PLAYS
  const videos = document.querySelectorAll(".video-frame video");

  videos.forEach(video => {
    video.addEventListener("play", () => {
      videos.forEach(otherVideo => {
        if (otherVideo !== video) {
          otherVideo.pause();
        }
      });
    });
  });

  // COPYRIGHT YEAR
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

});
