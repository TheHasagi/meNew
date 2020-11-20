// ==UserScript==
// @name         AdguardTeam/AdguardForAndroid#3656
// @description  The userscript storage wipes out when update. on Adgaurd For Android
// @version      0.0.2
// @include      https://example.com/*
// @include      https://example.net/*
// @include      http://example.com/*
// @include      http://example.net/*
// @run-at       document-end
// @require      https://greasemonkey.github.io/gm4-polyfill/gm4-polyfill.js
// @grant        GM.getValue
// @grant        GM_getValue
// @grant        GM.setValue
// @grant        GM_setValue
// @grant        GM.info
// @grant        GM_info
// ==/UserScript==

/* 
 * This userscript is made for explain AdguardTeam/AdguardForAndroid#3656
 * You should follows step to reproduce that described on issue that I wrote on.
 */

//@ts-check
(async () => {
    let mainDiv = document.querySelector("div")
    if (!mainDiv) return;
    
    
    /** @type string */
    //@ts-expect-error (No type definition for GreaseMonkey sets on this workspace)
    let scriptVersion = GM.info.script.version
    let versionP = document.createElement("p")
    versionP.innerHTML = `Script Version: ${scriptVersion}`

     /** @type string */
    //@ts-expect-error (No type definition for GreaseMonkey sets on this workspace)
    let scriptValue = await GM.getValue("value", "InitialValue")
    let valueP = document.createElement("p")
    valueP.innerHTML = `Script Value: ${scriptValue}`

    let inputP = document.createElement("p")
    /** @type HTMLInputElement */
    let inputElement = document.createElement("input");
    inputElement.setAttribute("type", "text");
    let buttonElement = document.createElement("input");
    buttonElement.setAttribute("type", "button");
    buttonElement.value = "Submit"
    let statusElement = document.createElement("p")

    buttonElement.addEventListener("click", async () => {
        //@ts-expect-error (No type definition for GreaseMonkey sets on this workspace)
        await GM.setValue("value", inputElement.value)

        //@ts-expect-error (No type definition for GreaseMonkey sets on this workspace)
        let savedValue = await GM.getValue("value", "InitialValue")

        valueP.innerHTML = `Script Value: ${savedValue}`
        statusElement.innerHTML = "The Value is saved. Loaded with script again: " + savedValue
    })

    inputP.appendChild(inputElement)
    inputP.appendChild(buttonElement)


    mainDiv.appendChild(versionP)
    mainDiv.appendChild(valueP)
    mainDiv.appendChild(inputP)
    mainDiv.appendChild(statusElement)
})();
