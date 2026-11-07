"use strict";

// Checks one field. Returns true if valid. Shows the message under the field (no alerts).
function validateField(field) {
    const feedback = document.getElementById(`${field.id}Error`);
    const value = field.type === "checkbox" ? field.checked : field.value.trim();
    let message = "";

    if (field.required && !value) {
        message = field.type === "checkbox"
            ? "Please confirm before submitting."
            : "This field is required.";
    } else if (field.id === "fullName" && value && value.length < 2) {
        message = "Name must contain at least 2 characters.";
    } else if (field.id === "fullName" && value && !/^[\p{L}\s'-]+$/u.test(value)) {
        message = "Use letters, spaces, apostrophes or hyphens only.";
    } else if (field.id === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
        message = "Enter a valid email address, for example name@mail.com.";
    } else if (field.id === "phone" && value) {
        const digits = value.replace(/\D/g, "");
        if (!/^\+?[0-9\s()-]+$/.test(value) || digits.length < 7 || digits.length > 15) {
            message = "Enter a valid phone number, for example +7 700 123 45 67.";
        }
    } else if (field.id === "date" && value) {
        const selected = new Date(`${value}T00:00:00`);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selected < today) message = "Choose today or a future date.";
    }

    field.classList.toggle("is-invalid", Boolean(message));
    field.classList.toggle("is-valid", !message && Boolean(value));
    field.setAttribute("aria-invalid", String(Boolean(message)));
    if (feedback) feedback.textContent = message;

    return !message;
}

// Pre-fills the form when the visitor arrives from "Choose session" on the Club page.
function applyChosenSession(selectedNote) {
    const chosenName = new URLSearchParams(window.location.search).get("session");
    if (!chosenName) return;

    const session = trainingSessions.find(item => item.name === chosenName);
    if (!session) return;

    const training = document.getElementById("training");
    const level = document.getElementById("level");
    if (training) training.value = session.type === "Personal" ? "Personal training" : "Group training";
    if (level) level.value = session.level;

    if (selectedNote) {
        selectedNote.textContent =
            `Selected session: ${session.name} — ${session.day}, ${session.time} (${session.price.toLocaleString("en-US")} ₸)`;
        selectedNote.classList.remove("d-none");
    }
}

function setupRegistrationForm() {
    const form = document.getElementById("bookingForm");
    if (!form) return;

    const fields = [...form.querySelectorAll("input[required], select[required]")];
    const successBox = document.getElementById("formSuccess");
    const dateInput = document.getElementById("date");
    const selectedNote = document.getElementById("selectedSession");

    // Earliest date is today (local time)
    if (dateInput) {
        const now = new Date();
        const pad = number => String(number).padStart(2, "0");
        dateInput.min = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
    }

    // Errors appear after leaving a field and disappear as soon as it is corrected
    fields.forEach(field => {
        field.addEventListener("blur", () => validateField(field));
        ["input", "change"].forEach(eventName => {
            field.addEventListener(eventName, () => {
                if (field.classList.contains("is-invalid")) validateField(field);
            });
        });
    });

    // Hide the old message when the visitor starts a new booking
    form.addEventListener("input", () => {
        if (successBox && !successBox.classList.contains("d-none")) {
            successBox.classList.add("d-none");
        }
    });

    applyChosenSession(selectedNote);

    form.addEventListener("submit", event => {
        event.preventDefault();

        const allValid = fields.map(validateField).every(Boolean);

        if (!allValid) {
            if (successBox) {
                successBox.className = "form-alert mt-3";
                successBox.textContent = "Please correct the highlighted fields and try again.";
            }
            const firstInvalid = form.querySelector(".is-invalid");
            if (firstInvalid) firstInvalid.focus();
            return;
        }

        // Read the values BEFORE the form is cleared, to show a real confirmation
        const name = document.getElementById("fullName").value.trim();
        const training = document.getElementById("training").value;
        const level = document.getElementById("level").value;
        const date = new Date(`${document.getElementById("date").value}T00:00:00`)
            .toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

        form.reset();
        if (selectedNote) selectedNote.classList.add("d-none");

        fields.forEach(field => {
            field.classList.remove("is-valid", "is-invalid");
            field.removeAttribute("aria-invalid");
            const feedback = document.getElementById(`${field.id}Error`);
            if (feedback) feedback.textContent = "";
        });

        if (successBox) {
            successBox.className = "success-message mt-3 d-none";
            successBox.textContent =
                `Thank you, ${name}! Your ${training.toLowerCase()} (${level.toLowerCase()} level) is booked for ${date}. ` +
                "This demo does not send data to a server.";
            // jQuery effect: the confirmation fades in
            if (window.jQuery) {
                $(successBox).stop(true, true).hide().removeClass("d-none").fadeIn(300);
            } else {
                successBox.classList.remove("d-none");
            }
            successBox.focus();
        }
    });
}
