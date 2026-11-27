import { random, normalize, convertPolarToCartesian } from './utils.js';

const NUM_PARTICLES = 50;

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

    const { distance, minDistance, maxDistance } = (function assignXY() {
      const angle =
        normalize(index, 0, NUM_PARTICLES, 0, 360) + random(-10, 10);

      const min = 40;
      const max = 80;
      const distance = random(min, max);
      const [x, y] = convertPolarToCartesian(angle, distance);
      $particle.style.setProperty('--x', `${x}px`);
      $particle.style.setProperty('--y', `${y}px`);
      return { distance, minDistance: min, maxDistance: max };
    })();

    (function assignSpin() {
      const min = 400;
      const max = 800;
      const spin = normalize(distance, minDistance, maxDistance, min, max);
      $particle.style.setProperty('--spin', `${spin}deg`);
    })();

    (function assignScale() {
      const min = 1;
      const max = 2;
      const scale = normalize(distance, minDistance, maxDistance, min, max);
      $particle.style.setProperty('--scale', scale);
    })();

    (function assignHeight() {
      const min = 8;
      const max = 16;
      const height = random(min, max);
      $particle.style.setProperty('--particle-height', `${height}px`);
    })();

    (function assignWidth() {
      const min = 8;
      const max = 16;
      const width = random(min, max);
      $particle.style.setProperty('--particle-width', `${width}px`);
    })();

    (function assignBorderRadius() {
      const min = 5;
      const max = 25;
      const borderRadius = random(min, max);

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
      const min = 400;
      const max = 800;

      const disperseDuration = normalize(
        distance,
        minDistance,
        maxDistance,
        min,
        max
      );

      $particle.style.setProperty(
        '--disperse-duration',
        `${disperseDuration}ms`
      );
    })();

    (function assignFadeDuration() {
      const min = 1000 - 500;
      const max = 1000 + 500;

      const fadeDuration = normalize(
        distance,
        minDistance,
        maxDistance,
        min,
        max
      );

      $particle.style.setProperty('--fade-duration', `${fadeDuration}ms`);
    })();

    (function assignFadeDelay() {
      const min = 0;
      const max = 500;
      const fadeDelay = random(min, max);
      $particle.style.setProperty('--fade-delay', `${fadeDelay}ms`);
    })();

    (function assignTwinkleFromOpacity() {
      const min = 0.25;
      const max = 1;
      const twinkleFromOpacity = random(min, max, true);
      $particle.style.setProperty('--twinkle-from-opacity', twinkleFromOpacity);
    })();

    (function assignTwinkleDuration() {
      const min = 150;
      const max = 300;
      const twinkleDuration = random(min, max);
      $particle.style.setProperty('--twinkle-duration', `${twinkleDuration}ms`);
    })();

    $particles.push($particle);
    $likeButton.append($particle);
  }

  setTimeout(function () {
    $particles.forEach(($p) => $p.remove());
  }, 5000);
});
