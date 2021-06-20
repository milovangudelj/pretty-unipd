const oldForm = document.querySelector(".form-horizontal");

const newForm = document.createElement("form");
newForm.setAttribute("class", "my-login-form");
newForm.setAttribute("id", "user-login-form");
newForm.setAttribute(
	"action",
	window.location.href.slice(window.location.href.indexOf("/idp"))
);
newForm.setAttribute("method", "post");
newForm.setAttribute("onsubmit", "return my_login_via_js()");
newForm.innerHTML = `
<div class="my-form-group">
	<label class="my-form-label" for="js_username"
		>Email <span class="required-field">*</span></label
	>
	<input
		class="my-form-control"
		id="j_username_js"
		name="j_username_js"
		type="text"
		value=""
		tabindex="1"
		placeholder="nome.cognome@unipd.it"
		required
	/>
</div>
<div class="my-form-group">
	<label class="my-form-label" for="password"
		>Password <span class="required-field">*</span></label
	>
	<input
		class="my-form-control"
		id="password"
		name="j_password"
		type="password"
		value=""
		tabindex="2"
		required
	/>
</div>

<button
	class="btn my-submit-btn"
	type="submit"
	name="_eventId_proceed"
	id="login_button_js"
	onclick="javascript:my_login_via_js()"
	tabindex="3"
>
	Accedi
</button>`;

// oldForm.parentElement.replaceChild(newForm, oldForm);
oldForm.parentElement.appendChild(newForm);

const myLoginScript = document.createElement("script");
myLoginScript.setAttribute("type", "text/javascript");
myLoginScript.innerText = `
function my_login_via_js(){

	var userjs = document.getElementById('j_username_js');
	var user = document.getElementById('j_username');
	var jpassword = document.getElementById('j_password');
	var formlogin = document.getElementById('user-login-form');

	var StrBlank = userjs.value.substring(0, 1);
	while (StrBlank == " ")
	{
	 userjs.value = userjs.value.substring(1, userjs.value.length);
	 StrBlank = userjs.value.substring(0, 1);
	}
	
	StrBlank = userjs.value.substring(userjs.value.length - 1, userjs.value.length);
															
	while (StrBlank == " ")
	{
	 userjs.value = userjs.value.substring(0, userjs.value.length-1);
	 StrBlank = userjs.value.substring(userjs.value.length-1, userjs.value.length);
	}

	user.value= userjs.value;

	return true;
};
`;
document.body.appendChild(myLoginScript);
