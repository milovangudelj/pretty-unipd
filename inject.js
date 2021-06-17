// ==UserScript==
// @name         Unipd overhaul
// @namespace    http://tampermonkey.net/
// @version      0.1.1
// @description  It changes the styling of every page on University of Padua's website
// @author       Milovan Gudelj
// @match        https://*.unipd.it/*
// @icon         https://www.google.com/s2/favicons?domain=unipd.it
// @grant        none
// ==/UserScript==

(function () {
	"use strict";

	var link = document.createElement("link");
	link.setAttribute("rel", "stylesheet");
	link.setAttribute("href", "https://upo.milovangudelj.com/styles.css");
	document.head.appendChild(link);
})();
