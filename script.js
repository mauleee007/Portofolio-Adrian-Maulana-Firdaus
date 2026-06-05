// DOM Elements & Initialization
document.addEventListener("DOMContentLoaded", () => {
    // Set dynamic footer year
    const yearEl = document.getElementById("current-year");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
});

/**
 * Switch between the profile and work tabs
 * @param {string} tabId - The ID of the tab to display
 */
function switchTab(tabId) {
    const buttons = document.querySelectorAll(".tab-btn");
    const contents = document.querySelectorAll(".tab-content");

    buttons.forEach(btn => btn.classList.remove("active"));
    contents.forEach(content => content.classList.remove("active"));

    const targetContent = document.getElementById(tabId);
    if (targetContent) {
        targetContent.classList.add("active");
        // Animate in
        requestAnimationFrame(() => {
            targetContent.style.opacity = '0';
            targetContent.style.transform = 'translateY(12px)';
            requestAnimationFrame(() => {
                targetContent.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
                targetContent.style.opacity = '1';
                targetContent.style.transform = 'translateY(0)';
            });
        });
    }

    const targetButton = Array.from(buttons).find(btn =>
        btn.getAttribute("onclick") && btn.getAttribute("onclick").includes(tabId)
    );
    if (targetButton) targetButton.classList.add("active");
}

/**
 * Copy text to clipboard and show tooltip feedback
 * @param {string} text - Value to copy
 * @param {HTMLElement} element - Clicked container element
 */
function copyContact(text, element) {
    if (!text || !element) return;
    navigator.clipboard.writeText(text).then(() => {
        const tooltip = element.querySelector(".tooltip");
        if (tooltip) {
            tooltip.classList.add("show");
            setTimeout(() => tooltip.classList.remove("show"), 2000);
        }
    }).catch(err => {
        console.error("Could not copy:", err);
    });
}

/**
 * Open lightbox with a full-size image preview
 * @param {string} src - Image URL to display
 */
function openLightbox(src) {
    const lightbox = document.getElementById("lightbox");
    const img = document.getElementById("lightbox-img");
    if (lightbox && img) {
        img.src = src;
        lightbox.classList.add("open");
        document.body.style.overflow = "hidden";
    }
}

/**
 * Close the lightbox overlay
 */
function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    if (lightbox) {
        lightbox.classList.remove("open");
        document.body.style.overflow = "";
    }
}

// Close lightbox with Escape key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
});
