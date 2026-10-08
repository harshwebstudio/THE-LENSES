/* =========================================================
   THE LENSES — CONTACT JS
   PART 1/3
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const header =
        document.querySelector(".header");

    const menuButton =
        document.querySelector(".menu-button");

    const mobileMenu =
        document.querySelector("#mobile-menu");

    const mobileLinks =
        document.querySelectorAll(
            "#mobile-menu a"
        );

    const backTop =
        document.querySelector(".back-top");

    const currentYear =
        document.querySelector("#current-year");


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       HEADER SCROLL
    ===================================================== */

    const updateHeader = () => {

        if (!header) return;

        if (window.scrollY > 30) {

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );

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

        if (!menuButton || !mobileMenu) {
            return;
        }


        menuButton.classList.add(
            "active"
        );

        mobileMenu.classList.add(
            "active"
        );


        menuButton.setAttribute(
            "aria-expanded",
            "true"
        );


        menuButton.setAttribute(
            "aria-label",
            "Close menu"
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

        if (!menuButton || !mobileMenu) {
            return;
        }


        menuButton.classList.remove(
            "active"
        );

        mobileMenu.classList.remove(
            "active"
        );


        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );


        menuButton.setAttribute(
            "aria-label",
            "Open menu"
        );


        mobileMenu.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.classList.remove(
            "menu-open"
        );

    };


    if (menuButton) {

        menuButton.addEventListener(
            "click",
            () => {

                const isOpen =
                    mobileMenu &&
                    mobileMenu.classList.contains(
                        "active"
                    );

                if (isOpen) {

                    closeMenu();

                } else {

                    openMenu();

                }

            }
        );

    }


    /* =====================================================
       MOBILE NAV LINKS
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

            if (
                event.key === "Escape"
            ) {

                closeMenu();

            }

        }
    );


    /* =====================================================
       RESIZE
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth >= 900
            ) {

                closeMenu();

            }

        }
    );

});
/* =========================================================
   THE LENSES — CONTACT JS
   PART 2/3
========================================================= */


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


            const position =
                target.getBoundingClientRect()
                    .top +
                window.scrollY -
                headerHeight;


            window.scrollTo({

                top: position,

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


/* =========================================================
   BACK TO TOP
========================================================= */

const backTopButton =
    document.querySelector(
        ".back-top"
    );


const updateBackTop =
    () => {

        if (!backTopButton) {
            return;
        }


        if (window.scrollY > 500) {

            backTopButton.classList.add(
                "visible"
            );

        } else {

            backTopButton.classList.remove(
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


if (backTopButton) {

    backTopButton.addEventListener(
        "click",
        () => {

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


/* =========================================================
   CONTACT ACTION TRACKING
========================================================= */

const contactLinks =
    document.querySelectorAll(
        [
            'a[href^="https://wa.me/"]',
            'a[href^="tel:"]',
            'a[href^="mailto:"]',
            'a[href*="instagram.com"]',
            'a[href*="maps.google"]'
        ].join(",")
    );


contactLinks.forEach(link => {

    link.addEventListener(
        "click",
        () => {

            const href =
                link.getAttribute(
                    "href"
                );


            if (!href) return;


            console.info(
                "The Lenses contact action:",
                href
            );

        }
    );

});

/* =========================================================
   THE LENSES — CONTACT JS
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

    const currentRel =
        link.getAttribute("rel") || "";


    const relValues =
        currentRel
            .split(" ")
            .filter(Boolean);


    if (
        !relValues.includes(
            "noopener"
        )
    ) {

        relValues.push(
            "noopener"
        );

    }


    if (
        !relValues.includes(
            "noreferrer"
        )
    ) {

        relValues.push(
            "noreferrer"
        );

    }


    link.setAttribute(
        "rel",
        relValues.join(" ")
    );

});


/* =========================================================
   IMAGE ERROR HANDLING
========================================================= */

const images =
    document.querySelectorAll(
        "img"
    );


images.forEach(image => {

    image.addEventListener(
        "error",
        () => {

            image.classList.add(
                "image-error"
            );


            console.warn(
                "The Lenses image failed:",
                image.src
            );

        }
    );

});


/* =========================================================
   VISIBILITY STATE
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
   REDUCED MOTION
========================================================= */

const reducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );


const applyMotionPreference =
    () => {

        if (reducedMotion.matches) {

            document.documentElement.style
                .scrollBehavior = "auto";

        }

    };


applyMotionPreference();


if (
    reducedMotion.addEventListener
) {

    reducedMotion.addEventListener(
        "change",
        applyMotionPreference
    );

}


/* =========================================================
   CONTACT ACTION ACCESSIBILITY
========================================================= */

const actionCards =
    document.querySelectorAll(
        ".action-card"
    );


actionCards.forEach(card => {

    const button =
        card.querySelector(
            ".click-now"
        );


    if (!button) return;


    card.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter" &&
                event.target === card
            ) {

                button.click();

            }

        }
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
   CONTACT JS COMPLETE
========================================================= */
