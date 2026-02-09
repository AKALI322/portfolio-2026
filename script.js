const backToTopBtn = document.getElementById("backToTopBtn");
const hamburger = document.getElementById("hamburger");
const navMenu = document.querySelector(".nav-menu");

const prefersReducedMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (backToTopBtn) {
    window.addEventListener("scroll", () => {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            backToTopBtn.classList.add("show");
        } else {
            backToTopBtn.classList.remove("show");
        }
    });

    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: prefersReducedMotion ? "auto" : "smooth",
        });
    });
}

if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });
}

const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const lightboxClose = document.querySelector(".lightbox-close");

const openLightbox = (src, alt) => {
    if (!lightbox || !lightboxImage) {
        return;
    }
    lightboxImage.src = src;
    lightboxImage.alt = alt || "作品预览";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
};

const closeLightbox = () => {
    if (!lightbox || !lightboxImage) {
        return;
    }
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    lightboxImage.src = "";
};

if (galleryItems.length && lightbox && lightboxImage) {
    galleryItems.forEach((item) => {
        item.addEventListener("click", () => {
            const src = item.dataset.full || item.querySelector("img")?.src;
            const alt = item.querySelector("img")?.alt;
            if (src) {
                openLightbox(src, alt);
            }
        });
    });

    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    if (lightboxClose) {
        lightboxClose.addEventListener("click", closeLightbox);
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
            closeLightbox();
        }
    });
}
