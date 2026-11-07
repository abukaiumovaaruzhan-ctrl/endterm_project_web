"use strict";

// Training price calculator: sessions per month x price per session.
function updatePrice() {
    const quantityInput = document.getElementById("sessionCount");
    const typeInput = document.getElementById("sessionType");
    const totalOutput = document.getElementById("totalPrice");
    const errorOutput = document.getElementById("calculatorError");

    if (!quantityInput || !typeInput || !totalOutput) return;

    const rawQuantity = Number(quantityInput.value);
    const isValid =
        quantityInput.value.trim() !== "" &&
        Number.isInteger(rawQuantity) &&
        rawQuantity >= 1 &&
        rawQuantity <= 20;

    if (!isValid) {
        if (errorOutput) errorOutput.textContent = "Enter a whole number between 1 and 20.";
        quantityInput.classList.add("is-invalid");
        totalOutput.textContent = "—";
        return;
    }

    if (errorOutput) errorOutput.textContent = "";
    quantityInput.classList.remove("is-invalid");

    const total = rawQuantity * Number(typeInput.value);
    totalOutput.textContent = `${total.toLocaleString("en-US")} ₸`;
}
