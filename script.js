/* =========================================================
   HARSH KUMAR — ADVANCED PORTFOLIO
   STEP 3 — JAVASCRIPT ENGINE
   ========================================================= */


/* =========================================================
   01. DOM READY
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initPreloader();

    initTypingAnimation();

    initNavbar();

    initMobileMenu();

    initTheme();

    initScrollReveal();

    initCounters();

    initProjectFilters();

    initProjectModal();

    initBackToTop();

    initCursor();

    initSmoothLinks();

    initKeyboardControls();

    updateCurrentYear();

});


/* =========================================================
   02. PRELOADER
   ========================================================= */

function initPreloader() {

    const preloader =
        document.getElementById("preloader");

    if (!preloader) return;

    window.addEventListener("load", () => {

        setTimeout(() => {

            preloader.classList.add("hide");

        }, 700);

    });

}


/* =========================================================
   03. TYPING ANIMATION
   ========================================================= */

function initTypingAnimation() {

    const typingElement =
        document.getElementById("typingText");

    if (!typingElement) return;


    const roles = [

        "intelligent systems.",

        "AI-powered products.",

        "data-driven solutions.",

        "scalable software.",

        "modern web experiences."

    ];


    let roleIndex = 0;

    let characterIndex = 0;

    let deleting = false;


    const typeSpeed = 75;

    const deleteSpeed = 42;

    const pauseAfterTyping = 1600;

    const pauseAfterDeleting = 500;


    function type() {

        const currentRole =
            roles[roleIndex];


        if (!deleting) {

            characterIndex++;

            typingElement.textContent =
                currentRole.substring(
                    0,
                    characterIndex
                );


            if (
                characterIndex ===
                currentRole.length
            ) {

                deleting = true;

                setTimeout(
                    type,
                    pauseAfterTyping
                );

                return;
            }


            setTimeout(
                type,
                typeSpeed
            );

        } else {

            characterIndex--;

            typingElement.textContent =
                currentRole.substring(
                    0,
                    characterIndex
                );


            if (characterIndex === 0) {

                deleting = false;

                roleIndex =
                    (roleIndex + 1) %
                    roles.length;


                setTimeout(
                    type,
                    pauseAfterDeleting
                );

                return;
            }


            setTimeout(
                type,
                deleteSpeed
            );
        }

    }


    type();

}


/* =========================================================
   04. NAVBAR SCROLL EFFECT
   ========================================================= */

function initNavbar() {

    const header =
        document.getElementById("header");

    if (!header) return;


    function updateNavbar() {

        if (window.scrollY > 30) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }


    updateNavbar();


    window.addEventListener(
        "scroll",
        updateNavbar,
        { passive: true }
    );

}


/* =========================================================
   05. MOBILE MENU
   ========================================================= */

function initMobileMenu() {

    const menuToggle =
        document.getElementById("menuToggle");

    const navLinks =
        document.getElementById("navLinks");

    if (!menuToggle || !navLinks) return;


    menuToggle.addEventListener(
        "click",
        () => {

            const isOpen =
                navLinks.classList.toggle("open");


            menuToggle.classList.toggle(
                "active",
                isOpen
            );


            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );


            document.body.classList.toggle(
                "no-scroll",
                isOpen
            );

        }
    );


    const links =
        navLinks.querySelectorAll("a");


    links.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                navLinks.classList.remove(
                    "open"
                );

                menuToggle.classList.remove(
                    "active"
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                document.body.classList.remove(
                    "no-scroll"
                );

            }
        );

    });


    document.addEventListener(
        "click",
        event => {

            const clickedInsideMenu =
                navLinks.contains(event.target);

            const clickedToggle =
                menuToggle.contains(event.target);


            if (
                !clickedInsideMenu &&
                !clickedToggle
            ) {

                navLinks.classList.remove(
                    "open"
                );

                menuToggle.classList.remove(
                    "active"
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                document.body.classList.remove(
                    "no-scroll"
                );

            }

        }
    );

}


