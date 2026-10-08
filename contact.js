
/* =========================================================
   THE LENSES — CONTACT
   CONTACT.JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       ELEMENTS
    ========================= */

    const header =
        document.querySelector(".contact-header");

    const menuButton =
        document.querySelector(".contact-menu-button");

    const mobileMenu =
        document.querySelector(".contact-mobile-menu");

    const mobileLinks =
        document.querySelectorAll(
            ".contact-mobile-menu a"
        );


    /* =========================
       HEADER SCROLL
    ========================= */

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }

    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    /* =========================
       MOBILE MENU
    ========================= */

    function openMenu() {

        if (!mobileMenu) return;

        mobileMenu.classList.add("active");

        document.body.classList.add(
            "menu-open"
        );

        if (menuButton) {

            menuButton.classList.add(
                "active"
            );

            menuButton.setAttribute(
                "aria-expanded",
                "true"
            );
        }
    }


    function closeMenu() {

        if (!mobileMenu) return;

        mobileMenu.classList.remove(
            "active"
        );

        document.body.classList.remove(
            "menu-open"
        );

        if (menuButton) {

            menuButton.classList.remove(
                "active"
            );

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );
        }
    }


    if (menuButton) {

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        menuButton.addEventListener(
            "click",
            () => {

                if (
                    mobileMenu &&
                    mobileMenu.classList.contains(
                        "active"
                    )
                ) {

                    closeMenu();

                } else {

                    openMenu();

                }

            }
        );

    }


    /* =========================
       CLOSE MENU ON LINK CLICK
    ========================= */

    mobileLinks.forEach(link => {

        link.addEventListener(
            "click",
            closeMenu
        );

    });


    /* =========================
       ESCAPE KEY
    ========================= */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                closeMenu();

            }

        }
    );


    /* =========================
       SMOOTH INTERNAL LINKS
    ========================= */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

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

                    const headerHeight =
                        header
                            ? header.offsetHeight
                            : 0;

                    const position =
                        target
                            .getBoundingClientRect()
                            .top +
                        window.scrollY -
                        headerHeight;

                    window.scrollTo({

                        top: position,

                        behavior: "smooth"

                    });

                }
            );

        });


    /* =========================
       CURRENT YEAR
    ========================= */

    document
        .querySelectorAll(".current-year")
        .forEach(element => {

            element.textContent =
                new Date().getFullYear();

        });


    /* =========================
       IMAGE ERROR HANDLING
    ========================= */

    document
        .querySelectorAll("img")
        .forEach(image => {

            image.addEventListener(
                "error",
                () => {

                    console.warn(
                        "Image not found:",
                        image.src
                    );

                }
            );

        });


    /* =========================
       EXTERNAL LINK HANDLING
    ========================= */

    document
        .querySelectorAll(
            'a[target="_blank"]'
        )
        .forEach(link => {

            link.setAttribute(
                "rel",
                "noopener noreferrer"
            );

        });


    /* =========================
       CONTACT ACTION TRACKING
    ========================= */

    document
        .querySelectorAll(
            '.contact-action-card a, .contact-final-button'
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    const destination =
                        link.getAttribute("href");

                    console.log(
                        "Contact action:",
                        destination
                    );

                }
            );

        });


    /* =========================
       RESIZE FIX
    ========================= */

    window.addEventListener(
        "resize",
        () => {

            if (window.innerWidth > 1000) {

                closeMenu();

            }

        }
    );


    /* =========================
       REDUCED MOTION
    ========================= */

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

    if (reducedMotion.matches) {

        document.documentElement.style
            .scrollBehavior = "auto";

    }


    /* =========================
       CONSOLE BRANDING
    ========================= */

    console.log(
        "%c THE LENSES ",
        "font-size:18px;font-weight:bold;"
    );

    console.log(
        "Premium eyewear experience."
    );

});
