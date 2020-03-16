import _get from 'lodash/get';
import _find from 'lodash/find';
import { Launch, RawLaunch } from './types';

/**
 * Take in raw API launches, return array of adapted data
 * @param {array} launches
 * @return {array} adaptedLaunches
 */

const adaptLaunches = (launches: RawLaunch[]): Launch[] => {
  return launches.map(launch => {
    return {
      date: launch.launch_date_unix,
      rocketName: _get(launch, 'rocket.rocket_name', ''),
      details: launch.details,
      rocketType: _get(launch, 'rocket.rocket_type', ''),
      url: _get(launch, 'links.article_link', ''),
      img: _get(launch, 'links.mission_patch_small', ''),
      id: parseInt(launch.flight_number, 10),
      // Land success can also be null, which is assumed to be false.
      landSuccess: !!_find(_get(launch, 'rocket.first_stage.cores', {}), ['land_success', true]),
      reusedCore: getIsCoreReused(launch.rocket),
      withReddit: getWithReddit(launch),
    };
  });
};

/**
 * Determine if the launch has reddit data or not.
 * @param data {Object|Array}
 * @return {boolean}
 */
const getWithReddit = (data: any): boolean => {
  if (!isObjectOrArray(data)) return false;
  const dataKeys = Object.keys(data);
  if (!dataKeys.length) return false;
  const hasReddit = !!dataKeys.find(key => key.startsWith('reddit_') && data[key] !== null);
  if (hasReddit) return true;
  return dataKeys.some(key => getWithReddit(data[key]));
};

/**
 * Determine if the rocket's core was reused.
 * @param rocket {Object|Array}
 * @return {boolean}
 */
const getIsCoreReused = (rocket: { [key: string]: any }): boolean => {
  if (!rocket) return false;
  const stagesKeysWithCores = Object.keys(rocket).filter(
    key => key.endsWith('_stage') && !!rocket[key].cores,
  );
  return stagesKeysWithCores.some(stageKey => {
    const reusedCore = rocket[stageKey].cores.find(
      (core: { [key: string]: any }): boolean => core.reused,
    );
    return !!reusedCore;
  });
};

/**
 * Determine whether variable is either an object or an array.
 * Note: move to utils. Probably doesn't work for Set and Map.
 *
 * @param {any} variable
 * @return {boolean}
 */
const isObjectOrArray = (variable: any): boolean =>
  Object.prototype.toString.call(variable) === '[object Object]' || Array.isArray(variable);

export default adaptLaunches;
export { getWithReddit };
