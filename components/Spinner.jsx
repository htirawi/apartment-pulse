'use client';
import ClipLoader from 'react-spinners/ClipLoader';

const override = {
  display: 'block',
  margin: '100px auto',
  borderColor: '#38b2f6',
};

const Spinner = ({ loading }) => {
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
