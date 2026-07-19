const hero = document.getElementById("hero");
const heroImg = document.getElementById("heroImg");
const heroText = document.getElementById("heroText");
const heroGreeting = document.getElementById("heroGreeting");
const swipeHint = document.getElementById("swipeHint");
const authSheet = document.getElementById("authSheet");
const sheetHandle = document.getElementById("sheetHandle");
const sheetContent = document.getElementById("sheetContent");

let sheetHeight = authSheet.offsetHeight;
let peek = 44;
let maxTravel = sheetHeight - peek;

let startY = 0;
let isDragging = false;
let currentTravel = maxTravel;

const smoothEasing = "cubic-bezier(0.4, 0, 0.2, 1)";
const baseDuration = 0.4;
const minDuration = 0.18;

const panAmount = 110; // چقدر عکس به سمت بالا بلغزه (پیکسل)
const zoomAmount = 0.18; // چقدر هم‌زمان زوم بشه

function setProgress(travel) {
  const progress = 1 - travel / maxTravel;

  authSheet.style.transform = `translateY(${travel}px)`;

  heroImg.style.transform = `translateY(-${progress * panAmount}px) scale(${1 + progress * zoomAmount})`;

  heroText.style.opacity = Math.max(0, 1 - progress * 2);
  heroGreeting.style.opacity = Math.max(0, progress * 2 - 1);
  swipeHint.style.opacity = Math.max(0, 1 - progress * 1.5);

  sheetContent.style.opacity = progress;
  sheetContent.style.pointerEvents = progress > 0.5 ? "auto" : "none";
}

window.addEventListener("resize", () => {
  sheetHeight = authSheet.offsetHeight;
  maxTravel = sheetHeight - peek;
});

sheetHandle.addEventListener("pointerdown", (e) => {
  startY = e.clientY;
  isDragging = true;
  authSheet.style.transition = "none";
  heroImg.style.transition = "none";
  sheetContent.style.transition = "none";
});

document.addEventListener("pointermove", (e) => {
  if (!isDragging) return;
  const deltaY = startY - e.clientY;
  let travel = maxTravel - deltaY;
  travel = Math.max(0, Math.min(maxTravel, travel));
  currentTravel = travel;
  setProgress(travel);
});

document.addEventListener("pointerup", () => {
  if (!isDragging) return;
  isDragging = false;

  const progress = 1 - currentTravel / maxTravel;
  const target = progress > 0.35 ? 0 : maxTravel;

  const remainingRatio = Math.abs(target - currentTravel) / maxTravel;
  const duration = Math.max(minDuration, baseDuration * remainingRatio);

  authSheet.style.transition = `transform ${duration}s ${smoothEasing}`;
  heroImg.style.transition = `transform ${duration}s ${smoothEasing}`;
  sheetContent.style.transition = `opacity ${duration}s ease`;

  currentTravel = target;
  setProgress(target);
});

setProgress(maxTravel);

authSheet.addEventListener("submit", function (e) {
  e.preventDefault();
  window.location.href = "index.html";
});
