import MusicForm from '@/components/form/form';
import { NextPage } from 'next';

interface MusicPageProps {
  params: {
    id: string; 
  };
}

const MusicPage: NextPage<MusicPageProps> = ({ params }) => {
  return <MusicForm /> 
};

export default MusicPage;