/* =========================================================
   06. THEME SYSTEM
   ========================================================= */

function initTheme() {

    const themeToggle =
        document.getElementById(
            "themeToggle"
        );

    if (!themeToggle) return;


    const icon =
        themeToggle.querySelector("i");


    const savedTheme =
        localStorage.getItem(
            "harshPortfolioTheme"
        );


    if (savedTheme === "light") {

        document.body.classList.add(
            "light-theme"
        );

        updateThemeIcon(icon, true);

    }


    themeToggle.addEventListener(
        "click",
        () => {

            const isLight =
                document.body.classList.toggle(
                    "light-theme"
                );


            localStorage.setItem(
                "harshPortfolioTheme",
                isLight
                    ? "light"
                    : "dark"
            );


            updateThemeIcon(
                icon,
                isLight
            );


            showToast(
                isLight
                    ? "Light mode enabled"
                    : "Dark mode enabled"
            );

        }
    );

}


function updateThemeIcon(icon, isLight) {

    if (!icon) return;

    if (isLight) {

        icon.classList.remove(
            "fa-moon"
        );

        icon.classList.add(
            "fa-sun"
        );

    } else {

        icon.classList.remove(
            "fa-sun"
        );

        icon.classList.add(
            "fa-moon"
        );

    }

}


/* =========================================================
   07. SCROLL REVEAL
   ========================================================= */

function initScrollReveal() {

    const elements =
        document.querySelectorAll(
            ".reveal"
        );


    if (!elements.length) return;


    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        elements.forEach(
            element =>
                element.classList.add(
                    "visible"
                )
        );

        return;
    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12,

                rootMargin:
                    "0px 0px -40px 0px"
            }
        );


    elements.forEach(
        element =>
            observer.observe(element)
    );

}


/* =========================================================
   08. ANIMATED COUNTERS
   ========================================================= */

function initCounters() {

    const counters =
        document.querySelectorAll(
            ".counter"
        );


    if (!counters.length) return;


    const counterObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        !entry.isIntersecting
                    ) return;


                    const counter =
                        entry.target;

                    const target =
                        Number(
                            counter.dataset.target
                        );


                    if (
                        Number.isNaN(target)
                    ) return;


                    animateCounter(
                        counter,
                        target
                    );


                    counterObserver.unobserve(
                        counter
                    );

                });

            },
            {
                threshold: 0.5
            }
        );


    counters.forEach(
        counter =>
            counterObserver.observe(counter)
    );

}


function animateCounter(
    element,
    target
) {

    const duration = 1300;

    const startTime =
        performance.now();


    function update(currentTime) {

        const progress =
            Math.min(
                (
                    currentTime -
                    startTime
                ) / duration,
                1
            );


        const easedProgress =
            1 -
            Math.pow(
                1 - progress,
                3
            );


        const current =
            Math.floor(
                easedProgress * target
            );


        element.textContent =
            current;


        if (progress < 1) {

            requestAnimationFrame(
                update
            );

        } else {

            element.textContent =
                target;
        }

    }


    requestAnimationFrame(update);

}


/* =========================================================
   09. PROJECT FILTER SYSTEM
   ========================================================= */

function initProjectFilters() {

    const filterButtons =
        document.querySelectorAll(
            ".filter-btn"
        );

    const projectCards =
        document.querySelectorAll(
            ".project-card"
        );


    if (
        !filterButtons.length ||
        !projectCards.length
    ) return;


    filterButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const filter =
                    button.dataset.filter;


                filterButtons.forEach(
                    btn =>
                        btn.classList.remove(
                            "active"
                        )
                );


                button.classList.add(
                    "active"
                );


                projectCards.forEach(
                    card => {

                        const category =
                            card.dataset.category;


                        const shouldShow =
                            filter === "all" ||
                            category === filter;


                        if (shouldShow) {

                            card.classList.remove(
                                "hidden"
                            );


                            requestAnimationFrame(
                                () => {

                                    card.style.opacity =
                                        "1";

                                    card.style.transform =
                                        "";

                                }
                            );

                        } else {

                            card.style.opacity =
                                "0";

                            card.style.transform =
                                "scale(0.97)";


                            setTimeout(
                                () => {

                                    card.classList.add(
                                        "hidden"
                                    );

                                },
                                250
                            );

                        }

                    }
                );


                showToast(
                    filter === "all"
                        ? "Showing all projects"
                        : `Showing ${filter.toUpperCase()} projects`
                );

            }
        );

    });

}


