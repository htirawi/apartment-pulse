'use client';
import ClipLoader from 'react-spinners/ClipLoader';
import { useState } from 'react';

const override = {
  display: 'block',
  margin: '100px auto',
  borderColor: '#38b2f6',
};

const loadingPage = ({ loading }) => {
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

export default loadingPage;
