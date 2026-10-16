const display = document.getElementById("display");
const message = document.getElementById("message");
let expression = "";

function update() { display.value = expression || "0"; }
function calculate() {
  if (!expression) return;
  // Only allow digits and basic arithmetic symbols before evaluating.
  if (!/^[0-9.+*/ -]+$/.test(expression)) { message.textContent = "Invalid expression."; return; }
  try {
    const result = Function('"use strict"; return (' + expression + ')')();
    if (!Number.isFinite(result)) throw new Error("Math error");
    expression = String(Number(result.toFixed(10)));
    message.textContent = "";
    update();
  } catch {
    message.textContent = "Please enter a valid calculation.";
  }
}
document.querySelector(".keys").addEventListener("click", event => {
  const button = event.target.closest("button");
  if (!button) return;
  message.textContent = "";
  if (button.dataset.action === "clear") { expression = ""; update(); return; }
  if (button.dataset.action === "delete") { expression = expression.slice(0, -1); update(); return; }
  if (button.dataset.action === "equals") { calculate(); return; }
  const value = button.dataset.value;
  if (value === "." && expression.split(/[+\-*/]/).pop().includes(".")) return;
  expression += value;
  update();
});
document.addEventListener("keydown", event => {
  if (/^[0-9.+*/-]$/.test(event.key)) { expression += event.key; update(); }
  else if (event.key === "Enter" || event.key === "=") { event.preventDefault(); calculate(); }
  else if (event.key === "Backspace") { expression = expression.slice(0, -1); update(); }
  else if (event.key === "Escape") { expression = ""; message.textContent = ""; update(); }
});