/* =========================================================
   10. PROJECT MODAL
   ========================================================= */

function initProjectModal() {

    const modal =
        document.getElementById(
            "projectModal"
        );

    const modalTitle =
        document.getElementById(
            "modalTitle"
        );

    const modalDescription =
        document.getElementById(
            "modalDescription"
        );

    const modalClose =
        document.getElementById(
            "modalClose"
        );

    const modalOverlay =
        modal?.querySelector(
            ".modal-overlay"
        );


    if (
        !modal ||
        !modalTitle ||
        !modalDescription
    ) return;


    const projectCards =
        document.querySelectorAll(
            ".project-card"
        );


    const projectData = {

        "Enterprise AI Agent Platform": {

            description:
                "A portfolio project focused on AI agents, automation, data processing, APIs and scalable software architecture. The goal is to demonstrate engineering thinking rather than simply showcase a UI."

        },


        "Campus Cart": {

            description:
                "A college-focused platform concept designed to connect students with campus delivery and service workflows while demonstrating responsive UI and application architecture."

        },


        "Student Management System": {

            description:
                "A software project concept for organizing student records and academic information while applying programming, database and object-oriented software engineering concepts."

        },


        "AI Resume Builder": {

            description:
                "A professional resume-building web experience focused on structured profile data, dynamic content generation and polished output."

        }

    };


    projectCards.forEach(card => {

        const titleElement =
            card.querySelector("h3");


        if (!titleElement) return;


        const title =
            titleElement.textContent.trim();


        card.addEventListener(
            "dblclick",
            () => {

                const data =
                    projectData[title];


                modalTitle.textContent =
                    title;


                modalDescription.textContent =
                    data
                        ? data.description
                        : "Project details coming soon.";


                modal.classList.add(
                    "active"
                );


                modal.setAttribute(
                    "aria-hidden",
                    "false"
                );


                document.body.classList.add(
                    "no-scroll"
                );

            }
        );

    });


    function closeModal() {

        modal.classList.remove(
            "active"
        );

        modal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "no-scroll"
        );

    }


    modalClose?.addEventListener(
        "click",
        closeModal
    );


    modalOverlay?.addEventListener(
        "click",
        closeModal
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                modal.classList.contains(
                    "active"
                )
            ) {

                closeModal();

            }

        }
    );

}


/* =========================================================
   11. BACK TO TOP
   ========================================================= */

