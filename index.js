import { random } from "https://cdn.skypack.dev/lodash";

const DISPERSE_DURATION = 300;
const FADE_DURATION = 900;
const MIN_DISPLACEMENT = 32;
const MAX_DISPLACEMENT = 64;

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

    const angle = random(0, 360);
    const distance = random(MIN_DISPLACEMENT, MAX_DISPLACEMENT);
    const [x, y] = convertPolarToCartesian(angle, distance);

    $particle.style.setProperty("--x", x + "px");
    $particle.style.setProperty("--y", y + "px");

    $particle.style.setProperty(
      "--disperse-duration",
      DISPERSE_DURATION + "ms",
    );
    $particle.style.setProperty("--fade-duration", FADE_DURATION + "ms");

    $particles.push($particle);
    $likeButton.append($particle);
  }

  setTimeout(function () {
    $particles.forEach(($p) => $p.remove());
  }, FADE_DURATION + 100);
});

/**
 * @param {number} angle
 * @param {number} distance
 * @returns {[number, number]}
 */
function convertPolarToCartesian(angle, distance) {
  const angleInRadians = convertDegreesToRadians(angle);
  const x = Math.cos(angleInRadians) * distance;
  const y = Math.sin(angleInRadians) * distance;
  return [x, y];
}

/**
 * @param {number} angle
 * @returns {number}
 */
function convertDegreesToRadians(angle) {
  return (angle * Math.PI) / 180;
}
