/* =========================================================
   THE LENSES — PREMIUM WEBSITE
   SCRIPT.JS — PART 1
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       ELEMENTS
    ========================= */

    const header = document.querySelector(".header");
    const menuButton = document.querySelector(".menu-button");
    const mobileMenu = document.querySelector(".mobile-menu");
    const mobileLinks = document.querySelectorAll(".mobile-menu a");
    const navLinks = document.querySelectorAll(".desktop-nav a");

    /* =========================
       HEADER SCROLL EFFECT
    ========================= */

    function handleHeaderScroll() {
        if (!header) return;

        if (window.scrollY > 60) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    handleHeaderScroll();

    window.addEventListener("scroll", handleHeaderScroll, {
        passive: true
    });


    /* =========================
       MOBILE MENU
    ========================= */

    function openMenu() {
        if (!mobileMenu) return;

        mobileMenu.classList.add("active");
        document.body.classList.add("menu-open");

        if (menuButton) {
            menuButton.classList.add("active");
            menuButton.setAttribute("aria-expanded", "true");
        }
    }

    function closeMenu() {
        if (!mobileMenu) return;

        mobileMenu.classList.remove("active");
        document.body.classList.remove("menu-open");

        if (menuButton) {
            menuButton.classList.remove("active");
            menuButton.setAttribute("aria-expanded", "false");
        }
    }

    function toggleMenu() {
        if (!mobileMenu) return;

        if (mobileMenu.classList.contains("active")) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    if (menuButton) {
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation menu");

        menuButton.addEventListener("click", toggleMenu);
    }

    mobileLinks.forEach(link => {
        link.addEventListener("click", () => {
            closeMenu();
        });
    });


    /* =========================
       ESCAPE KEY
    ========================= */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeMenu();
        }

    });


    /* =========================
       SMOOTH SCROLL
    ========================= */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const headerHeight = header
                ? header.offsetHeight
                : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =========================
       ACTIVE NAVIGATION
    ========================= */

    const sections = document.querySelectorAll("section[id]");

    function updateActiveNav() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop -
                (header ? header.offsetHeight : 0) -
                120;

            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (href === `#${currentSection}`) {
                link.classList.add("active");
            }

        });
    }

    updateActiveNav();

    window.addEventListener("scroll", updateActiveNav, {
        passive: true
    });


    /* =========================
       SCROLL REVEAL
    ========================= */

    const revealElements = document.querySelectorAll(
        ".section-heading, .intro-text, .category-card, .product-card, .about-image, .about-content, .service-item, .gallery-item, .testimonial-main, .location-content, .map-placeholder"
    );

    revealElements.forEach(element => {
        element.style.opacity = "0";
        element.style.transform = "translateY(35px)";
        element.style.transition =
            "opacity .8s ease, transform .8s cubic-bezier(.2,.7,.2,1)";
    });

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

                observer.unobserve(entry.target);

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -50px 0px"
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* =========================
       STAGGERED CARD ANIMATION
    ========================= */

    const animatedGroups = [
        ".category-grid",
        ".product-grid",
        ".gallery-grid",
        ".service-list"
    ];

    animatedGroups.forEach(selector => {

        const parent = document.querySelector(selector);

        if (!parent) return;

        const children = parent.children;

        Array.from(children).forEach((child, index) => {

            child.style.transitionDelay =
                `${Math.min(index * 0.08, 0.4)}s`;

        });

    });


    /* =========================
       IMAGE LOADING
    ========================= */

    const images = document.querySelectorAll("img");

    images.forEach(image => {

        image.addEventListener("load", () => {
            image.classList.add("loaded");
        });

        if (image.complete) {
            image.classList.add("loaded");
        }

    });


    /* =========================================================
       END OF PART 1
    ========================================================= */
});


/* =========================================================
   THE LENSES — PREMIUM WEBSITE
   SCRIPT.JS — PART 2
========================================================= */


/* =========================
   PRELOADER
========================= */

const preloader = document.querySelector(".preloader");

if (preloader) {

    window.addEventListener("load", () => {

        setTimeout(() => {
            preloader.classList.add("loaded");
        }, 900);

    });

}


/* =========================
   CURRENT YEAR
========================= */

const yearElements = document.querySelectorAll(".current-year");

yearElements.forEach(element => {
    element.textContent = new Date().getFullYear();
});


/* =========================
   BACK TO TOP
========================= */

const backToTop = document.querySelector(".back-to-top");

if (backToTop) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 600) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }

    }, {
        passive: true
    });

    backToTop.addEventListener("click", event => {

        event.preventDefault();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* =========================
   IMAGE ERROR HANDLING
========================= */

document.querySelectorAll("img").forEach(image => {

    image.addEventListener("error", () => {

        image.classList.add("image-error");

        console.warn(
            "The Lenses: Image could not be loaded:",
            image.src
        );

    });

});


/* =========================
   EXTERNAL LINKS
========================= */

document.querySelectorAll(
    'a[href^="http://"], a[href^="https://"]'
).forEach(link => {

    const currentHost = window.location.hostname;

    try {

        const linkHost =
            new URL(link.href).hostname;

        if (
            linkHost &&
            linkHost !== currentHost
        ) {
            link.setAttribute(
                "target",
                "_blank"
            );

            link.setAttribute(
                "rel",
                "noopener noreferrer"
            );
        }

    } catch (error) {
        console.warn(
            "Invalid external link:",
            link.href
        );
    }

});


/* =========================
   PHONE / WHATSAPP TRACKING
========================= */

document.querySelectorAll(
    'a[href^="tel:"], a[href*="wa.me"], a[href*="whatsapp"]'
).forEach(link => {

    link.addEventListener("click", () => {

        console.log(
            "The Lenses contact action:",
            link.href
        );

    });

});


/* =========================
   SIMPLE PARALLAX
========================= */

const heroImage = document.querySelector(".hero-image img");

if (heroImage && window.innerWidth > 700) {

    window.addEventListener("scroll", () => {

        const scrollPosition = window.scrollY;

        if (scrollPosition < window.innerHeight) {

            heroImage.style.transform =
                `scale(1.02) translateY(${scrollPosition * 0.08}px)`;

        }

    }, {
        passive: true
    });

}


/* =========================
   MOBILE MENU RESIZE FIX
========================= */

window.addEventListener("resize", () => {

    if (
        window.innerWidth > 1000 &&
        mobileMenu &&
        mobileMenu.classList.contains("active")
    ) {

        mobileMenu.classList.remove("active");
        document.body.classList.remove("menu-open");

        if (menuButton) {
            menuButton.classList.remove("active");
            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );
        }

    }

});


/* =========================
   REDUCED MOTION SUPPORT
========================= */

const prefersReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

if (prefersReducedMotion.matches) {

    document.documentElement.style.scrollBehavior =
        "auto";

    document.querySelectorAll("*").forEach(element => {

        element.style.animationDuration = "0s";
        element.style.transitionDuration = "0s";

    });

}


/* =========================
   CONSOLE BRANDING
========================= */

console.log(
    "%c THE LENSES ",
    "font-size:20px;font-weight:bold;"
);

console.log(
    "Premium Optical & Eyewear Experience"
);

console.log(
    "Website powered by Haven Websites."
);


/* =========================================================
   END OF SCRIPT.JS
========================================================= */
