import React from 'react';

interface WithLinkProps {
  href: string;
  children: any;
  [x: string]: any;
}

// @TODO type this properly. Also don't spread props.
const WithLink: React.FunctionComponent<WithLinkProps> = ({
  href,
  children,
  ...restProps
}: WithLinkProps): JSX.Element => {
  return href ? (
    <a {...restProps} href={href} rel="noreferrer noopener">
      {children}
    </a>
  ) : (
    <>{children}</>
  );
};

export default WithLink;
