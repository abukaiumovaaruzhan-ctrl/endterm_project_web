"use strict";

// Builds one session card with DOM methods (no innerHTML, so data is never parsed as HTML).
function createSessionCard(session) {
    const col = document.createElement("div");
    col.className = "col-md-6 col-lg-4";

    const card = document.createElement("article");
    card.className = "session-card";

    const badge = document.createElement("span");
    badge.className = "level-tag";
    badge.textContent = session.level;

    const heading = document.createElement("h3");
    heading.className = "mt-3";
    heading.textContent = session.name;

    const details = document.createElement("p");
    details.className = "session-meta mb-2";
    details.textContent = `${session.day} · ${session.time}`;

    const coach = document.createElement("p");
    coach.className = "session-meta mb-0";
    coach.textContent = `Format: ${session.type} · ${session.coach}`;

    const price = document.createElement("p");
    price.className = "session-price";
    price.textContent = `${session.price.toLocaleString("en-US")} ₸`;

    const link = document.createElement("a");
    link.className = "btn btn-session btn-sm mt-2";
    link.href = `join.html?session=${encodeURIComponent(session.name)}`;
    link.textContent = "Choose session";
    link.setAttribute("aria-label", `Choose session: ${session.name}`);

    card.append(badge, heading, details, coach, price, link);
    col.appendChild(card);
    return col;
}

// Reads the search box and the level filter, then re-draws the list.
function renderSessions() {
    const list = document.getElementById("sessionList");
    if (!list) return;

    const searchInput = document.getElementById("sessionSearch");
    const levelFilter = document.getElementById("levelFilter");
    const resultsCount = document.getElementById("resultsCount");
    const emptyState = document.getElementById("emptyState");

    const searchValue = (searchInput?.value || "").trim().toLowerCase();
    const levelValue = levelFilter?.value || "all";

    const filtered = trainingSessions.filter(session => {
        const searchableText =
            `${session.name} ${session.day} ${session.coach} ${session.level} ${session.type}`.toLowerCase();
        const matchesSearch = searchableText.includes(searchValue);
        const matchesLevel = levelValue === "all" || session.level === levelValue;
        return matchesSearch && matchesLevel;
    });

    list.replaceChildren(...filtered.map(createSessionCard));

    if (resultsCount) {
        resultsCount.textContent = `Showing ${filtered.length} of ${trainingSessions.length} sessions`;
    }
    if (emptyState) {
        emptyState.classList.toggle("d-none", filtered.length !== 0);
    }

    // jQuery effect: new cards fade in; stop(true, true) keeps fast typing from stacking animations
    if (window.jQuery) {
        $("#sessionList .session-card").stop(true, true).hide().fadeIn(200);
    }
}
