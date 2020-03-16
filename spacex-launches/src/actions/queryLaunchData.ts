import axios from 'axios';
import { RawLaunch, Params } from './types';

type AxiosOpts = {
  baseUrl?: string;
  params?: Params;
};

/**
 * Query the spacex launches API and return the results.
 * @TODO Currently, we have only have 107 launches. Fastest/easiest to get them all and page. If list grows, implement limit-driven paging.
 * Note: @TODO fix TS def that says we only return Launches. This can query cores or other api data also.
 * @param urlParams {object}: the query parameters as object to append to the url.
 * @param url {string}: the api url to query
 * @param axiosOpts {object} to be merged over axios options and fed to axios.
 * @return {array} the data from the API response. This can be cores or launches, actually.
 */
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
