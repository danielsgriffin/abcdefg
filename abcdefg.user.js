// ==UserScript==
// @name         Auto-Button-Click Double-check Evaluation for Funsies or Gnoses
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Clicks the button inside "model-response" whenever it appears unless "fact-check-tooltip" is present.
// @author       You
// @match        https://bard.google.com/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    console.log("Script started");

    const buttons = document.querySelectorAll('button[aria-label]');
    buttons.forEach(button => {
        console.log(button.getAttribute('aria-label'));
    });

    const clickButtonIfPresent = () => {
    const button = document.querySelector('button[aria-label="Double-check response"]');
        if (button) {
            console.log("Found button, clicking");

            clearInterval(initialInterval); // Clear the active interval before clicking the button
            button.click();

            alert("Your 'Auto-Button-Click Double-check Evaluation for Funsies or Gnoses' userscript has clicked the 'Double-check response' button! 🎉"); // Display a popup
            return; // Exit the function
        } else {
            console.log("Button not found");
        }
    };


    // Run the function once immediately
    clickButtonIfPresent();

    // Then set it to run every 10 seconds for the first minute
    let initialInterval = setInterval(clickButtonIfPresent, 10000);

    setTimeout(() => {
        clearInterval(initialInterval);
        // Removed the next interval since the script stops after clicking.
    }, 60000);

})();