function initBackToTop() {

    const button =
        document.getElementById(
            "backToTop"
        );


    if (!button) return;


    function updateButton() {

        if (window.scrollY > 700) {

            button.classList.add(
                "show"
            );

        } else {

            button.classList.remove(
                "show"
            );

        }

    }


    updateButton();


    window.addEventListener(
        "scroll",
        updateButton,
        { passive: true }
    );


    button.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =========================================================
   12. CUSTOM CURSOR
   ========================================================= */

function initCursor() {

    const dot =
        document.querySelector(
            ".cursor-dot"
        );

    const outline =
        document.querySelector(
            ".cursor-outline"
        );


    if (!dot || !outline) return;


    if (
        window.matchMedia(
            "(pointer: coarse)"
        ).matches
    ) {

        return;

    }


    let mouseX = 0;

    let mouseY = 0;

    let outlineX = 0;

    let outlineY = 0;


    window.addEventListener(
        "mousemove",
        event => {

            mouseX = event.clientX;

            mouseY = event.clientY;


            dot.style.left =
                `${mouseX}px`;

            dot.style.top =
                `${mouseY}px`;

        }
    );


    function animateCursor() {

        outlineX +=
            (
                mouseX -
                outlineX
            ) * 0.16;


        outlineY +=
            (
                mouseY -
                outlineY
            ) * 0.16;


        outline.style.left =
            `${outlineX}px`;

        outline.style.top =
            `${outlineY}px`;


        requestAnimationFrame(
            animateCursor
        );

    }


    animateCursor();


    const interactiveElements =
        document.querySelectorAll(
            "a, button, .project-card, .skill-card"
        );


    interactiveElements.forEach(
        element => {

            element.addEventListener(
                "mouseenter",
                () => {

                    outline.classList.add(
                        "cursor-hover"
                    );

                }
            );


            element.addEventListener(
                "mouseleave",
                () => {

                    outline.classList.remove(
                        "cursor-hover"
                    );

                }
            );

        }
    );

}


/* =========================================================
   13. SMOOTH INTERNAL LINKS
   ========================================================= */

function initSmoothLinks() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    links.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const href =
                    link.getAttribute("href");


                if (
                    !href ||
                    href === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        href
                    );


                if (!target) return;


                event.preventDefault();


                const header =
                    document.getElementById(
                        "header"
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

                    top:
                        Math.max(
                            targetPosition,
                            0
                        ),

                    behavior: "smooth"

                });

            }
        );

    });

}


/* =========================================================
   14. ACTIVE NAVIGATION
   ========================================================= */

function initActiveNavigation() {

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            ".nav-link"
        );


    if (
        !sections.length ||
        !navLinks.length
    ) return;


    const sectionObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        !entry.isIntersecting
                    ) return;


                    const id =
                        entry.target.id;


                    navLinks.forEach(
                        link => {

                            link.classList.toggle(
                                "active",
                                link.getAttribute(
                                    "href"
                                ) ===
                                `#${id}`
                            );

                        }
                    );

                });

            },
            {
                rootMargin:
                    "-35% 0px -55% 0px"
            }
        );


    sections.forEach(
        section =>
            sectionObserver.observe(section)
    );

}


/* =========================================================
   15. KEYBOARD CONTROLS
   ========================================================= */

function initKeyboardControls() {

    document.addEventListener(
        "keydown",
        event => {

            /*
             * ESC = close mobile navigation
             */

            if (event.key === "Escape") {

                const navLinks =
                    document.getElementById(
                        "navLinks"
                    );

                const menuToggle =
                    document.getElementById(
                        "menuToggle"
                    );


                navLinks?.classList.remove(
                    "open"
                );

                menuToggle?.classList.remove(
                    "active"
                );

                document.body.classList.remove(
                    "no-scroll"
                );

            }

        }
    );

}


/* =========================================================
   16. TOAST SYSTEM
   ========================================================= */

let toastTimer;


function showToast(message) {

    const toast =
        document.getElementById(
            "toast"
        );

    const toastMessage =
        document.getElementById(
            "toastMessage"
        );


    if (!toast || !toastMessage) return;


    toastMessage.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(toastTimer);


    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2500
        );

}


/* =========================================================
   17. CURRENT YEAR
   ========================================================= */

function updateCurrentYear() {

    const yearElement =
        document.getElementById(
            "currentYear"
        );


    if (!yearElement) return;


    yearElement.textContent =
        new Date().getFullYear();

}


/* =========================================================
   18. IMAGE LAZY LOADING SUPPORT
   ========================================================= */

function initLazyImages() {

    const images =
        document.querySelectorAll(
            "img[data-src]"
        );


    if (!images.length) return;


    const imageObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        !entry.isIntersecting
                    ) return;


                    const image =
                        entry.target;


                    image.src =
                        image.dataset.src;


                    image.removeAttribute(
                        "data-src"
                    );


                    imageObserver.unobserve(
                        image
                    );

                });

            }
        );


    images.forEach(
        image =>
            imageObserver.observe(image)
    );

}


/* =========================================================
   19. PERFORMANCE — PAUSE HEAVY EFFECTS
   ========================================================= */

