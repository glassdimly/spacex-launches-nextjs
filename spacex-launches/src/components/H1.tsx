import React, { SFC, ReactNode } from 'react';

interface H1Props {
  children: ReactNode;
  className: string;
}

const H1: SFC<H1Props> = ({ children, ...restProps }) => <h1 {...restProps}>{children}</h1>;

export default H1;
