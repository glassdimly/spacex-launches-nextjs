import { CheckBoxFilter } from './types';

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
