import { random } from 'https://cdn.skypack.dev/lodash';

import { normalize, convertPolarToCartesian } from './utils.js';

const DISPERSE_DURATION = { min: 400, max: 800 };

const FADE_DURATION = { min: 1000 - 500, max: 1000 + 500 };

const FADE_DELAY = { min: 0, max: 500 };

const TWINKLE_DURATION = { min: 150, max: 300 };

const DISTANCE = { min: 40, max: 80 };

const PARTICLE_SIZE = { min: 8, max: 16 };

const NUM_PARTICLES = 50;

const JITTER = 10;

/** @type {HTMLButtonElement} */
const $likeButton = document.getElementById('likeButton');

$likeButton.addEventListener('click', function () {
  const className = 'like-button--liked';

  $likeButton.classList.toggle(className);

  const isLiked = $likeButton.classList.contains(className);

  if (!isLiked) return;

  /** @type {Array<HTMLSpanElement>} */
  const $particles = [];

  for (let index = 0; index < NUM_PARTICLES; index += 1) {
    const $particle = document.createElement('span');

    $particle.classList.add('particle');

    const distance = (function assignXY() {
      const angle =
        normalize({
          value: index,
          currentScaleMin: 0,
          currentScaleMax: NUM_PARTICLES,
          newScaleMin: 0,
          newScaleMax: 360,
        }) + random(-JITTER, JITTER);

      const distance = random(DISTANCE.min, DISTANCE.max);

      const [x, y] = convertPolarToCartesian(angle, distance);

      $particle.style.setProperty('--x', `${x}px`);

      $particle.style.setProperty('--y', `${y}px`);

      return distance;
    })();

    (function assignSpin() {
      const spin = normalize({
        value: distance,
        currentScaleMin: DISTANCE.min,
        currentScaleMax: DISTANCE.max,
        newScaleMin: 400,
        newScaleMax: 800,
      });

      $particle.style.setProperty('--spin', `${spin}deg`);
    })();

    (function assignScale() {
      const scale = normalize({
        value: distance,
        currentScaleMin: DISTANCE.min,
        currentScaleMax: DISTANCE.max,
        newScaleMin: 1,
        newScaleMax: 2,
      });

      $particle.style.setProperty('--scale', scale);
    })();

    (function assignHeight() {
      const height = random(PARTICLE_SIZE.min, PARTICLE_SIZE.max);

      $particle.style.setProperty('--particle-height', `${height}px`);
    })();

    (function assignWidth() {
      const width = random(PARTICLE_SIZE.min, PARTICLE_SIZE.max);

      $particle.style.setProperty('--particle-width', `${width}px`);
    })();

    (function assignBorderRadius() {
      const borderRadius = random(5, 25);

      $particle.style.setProperty(
        '--particle-border-radius',
        `${borderRadius}%`
      );
    })();

    (function assignColor() {
      const h = random(0, 360);

      const s = random(50, 100);

      const l = random(50, 90);

      const color = `hsl(${h} ${s} ${l})`;

      $particle.style.setProperty('--particle-color', color);
    })();

    (function assignDisperseDuration() {
      const disperseDuration = normalize({
        value: distance,
        currentScaleMin: DISTANCE.min,
        currentScaleMax: DISTANCE.max,
        newScaleMin: DISPERSE_DURATION.min,
        newScaleMax: DISPERSE_DURATION.max,
      });

      $particle.style.setProperty(
        '--disperse-duration',
        `${disperseDuration}ms`
      );
    })();

    (function assignFadeDuration() {
      const fadeDuration = normalize({
        value: distance,
        currentScaleMin: DISTANCE.min,
        currentScaleMax: DISTANCE.max,
        newScaleMin: FADE_DURATION.min,
        newScaleMax: FADE_DURATION.max,
      });

      $particle.style.setProperty('--fade-duration', `${fadeDuration}ms`);
    })();

    (function assignFadeDelay() {
      const fadeDelay = random(FADE_DELAY.min, FADE_DELAY.max);

      $particle.style.setProperty('--fade-delay', `${fadeDelay}ms`);
    })();

    (function assignTwinkleFromOpacity() {
      const twinkleFromOpacity = random(0.25, 1, true);

      $particle.style.setProperty('--twinkle-from-opacity', twinkleFromOpacity);
    })();

    (function assignTwinkleDuration() {
      const twinkleDuration = random(
        TWINKLE_DURATION.min,
        TWINKLE_DURATION.max
      );

      $particle.style.setProperty('--twinkle-duration', `${twinkleDuration}ms`);
    })();

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
