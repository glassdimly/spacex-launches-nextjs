import { CheckBoxFilter } from './types';

/**
 * Return the config for all the checkboxes and the filters they apply to the launches.
 * @return {array} All the checkbox filter configs
 */
const getCheckBoxFilterConfig = (): CheckBoxFilter[] => {
  return [
    {
      id: 'landSuccess',
      name: 'Land Success',
      filterFunc: launch => launch.landSuccess,
    },
    {
      id: 'reusedCore',
      name: 'Reused',
      filterFunc: launch => launch.reusedCore,
    },
    {
      id: 'isReddit',
      name: 'With Reddit',
      filterFunc: launch => launch.withReddit,
    },
  ];
};

export default getCheckBoxFilterConfig;
