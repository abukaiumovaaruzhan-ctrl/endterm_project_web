"use strict";

// ---------- Gallery state ----------
let activeCategory = "all";   // current filter
let visibleItems = [];        // items shown now (the lightbox walks through this list)
let lightboxIndex = 0;
let lastFocused = null;       // element to return focus to when the lightbox closes

// ---------- Cards ----------
function createGalleryCard(item, index) {
    const col = document.createElement("div");
    col.className = "col-md-6 col-lg-4";

    const card = document.createElement("article");
    card.className = "gallery-card";

    const thumb = document.createElement("button");
    thumb.type = "button";
    thumb.className = "gallery-thumb";
    thumb.dataset.index = String(index);
    thumb.setAttribute("aria-label", `Open photo: ${item.title}`);

    const img = document.createElement("img");
    img.src = item.src;
    img.alt = item.alt;
    img.loading = "lazy";
    if (item.fit === "contain") img.classList.add("is-contain");
    if (item.position) img.style.objectPosition = item.position;
    thumb.appendChild(img);

    const body = document.createElement("div");
    body.className = "gallery-body";

    const tag = document.createElement("span");
    tag.className = "level-tag";
    tag.textContent = item.year ? `${item.category} · ${item.year}` : item.category;

    const title = document.createElement("h3");
    title.textContent = item.title;

    const caption = document.createElement("p");
    caption.className = "session-meta mb-0";
    caption.textContent = item.caption;

    body.append(tag, title, caption);
    card.append(thumb, body);
    col.appendChild(card);
    return col;
}

// ---------- Filter buttons (made from the categories that exist in the data) ----------
function buildFilters() {
    const box = document.getElementById("galleryFilters");
    if (!box) return;

    const categories = [...new Set(galleryItems.map(item => item.category))];
    if (categories.length < 2) {      // one category: a filter would be pointless
        box.classList.add("d-none");
        return;
    }

    const makeButton = (value, label) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "btn btn-filter";
        button.dataset.category = value;
        const count = value === "all"
            ? galleryItems.length
            : galleryItems.filter(item => item.category === value).length;
        button.textContent = `${label} (${count})`;
        button.setAttribute("aria-pressed", String(value === activeCategory));
        button.addEventListener("click", () => {
            activeCategory = value;
            box.querySelectorAll(".btn-filter").forEach(b =>
                b.setAttribute("aria-pressed", String(b.dataset.category === activeCategory)));
            renderGallery();
        });
        return button;
    };

    box.replaceChildren(makeButton("all", "All"), ...categories.map(name => makeButton(name, name)));
}

// ---------- Render ----------
function renderGallery() {
    const list = document.getElementById("galleryList");
    if (!list) return;

    visibleItems = galleryItems.filter(item => activeCategory === "all" || item.category === activeCategory);
    list.replaceChildren(...visibleItems.map(createGalleryCard));

    const count = document.getElementById("galleryCount");
    const empty = document.getElementById("galleryEmpty");
    if (count) count.textContent = `Showing ${visibleItems.length} of ${galleryItems.length} items`;
    if (empty) empty.classList.toggle("d-none", visibleItems.length !== 0);

    if (window.jQuery) {
        $("#galleryList .gallery-card").stop(true, true).hide().fadeIn(200);
    }
}

// ---------- Lightbox ----------
function showLightboxItem(index) {
    const total = visibleItems.length;
    if (!total) return;
    lightboxIndex = (index + total) % total;          // wrap around
    const item = visibleItems[lightboxIndex];

    document.getElementById("lightboxImage").src = item.src;
    document.getElementById("lightboxImage").alt = item.alt;
    document.getElementById("lightboxTitle").textContent = item.title;
    document.getElementById("lightboxCaption").textContent = item.caption;
    document.getElementById("lightboxCounter").textContent = `${lightboxIndex + 1} / ${total}`;

    const single = total < 2;
    document.getElementById("lightboxPrev").classList.toggle("d-none", single);
    document.getElementById("lightboxNext").classList.toggle("d-none", single);
}

function openLightbox(index) {
    const box = document.getElementById("lightbox");
    if (!box) return;
    lastFocused = document.activeElement;
    showLightboxItem(index);
    document.body.classList.add("lightbox-open");
    $(box).stop(true, true).fadeIn(200);
    document.getElementById("lightboxClose").focus();
}

function closeLightbox() {
    const box = document.getElementById("lightbox");
    if (!box || $(box).is(":hidden")) return;
    $(box).stop(true, true).fadeOut(150, () => document.body.classList.remove("lightbox-open"));
    if (lastFocused) lastFocused.focus();
}

function setupLightbox() {
    const box = document.getElementById("lightbox");
    const list = document.getElementById("galleryList");
    if (!box || !list) return;

    // One listener for all thumbnails, also for cards drawn later by the filter
    list.addEventListener("click", event => {
        const thumb = event.target.closest(".gallery-thumb");
        if (thumb) openLightbox(Number(thumb.dataset.index));
    });

    document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
    document.getElementById("lightboxPrev").addEventListener("click", () => showLightboxItem(lightboxIndex - 1));
    document.getElementById("lightboxNext").addEventListener("click", () => showLightboxItem(lightboxIndex + 1));

    // Click on the dark background closes the viewer
    box.addEventListener("click", event => {
        if (event.target === box || event.target.classList.contains("lightbox-stage")) closeLightbox();
    });

    // Keyboard: Esc closes, arrows switch photos, Tab stays inside the viewer
    document.addEventListener("keydown", event => {
        if ($(box).is(":hidden")) return;

        if (event.key === "Escape") closeLightbox();
        else if (event.key === "ArrowLeft") showLightboxItem(lightboxIndex - 1);
        else if (event.key === "ArrowRight") showLightboxItem(lightboxIndex + 1);
        else if (event.key === "Tab") {
            const focusable = [...box.querySelectorAll("button")].filter(b => !b.classList.contains("d-none"));
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
            else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    if (!document.getElementById("galleryList")) return;
    buildFilters();
    renderGallery();
    setupLightbox();
});
