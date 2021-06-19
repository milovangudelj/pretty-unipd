const oldForm = document.querySelector(".form-horizontal");

const newForm = document.createElement("form");
newForm.innerHTML = `<form
class="my-login-form"
id="user-login-form"
action="/idp/profile/SAML2/Redirect/SSO?execution=e1s2"
method="post"
onsubmit="return login_via_js()"
>
<div class="my-form-group">
	<label class="my-form-label" for="js_username"
		>Email <span class="required-field">*</span></label
	>
	<input
		class="my-form-control"
		id="j_username"
		name="j_username"
		type="text"
		value=""
		tabindex="1"
		placeholder="nome.cognome@unipd.it"
		required
	/>
</div>
<div class="my-form-group">
	<label class="my-form-label" for="j_password"
		>Password <span class="required-field">*</span></label
	>
	<input
		class="my-form-control"
		id="j_password"
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
	onclick="javascript:login_via_js()"
	tabindex="3"
>
	Accedi
</button>
</form>`;

oldForm.parentElement.replaceChild(newForm, oldForm);
