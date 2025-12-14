const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const card = document.querySelector(".card");
const result = document.getElementById("result");
const loveImage = document.getElementById("loveImage");

// Radius from center (px)
const RADIUS = 140;

function teleportNearCenter() {
  const btnRect = noBtn.getBoundingClientRect();
  const cardRect = card.getBoundingClientRect();

  // Lock size (prevents flicker/disappear)
  noBtn.style.width = btnRect.width + "px";
  noBtn.style.height = btnRect.height + "px";

  // Center of card
  const centerX = cardRect.left + cardRect.width / 2;
  const centerY = cardRect.top + cardRect.height / 2;

  // Random angle + distance
  const angle = Math.random() * Math.PI * 2;
  const distance = Math.random() * RADIUS;

  let x = centerX + Math.cos(angle) * distance - btnRect.width / 2;
  let y = centerY + Math.sin(angle) * distance - btnRect.height / 2;

  // Clamp inside card
  const minX = cardRect.left + 12;
  const maxX = cardRect.right - btnRect.width - 12;
  const minY = cardRect.top + 12;
  const maxY = cardRect.bottom - btnRect.height - 12;

  x = Math.max(minX, Math.min(x, maxX));
  y = Math.max(minY, Math.min(y, maxY));

  // Smoke effect
  const smoke = document.createElement("div");
  smoke.className = "smoke";
  smoke.style.left = btnRect.left + btnRect.width / 2 - 40 + "px";
  smoke.style.top = btnRect.top + btnRect.height / 2 - 40 + "px";
  document.body.appendChild(smoke);
  setTimeout(() => smoke.remove(), 450);

  // Move button
  noBtn.style.position = "fixed";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

// Desktop + mobile
noBtn.addEventListener("mouseenter", teleportNearCenter);
noBtn.addEventListener("touchstart", teleportNearCenter);

function createFlower() {
  const flower = document.createElement("div");
  flower.className = "flower";
  flower.textContent = ["🌸", "🌷", "🌺", "🌹", "💐"][
    Math.floor(Math.random() * 5)
  ];

  flower.style.left = Math.random() * window.innerWidth + "px";
  flower.style.animationDuration = 4 + Math.random() * 3 + "s";

  document.body.appendChild(flower);

  setTimeout(() => flower.remove(), 7000);
}

yesBtn.addEventListener("click", () => {
  // Show result text
  result.classList.add("show");

  // Show animated image
  loveImage.style.display = "block";

  // Stop NO button from escaping anymore
  noBtn.removeEventListener("mouseenter", teleportNearCenter);
  noBtn.removeEventListener("touchstart", teleportNearCenter);

  // Flower rain burst
  for (let i = 0; i < 25; i++) {
    setTimeout(createFlower, i * 150);
  }
});
