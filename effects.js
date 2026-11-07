"use strict";

// jQuery effects. Hover handlers are delegated ($(document).on) so they also work
// for cards and buttons that are created later by JavaScript (search and filter).
$(function () {

    // Effect 1: FAQ accordion — one answer open at a time
    $(".faq-question").on("click", function () {
        const $question = $(this);
        const $answer = $("#" + $question.attr("aria-controls"));
        const opening = $question.attr("aria-expanded") !== "true";

        $(".faq-question").not($question).attr("aria-expanded", "false").find("span").text("+");
        $(".faq-answer").not($answer).stop(true, true).slideUp(250);

        // stop(true, true) finishes a running animation, so fast repeated clicks cannot break it
        $answer.stop(true, true)[opening ? "slideDown" : "slideUp"](250);
        $question.attr("aria-expanded", String(opening)).find("span").text(opening ? "−" : "+");
    });

    // Effect 2: hover animation on cards
    $(document)
        .on("mouseenter", ".feature-card, .session-card, .gallery-card", function () {
            $(this).stop(true).animate({ marginTop: "-5px" }, 150);
        })
        .on("mouseleave", ".feature-card, .session-card, .gallery-card", function () {
            $(this).stop(true).animate({ marginTop: "0px" }, 150);
        });

    // Effect 3: hover animation on buttons
    $(document)
        .on("mouseenter", ".btn", function () {
            $(this).stop(true).animate({ opacity: 0.88 }, 120);
        })
        .on("mouseleave", ".btn", function () {
            $(this).stop(true).animate({ opacity: 1 }, 120);
        });

    // Effect 4: "Back to top" button with smooth scroll and fade
    const $topButton = $('<button type="button" class="back-to-top" aria-label="Back to top">↑</button>')
        .hide()
        .appendTo("body");
    let topVisible = false;

    $(window).on("scroll", function () {
        const shouldShow = $(window).scrollTop() > 400;
        if (shouldShow !== topVisible) {            // act only when the state changes
            topVisible = shouldShow;
            $topButton.stop(true, true)[shouldShow ? "fadeIn" : "fadeOut"](200);
        }
    });

    $topButton.on("click", function () {
        $("html, body").stop(true).animate({ scrollTop: 0 }, 400);
    });
});
