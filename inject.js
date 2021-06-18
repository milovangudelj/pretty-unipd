// ==UserScript==
// @name         Unipd overhaul
// @namespace    http://tampermonkey.net/
// @version      0.1.4
// @description  It changes the styling of every page on University of Padua's website
// @author       Milovan Gudelj
// @match        https://*.unipd.it/*
// @icon         https://www.google.com/s2/favicons?domain=unipd.it
// @grant        none
// ==/UserScript==

(function () {
	"use strict";

	const path = "https://upo.milovangudelj.com/";
	const styles = {
		base: path + "styles.css",
		sitePolicyAgreement: path + "sitePolicyAgreement.css",
		unipdPolicy: path + "unipdPolicy.css",
	};
	const location = window.location.href;

	var link = document.createElement("link");
	link.setAttribute("rel", "stylesheet");

	switch (location) {
		case "https://elearning.dei.unipd.it/user/policy.php":
			link.setAttribute("href", styles.sitePolicyAgreement);
			break;
		case "https://elearning.dei.unipd.it/UnipdPolicy.html":
			link.setAttribute("href", styles.unipdPolicy);
			break;
		default:
			link.setAttribute("href", styles.base);
			break;
	}

	document.head.appendChild(link);
})();
