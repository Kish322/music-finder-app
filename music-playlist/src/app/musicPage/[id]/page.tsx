import MusicForm from '@/components/form/form';
import { NextPage } from 'next';

interface MusicPageProps {
  params: {
    id: string; // Replace with the actual type of your 'id' property
  };
}

const MusicPage: NextPage<MusicPageProps> = ({ params }) => {
  return <MusicForm /> 
};

export default MusicPage;