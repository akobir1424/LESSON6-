import { ClipLoader } from 'react-spinners';

const override = {
  display: 'block',
  margin: '150px auto',
  borderColor: 'red',
};

const Loader = () => {
  return (
    <ClipLoader
      color={'white'}
      loading={true}
      cssOverride={override}
      size={150}
    />
  );
};

export default Loader;
