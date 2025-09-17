'use client';
import ClipLoader from 'react-spinners/ClipLoader';

const override = {
  display: 'block',
  margin: '100px auto',
  borderColor: '#38b2f6',
};

const loadingPage = () => {
  return (
    <ClipLoader
      color="#38b2f6"
      loading={true}
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
    />
  );
};

export default loadingPage;
