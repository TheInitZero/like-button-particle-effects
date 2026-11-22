import { random } from "https://cdn.skypack.dev/lodash";

const DISPERSE_DURATION = { min: 400, max: 800 };

const FADE_DURATION = { min: 1000 - 500, max: 1000 + 500 };

const FADE_DELAY = { min: 0, max: 500 };

const TWINKLE_DURATION = { min: 150, max: 300 };

const DISTANCE = { min: 32, max: 64 };

const PARTICLE_SIZE = { min: 8, max: 16 };

const NUM_PARTICLES = 20;

const JITTER = 10;

/** @type {HTMLButtonElement} */
const $likeButton = document.getElementById("likeButton");

$likeButton.addEventListener("click", function () {
  const className = "like-button--liked";

  $likeButton
    .classList
    .toggle(className);

  const isLiked = $likeButton
    .classList
    .contains(className);

  if (!isLiked) return;

  /** @type {Array<HTMLSpanElement>} */
  const $particles = [];

  for (
    let index = 0;
    index < NUM_PARTICLES;
    index += 1
  ) {
    const $particle = document.createElement("span");

    $particle
      .classList
      .add("particle");

    const angle = normalize({
      value: index,
      currentScaleMin: 0,
      currentScaleMax: NUM_PARTICLES,
      newScaleMin: 0,
      newScaleMax: 360,
    }) + random(-JITTER, JITTER);

    const distance = random(DISTANCE.min, DISTANCE.max);

    const [x, y] = convertPolarToCartesian(angle, distance);

    const particleSize = random(PARTICLE_SIZE.min, PARTICLE_SIZE.max);

    const disperseDuration = normalize({
      value: distance,
      currentScaleMin: DISTANCE.min,
      currentScaleMax: DISTANCE.max,
      newScaleMin: DISPERSE_DURATION.min,
      newScaleMax: DISPERSE_DURATION.max,
    });

    const fadeDuration = normalize({
      value: distance,
      currentScaleMin: DISTANCE.min,
      currentScaleMax: DISTANCE.max,
      newScaleMin: FADE_DURATION.min,
      newScaleMax: FADE_DURATION.max,
    });

    const fadeDelay = random(FADE_DELAY.min, FADE_DELAY.max);

    const twinkleFromOpacity = random(0.25, 1, true);

    const twinkleDuration = random(TWINKLE_DURATION.min, TWINKLE_DURATION.max);

    $particle
      .style
      .setProperty("--x", `${x}px`);

    $particle
      .style
      .setProperty("--y", `${y}px`);

    $particle
      .style
      .setProperty("--particle-size", `${particleSize}px`);

    $particle
      .style
      .setProperty("--disperse-duration", `${disperseDuration}ms`);

    $particle
      .style
      .setProperty("--fade-duration", `${fadeDuration}ms`);

    $particle
      .style
      .setProperty('--fade-delay', `${fadeDelay}ms`);

    $particle
      .style
      .setProperty("--twinkle-from-opacity", twinkleFromOpacity);

    $particle
      .style
      .setProperty("--twinkle-duration", `${twinkleDuration}ms`);

    $particles.push($particle);

    $likeButton.append($particle);
  }

  const cleanupDelay =
    DISPERSE_DURATION.max +
    TWINKLE_DURATION.max +
    FADE_DURATION.max +
    FADE_DELAY.max +
    100;
  
  setTimeout(function () {
    $particles.forEach(($p) => $p.remove());
  }, cleanupDelay);
});

/**
 * @typedef {Object} NormalizeParams
 * @property {number} value
 * @property {number} currentScaleMin
 * @property {number} currentScaleMax
 * @property {number} newScaleMin
 * @property {number} newScaleMax
 */

/**
 * @param {NormalizeParams} params
 * @returns {number} Interpolated value
 */
function normalize({
  value,
  currentScaleMin,
  currentScaleMax,
  newScaleMin = 0,
  newScaleMax = 1,
}) {
  const standardNormalization = (
    (value - currentScaleMin) / (currentScaleMax - currentScaleMin)
  );

  return (
    (newScaleMax - newScaleMin) * standardNormalization + newScaleMin
  );
}

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
