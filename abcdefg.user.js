// ==UserScript==
// @name         Auto-Button-Click Double-check Evaluation for Funsies or Gnoses
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Clicks the button inside "fact-check-button" whenever it appears unless "factuality-status" is present.
// @author       danielsgriffin
// @match        https://gemini.google.com/app/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
    'use strict';

    console.log("Script started");

    const buttons = document.querySelectorAll('button[aria-label]');
    buttons.forEach(button => {
        console.log(button.getAttribute('aria-label'));
    });

    function showToastNotification() {
        const toastContainer = document.createElement('div');
        toastContainer.textContent = "Your 'Auto-Button-Click Double-check Evaluation for Funsies or Gnoses' userscript has clicked the 'Double-check response' button! 🎉";
        Object.assign(toastContainer.style, {
            position: 'fixed',
            top: '20%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgb(255, 255, 255)',
            color: 'rgb(0, 0, 0)',
            padding: '30px',
            fontSize: '50px',
            borderRadius: '10px',
            zIndex: 1000,
            boxShadow: 'rgba(0, 0, 0, 0.3) 0px 4px 8px',
            display: 'block',
        });
        document.body.appendChild(toastContainer);
        toastContainer.style.display = 'block';
        setTimeout(() => toastContainer.style.display = 'none', 5000);
    }

    const clickButtonIfPresent = () => {
        const button = document.querySelector('button[aria-label="Double-check response"]');
        if (button) {
            console.log("Found button, clicking");

            clearInterval(initialInterval); // Clear the active interval before clicking the button
            button.click();

            showToastNotification();
            return; // Exit the function
        } else {
            console.log("Button not found");
        }
    };

    // Run the function once immediately
    clickButtonIfPresent();

    // Then set it to run every 1 second for the first minute
    let initialInterval = setInterval(clickButtonIfPresent, 1000);

    setTimeout(() => {
        clearInterval(initialInterval);
        // Removed the next interval since the script stops after clicking.
    }, 60000);

})();

