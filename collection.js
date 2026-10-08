
document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       ELEMENTS
    ========================= */

    const header =
        document.querySelector(".collection-header");

    const menuButton =
        document.querySelector(".collection-menu-button");

    const mobileMenu =
        document.querySelector(".collection-mobile-menu");

    const mobileLinks =
        document.querySelectorAll(
            ".collection-mobile-menu a"
        );

    const filterButtons =
        document.querySelectorAll(".filter-button");

    const products =
        document.querySelectorAll(".collection-product");


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

            menuButton.classList.add("active");

            menuButton.setAttribute(
                "aria-expanded",
                "true"
            );

        }

    }


    function closeMenu() {

        if (!mobileMenu) return;

        mobileMenu.classList.remove("active");

        document.body.classList.remove(
            "menu-open"
        );

        if (menuButton) {

            menuButton.classList.remove("active");

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
       COLLECTION FILTER
    ========================= */

    filterButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const selectedCategory =
                    button.dataset.filter;


                filterButtons.forEach(
                    item => {
                        item.classList.remove(
                            "active"
                        );
                    }
                );


                button.classList.add(
                    "active"
                );


                products.forEach(product => {

                    const productCategory =
                        product.dataset.category;


                    if (
                        selectedCategory === "all" ||
                        productCategory ===
                            selectedCategory
                    ) {

                        product.style.display =
                            "";

                    } else {

                        product.style.display =
                            "none";

                    }

                });

            }
        );

    });


    /* =========================
       SMOOTH SCROLL
    ========================= */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

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
                    target.getBoundingClientRect()
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
       IMAGE ERROR CHECK
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
       CLOSE MENU ON RESIZE
    ========================= */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 1000
            ) {
                closeMenu();
            }

        }
    );

});
