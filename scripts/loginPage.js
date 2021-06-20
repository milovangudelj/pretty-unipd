// Extract content from unnecessary wrappers

document.body.insertBefore(
	document.querySelector(
		".col-md-offset-2.col-md-8.col-xs-offset-1.col-xs-10.well"
	),
	document.body.children[0]
);
document.body.removeChild(document.body.children[1]);

// Change images

document
	.querySelector("img.img-responsive.pull-left")
	.setAttribute(
		"src",
		"https://upo.milvangudelj.com/images/single-sign-on.png"
	);
document
	.querySelector("img.img-responsive.pull-right")
	.setAttribute(
		"src",
		"https://upo.milvangudelj.com/images/logo-unipd-chiaro.png"
	);

// Get form reference

const uglyAssForm = document.querySelector(".form-horizontal");
uglyAssForm.parentElement.className = "";

// Login form manipulation

uglyAssForm.children[1].style.display = "none"; // Hide radio buttons
const submitButton = document.querySelector("div.col-xs-12 > #login_button_js"); // Get submit button
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
formGroup.children[0].innerHTML = 'Email <span class="required-field">*</span>';

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
