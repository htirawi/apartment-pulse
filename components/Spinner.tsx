'use client';
import ClipLoader from 'react-spinners/ClipLoader';
import { CSSProperties } from 'react';
import { ISpinnerProps } from '@/types/components/ISpinner';

const override: CSSProperties = {
  display: 'block',
  margin: '100px auto',
  borderColor: '#38b2f6',
};

const Spinner = ({ loading }: ISpinnerProps) => {
  return (
    <ClipLoader
      color="#38b2f6"
      loading={loading}
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
    />
  );
};

export default Spinner;
