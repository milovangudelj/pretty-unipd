// ==UserScript==
// @name         Unipd overhaul
// @namespace    http://tampermonkey.net/
// @version      0.3.00
// @description  It changes the styling of a few pages on University of Padua's website
// @author       Milovan Gudelj
// @match        https://*.unipd.it/*
// @icon         https://www.google.com/s2/favicons?domain=unipd.it
// @grant        none
// ==/UserScript==

import locations from "./locations.json";

(function () {
	"use strict";

	const filesLocation = "https://upo.milovangudelj.com/";
	const cssFiles = "styles/";
	const jsFiles = "scripts/";
	const htmlFiles = "fragments/";

	// Check which page the user is currently on
	const location = window.location.href;
	let page = checkPath(location, locations);

	// Append jQuery
	const jQuery = document.createElement("script");
	jQuery.setAttribute("src", "https://code.jquery.com/jquery-3.6.0.min.js");
	jQuery.setAttribute(
		"integrity",
		"sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
	);
	jQuery.setAttribute("crossorigin", "anonymous");
	document.head.appendChild(jQuery);

	// Append base and variables stylesheets
	const cssVariables = document.createElement("link");
	const baseStyles = document.createElement("link");

	cssVariables.setAttribute("rel", "stylesheet");
	baseStyles.setAttribute("rel", "stylesheet");

	cssVariables.setAttribute(
		"href",
		filesLocation + cssFiles + "variables.css"
	);
	baseStyles.setAttribute("href", filesLocation + cssFiles + "base.css");

	document.head.appendChild(cssVariables);
	document.head.appendChild(baseStyles);

	// Append specific stylesheet
	if (page) {
		const myStyles = document.createElement("link");
		myStyles.setAttribute("rel", "stylesheet");
		myStyles.setAttribute("href", filesLocation + cssFiles + locations[page].css);
		document.head.appendChild(myStyles);

		if (locations[page].js) {
			const myScript = document.createElement("script");
			myScript.setAttribute("type", "application/javascript");
			myScript.setAttribute("src", filesLocation + jsFiles + locations[page].js);
			document.head.appendChild(myScript);
		}
	}

	function checkPath(l, s) {
		// Checks if current location matches with one of the pages provided in the second parameter
		let page = -1;

		s.forEach((p, i) => {
			if (page === -1 && l.includes(p.url)) page = i;
		});

		return page;
	}
})();
