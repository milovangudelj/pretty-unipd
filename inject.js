// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
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
