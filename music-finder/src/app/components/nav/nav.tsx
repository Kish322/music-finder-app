import Link from "next/link";
import Image from 'next/image';
import { FaHome } from "react-icons/fa";
import { SlPlaylist } from "react-icons/sl";

const Nav = () => {
  return (
    <nav className="flex justify-between bg-nav p-4">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="logo-container h-7">
            <Image
              src="/piano.png"
              alt="Mystique"
              width={48} 
              height={48} 
              objectFit="contain"
              className="transform -translate-y-3"
            />
          </div>
          <p className="text-white font-bold text-lg" style={{ fontFamily: 'eczar', fontSize: '28px'}}>Mystique</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Link href="/">
          <div className="flex items-center">
            <FaHome className="text-white text-3xl transition duration-300" />
            <span className="text-white ml-2 hover:underline" style={{ fontFamily: 'eczar', fontSize: '19px' }}>Home</span>
          </div>
        </Link> 
        <div className="border-l border-white h-6 mx-4"></div>
        <Link href="/musicPage/form">
          <div className="flex items-center">
            <SlPlaylist className="text-white text-3xl transition duration-300" />
            <span className="text-white ml-2 hover:underline" style={{ fontFamily: 'eczar', fontSize: '19px' }}>Form</span>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Nav;