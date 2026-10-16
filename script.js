document.getElementById("year").textContent = new Date().getFullYear();
const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");
menuButton.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => navLinks.classList.remove("open")));