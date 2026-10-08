/* =========================================================
   THE LENSES — COLLECTION JS
   PART 1/3
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const header = document.querySelector(".header");
    const menuButton = document.querySelector(".menu-button");
    const mobileMenu = document.querySelector("#mobile-menu");
    const mobileLinks = document.querySelectorAll(
        "#mobile-menu a"
    );

    const filterButtons = document.querySelectorAll(
        ".filter-button"
    );

    const productCards = document.querySelectorAll(
        ".product-card"
    );

    const backTop = document.querySelector(".back-top");

    const currentYear = document.querySelector(
        "#current-year"
    );


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    /* =====================================================
       HEADER SCROLL EFFECT
    ===================================================== */

    const updateHeader = () => {

        if (!header) return;

        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    };

    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const openMenu = () => {

        if (!menuButton || !mobileMenu) return;

        menuButton.classList.add("active");
        mobileMenu.classList.add("active");

        menuButton.setAttribute(
            "aria-expanded",
            "true"
        );

        mobileMenu.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "menu-open"
        );

    };


    const closeMenu = () => {

        if (!menuButton || !mobileMenu) return;

        menuButton.classList.remove("active");
        mobileMenu.classList.remove("active");

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        mobileMenu.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "menu-open"
        );

    };


    const toggleMenu = () => {

        if (
            mobileMenu &&
            mobileMenu.classList.contains("active")
        ) {
            closeMenu();
        } else {
            openMenu();
        }

    };


    if (menuButton) {

        menuButton.addEventListener(
            "click",
            toggleMenu
        );

    }


    /* =====================================================
       MOBILE NAVIGATION LINKS
    ===================================================== */

    mobileLinks.forEach(link => {

        link.addEventListener(
            "click",
            () => {
                closeMenu();
            }
        );

    });


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {
                closeMenu();
            }

        }
    );


    /* =====================================================
       RESIZE HANDLING
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 899
            ) {
                closeMenu();
            }

        }
    );


    /* =====================================================
       BODY SCROLL LOCK
    ===================================================== */

    const style = document.createElement(
        "style"
    );

    style.textContent = `
        body.menu-open {
            overflow: hidden;
        }
    `;

    document.head.appendChild(style);

});

/* =========================================================
   THE LENSES — COLLECTION JS
   PART 2/3
========================================================= */


/* =========================================================
   COLLECTION FILTERS
========================================================= */

const filterButtons = document.querySelectorAll(
    ".filter-button"
);

const productCards = document.querySelectorAll(
    ".product-card"
);


if (
    filterButtons.length &&
    productCards.length
) {

    filterButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const selectedFilter =
                    button.dataset.filter;

                /* Remove active state */

                filterButtons.forEach(
                    item => {
                        item.classList.remove(
                            "active"
                        );

                        item.setAttribute(
                            "aria-selected",
                            "false"
                        );
                    }
                );


                /* Add active state */

                button.classList.add(
                    "active"
                );

                button.setAttribute(
                    "aria-selected",
                    "true"
                );


                /* Filter products */

                productCards.forEach(card => {

                    const category =
                        card.dataset.category;

                    const shouldShow =
                        selectedFilter === "all" ||
                        category === selectedFilter;

                    if (shouldShow) {

                        card.hidden = false;

                        requestAnimationFrame(
                            () => {
                                card.classList.add(
                                    "is-visible"
                                );
                            }
                        );

                    } else {

                        card.classList.remove(
                            "is-visible"
                        );

                        card.hidden = true;

                    }

                });

            }
        );

    });

}


/* =========================================================
   INITIAL PRODUCT STATE
========================================================= */

productCards.forEach(card => {

    card.classList.add(
        "is-visible"
    );

});


/* =========================================================
   SMOOTH INTERNAL LINKS
========================================================= */

const internalLinks =
    document.querySelectorAll(
        'a[href^="#"]'
    );


internalLinks.forEach(link => {

    link.addEventListener(
        "click",
        event => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }


            const target =
                document.querySelector(
                    targetId
                );

            if (!target) return;

            event.preventDefault();


            const header =
                document.querySelector(
                    ".header"
                );

            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;


            const targetPosition =
                target.getBoundingClientRect()
                    .top +
                window.scrollY -
                headerHeight;


            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        }
    );

});


/* =========================================================
   BACK TO TOP
========================================================= */

const backTop =
    document.querySelector(
        ".back-top"
    );


const updateBackTop = () => {

    if (!backTop) return;

    if (window.scrollY > 500) {

        backTop.classList.add(
            "visible"
        );

    } else {

        backTop.classList.remove(
            "visible"
        );

    }

};


updateBackTop();


window.addEventListener(
    "scroll",
    updateBackTop,
    { passive: true }
);


if (backTop) {

    backTop.addEventListener(
        "click",
        event => {

            event.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =========================================================
   CONTACT ACTION TRACKING
========================================================= */

const actionLinks =
    document.querySelectorAll(
        'a[href^="https://wa.me/"],' +
        'a[href^="tel:"],' +
        'a[href^="mailto:"],' +
        'a[href*="instagram.com"],' +
        'a[href*="maps.google"]'
    );


actionLinks.forEach(link => {

    link.addEventListener(
        "click",
        () => {

            const href =
                link.getAttribute("href");

            if (!href) return;

            console.info(
                "The Lenses action:",
                href
            );

        }
    );

});

/* =========================================================
   THE LENSES — COLLECTION JS
   PART 3/3
========================================================= */


/* =========================================================
   EXTERNAL LINK SAFETY
========================================================= */

const externalLinks =
    document.querySelectorAll(
        'a[target="_blank"]'
    );


externalLinks.forEach(link => {

    const rel =
        link.getAttribute("rel") || "";

    if (!rel.includes("noopener")) {
        link.setAttribute(
            "rel",
            `${rel} noopener noreferrer`.trim()
        );
    }

});


/* =========================================================
   IMAGE ERROR HANDLING
========================================================= */

const pageImages =
    document.querySelectorAll(
        "img"
    );


pageImages.forEach(image => {

    image.addEventListener(
        "error",
        () => {

            image.classList.add(
                "image-error"
            );

            console.warn(
                "The Lenses image could not load:",
                image.src
            );

        }
    );

});


/* =========================================================
   REDUCED MOTION SUPPORT
========================================================= */

const reducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );


if (reducedMotion.matches) {

    document.documentElement.style
        .scrollBehavior = "auto";

}


/* =========================================================
   PAGE VISIBILITY
========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.visibilityState ===
            "visible"
        ) {

            document.documentElement
                .classList.add(
                    "page-visible"
                );

        }

    }
);


/* =========================================================
   BUTTON KEYBOARD SUPPORT
========================================================= */

const interactiveCards =
    document.querySelectorAll(
        ".contact-action-card"
    );


interactiveCards.forEach(card => {

    const action =
        card.querySelector(
            ".click-now"
        );

    if (!action) return;

    card.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter" &&
                event.target === card
            ) {

                action.click();

            }

        }
    );

});


/* =========================================================
   PREVENT DOUBLE TAP ZOOM ON BUTTONS
========================================================= */

const buttons =
    document.querySelectorAll(
        "button"
    );


buttons.forEach(button => {

    button.addEventListener(
        "touchstart",
        () => {},
        { passive: true }
    );

});


/* =========================================================
   CONSOLE BRANDING
========================================================= */

console.log(
    "%c THE LENSES ",
    "font-size:20px;font-weight:700;"
);

console.log(
    "Premium eyewear experience."
);


/* =========================================================
   COLLECTION JS COMPLETE
========================================================= */
