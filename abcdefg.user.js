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
    let extractFactChecks = localStorage.getItem('extractFactChecks');
    function setFactCheckExtraction(value) {
        if (value === 'true' || value === 'false') {
            localStorage.setItem('extractFactChecks', value);
            console.log(`Fact-check extraction setting updated successfully to ${value}.`);
            return true;
        } else {
            console.log("Invalid value. Please use 'true' or 'false' as the argument.");
            return false;
        }
    }
    if (extractFactChecks === null) {
        extractFactChecks = confirm('Do you want to enable fact-check extraction? Click OK for yes, Cancel for no.') ? 'true' : 'false';
        setFactCheckExtraction(extractFactChecks)
        console.log(`Fact-check extraction has been set to ${extractFactChecks}.`);
    } else {
        console.log(`Fact-check extraction is currently set to ${extractFactChecks}. To change this setting, use setFactCheckExtraction({true/false})`);

    }

    const buttons = document.querySelectorAll('button[aria-label]');
    buttons.forEach(button => {
        console.log(button.getAttribute('aria-label'));
    });

    function showToastNotification() {
        const toastContainer = document.createElement('div');
        const toastHeader = document.createElement('h2');
        toastHeader.textContent = 'abcdefg.user.js:';
        toastContainer.appendChild(toastHeader);
        const toastMessage = document.createElement('span');
        toastMessage.textContent = "Your 'Auto-Button-Click Double-check Evaluation for Funsies or Gnoses' userscript has clicked the 'Double-check response' button! 🎉";
        toastContainer.appendChild(toastMessage);
        Object.assign(toastContainer.style, {
            position: 'fixed',
            top: '0',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgb(255, 255, 255)',
            color: 'rgb(0, 0, 0)',
            padding: '10px',
            fontSize: '18px',
            borderRadius: '0 0 10px 10px',
            zIndex: 1000,
            boxShadow: 'rgba(0, 0, 0, 0.3) 0px 4px 8px',
            display: 'block',
        });
        document.body.appendChild(toastContainer);
        toastContainer.style.display = 'block';
        setTimeout(() => toastContainer.style.display = 'none', 3000);
        if (extractFactChecks) { setExtractionTimer() }
    }

    let buttonClicked = false;
    let extractedFactChecks = false

    function setExtractionTimer() {
        let secondsCounter = 0;
        const timerDisplay = document.createElement('div');
        timerDisplay.id = "double-check-timer"
        Object.assign(timerDisplay.style, {
            position: 'fixed',
            top: '0px',
            left: '0px',
            backgroundColor: 'white',
            color: 'rgb(0, 0, 0)',
            padding: '5px',
            fontSize: '16px',
            borderRadius: '0 0 5px 5px',
            zIndex: 1001,
        });
        timerDisplay.textContent = 'Double-check Timer: 0 seconds';
        document.body.appendChild(timerDisplay);

        const timerInterval = setInterval(() => {
            if (!extractedFactChecks) {
                secondsCounter++;
                timerDisplay.textContent = `Double-check Timer: ${secondsCounter} seconds`;
            } else {
                clearInterval(timerInterval);
            }
        }, 1000);
    }

    function runDoubleCheck() {
        if (!buttonClicked) {
            const button = document.querySelector('button[aria-label="Double-check response"]');
            if (button) {
                console.log("Found button, clicking");
                button.click();
                showToastNotification();
                buttonClicked = true;
            } else {
                console.log("Button not found");
            }
        } else if (extractFactChecks && !extractedFactChecks) {
            if (searchAndProcessSpans()) {
                clearInterval(initialInterval); // Clear the interval after both button click and span processing are complete
                }
        }
    }

    function getExtractionContainer() {
        const extractionContainer = document.createElement('div');
        Object.assign(extractionContainer.style, {
            position: 'fixed',
            top: '0',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'white',
            color: 'black',
            padding: '10px',
            fontSize: '16px',
            borderRadius: '0 0 5px 5px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            zIndex: '9999',
            display: 'block',
        });

        const collapseButton = document.createElement('button');
        collapseButton.textContent = 'Close';
        collapseButton.style.cssText = 'position: absolute; right: 10px; top: 5px; background-color: #f1f1f1; border: none; cursor: pointer;';
        collapseButton.onclick = function() {
            document.body.removeChild(extractionContainer);
            const doubleCheckTimer = document.getElementById('double-check-timer');
            if (doubleCheckTimer) {
                doubleCheckTimer.remove();
            }
        };
        extractionContainer.appendChild(collapseButton);

        const extractionHeader = document.createElement('h3');
        extractionHeader.textContent = 'abcdefg: Double-checked spans';
        extractionContainer.appendChild(extractionHeader);
        return extractionContainer;
    }

    function searchAndProcessSpans() {
        console.log("Searching for spans"); // Added for debugging
        const spans = document.querySelectorAll('span.entailed, span.contradictory');
        if (spans.length === 0) {
            console.log("No spans found."); // Added for debugging
            return false;
        } else {
            console.log(`Found ${spans.length} spans.`); // Added for debugging
            extractedFactChecks = true
            const extractionContainer = getExtractionContainer()
            spans.forEach(span => {
                if (span.innerText.trim() !== '') {
                    console.log(`Processing span: ${span.innerText}`); // Added for debugging
                    const spanDiv = document.createElement('div');
                    const statusSpan = document.createElement('span');
                    if (span.classList.contains('contradictory')) {
                        statusSpan.textContent = 'contradictory:\t';
                        statusSpan.style.color = 'red';
                    } else if (span.classList.contains('entailed')) {
                        statusSpan.textContent = 'entailed:\t';
                        statusSpan.style.color = 'green';
                    }
                    spanDiv.appendChild(statusSpan);
                    const textSpan = document.createElement('span');
                    textSpan.textContent = span.innerText;
                    spanDiv.appendChild(textSpan);
                    extractionContainer.appendChild(spanDiv);
                }
            });
            const footer = document.createElement('div');
            const githubLink = document.createElement('a');
            githubLink.href = 'https://github.com/danielsgriffin/abcdefg';
            githubLink.textContent = 'GitHub: danielsgriffin/abcdefg';
            githubLink.style.cssText = 'display: block; text-align: center; margin-top: 20px; color: blue;';
            footer.appendChild(githubLink);

            const tagline = document.createElement('small');
            tagline.textContent = 'Auto-Button-Click Double-check Evaluation for Funsies or Gnoses';
            tagline.style.cssText = 'display: block; text-align: center; margin-top: 5px;';
            footer.appendChild(tagline);

            extractionContainer.appendChild(footer);
            console.log("extractionContainer appended to body"); // Added for debugging
            document.body.appendChild(extractionContainer);
            return true
        }
    }
    
    // Run the function once immediately
    runDoubleCheck();

    // Then set it to run every 1 second for the first minute
    let initialInterval = setInterval(runDoubleCheck, 1000);

    setTimeout(() => {
        clearInterval(initialInterval);
        // Removed the next interval since the script stops after clicking.
    }, 60000);

})();

