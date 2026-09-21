// Compass Sensor API & Utilities (DeviceOrientation / DeviceOrientationAbsolute)
// Rate limit: Client-side event stream (throttled/lerped at 60fps via requestAnimationFrame)
// Attribution: Device Orientation API (W3C standard) & standalone client calculations

const CARDINALS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

/**
 * Calculates the cardinal direction for a given heading (0-360 deg).
 * Sectors are 45° each, offset by 22.5° so North is 337.5° to 22.5°.
 * @param {number} heading
 * @returns {string} e.g. 'N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'
 */
export function getCardinal(heading) {
  const normalized = normalizeAngle(heading);
  const index = Math.floor(((normalized + 22.5) % 360) / 45);
  return CARDINALS[index] || 'N';
}

/**
 * Normalizes any angle into [0, 360) range
 * @param {number} deg
 * @returns {number}
 */
export function normalizeAngle(deg) {
  return ((deg % 360) + 360) % 360;
}

/**
 * Calculates the shortest angular difference from 'current' to 'target',
 * correctly wrapping around the 359° -> 0° boundary.
 * Result is in [-180, 180] range.
 * @param {number} target
 * @param {number} current
 * @returns {number}
 */
export function shortestAngleDiff(target, current) {
  return ((((target - current) % 360) + 540) % 360) - 180;
}

/**
 * Lerps an angle from current toward target along the shortest angular path.
 * @param {number} current
 * @param {number} target
 * @param {number} factor (0 to 1, e.g. 0.15)
 * @returns {number}
 */
export function lerpAngle(current, target, factor = 0.15) {
  const diff = shortestAngleDiff(target, current);
  return normalizeAngle(current + diff * factor);
}
