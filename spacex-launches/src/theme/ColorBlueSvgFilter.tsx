import React from 'react';

const ColorBlueSvgFilter = () => {
  return (
    <svg width="0" height="0" viewBox="0 0 0 0" style={{ display: 'none' }}>
      <filter id="colorBlue">
        <feColorMatrix
          type="matrix"
          values="0.05 0 0 0 0
                  0 0.44 0 0 0
                  0 0 0.64 0 0
                  0 0 0 1 0"
        />
      </filter>
    </svg>
  );
};

export default ColorBlueSvgFilter;
