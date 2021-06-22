// Language stuff

let url = window.location.href;
let localhost = !url.includes("unipd.it");
let hasParams = url.includes("?"); // Check if url has any parameters
if (url.charAt(url.length - 1) === "#") url = url.slice(0, url.length - 2); // Remove # from end
let currentLang = url.includes("lang=EN") ? "EN" : "IT";

// Load my html fragment

$(document).ready(() => {
	$(".new-interface").load(
		localhost
			? "/fragments/myLogin.html"
			: "https://upo.milovangudelj.com/fragments/myLogin.html",
		async () => {
			oldInterfaceManipulation();
			setLang();
			const res = await fetch(
				localhost
					? "/i18n/loginPage.json"
					: "https://upo.milovangudelj.com/i18n/loginPage.json"
			);
			const data = await res.json();
			translate(data[currentLang]);
		}
	);
});

// Old interface manipulation

const oldInterfaceManipulation = () => {
	// Get form reference

	const uglyAssForm = document.querySelector(".form-horizontal");
	uglyAssForm.parentElement.className = "";

	// Login form manipulation

	uglyAssForm.children[1].style.display = "none"; // Hide radio buttons
	const submitButton = document.querySelector(
		"div.col-xs-12 > #login_button_js"
	); // Get submit button
	uglyAssForm.insertBefore(submitButton, uglyAssForm.children[3]); // Move it outside
	uglyAssForm.removeChild(uglyAssForm.children[4]); // Remove old button wrapper
	submitButton.className = "my-submit-btn"; // Add my class name
	submitButton.removeAttribute("style"); // Removing default hidden styles

	// Pull out form groups from their wrappers and hide them when done
	let formField = document.querySelector(
		"span#div_hidden_before_js > div.form-group"
	);
	uglyAssForm.insertBefore(formField, uglyAssForm.children[0]);
	formField = document.querySelector("div#passwordbox > div.form-group");
	uglyAssForm.insertBefore(formField, uglyAssForm.children[1]);
	uglyAssForm.children[2].style.display = "none";
	uglyAssForm.children[4].style.display = "none";

	// Pull out form input from unnecessary wrapper and add my class names
	let formInput = document.querySelector("div > input#j_username_js");
	let formGroup = formInput.parentElement.parentElement;
	formGroup.insertBefore(formInput, formGroup.children[1]);
	formGroup.removeChild(formGroup.children[2]);
	formGroup.className = "my-form-group";
	formInput.className = "my-form-control";
	formInput.setAttribute("placeholder", "nome.cognome@unipd.it");
	formInput.setAttribute("required", "");
	formGroup.children[0].className = "my-form-label";
	formGroup.children[0].innerHTML =
		'Email <span class="required-field">*</span>';

	// Pull out form input from unnecessary wrapper and add my class names
	formInput = document.querySelector("div > input#password");
	formGroup = formInput.parentElement.parentElement;
	formGroup.insertBefore(formInput, formGroup.children[1]);
	formGroup.removeChild(formGroup.children[2]);
	formGroup.className = "my-form-group";
	formInput.className = "my-form-control";
	formInput.setAttribute("required", "");
	formGroup.children[0].className = "my-form-label";
	formGroup.children[0].innerHTML =
		'Password <span class="required-field">*</span>';

	// Extract content from unnecessary wrappers

	document.body.insertBefore(
		document.querySelector(
			".col-md-offset-2.col-md-8.col-xs-offset-1.col-xs-10.well"
		),
		document.body.children[0]
	);
	document.body.removeChild(document.body.children[1]);

	// Remove default stylesheets

	const defStyles = document.querySelector("style:first-of-type");
	const bootstrap = document.querySelectorAll('link[href*="bootstrap"]');
	document.head.removeChild(defStyles);
	bootstrap.forEach((el) => document.head.removeChild(el));

	// Create placeholders

	const oldInterface = document.createElement("div");
	oldInterface.setAttribute("class", "old-interface");
	const newInterface = document.createElement("div");
	newInterface.setAttribute("class", "new-interface");

	document.body.appendChild(oldInterface);
	document.body.appendChild(newInterface);

	oldInterface.insertBefore(
		document.querySelector(
			".col-md-offset-2.col-md-8.col-xs-offset-1.col-xs-10.well"
		),
		null
	);

	// Hide crappy interface

	oldInterface.style.setProperty("display", "none");
	document.body.removeAttribute("class");
};

/** Sets the language selectors' links */
const setLang = () => {
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
};

/** Sets the correct link for a given language */
const setUrl = (lang = "IT") => {
	let newUrl;

	if (url.includes("lang")) {
		let langParam = url.substr(url.indexOf("lang="), 7);
		newUrl = url.replace(langParam, "lang=" + lang);
	} else {
		newUrl = url + (hasParams ? "&" : "?") + "lang=" + lang;
	}

	return newUrl;
};

/** Translates the form to the selected language	 */
const translate = (i18n) => {
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
};
