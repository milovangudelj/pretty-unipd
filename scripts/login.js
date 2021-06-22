let url = window.location.href;
let hasParams = url.includes("?"); // Check if url has any parameters
if (url.charAt(url.length - 1) === "#") url = url.slice(0, url.length - 2); // Remove # from end

const setLang = () => {
	let flags = [
		document.querySelector('img[title*="It"]').parentElement,
		document.querySelector('img[title*="En"]').parentElement,
	];

	// Set correct urls for language selectors

	flags[0].setAttribute("href", setUrl("lang=IT"));
	flags[1].setAttribute("href", setUrl("lang=EN"));

	// Set 'selected' class on flags based on current url lang

	flags.forEach((el) => el.classList.remove("selected"));
	flags[!url.includes("lang=EN") ? 0 : 1].classList.add("selected");
};

const setUrl = (lang = "lang=IT") => {
	let newUrl;

	if (url.includes("lang")) {
		let langParam = url.substr(url.indexOf("lang="), 7);
		newUrl = url.replace(langParam, lang);
	} else {
		newUrl = url + (hasParams ? "&" : "?") + lang;
	}

	return newUrl;
};
