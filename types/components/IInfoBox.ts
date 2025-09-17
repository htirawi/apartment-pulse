import React from 'react';

export interface IButtonInfo {
  text: string;
  link: string;
  backgroundColor: string;
}

export interface IInfoBoxProps {
  heading: string;
  backgroundColor?: string;
  textColor?: string;
  buttonInfo: IButtonInfo;
  children: React.ReactNode;
}
