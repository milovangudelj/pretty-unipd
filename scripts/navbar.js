let navbar = document.querySelector("header");
// navbar.parentElement.removeChild(navbar);
let myNavbar = fetch("https://upo.milovangudelj.com/fragments/navbar.html")
	.then((res) => res.text())
	.then((txt) => {
		let temp = document.createElement("template");
		temp.innerHTML = txt.trim();

		navbar.parentElement.replaceChild(temp.content.firstChild, navbar);

		return txt;
	});