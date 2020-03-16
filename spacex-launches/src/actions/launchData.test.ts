import queryLaunchData from './queryLaunchData';
import adaptLaunches, { getWithReddit } from './adaptLaunches';
import getCheckBoxFilterConfig from './getCheckBoxFilterConfig';
import { applyFilters } from '../../pages';

describe('queryLaunchData ', () => {
  // @TODO these numbers are arbitrary and may change when more launches happen.
  it('works to query API', async () => {
    const launches = await queryLaunchData();
    expect(launches.length).toBeGreaterThan(50);
  });

  it('can be limited to one result with params', async () => {
    const launches = await queryLaunchData({ limit: 1 });
    expect(launches.length).toBe(1);
  });

  it('can be filtered by land_success', async () => {
    const launches = await queryLaunchData({ land_success: true });
    expect(launches.length).toBeGreaterThan(20);
    expect(launches.length).toBeLessThan(100);
  });

  it('can retrieve list of cores', async () => {
    const cores = await queryLaunchData({ reuse_count: 2 }, '/v3/cores');
    expect(cores.length).toBeGreaterThan(1);
  });
});

describe('adaptLaunches and filter', () => {
  it('can properly filter by core reuse', async () => {
    const cores = await queryLaunchData({ reuse_count: 2 }, '/v3/cores');
    expect(cores.length).toBeGreaterThan(1);
    const launches = await queryLaunchData({
      flight_number: cores[0].missions[1].flight,
    });
    const adaptedLaunches = adaptLaunches(launches);
    const launchesWithReusedCores = adaptedLaunches.filter(launch => launch.reusedCore);
    expect(launchesWithReusedCores.length).toBe(1);
  });

  it('can properly set getWithReddit', async () => {
    const testData: any = {
      array: ['test', { reddit_test: false }],
    };
    expect(getWithReddit(testData)).toBe(true);

    const testDataFalse: any = {
      array: ['test', { reddit_test: null }],
    };
    expect(getWithReddit(testDataFalse)).toBe(false);

    const testDataFalse2: any = {
      array: ['test', { reddits_test: true }],
    };
    expect(getWithReddit(testDataFalse2)).toBe(false);
  });

  // curl -s https://api.spacexdata.com/v3/launches?land_success=true | jq length
  it('can properly filter ', async () => {
    const landSuccesses = await queryLaunchData({ land_success: true });
    const launches = await queryLaunchData();
    const adaptedLaunches = adaptLaunches(launches);
    const filterConfig = getCheckBoxFilterConfig();
    const filterState = [filterConfig[0].filterFunc];
    const filteredLaunches = applyFilters(adaptedLaunches, filterState);
    expect(filteredLaunches.length).toBeLessThan(adaptedLaunches.length);
    expect(filteredLaunches.length).toBe(landSuccesses.length);
  });
});

// @TODO add front-end enzyme tests.
