let navbar = document.querySelector("header");
// navbar.parentElement.removeChild(navbar);
let myNavbar = fetch(
	"https://upo.milovangudelj.com/fragments/navbar.html"
).then((res) => {
	let temp = document.createElement("template");
	temp.innerHTML = res.trim();

	navbar.parentElement.replaceChild(temp.content.firstChild, navbar);

	return res;
});