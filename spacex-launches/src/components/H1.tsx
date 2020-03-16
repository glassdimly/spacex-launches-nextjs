import React, { FC, ReactNode } from 'react';

interface H1Props {
  children: ReactNode;
  className: string;
}

const H1: FC<H1Props> = ({ children, ...restProps }) => <h1 {...restProps}>{children}</h1>;

export default H1;
