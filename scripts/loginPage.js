// Url stuff

let url = window.location.href;
let localhost = !url.includes("unipd.it");
let hasParams = url.includes("?"); // Check if url has any parameters
if (url.charAt(url.length - 1) === "#") url = url.slice(0, url.length - 2); // Remove # from end
let currentLang = url.includes("lang=EN") ? "EN" : "IT";

if (!localhost && !document.body.hasAttribute("onload")) swapInterfaces();

// Load my html fragment

const fragment = localhost
	? "/fragments/myLogin.html"
	: "https://upo.milovangudelj.com/fragments/myLogin.html";
const i18nData = localhost
	? "/i18n/loginPage.json"
	: "https://upo.milovangudelj.com/i18n/loginPage.json";

if (!document.body.hasAttribute("onload")) {
	$(document).ready(() => {
		$(".new-interface").load(fragment, async () => {
			setLang();

			const res = await fetch(i18nData);
			const data = await res.json();

			setFormAction();

			translate(data[currentLang]);
		});
	});
}

/** Sets the language selectors' links */
function setLang() {
	console.log("Setting language...");

	let flags = [
		document.querySelector('img[title*="It"]').parentElement,
		document.querySelector('img[title*="En"]').parentElement,
	];

	// Set correct urls for language selectors

	flags[0].setAttribute("href", setUrl("IT"));
	flags[1].setAttribute("href", setUrl("EN"));

	// Set 'selected' class on flags based on current url lang

	flags.forEach((el) => el.classList.remove("selected"));
	flags[!url.includes("lang=EN") ? 0 : 1].classList.add("selected");
}

/** Sets the correct link for a given language */
function setUrl(lang = "IT") {
	let newUrl;

	if (url.includes("lang")) {
		let langParam = url.substr(url.indexOf("lang="), 7);
		newUrl = url.replace(langParam, "lang=" + lang);
	} else {
		newUrl = url + (hasParams ? "&" : "?") + "lang=" + lang;
	}

	return newUrl;
}

/** Translates the form to the selected language	 */
function translate(i18n) {
	let form = i18n.form;
	document.querySelector("#j_username_js").placeholder = form.emailPlaceholder;
	document.querySelector(".my-submit-btn").innerText = form.loginBtn;
	document.querySelector(".alternative").innerText = form.or;
	document.querySelector(".spid-login-btn > span").innerText = form.spid;

	let help = i18n.help;
	document.querySelector(".accordion-title > span").innerText = help.title;

	[
		...document.querySelector(".accordion-link:first-of-type").children,
	].forEach((el, i) => {
		el.innerText = help.students[i];
	});

	[...document.querySelector(".accordion-link:last-of-type").children].forEach(
		(el, i) => {
			el.innerText = help.staff[i];
		}
	);
}

/** Swaps old interface with the new one and removes old styles */
function swapInterfaces() {
	// Add container for the new interface

	const newInterface = document.createElement("div");
	newInterface.setAttribute("class", "new-interface");

	document.body.appendChild(newInterface);

	// Remove old container and default body classes

	document.body.removeChild(document.body.children[0]);
	document.body.removeAttribute("class");

	// Remove default stylesheets

	const defStyles = document.querySelector("style:first-of-type");
	const bootstrap = document.querySelectorAll('link[href*="bootstrap"]');
	if (defStyles) document.head.removeChild(defStyles);
	if (bootstrap) bootstrap.forEach((el) => document.head.removeChild(el));
}

/** Set action attribute for my form */
function setFormAction() {
	const myForm = document.querySelector(".my-login-form");
	myForm.setAttribute("action", url.slice(url.indexOf("/idp")));
}
