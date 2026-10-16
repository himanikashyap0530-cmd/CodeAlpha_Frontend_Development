const cards = [...document.querySelectorAll(".photo")];
const filterButtons = [...document.querySelectorAll("[data-filter]")];
const lightbox = document.getElementById("lightbox");
const largeImage = document.getElementById("largeImage");
const caption = document.getElementById("caption");
let visibleCards = cards;
let current = 0;

filterButtons.forEach(button => button.addEventListener("click", () => {
  filterButtons.forEach(b => b.classList.remove("active"));
  button.classList.add("active");
  const category = button.dataset.filter;
  cards.forEach(card => card.hidden = category !== "all" && card.dataset.category !== category);
  visibleCards = cards.filter(card => !card.hidden);
}));

function showImage(index) {
  current = (index + visibleCards.length) % visibleCards.length;
  const card = visibleCards[current];
  const img = card.querySelector("img");
  largeImage.src = img.src;
  largeImage.alt = img.alt;
  caption.textContent = card.dataset.title;
  lightbox.classList.add("open");
}
cards.forEach(card => card.addEventListener("click", () => showImage(visibleCards.indexOf(card))));
document.getElementById("close").addEventListener("click", () => lightbox.classList.remove("open"));
document.getElementById("prev").addEventListener("click", () => showImage(current - 1));
document.getElementById("next").addEventListener("click", () => showImage(current + 1));
lightbox.addEventListener("click", e => { if (e.target === lightbox) lightbox.classList.remove("open"); });
document.addEventListener("keydown", e => {
  if (!lightbox.classList.contains("open")) return;
  if (e.key === "Escape") lightbox.classList.remove("open");
  if (e.key === "ArrowLeft") showImage(current - 1);
  if (e.key === "ArrowRight") showImage(current + 1);
});