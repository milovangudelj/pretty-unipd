// Login form manipulation

oldForm.children[1].style.display = "none"; // Hide radio buttons
const submitButton = document.querySelector("div.col-xs-12 > #login_button_js"); // Get submit button
oldForm.insertBefore(submitButton, oldForm.children[3]); // Move it outside
oldForm.removeChild(oldForm.children[4]); // Remove old button wrapper
submitButton.className = "my-submit-btn"; // Add my class name

// Pull out form groups from their wrappers and hide them when done
let formField = document.querySelector(
	"span#div_hidden_before_js > div.form-group"
);
oldForm.insertBefore(formField, oldForm.children[0]);
formField = document.querySelector("div#passwordbox > div.form-group");
oldForm.insertBefore(formField, oldForm.children[1]);
oldForm.children[2].style.display = "none";
oldForm.children[4].style.display = "none";

// Pull out form input from unnecessary wrapper and add my class names
let formInput = document.querySelector("div > input#j_username_js");
let formGroup = formInput.parentElement.parentElement;
formGroup.insertBefore(formInput, formGroup.children[1]);
formGroup.removeChild(formGroup.children[2]);
formGroup.className = "my-form-group";
formInput.className = "my-form-control";
formGroup.children[0].className = "my-form-label";
formGroup.children[0].innerHTML = 'Email <span class="required-field">*</span>';

// Pull out form input from unnecessary wrapper and add my class names
formInput = document.querySelector("div > input#password");
formGroup = formInput.parentElement.parentElement;
formGroup.insertBefore(formInput, formGroup.children[1]);
formGroup.removeChild(formGroup.children[2]);
formGroup.className = "my-form-group";
formInput.className = "my-form-control";
formGroup.children[0].className = "my-form-label";
formGroup.children[0].innerHTML =
	'Password <span class="required-field">*</span>';
