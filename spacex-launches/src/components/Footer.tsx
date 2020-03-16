import Image from './Image';
import React from 'react';
import WithLink from './WithLink';
import theme from '../theme';

const Footer = () => (
  <footer>
    <p>
      By Jeremy John <br />
      <WithLink href="https://legaldesign.org/ethical-ip" target="_blank">
        © +Cal License <Image src="images/link.svg" className="linkImgLight" />
      </WithLink>
      <style jsx>{`
        :global(.linkImgLight) {
          filter: invert(100%);
          height: 0.75rem;
          position: relative;
          top: 1px;
        }

        :global(a) {
          color: ${theme.colors.primary};
          text-decoration: none;
        }
      `}</style>
    </p>
  </footer>
);

export default Footer;