function initVisibilityOptimization() {

    document.addEventListener(
        "visibilitychange",
        () => {

            const animations =
                document.querySelectorAll(
                    ".orbit, .glow, .contact-circle"
                );


            animations.forEach(
                element => {

                    if (
                        document.hidden
                    ) {

                        element.style.animationPlayState =
                            "paused";

                    } else {

                        element.style.animationPlayState =
                            "running";

                    }

                }
            );

        }
    );

}


/* =========================================================
   20. PARALLAX HERO
   ========================================================= */

function initHeroParallax() {

    const visual =
        document.querySelector(
            ".hero-visual"
        );


    if (!visual) return;


    if (
        window.matchMedia(
            "(pointer: coarse)"
        ).matches
    ) return;


    window.addEventListener(
        "mousemove",
        event => {

            const x =
                (
                    event.clientX /
                    window.innerWidth
                ) - 0.5;


            const y =
                (
                    event.clientY /
                    window.innerHeight
                ) - 0.5;


            const card =
                visual.querySelector(
                    ".developer-card"
                );


            if (!card) return;


            card.style.transform =
                `
                perspective(1000px)
                rotateY(${x * 8 - 4}deg)
                rotateX(${y * -6 + 3}deg)
                translate3d(
                    ${x * 8}px,
                    ${y * 8}px,
                    0
                )
                `;

        }
    );


    visual.addEventListener(
        "mouseleave",
        () => {

            const card =
                visual.querySelector(
                    ".developer-card"
                );


            if (!card) return;


            card.style.transform =
                `
                perspective(1000px)
                rotateY(-8deg)
                rotateX(4deg)
                `;

        }
    );

}


/* =========================================================
   21. DYNAMIC SKILL HOVER
   ========================================================= */

function initSkillInteractions() {

    const cards =
        document.querySelectorAll(
            ".skill-card"
        );


    cards.forEach(card => {

        card.addEventListener(
            "mouseenter",
            () => {

                cards.forEach(
                    other => {

                        if (
                            other !== card
                        ) {

                            other.style.opacity =
                                "0.62";

                        }

                    }
                );

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                cards.forEach(
                    other => {

                        other.style.opacity =
                            "";

                    }
                );

            }
        );

    });

}


/* =========================================================
   22. PROJECT CARD TILT
   ========================================================= */

function initProjectTilt() {

    if (
        window.matchMedia(
            "(pointer: coarse)"
        ).matches
    ) return;


    const cards =
        document.querySelectorAll(
            ".project-card"
        );


    cards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const rotateY =
                    (
                        x -
                        rect.width / 2
                    ) /
                    35;


                const rotateX =
                    -(
                        y -
                        rect.height / 2
                    ) /
                    35;


                card.style.transform =
                    `
                    perspective(900px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-8px)
                    `;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    });

}


/* =========================================================
   23. MAGNETIC BUTTON EFFECT
   ========================================================= */

function initMagneticButtons() {

    if (
        window.matchMedia(
            "(pointer: coarse)"
        ).matches
    ) return;


    const buttons =
        document.querySelectorAll(
            ".btn, .nav-cta, .outline-link"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "mousemove",
            event => {

                const rect =
                    button.getBoundingClientRect();


                const x =
                    event.clientX -
                    (
                        rect.left +
                        rect.width / 2
                    );


                const y =
                    event.clientY -
                    (
                        rect.top +
                        rect.height / 2
                    );


                button.style.transform =
                    `
                    translate(
                        ${x * 0.12}px,
                        ${y * 0.12}px
                    )
                    `;

            }
        );


        button.addEventListener(
            "mouseleave",
            () => {

                button.style.transform =
                    "";

            }
        );

    });

}


/* =========================================================
   24. INIT ADVANCED EFFECTS
   ========================================================= */

initActiveNavigation();

initLazyImages();

initVisibilityOptimization();

initHeroParallax();

initSkillInteractions();

initProjectTilt();

initMagneticButtons();


/* =========================================================
   END OF SCRIPT.JS
   ========================================================= */