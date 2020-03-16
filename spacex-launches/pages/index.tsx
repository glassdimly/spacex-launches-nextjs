import Head from 'next/head';
import { NextPage } from 'next';
import _cloneDeep from 'lodash/cloneDeep';
import _values from 'lodash/values';
import React from 'react';
import adaptLaunches from '../src/actions/adaptLaunches';
import LaunchList from '../src/containers/LaunchList';
import queryLaunchData from '../src/actions/queryLaunchData';
import theme from '../src/theme';
import LaunchControls from '../src/containers/LaunchControls';
import H1 from '../src/components/H1';
import Footer from '../src/components/Footer';
import { Launch, FiltersState, FilterFunc } from '../src/actions/types';

const { colors, units, mq } = theme;

/**
 * Apply each filter in filterState to launches and return the result.
 * This is how the launch data is filtered: all launches are stored,
 * and on render the launch data is filtered and passed to the LaunchList.
 * LaunchControl gets the filter state-setter function that controls
 * state on Home.
 *
 * @param {array} launches
 * @param {array} filterState
 */
const applyFilters = (launches: Launch[], filterState: FilterFunc[]) => {
  let tempLaunches = _cloneDeep(launches);
  filterState.forEach(filterFunc => {
    tempLaunches = [...tempLaunches.filter(filterFunc)];
  });
  return tempLaunches;
};

interface HomeProps {
  launches: Launch[];
}

const Home: NextPage<HomeProps> = ({ launches }): JSX.Element => {
  const [filtersState, setFiltersState] = React.useState<FiltersState | {}>({});
  const [isLoadingState, setIsLoadingState] = React.useState<boolean>(false);
  const [launchesState, setLaunchesState] = React.useState<Launch[]>(launches);

  const refreshLaunchData = async () => {
    setIsLoadingState(true);
    const newLaunches = await queryLaunchData();
    setLaunchesState(adaptLaunches(newLaunches));
    setIsLoadingState(false);
  };

  const title = 'SpaceX Launches';
  return (
    <div className="container">
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/images/favicon.ico" />
      </Head>

      <main className="main">
        <H1 className="headerText">{title}</H1>
        {/* { const [, forceUpdate] = React.useState(0); } */}
        <LaunchControls
          isLoading={isLoadingState}
          refreshLaunchData={refreshLaunchData}
          filtersState={filtersState}
          setFiltersState={setFiltersState}
        />
        <LaunchList data={applyFilters(launchesState, _values(filtersState))} />
      </main>
      <Footer />
      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-image: url(images/background.jpg);
          background-repeat: no-repeat;
          background-attachment: fixed;
          background-position: center;
          background-color: #151c38;
        }

        ${mq.xsm(`
            .container {
               padding: 0 ${units.sm} !important;
             }
        `)}

        .main {
          max-width: 100%;
          width: ${theme.maxWidth};
        }

        :global(.headerText) {
          font-size: 64px;
          text-align: center;
        }

        footer {
          width: 100%;
          height: 100px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: ${units.sm};
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          color: ${theme.colors.primary};
          font-family: ${theme.fontFamily};
          font-size: 16px;
          margin: 0;
        }

        * {
          box-sizing: border-box;
        }

        a {
          text-decoration: none;
        }

        button:hover {
          cursor: pointer;
        }

        select {
          appearance: none;
          background-color: ${colors.secondaryTrans};
          border: ${theme.border};
          border-radius: 3px;
          color: ${colors.primary};
          padding: ${units.sm} ${units.lg} ${units.sm} ${units.sm};
          vertical-align: center;
          font-size: ${units.med};
          background-image: url(images/arrow-down.svg);
          background-repeat: no-repeat, repeat;
          background-position: right ${units.sm} top 55%, 0 0;
          background-size: 1rem auto, 100%;
        }

        select:hover {
          cursor: pointer;
        }

        @font-face {
          font-family: geomanist;
          src: url(fonts/geomanist-regular-webfont.woff);
        }
      `}</style>
    </div>
  );
};

Home.getInitialProps = async ctx => {
  const data = await queryLaunchData();
  return { launches: adaptLaunches(data) };
};

export default Home;
export { applyFilters };
