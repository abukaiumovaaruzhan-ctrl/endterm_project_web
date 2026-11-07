"use strict";

// Connects the features to the page events. Every block checks that its elements exist,
// because the same scripts are loaded on all three pages.
document.addEventListener("DOMContentLoaded", () => {

    // Session finder (club.html)
    const search = document.getElementById("sessionSearch");
    const level = document.getElementById("levelFilter");
    const clear = document.getElementById("clearFilters");

    if (search) search.addEventListener("input", renderSessions);
    if (level) level.addEventListener("change", renderSessions);
    if (clear) {
        clear.addEventListener("click", () => {
            if (search) search.value = "";
            if (level) level.value = "all";
            renderSessions();
        });
    }
    renderSessions();

    // Price calculator (club.html)
    const quantity = document.getElementById("sessionCount");
    const type = document.getElementById("sessionType");

    if (quantity) quantity.addEventListener("input", updatePrice);
    if (type) type.addEventListener("change", updatePrice);
    updatePrice();

    // Booking form (join.html)
    setupRegistrationForm();
});
