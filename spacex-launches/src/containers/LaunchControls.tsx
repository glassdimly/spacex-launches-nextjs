import React, { FC, ChangeEvent } from 'react';
import _cloneDeep from 'lodash/cloneDeep';
import getCheckBoxFilterConfig from '../actions/getCheckBoxFilterConfig';
import theme from '../theme';
import { CheckBoxFilter, FilterFunc } from '../actions/types';

const { colors, units } = theme;

type FiltersState = { [key: string]: FilterFunc } | {};
type SetFiltersState = (filters: FiltersState) => void;

interface LaunchControlsProps {
  isLoading: boolean;
  refreshLaunchData: () => {};
  setFiltersState: SetFiltersState;
  filtersState: FiltersState;
}

const LaunchControls: FC<LaunchControlsProps> = ({
  isLoading,
  refreshLaunchData,
  setFiltersState,
  filtersState,
}) => {
  const curryHandleCheckboxFilterClick = (filterConfig: CheckBoxFilter) => (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    rotateRefreshFinite();
    if (e.target.checked === true) {
      setFiltersState({
        ...filtersState,
        ...{ [filterConfig.id]: filterConfig.filterFunc },
      });
    } else {
      const newFilterState = _cloneDeep(filtersState);
      // @ts-ignore @TODO fix this.
      delete newFilterState[filterConfig.id];
      setFiltersState(newFilterState);
    }
  };

  const rotateRefreshFinite = () => {
    // @TODO do this with props and things
    const updatedClass = 'filterUpdatedAnimation';
    const buttonIconSelector = '.refreshButtonIcon';
    const refreshButton = document.querySelector(buttonIconSelector);
    if (refreshButton.classList.contains(updatedClass)) return;
    refreshButton.classList.add(updatedClass);
    setTimeout(
      () => document.querySelector(buttonIconSelector).classList.remove(updatedClass),
      900,
    );
  };

  return (
    <div className="launchControls" key="launchControls">
      <button
        aria-label="refresh launch data"
        data-is-loading={isLoading ? 1 : 0}
        onClick={refreshLaunchData}
        onKeyDown={refreshLaunchData}
        className={`refreshButton ${isLoading ? `refreshingDataAnimation` : ''}`}
      >
        <span className="refreshButtonIcon" />
      </button>

      <div className="filtersWrapper">
        {getCheckBoxFilterConfig().map(filterConfig => {
          return (
            <React.Fragment key={`frag_${filterConfig.id}`}>
              <input
                className="checkbox"
                type="checkbox"
                key={filterConfig.id}
                id={filterConfig.id}
                checked={!!filtersState[filterConfig.id]}
                name={filterConfig.id}
                onChange={curryHandleCheckboxFilterClick(filterConfig)}
                data-indeterminate="false"
                aria-label={`filter by ${filterConfig.name}`}
              />
              <label
                className="checkboxLabel"
                key={`label_${filterConfig.id}`}
                htmlFor={filterConfig.id}
              >
                {filterConfig.name}
              </label>
            </React.Fragment>
          );
        })}
      </div>
      <style jsx>{`
        .launchControls {
          border-top: ${theme.border};
          border-right: ${theme.border};
          border-left: ${theme.border};
          border-bottom: 1px solid ${colors.primary};
          border-radius: ${units.sm} ${units.sm} 0 0;
          background-color: ${colors.secondaryTrans};
          display: flex;
          justify-content: space-between;
          padding: ${units.med};
          align-items: center;
        }
      
        .refreshButton {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          border: 2px solid ${theme.colors.primary};
          background-color: transparent;
          position: relative;
        }

        .refreshButtonIcon {
          z-index: 1;
          position: absolute;
          margin: auto;
          top: 0; left: 0; bottom: 0; right: 0;
          width: 70%;
          height: 70%;
          display block;
          filter: invert(100%);
          background-image: url(images/refresh.svg);
          background-position: center;
          background-size: cover;
        }
        
        .filtersWrapper {
          display: flex;
          align-items: center;
        }
        
        ${/* @TODO This will only work in modern browsers */ ''}
        .checkbox {
          appearance: none;
          border: 1px solid white;
          border-radius: 4px;
          outline: none;
          width: 1.25rem;
          height: 1.25rem;
          background-color: transparent;
          cursor: pointer;
          position: relative;
          margin: 0 .5rem;
        }
        
        .checkbox:checked:before {
          content: url(images/checkmark.svg);
          display: block;
          text-align: center;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 1rem;
          height: .75rem;
        }
        
        .checkBox:hover,
        .checkboxLabel:hover {
          cursor: pointer;
        }
        
        .checkboxLabel {
          text-transform: uppercase;
          font-size: .875rem;
        }
        
        .refreshingDataAnimation {
          animation: rotate360CounterClockWise 0.7s cubic-bezier(0.215, 0.610, 0.355, 1.000) infinite both;
        }
        
        .filterUpdatedAnimation {
          animation: rotate360CounterClockWise 0.7s cubic-bezier(0.215, 0.610, 0.355, 1.000) 1 both;
        }
        
        @keyframes rotate360CounterClockWise {
          0% {
            transform: rotate(0);
          }
          
          100% {
            transform: rotate(-360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default LaunchControls;
