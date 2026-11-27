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
