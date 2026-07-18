const sheet = document.querySelector(".sheet-peek");
const threshold = 70;

let startY = 0;
let isDragging = false;

sheet.addEventListener("pointerdown", (e) => {
  startY = e.clientY;
  isDragging = true;
});

document.addEventListener("pointermove", (e) => {
  if (!isDragging) return;
  const deltaY = startY - e.clientY;
  if (deltaY > 0) {
    sheet.style.transform = `translateY(-${Math.min(deltaY, 120)}px)`;
  }
});

document.addEventListener("pointerup", (e) => {
  if (!isDragging) return;
  isDragging = false;
  const deltaY = startY - e.clientY;

  if (deltaY > threshold) {
    window.location.href = "login.html";
  } else {
    sheet.style.transform = "translateY(0)";
  }
});
