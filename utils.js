/**
 * @param {number} min
 * @param {number} max
 * @param {boolean} [shouldReturnFloat=false]
 * @returns {number}
 */
export function random(min, max, shouldReturnFloat = false) {
  if (min > max) {
    throw new Error(
      `max should be greater than or equal to min. Given max: ${max}, min: ${min}`
    );
  }

  if (min == max) return min;
  const diff = max - min;
  const addition = diff * Math.random();
  const result = min + addition;
  if (shouldReturnFloat) {
    // Round upto 2 decimal places
    return Math.round(result * 100) / 100;
  }
  return Math.round(result);
}

/**
 * @param {number} value
 * @param {number} currentScaleMin
 * @param {number} currentScaleMax
 * @param {number} newScaleMin
 * @param {number} newScaleMax
 * @returns {number} Interpolated value
 */
export function normalize(
  value,
  currentScaleMin,
  currentScaleMax,
  newScaleMin = 0,
  newScaleMax = 1
) {
  const standardNormalization =
    (value - currentScaleMin) / (currentScaleMax - currentScaleMin);

  return (newScaleMax - newScaleMin) * standardNormalization + newScaleMin;
}

/**
 * @param {number} angle
 * @param {number} distance
 * @returns {[number, number]}
 */
export function convertPolarToCartesian(angle, distance) {
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
