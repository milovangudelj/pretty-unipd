let navbar = document.querySelector("header");
// navbar.parentElement.removeChild(navbar);
let myNavbar = fetch("https://upo.milovangudelj.com/fragments/navbar.html");
let temp = document.createElement("template");
temp.innerHTML = myNavbar.trim();

navbar.parentElement.replaceChild(temp.content.firstChild, navbar);