import React, { FC } from 'react';

// @TODO get more specific here
interface ImageProps {
  [key: string]: any;
}

// @TODO implement srcset, make this more than a passthrough.
const Image: FC<ImageProps> = props => (
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
