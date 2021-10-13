let navbar = document.querySelector("header");

const doesHttpOnlyCookieExist = (cookiename) => {
	var d = new Date();
	d.setTime(d.getTime() + 1000);
	var expires = "expires=" + d.toUTCString();

	document.cookie = cookiename + "=new_value;path=/;" + expires;
	if (document.cookie.indexOf(cookiename + "=") == -1) {
		return true;
	} else {
		return false;
	}
};

let myNavbar = fetch("https://upo.milovangudelj.com/fragments/navbar.html")
	.then((res) => res.text())
	.then((txt) => {
		let temp = document.createElement("template");
		temp.innerHTML = txt.trim();

		navbar.parentElement.replaceChild(temp.content.firstChild, navbar);

		let oldHeader = document.querySelector("div#top-header");
		oldHeader.parentElement.removeChild(oldHeader);
		document.body.removeChild(document.querySelector("div#dock"));
		document.querySelector("div#page").style.paddingLeft = "0";
		checkLogIn();
	});

const checkLogIn = () => {
	let loggedIn = doesHttpOnlyCookieExist(
		"_shibsession_64656661756c7468747470733a2f2f656c6561726e696e672e6465692e756e6970642e69742f73686962626f6c657468"
	);

	let profileMenu = document.querySelector("#my-profile-menu");
	if (loggedIn) {
		let menuElements = document.body.querySelectorAll("a.icon.menu-action");
		let mySessionKey = menuElements[
			menuElements.length - 1
		].parentElement.innerHTML.substr(69, 10);
		profileMenu.children[1].lastElementChild.children[0].setAttribute(
			"href",
			`https://elearning.dei.unipd.it/login/logout.php?sesskey=${mySessionKey}`
		);
		profileMenu.style.display = "block";
	}
};