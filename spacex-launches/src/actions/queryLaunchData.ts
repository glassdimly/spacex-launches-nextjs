import axios from 'axios';
import { RawLaunch, Params } from './types';

type AxiosOpts = {
  baseUrl?: string;
  params?: Params;
};

// @TODO Currently, we have only have 107 launches. Fastest/easiest to get them all and page. If list grows, implement limit-driven paging.
const queryLaunchData = async (
  urlParams?: Params,
  url: string = '/v3/launches',
  axiosOpts: AxiosOpts = {},
): Promise<RawLaunch[]> => {
  const mergedAxiosOpts: AxiosOpts = {
    ...{
      baseURL: 'https://api.spacexdata.com',
    },
    ...axiosOpts,
  };
  mergedAxiosOpts.params = urlParams;

  try {
    const { data } = await axios.get(url, mergedAxiosOpts);
    // catch errors
    return data;
  } catch (e) {
    console.error(e);
    throw new Error("Couldn't fetch results for SpaceX launches. Find your answer in the stars.");
  }
};

export default queryLaunchData;
