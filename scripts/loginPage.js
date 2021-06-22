// Language stuff

let url = window.location.href;
let localhost = !url.includes("unipd.it");
let hasParams = url.includes("?"); // Check if url has any parameters
if (url.charAt(url.length - 1) === "#") url = url.slice(0, url.length - 2); // Remove # from end
let currentLang = url.includes("lang=EN") ? "EN" : "IT";

if (!localhost) oldInterfaceManipulation();

// Load my html fragment

const fragment = localhost
	? "/fragments/myLogin.html"
	: "https://upo.milovangudelj.com/fragments/myLogin.html";
const i18nData = localhost
	? "/i18n/loginPage.json"
	: "https://upo.milovangudelj.com/i18n/loginPage.json";

$(document).ready(() => {
	$(".new-interface").load(fragment, async () => {
		setLang();

		const res = await fetch(i18nData);
		const data = await res.json();

		moveForm();

		translate(data[currentLang]);
	});
});

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

/** Old interface manipulation */
function oldInterfaceManipulation() {
	// Create placeholders

	const oldInterface = document.createElement("div");
	oldInterface.setAttribute("class", "old-interface");
	oldInterface.style.setProperty("display", "none");

	const newInterface = document.createElement("div");
	newInterface.setAttribute("class", "new-interface");

	document.body.appendChild(newInterface);
	document.body.appendChild(oldInterface);

	oldInterface.insertBefore(
		document.querySelector(
			".col-md-offset-2.col-md-8.col-xs-offset-1.col-xs-10.well"
		),
		null
	);

	// Remove old container and default body classes

	document.body.removeChild(document.body.children[0]);
	document.body.removeAttribute("class");

	// Remove default stylesheets

	const defStyles = document.querySelector("style:first-of-type");
	const bootstrap = document.querySelectorAll('link[href*="bootstrap"]');
	document.head.removeChild(defStyles);
	bootstrap.forEach((el) => document.head.removeChild(el));
}

/** Move old form pieces to new interface */
function moveForm() {
	// Get form reference

	const uglyAssForm = document.querySelector(".form-horizontal");
	const myForm = document.querySelector(".my-login-form");

	// Login form manipulation

	uglyAssForm.children[1].style.display = "none"; // Hide radio buttons

	const submitButton = document.querySelector(
		"div.col-xs-12 > #login_button_js"
	); // Get submit button
	myForm.replaceChild(submitButton, myForm.children[2]); // Replace submit button with old one

	submitButton.removeAttribute("style"); // Removing default hidden styles
	submitButton.setAttribute("class", "my-btn my-submit-btn"); // Add my class name

	// // Pull out form groups from their wrappers and hide them when done
	// let formField = document.querySelector(
	// 	"span#div_hidden_before_js > div.form-group"
	// );
	// uglyAssForm.insertBefore(formField, uglyAssForm.children[0]);
	// formField = document.querySelector("div#passwordbox > div.form-group");
	// uglyAssForm.insertBefore(formField, uglyAssForm.children[1]);
	// uglyAssForm.children[2].style.display = "none";
	// uglyAssForm.children[4].style.display = "none";

	// // Pull out form input from unnecessary wrapper and add my class names
	// let formInput = document.querySelector("div > input#j_username_js");
	// let formGroup = formInput.parentElement.parentElement;
	// formGroup.insertBefore(formInput, formGroup.children[1]);
	// formGroup.removeChild(formGroup.children[2]);
	// formGroup.className = "my-form-group";
	// formInput.className = "my-form-control";
	// formInput.setAttribute("placeholder", "nome.cognome@unipd.it");
	// formInput.setAttribute("required", "");
	// formGroup.children[0].className = "my-form-label";
	// formGroup.children[0].innerHTML =
	// 	'Email <span class="required-field">*</span>';

	// // Pull out form input from unnecessary wrapper and add my class names
	// formInput = document.querySelector("div > input#password");
	// formGroup = formInput.parentElement.parentElement;
	// formGroup.insertBefore(formInput, formGroup.children[1]);
	// formGroup.removeChild(formGroup.children[2]);
	// formGroup.className = "my-form-group";
	// formInput.className = "my-form-control";
	// formInput.setAttribute("required", "");
	// formGroup.children[0].className = "my-form-label";
	// formGroup.children[0].innerHTML =
	// 	'Password <span class="required-field">*</span>';
}
