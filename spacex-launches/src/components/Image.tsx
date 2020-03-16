import React from 'react';

// @TODO implement srcset
const Image = props => (
  <>
    <img {...props} />
    <style jsx>{`
      img {
        max-width: 100%;
      }
    `}</style>
  </>
);

export default Image;
