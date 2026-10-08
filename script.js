/* =====================================================
   THE LENSES — HOMEPAGE JAVASCRIPT
   PART 1 / 3
===================================================== */

"use strict";


/* =====================================================
   DOM ELEMENTS
====================================================== */

const header = document.getElementById("site-header");

const menuButton = document.querySelector(".menu-button");

const mobileMenu = document.getElementById("mobile-menu");

const mobileLinks =
    document.querySelectorAll(".mobile-menu a");

const preloader =
    document.querySelector(".preloader");


/* =====================================================
   HEADER SCROLL EFFECT
====================================================== */

function handleHeaderScroll() {

    if (!header) return;

    if (window.scrollY > 35) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}


window.addEventListener(
    "scroll",
    handleHeaderScroll,
    { passive: true }
);


handleHeaderScroll();


/* =====================================================
   MOBILE MENU
====================================================== */

function openMenu() {

    if (!menuButton || !mobileMenu) return;

    menuButton.classList.add("active");

    mobileMenu.classList.add("open");

    menuButton.setAttribute(
        "aria-expanded",
        "true"
    );

    mobileMenu.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add("menu-open");

}


function closeMenu() {

    if (!menuButton || !mobileMenu) return;

    menuButton.classList.remove("active");

    mobileMenu.classList.remove("open");

    menuButton.setAttribute(
        "aria-expanded",
        "false"
    );

    mobileMenu.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove("menu-open");

}


function toggleMenu() {

    if (!mobileMenu) return;

    if (mobileMenu.classList.contains("open")) {

        closeMenu();

    } else {

        openMenu();

    }

}


if (menuButton) {

    menuButton.addEventListener(
        "click",
        toggleMenu
    );

}


/* =====================================================
   CLOSE MOBILE MENU ON LINK CLICK
====================================================== */

mobileLinks.forEach(function(link) {

    link.addEventListener(
        "click",
        function() {

            closeMenu();

        }
    );

});


/* =====================================================
   ESCAPE KEY
====================================================== */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            closeMenu();

        }

    }
);


/* =====================================================
   PREVENT MENU FROM STAYING OPEN ON DESKTOP
====================================================== */

window.addEventListener(
    "resize",
    function() {

        if (window.innerWidth >= 1000) {

            closeMenu();

        }

    },
    { passive: true }
);
/* =====================================================
   THE LENSES — HOMEPAGE JAVASCRIPT
   PART 2 / 3
===================================================== */


/* =====================================================
   SMOOTH INTERNAL LINKS
====================================================== */

const internalLinks =
    document.querySelectorAll(
        'a[href^="#"]'
    );


internalLinks.forEach(function(link) {

    link.addEventListener(
        "click",
        function(event) {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {

                return;

            }


            const target =
                document.querySelector(targetId);


            if (!target) {

                return;

            }


            event.preventDefault();


            closeMenu();


            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;


            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;


            window.scrollTo({

                top: targetPosition,

                behavior:
                    window.matchMedia(
                        "(prefers-reduced-motion: reduce)"
                    ).matches
                        ? "auto"
                        : "smooth"

            });

        }
    );

});


/* =====================================================
   BACK TO TOP
====================================================== */

const backTop =
    document.querySelector(".back-top");


if (backTop) {

    backTop.addEventListener(
        "click",
        function(event) {

            event.preventDefault();


            window.scrollTo({

                top: 0,

                behavior:
                    window.matchMedia(
                        "(prefers-reduced-motion: reduce)"
                    ).matches
                        ? "auto"
                        : "smooth"

            });

        }
    );

}


/* =====================================================
   CURRENT YEAR
====================================================== */

const yearElement =
    document.getElementById(
        "current-year"
    );


if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


/* =====================================================
   PRELOADER
====================================================== */

function removePreloader() {

    if (!preloader) return;

    preloader.classList.add(
        "preloader-finished"
    );


    window.setTimeout(
        function() {

            if (preloader) {

                preloader.remove();

            }

        },
        900
    );

}


if (document.readyState === "complete") {

    window.setTimeout(
        removePreloader,
        700
    );

} else {

    window.addEventListener(
        "load",
        function() {

            window.setTimeout(
                removePreloader,
                350
            );

        },
        { once: true }
    );

}


/* =====================================================
   EXTERNAL LINKS
====================================================== */

const externalLinks =
    document.querySelectorAll(
        'a[target="_blank"]'
    );


externalLinks.forEach(function(link) {

    link.addEventListener(
        "click",
        function() {

            link.setAttribute(
                "rel",
                "noopener noreferrer"
            );

        }
    );

});


/* =====================================================
   IMAGE LOADING CHECK
====================================================== */

const images =
    document.querySelectorAll("img");


images.forEach(function(image) {

    image.addEventListener(
        "error",
        function() {

            image.classList.add(
                "image-error"
            );

            console.warn(
                "The Lenses: Image could not be loaded:",
                image.src
            );

        }
    );

});
/* =====================================================
   THE LENSES — HOMEPAGE JAVASCRIPT
   PART 3 / 3
===================================================== */


/* =====================================================
   CONTACT / CTA TRACKING
====================================================== */

const actionLinks =
    document.querySelectorAll(
        'a[href^="tel:"], ' +
        'a[href^="mailto:"], ' +
        'a[href*="wa.me"], ' +
        'a[href*="instagram.com"], ' +
        'a[href*="maps.google.com"]'
    );


actionLinks.forEach(function(link) {

    link.addEventListener(
        "click",
        function() {

            const destination =
                link.getAttribute("href");

            console.info(
                "The Lenses action:",
                destination
            );

        }
    );

});


/* =====================================================
   MOBILE MENU — FOCUS SAFETY
====================================================== */

if (menuButton && mobileMenu) {

    mobileMenu.addEventListener(
        "click",
        function(event) {

            if (
                event.target === mobileMenu
            ) {

                closeMenu();

            }

        }
    );

}


/* =====================================================
   ORIENTATION / RESIZE SAFETY
====================================================== */

let resizeTimer;


window.addEventListener(
    "resize",
    function() {

        window.clearTimeout(
            resizeTimer
        );


        resizeTimer =
            window.setTimeout(
                function() {

                    if (
                        window.innerWidth >= 1000
                    ) {

                        closeMenu();

                    }

                },
                120
            );

    },
    { passive: true }
);


/* =====================================================
   VISIBILITY CHANGE
====================================================== */

document.addEventListener(
    "visibilitychange",
    function() {

        if (
            document.visibilityState ===
            "visible"
        ) {

            handleHeaderScroll();

        }

    }
);


/* =====================================================
   REDUCED MOTION DETECTION
====================================================== */

const reducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );


function handleMotionPreference() {

    if (reducedMotion.matches) {

        document.documentElement
            .classList.add(
                "reduced-motion"
            );

    } else {

        document.documentElement
            .classList.remove(
                "reduced-motion"
            );

    }

}


handleMotionPreference();


if (
    typeof reducedMotion.addEventListener ===
    "function"
) {

    reducedMotion.addEventListener(
        "change",
        handleMotionPreference
    );

}


/* =====================================================
   FINAL INITIALIZATION
====================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        handleHeaderScroll();

        console.info(
            "The Lenses — Premium Eyewear Website"
        );

    }
);


/* =====================================================
   END — THE LENSES
====================================================== */
