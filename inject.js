// ==UserScript==
// @name         Unipd overhaul
// @namespace    http://tampermonkey.net/
// @version      0.1.6
// @description  It changes the styling of every page on University of Padua's website
// @author       Milovan Gudelj
// @match        https://*.unipd.it/*
// @icon         https://www.google.com/s2/favicons?domain=unipd.it
// @grant        none
// ==/UserScript==

(function () {
	"use strict";

	const filesLocation = "https://upo.milovangudelj.com/";
	const stylesheets = [
		{
			page: "elearning.dei.unipd.it/user/policy.php",
			css: filesLocation + "sitePolicyAgreement.css",
		},
		{
			page: "elearning.dei.unipd.it/UnipdPolicy.html",
			css: filesLocation + "unipdPolicy.css",
		},
		{
			page: "elearning.dei.unipd.it/course",
			css: filesLocation + "coursePage.css",
		},
	];

	// Check which page the user is currently on
	const location = window.location.href;
	let page = checkPath(location, stylesheets);
	console.log(`Currently on page ${page}:`, stylesheets[page]);

	// Append base stylesheet
	const baseStyles = document.createElement("link");
	baseStyles.setAttribute("rel", "stylesheet");
	baseStyles.setAttribute("href", filesLocation + "styles.css");
	document.head.appendChild(baseStyles);

	// Append specific stylesheet
	const myStyles = document.createElement("link");
	myStyles.setAttribute("rel", "stylesheet");
	myStyles.setAttribute("href", stylesheets[page].css);
	document.head.appendChild(myStyles);

	function checkPath(l, s) {
		// Checks if current location matches with one of the pages provided in the second parameter
		let page = -1;

		s.forEach((p, i) => {
			if (page === -1 && l.includes(p.page)) page = i;
		});

		return page;
	}
})();
