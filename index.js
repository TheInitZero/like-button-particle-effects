import { random } from "https://cdn.skypack.dev/lodash";

const MOVE_DURATION = 500;
const FADE_DURATION = 1000;
const MAX_DISPLACEMENT = 48;

/** @type {HTMLButtonElement} */
const $likeButton = document.getElementById("likeButton");

$likeButton.addEventListener("click", function () {
  const className = "like-button--liked";
  $likeButton.classList.toggle(className);

  const isLiked = $likeButton.classList.contains(className);
  if (!isLiked) return;

  /** @type {Array<HTMLSpanElement>} */
  const $particles = [];

  for (let i = 0; i < 20; i++) {
    const $particle = document.createElement("span");
    $particle.classList.add("particle");

    const x = random(-MAX_DISPLACEMENT, MAX_DISPLACEMENT);
    const y = random(-MAX_DISPLACEMENT, MAX_DISPLACEMENT);

    $particle.style.setProperty("--x", x + "px");
    $particle.style.setProperty("--y", y + "px");

    $particle.style.setProperty("--move-duration", MOVE_DURATION + "ms");
    $particle.style.setProperty("--fade-duration", FADE_DURATION + "ms");

    $particles.push($particle);
    $likeButton.append($particle);
  }

  setTimeout(function () {
    $particles.forEach(($p) => $p.remove());
  }, FADE_DURATION + 100);
});
